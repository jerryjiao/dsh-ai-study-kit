#!/usr/bin/env node
/**
 * 拍官网用的学习台截图（1440×900、dpr 2、浅色/深色各一套，中英各一套）。
 *
 * 前置条件（缺一不可，脚本自己不会去启宿主）：
 *   1. 用「隔离的」DSH_HOME 起一个宿主，插件已装进那个 profile：
 *        cd <演示学习项目> && DSH_HOME=/tmp/dsh-demo/home dsh web --no-open --port 0
 *      cwd 必须是演示项目本身——宿主的项目探测顺序是 记住的 → cwd → ~/study-kit，
 *      cwd 不是学习项目时可能回落到真实用户目录，把演示进度写进人家家里。
 *   2. 演示项目里的 examples/<theme>/ 用虚构内容（中文套用本仓库 kit/examples/dev-intro；
 *      英文套用等价的英文虚构项目），progress.json 先种几条答案，首页统计才不是 0。
 *
 * 用法：
 *   node scripts/screenshots/capture.mjs --url 'http://127.0.0.1:PORT/?token=...'
 *   node scripts/screenshots/capture.mjs --url '…' --lang en      # 英文 UI，产物落 screenshots/en/
 *   DSH_DEMO_URL='http://…' node scripts/screenshots/capture.mjs --out /tmp/shots
 *
 * 产出：<out>/{home,practice,flashcards,panorama,dark}.png
 *   --lang zh（默认）→ 默认 <out> = website/public/screenshots
 *   --lang en        → 默认 <out> = website/public/screenshots/en
 */
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const argv = process.argv.slice(2);
const arg = (name, fallback) => {
  const i = argv.indexOf(`--${name}`);
  return i >= 0 && argv[i + 1] ? argv[i + 1] : fallback;
};
const lang = arg('lang', 'zh') === 'en' ? 'en' : 'zh';
const url = arg('url', process.env.DSH_DEMO_URL || '');
const out = arg(
  'out',
  path.resolve('website/public/screenshots', lang === 'en' ? 'en' : ''),
);
if (!url) {
  console.error('缺少 --url（或 DSH_DEMO_URL）：需要已在隔离 profile 里跑起来的宿主 URL');
  process.exit(1);
}
fs.mkdirSync(out, { recursive: true });

/** 界面文案：宿主侧栏与学习台内部的按钮/标签（学习台切到英文后这两层都是英文）。 */
const UI = {
  zh: {
    locale: 'zh-CN',
    sidebar: '学习台',
    dark: '深色',
    light: '浅色',
    tabs: { practice: '答题', cards: '闪卡', panorama: '全景' },
    firstTheme: 'Git 基础',
    submit: '提交答案',
    startReview: /开始今日复习/,
    reveal: /显示答案/,
    switchLangTitle: '中文', // 已在英文时，按钮标题是「中文」
  },
  en: {
    locale: 'en-US',
    sidebar: 'Study Desk',
    dark: 'Dark',
    light: 'Light',
    tabs: { practice: 'Practice', cards: 'Cards', panorama: 'Panorama' },
    firstTheme: 'Git basics',
    submit: 'Submit',
    startReview: /Start today/,
    reveal: /Show answer/,
    switchLangTitle: 'English', // 中文界面里，按钮标题是「English」
  },
}[lang];

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
  locale: UI.locale,
  timezoneId: 'Asia/Shanghai',
  colorScheme: 'light',
});
const page = await ctx.newPage();
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));

const shot = async (name) => {
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(out, `${name}.png`) });
  console.log('已拍', name);
};

