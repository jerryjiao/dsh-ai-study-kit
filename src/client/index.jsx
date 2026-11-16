/**
 * dsh-ai-study-kit — 浏览器半边（client）。
 *
 * 注册两处槽位，构成「学习台」：
 *   1. `sidebar.panellist`：侧栏的全局入口图标（list id 与 main 面板 key 同名）。
 *   2. `main` key = 'ai-study-kit'：主面板内容，点侧栏图标即切换到这里。
 * main 是 keyed 槽（scope: root，无 Session 绑定）——学习台的进度是全局的，
 * 不该被某个会话绑死。这条选择的取舍见 docs/adr/0001-学习台注册为-main-面板.md。
 *
 * 数据全部走 RPC（chunk 见 src/shared/contract.js），客户端不读磁盘、不碰网络。
 */
import { useCallback, useEffect, useState } from 'react'
import { ENDPOINTS } from '../shared/contract.js'
import { StudyApp } from './app/StudyApp'
import { StudyIcon } from './icon.jsx'
import { createRpc, describeError } from './rpc.js'
import './app.css'

/** cordis 客户端插件名。 */
export const name = 'dsh-ai-study-kit-client'
/** 只依赖这三项服务：槽位注册、文案、RPC 通道。 */
export const inject = ['slots', 'locale', 'connection']

/** main 面板 key，同时是 sidebar.panellist 的 list id 与面板 URL 片段。 */
const PANEL_ID = 'ai-study-kit'
const LOCALE_NS = 'dsh-ai-study-kit'

const LOCALES = {
  zh: { panel: '学习台' },
  en: { panel: 'Study Desk' },
}

/**
 * @param {import('@deepseek-ai/dsh-client-runtime').ClientContext} ctx
 */
export function apply(ctx) {
  let t = (key) => key
  try {
    ctx.locale.register(LOCALE_NS, LOCALES)
    t = ctx.locale.bind(LOCALE_NS)
  } catch (error) {
    // 文案服务不可用不该让整个面板消失。
    ctx.logger?.warn?.(`dsh-ai-study-kit: 文案注册失败：${describeError(error)}`)
  }

  const rpc = createRpc(ctx.connection)

  ctx.slots.inject('main', () =>
    ctx.slots.register(
      {
        name: 'main',
        key: PANEL_ID,
        inject: () => ({ call: rpc.call }),
      },
      StudyPanel,
    ),
  )

  ctx.slots.inject('sidebar.panellist', () =>
    ctx.slots.register(
      {
        name: 'sidebar.panellist',
        id: PANEL_ID,
        order: 40,
        label: () => t('panel'),
      },
      StudyIcon,
    ),
  )
}

/* ------------------------------------------------------------------ */
/* 面板本体                                                            */
/* ------------------------------------------------------------------ */

function StudyPanel({ call }) {
  const [snapshot, setSnapshot] = useState(null)
  const [phase, setPhase] = useState('loading')
  const [error, setError] = useState('')

  const load = useCallback(async () => {
    setPhase('loading')
    setError('')
    try {
      const next = await call(ENDPOINTS.snapshot)
      setSnapshot(next)
      setPhase('ready')
    } catch (err) {
      setError(describeError(err))
      setPhase('error')
    }
  }, [call])

  useEffect(() => {
    void load()
  }, [load])

  const run = useCallback(
    async (endpoint, payload) => {
      try {
        const next = await call(endpoint, payload)
        if (next) setSnapshot((previous) => ({ ...previous, ...next }))
        setError('')
        return next
      } catch (err) {
        setError(describeError(err))
        throw err
      }
    },
    [call],
  )

  const onSetProject = useCallback((root) => run(ENDPOINTS.setProject, { root }), [run])
  const onSetTheme = useCallback((theme) => run(ENDPOINTS.setTheme, { theme }), [run])
  const onSetSettings = useCallback((patch) => run(ENDPOINTS.setSettings, { patch }), [run])

  if (phase === 'loading') {
    return (
      <Shell>
        <Center>
          <Spinner />
          <p className="mt-3 text-sm text-text-secondary">正在读取学习项目…</p>
        </Center>
      </Shell>
    )
  }

  if (phase === 'error') {
    return (
      <Shell>
        <Center>
          <p className="text-base font-bold text-text-primary">学习台加载失败</p>
          <p className="mt-2 max-w-lg text-center text-[13px] leading-relaxed text-text-secondary break-words">
            {error}
          </p>
          <button
            type="button"
            onClick={() => void load()}
            className="mt-4 h-9 px-4 rounded-xl bg-st-green text-white text-sm font-bold"
          >
            重试
          </button>
        </Center>
      </Shell>
    )
  }

  const needsProject = !snapshot?.project?.root || !snapshot?.themes?.length
  if (needsProject) {
    return (
      <Shell>
        <Setup
          snapshot={snapshot}
          error={error}
          onSetProject={onSetProject}
          onSetTheme={onSetTheme}
          onReload={load}
        />
      </Shell>
    )
  }

  return (
    <Shell>
      <StudyApp
        key={`${snapshot.project.root}|${snapshot.theme ?? ''}|${snapshot.settings?.lang ?? 'zh'}`}
        snapshot={snapshot}
        call={call}
        onSetProject={onSetProject}
        onSetTheme={onSetTheme}
        onSetSettings={onSetSettings}
      />
    </Shell>
  )
}

