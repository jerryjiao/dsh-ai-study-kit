#!/usr/bin/env node
/**
 * dev-install —— 本地开发回路：构建 → 装进某个 DSH profile → 提示重启宿主。
 *
 * 与线上安装的区别：线上是 `dsh plugin add <包名>`（走 npm 包 + 预构建 lib/），
 * 开发时改完源码只要重跑本脚本把 lib/ 覆盖进 profile 的 node_modules 即可，
 * 不必重新发版。
 *
 * 环境变量：
 *   DSH_HOME     默认 ~/.dsh
 *   DSH_PROFILE  默认 web（GUI 桌面端常用 desktop，按你实际启动的 profile 填）
 *   DSH_BIN      dsh 可执行文件；默认从 PATH 找，找不到就报错并给出提示
 *
 * 注意：宿主侧 lib/index.js 是宿主进程 require 的产物，无 watch、无热重载。
 * 想让改动生效必须重启宿主进程（`dsh <profile>` 那个），再刷新浏览器页面。
 */
import { execFileSync } from 'node:child_process'
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)))
const PKG = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8'))
const PLUGIN = PKG.name

const DSH_HOME = process.env.DSH_HOME || join(homedir(), '.dsh')
const PROFILE = process.env.DSH_PROFILE || 'web'
const TARGET = join(DSH_HOME, 'profiles', PROFILE, 'node_modules', PLUGIN)

function findDshBin() {
  if (process.env.DSH_BIN) return process.env.DSH_BIN
  try {
    return execFileSync('which', ['dsh'], { encoding: 'utf8' }).trim()
  } catch {
    return ''
  }
}

const step = (n, text) => console.log(`[${n}/3] ${text}`)

// 1) 构建
step(1, 'npm run build …')
execFileSync('npm', ['run', 'build'], { cwd: ROOT, stdio: 'inherit' })

// 2) 安装：profile 里没有这个包就先让 dsh 装一次（建立依赖记录），再覆盖 lib/
step(2, `安装到 ${TARGET} …`)
if (!existsSync(TARGET)) {
  const dsh = findDshBin()
  if (!dsh) {
    console.error(
      `\n找不到 dsh 可执行文件。请用 DSH_BIN=/path/to/dsh 指定，或先手动安装：\n` +
        `  dsh plugin --profile ${PROFILE} add ${ROOT}\n`,
    )
    process.exit(1)
  }
  console.log(`   profile 里还没装 ${PLUGIN}，先执行 dsh plugin add …`)
  execFileSync(dsh, ['plugin', '--profile', PROFILE, 'add', ROOT], { stdio: 'inherit' })
}

mkdirSync(TARGET, { recursive: true })
rmSync(join(TARGET, 'lib'), { recursive: true, force: true })
cpSync(join(ROOT, 'lib'), join(TARGET, 'lib'), { recursive: true })
// 元数据以源码仓库为准（patch / skills / 文案 / 图标都参与运行）
for (const item of ['cordis.patch.yml', 'skills', 'locale', 'icon.png', 'package.json']) {
  const from = join(ROOT, item)
  if (!existsSync(from)) continue
  rmSync(join(TARGET, item), { recursive: true, force: true })
  cpSync(from, join(TARGET, item), { recursive: true })
}
writeFileSync(join(TARGET, '.dev-installed'), new Date().toISOString())

// 3) 收尾提示
step(3, '完成')
console.log(
  `\n已覆盖安装到 ${TARGET}\n` +
    `重启宿主（\`dsh ${PROFILE}\` 那个进程）后刷新浏览器页面即生效。\n` +
    `只看页面改动可以跑 \`npm run build:client\` 再重跑本脚本，省一次宿主侧打包。`,
)