// 新 profile 首屏有引导弹窗（「预览提示」/「Preview Notice」，隔离环境没有模型配置），
// 它的遮罩会挡住侧栏点击。引导是宿主的，不属于学习台：先点它自己的确认钮正常关掉
// （点了就不再回来），再兜一层「遮罩不吃指针」的样式，免得它在异步渲染后又挂回来。
const dismissOnboarding = async () => {
  for (let i = 0; i < 4; i += 1) {
    const dialog = page.locator('[role="dialog"]').first();
    if (!(await dialog.count())) break;
    const confirm = dialog
      .locator('button')
      .filter({ hasText: /Continue|开始使用|继续|知道了|Got it/ })
      .first();
    if (await confirm.count()) {
      await confirm.click({ force: true }).catch(() => {});
    } else {
      await page.keyboard.press('Escape');
    }
    await page.waitForTimeout(400);
    // 兜底：还赖在 DOM 里的弹窗直接摘掉。
    const left = await page.evaluate(() => {
      let n = 0;
      document.querySelectorAll('[role="presentation"]').forEach((node) => {
        if (node.querySelector('[role="dialog"]')) {
          node.remove();
          n += 1;
        }
      });
      return n;
    });
    await page.addStyleTag({
      content: '[class*="_mask_"]{pointer-events:none !important}',
    }).catch(() => {});
    // 点过确认钮后弹窗应已消失；仍有残留说明这轮没关掉，再试一次。
    if (!left && !(await page.locator('[role="dialog"]').count())) break;
    await page.waitForTimeout(300);
  }
};

await page.goto(url, { waitUntil: 'networkidle' });
await page.waitForTimeout(900);
await dismissOnboarding();

// 侧栏 → 学习台面板
const entry = page.getByText(UI.sidebar, { exact: true }).first();
await entry.click({ timeout: 8000 }).catch(() => entry.click({ force: true }));
await page.waitForTimeout(1800);

// 学习台内部语言来自 progress.settings.lang（不跟宿主 locale 走）：目标语言不是当前语言时，
// 点顶栏那个语言钮切过去。按钮标题是「要切去的语言」，所以按目标语言的标题找。
const langButton = page.getByTitle(UI.switchLangTitle).first();
if (await langButton.count()) {
  await langButton.click();
  await page.waitForTimeout(1200);
}
await shot('home');

// 深色：等主题变量切完再拍（切换有过渡，拍早了会拍到亮色残留）
await page.getByTitle(UI.dark).first().click();
await page.waitForTimeout(1100);
await shot('dark');
await page.getByTitle(UI.light).first().click();
await page.waitForTimeout(600);

// 答题：进「答题」→ 点第一个主题 → 选一个选项 → 提交，拍「揭晓 + 解析」态
await page.getByText(UI.tabs.practice, { exact: true }).first().click();
await page.waitForTimeout(1000);
const firstTheme = page.getByText(UI.firstTheme).first();
if (await firstTheme.count()) {
  await firstTheme.click();
  await page.waitForTimeout(1200);
}
const optionIndex = Number(arg('option', '2'));
const options = page.locator('.dsh-study-root label');
if (await options.count()) {
  await options.nth(Math.min(optionIndex, (await options.count()) - 1)).click();
  await page.waitForTimeout(300);
  await page.getByText(UI.submit).first().click();
  await page.waitForTimeout(1200);
}
await shot('practice');

// 闪卡：开始今日复习 → 翻面（露出答案与四级评分）
await page.getByText(UI.tabs.cards, { exact: true }).first().click();
await page.waitForTimeout(1000);
const startReview = page.getByText(UI.startReview).first();
if (await startReview.count()) {
  await startReview.click();
  await page.waitForTimeout(1200);
}
const reveal = page.getByText(UI.reveal).first();
if (await reveal.count()) {
  await reveal.click();
  await page.waitForTimeout(900);
}
await shot('flashcards');

// 全景
await page.getByText(UI.tabs.panorama, { exact: true }).first().click();
await page.waitForTimeout(1400);
await shot('panorama');

await browser.close();
if (errors.length) {
  console.error('页面报错：', errors);
  process.exit(2);
}
console.log('完成：', out);