function Shell({ children }) {
  return (
    <div className="dsh-study-root h-full w-full flex flex-col bg-bg-app text-text-primary">
      {children}
    </div>
  )
}

function Center({ children }) {
  return (
    <div className="flex-1 grid place-items-center p-8">
      <div className="flex flex-col items-center">{children}</div>
    </div>
  )
}

function Spinner() {
  return (
    <span className="h-6 w-6 rounded-full border-2 border-border border-t-st-green animate-spin" />
  )
}

/** 没有学习项目、或项目里没有主题时的落地页：一句说明 + 一个路径输入框。 */
function Setup({ snapshot, error, onSetProject, onSetTheme, onReload }) {
  const [draft, setDraft] = useState('')
  const [busy, setBusy] = useState(false)
  const [localError, setLocalError] = useState('')
  const project = snapshot?.project ?? { root: '', source: 'none', legacy: false }
  const themes = snapshot?.themes ?? []

  const submit = async () => {
    const root = draft.trim()
    if (!root) return
    setBusy(true)
    setLocalError('')
    try {
      await onSetProject(root)
    } catch (err) {
      setLocalError(describeError(err))
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="flex-1 overflow-auto">
      <div className="mx-auto w-full max-w-2xl px-6 py-10">
        <h1 className="text-xl font-bold text-text-primary">连接你的学习项目</h1>
        <p className="mt-2 text-[13px] leading-relaxed text-text-secondary">
          学习台读取项目里的 <code className="font-mono text-[12px]">examples/&lt;主题&gt;/</code>{' '}
          题库与进度，不联网、不上传任何内容。
        </p>

        <div className="mt-5 rounded-xl border-2 border-border bg-bg-surface p-4">
          <p className="text-[11px] font-bold uppercase tracking-wide text-text-muted">当前项目</p>
          <p className="mt-1 text-[13px] text-text-primary break-all">
            {project.root || '尚未选择'}
            {project.root ? (
              <span className="ml-2 text-[12px] text-text-faint">
                {project.source === 'remembered'
                  ? '上次使用'
                  : project.source === 'home'
                    ? '默认目录'
                    : project.source === 'manual'
                      ? '手动指定'
                      : project.source === 'cwd'
                        ? '当前工作区'
                        : ''}
                {project.legacy ? ' · 旧布局' : ''}
              </span>
            ) : null}
          </p>

          <form
            onSubmit={(event) => {
              event.preventDefault()
              void submit()
            }}
            className="mt-3 flex flex-col gap-2 sm:flex-row"
          >
            <input
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="~/Documents/study-kit 或绝对路径"
              spellCheck={false}
              className="h-9 flex-1 px-3 rounded-xl border-2 border-border bg-bg-subtle text-[13px] text-text-primary placeholder:text-text-faint outline-none focus:border-st-blue"
            />
            <button
              type="submit"
              disabled={busy || !draft.trim()}
              className="h-9 px-4 rounded-xl bg-st-green text-white text-sm font-bold disabled:opacity-40"
            >
              {busy ? '正在打开…' : '使用此目录'}
            </button>
          </form>

          {(localError || error) && (
            <p className="mt-2 text-[12px] leading-relaxed text-st-red break-words">
              {localError || error}
            </p>
          )}

          <button
            type="button"
            onClick={() => void onReload()}
            className="mt-3 text-[12px] font-bold text-text-muted hover:text-text-secondary"
          >
            重新检测
          </button>
        </div>

        {themes.length > 0 && (
          <div className="mt-5">
            <p className="text-[11px] font-bold uppercase tracking-wide text-text-muted">选择主题</p>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              {themes.map((theme) => (
                <button
                  key={theme.slug}
                  type="button"
                  onClick={() => void onSetTheme(theme.slug)}
                  className="rounded-xl border-2 border-border bg-bg-surface p-3 text-left hover:border-border-strong"
                >
                  <span className="block text-[13px] font-bold text-text-primary">
                    {theme.title}
                  </span>
                  <span className="mt-0.5 block text-[11px] text-text-faint">
                    {theme.questionCount} 题 · {theme.cardCount} 卡
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
