#!/usr/bin/env node
/**
 * 构建脚本：把 src/ 打成随包分发的 lib/（no-build 安装路径，与 dsh-wewrite 同构）。
 *
 * 产物：
 *   lib/index.js  —— 宿主半边（ESM，node22，依赖 external 由安装侧解析）
 *                    5 个 skill 注册 + 学习台 RPC。
 *   lib/client.js —— 浏览器半边（CJS bundle + window.__ModuleLoader__.load 外壳）
 *                    React 与 @deepseek-ai/dsh-client-ui-primitives 走 external，
 *                    由宿主 ModuleLoader 提供（保证单实例 React）。
 *                    CSS 无独立加载通道，Tailwind 编译后由 CSS 插件注入 <style>。
 *
 * 用法：
 *   node scripts/build.mjs                # 两端
 *   node scripts/build.mjs --client-only   # 只打浏览器半边（改页面时的快循环）
 */
import { build } from 'esbuild'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import postcss from 'postcss'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

const require = createRequire(import.meta.url)
const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const lib = join(root, 'lib')
const clientOnly = process.argv.includes('--client-only')
mkdirSync(lib, { recursive: true })

const PLUGIN_ID = 'dsh-ai-study-kit'

/* ------------------------------------------------------------------ */
/* 宿主半边                                                            */
/* ------------------------------------------------------------------ */

if (!clientOnly) {
  await build({
    bundle: true,
    format: 'esm',
    platform: 'node',
    target: 'node22',
    packages: 'external',
    sourcemap: true,
    logLevel: 'info',
    entryPoints: [join(root, 'src/host/index.js')],
    outfile: join(lib, 'index.js'),
  })
}

/* ------------------------------------------------------------------ */
/* CSS：Tailwind + PostCSS → 自注入模块                                 */
/* ------------------------------------------------------------------ */

const tailwindConfigPath = join(root, 'src/client/tailwind.config.cjs')

/** 读客户端的 tailwind 配置，但 content 一律补齐到整个 src/（防漏扫 chrome/index）。 */
function loadTailwindConfig() {
  const base = existsSync(tailwindConfigPath) ? require(tailwindConfigPath) : {}
  return {
    ...base,
    darkMode: 'class',
    content: [
      join(root, 'src/client/**/*.{js,jsx,ts,tsx}'),
      join(root, 'src/shared/**/*.js'),
    ],
  }
}

const cssInjectPlugin = {
  name: 'dsh-ai-study-kit-css',
  setup(builder) {
    builder.onLoad({ filter: /\.css$/ }, async (args) => {
      const raw = readFileSync(args.path, 'utf8')
      const processed = await postcss([
        tailwindcss(loadTailwindConfig()),
        autoprefixer(),
      ]).process(raw, { from: args.path, to: args.path })
      const css = processed.css
      const contents = [
        `const css = ${JSON.stringify(css)};`,
        'if (typeof document !== "undefined") {',
        `  const el = document.createElement("style");`,
        `  el.setAttribute("data-${PLUGIN_ID}", "");`,
        '  el.appendChild(document.createTextNode(css));',
        '  document.head.appendChild(el);',
        '}',
        'module.exports = css;',
      ].join('\n')
      return { contents, loader: 'js' }
    })
  },
}

/* ------------------------------------------------------------------ */
/* 浏览器半边                                                          */
/* ------------------------------------------------------------------ */

const clientResult = await build({
  bundle: true,
  format: 'cjs',
  platform: 'browser',
  target: 'es2020',
  entryPoints: [join(root, 'src/client/index.jsx')],
  jsx: 'automatic',
  loader: { '.js': 'jsx' },
  // 宿主 ModuleLoader 注册表提供（单实例 React，勿打进 bundle）：
  external: [
    'react',
    'react/jsx-runtime',
    'react-dom',
    'react-dom/client',
    '@deepseek-ai/dsh-client-ui-primitives',
  ],
  plugins: [cssInjectPlugin],
  define: { 'process.env.NODE_ENV': '"production"' },
  // write:false 下 esbuild 会把 sourcemap 内联成 data-URI（体积 ~6 倍），源码随仓库分发，不打 map。
  minify: true,
  write: false,
  logLevel: 'info',
})

for (const out of clientResult.outputFiles) {
  if (out.path !== '<stdout>' && !out.path.endsWith('.js')) continue
  // module/exports 必须在 factory 内声明：esbuild 的 CJS 产物引用裸 module.exports，
  // 放到外层就是浏览器端 "module is not defined"。
  const wrapped = [
    'window.__ModuleLoader__.load({',
    `  id: ${JSON.stringify(PLUGIN_ID)},`,
    '  factory: (require) => {',
    '    var module = { exports: {} }; var exports = module.exports;',
    out.text,
    '    return module.exports;',
    '  },',
    '});',
    '',
  ].join('\n')
  writeFileSync(join(lib, 'client.js'), wrapped, 'utf8')
  console.log(`lib/client.js ${(Buffer.byteLength(wrapped) / 1024).toFixed(0)} KB`)
}

console.log(clientOnly ? '完成：lib/client.js' : '完成：lib/index.js、lib/client.js')
