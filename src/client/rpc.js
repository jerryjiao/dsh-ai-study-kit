/**
 * 客户端 RPC 封装：把宿主 connection.rpc 的信封拆成「值 / 异常」。
 *
 * 宿主侧永远返回平台信封（见 src/shared/contract.js 顶部注释）：
 *   { ok: true,  value: <payload> }
 *   { ok: false, error: { code, message, details } }
 * 裸值会让客户端联合校验失败，所以这里只做拆封与错误规范化，不做业务判断。
 */
import { RPC_CHANNEL } from '../shared/contract.js'

/**
 * @param {{ rpc: { call: (channel: string, endpoint: string, payload: unknown, signal?: AbortSignal) => Promise<unknown> } }} connection
 */
export function createRpc(connection) {
  /**
   * @template T
   * @param {string} endpoint
   * @param {unknown} [payload]
   * @returns {Promise<T>}
   */
  async function call(endpoint, payload) {
    const raw = await connection.rpc.call(RPC_CHANNEL, endpoint, payload ?? {}, undefined)
    return unwrap(endpoint, raw)
  }
  return { call }
}

function unwrap(endpoint, raw) {
  if (raw && typeof raw === 'object' && 'ok' in raw) {
    if (raw.ok === true) return raw.value
    const error = raw.error ?? {}
    const err = new Error(
      typeof error.message === 'string' && error.message
        ? error.message
        : `学习台请求失败：${endpoint}`,
    )
    err.code = error.code ?? 'rpc-failed'
    err.details = error.details ?? {}
    throw err
  }
  // 少数平台版本直接回值；保持兼容，不把合法响应当错误。
  return raw
}

/** 把任意异常压成一句能显示给用户的话。 */
export function describeError(error) {
  if (!error) return '未知错误'
  const message = typeof error.message === 'string' ? error.message : String(error)
  return message.length > 500 ? `${message.slice(0, 500)}…` : message
}
