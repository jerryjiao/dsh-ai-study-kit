#!/usr/bin/env node
/**
 * 拍官网用的学习台截图（1440×900、dpr 2、zh-CN、浅色/深色各一套）。
 *
 * 前置条件（缺一不可，脚本自己不会去启宿主）：
 *   1. 用「隔离的」DSH_HOME 起一个宿主，插件已装进那个 profile：
 *        cd <演示学习项目> && DSH_HOME=/tmp/dsh-demo/home dsh web --no-open --port 0
 *      cwd 必须是演示项目本身——宿主的项目探测顺序是 记住的 → cwd → ~/study-kit，
 *      cwd 不是学习项目时可能回落到真实用户目录，把演示进度写进人家家里。
 *   2. 演示项目里的 examples/<theme>/ 用虚构内容（本仓库 kit/examples/dev-intro 即可），
 *      progress.json 先种几条答案，首页统计才不是 0。
 *
 * 用法：
 *   node scripts/screenshots/capture.mjs --url 'http://127.0.0.1:PORT/?token=...'
 *   DSH_DEMO_URL='http://…' node scripts/screenshots/capture.mjs --out /tmp/shots
 *
 * 产出：<out>/{home,practice,flashcards,panorama,dark}.png
 */
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const argv = process.argv.slice(2);
const arg = (name, fallback) => {
  const i = argv.indexOf(`--${name}`);
  return i >= 0 && argv[i + 1] ? argv[i + 1] : fallback;
};
const url = arg('url', process.env.DSH_DEMO_URL || '');
const out = arg('out', path.resolve('website/public/screenshots'));
if (!url) {
  console.error('缺少 --url（或 DSH_DEMO_URL）：需要已在隔离 profile 里跑起来的宿主 URL');
  process.exit(1);
}
fs.mkdirSync(out, { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
  locale: 'zh-CN',
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

// 新 profile 首屏有「开始使用」引导（隔离环境没有模型配置），它的 mask 会挡住侧栏点击。
// 引导是宿主的，不属于学习台；这里只把它从 DOM 里摘掉，再兜一层「mask 不吃指针」的样式，
// 免得它在异步渲染后又挂回来把后面的点击吃掉。
const dismissOnboarding = async () => {
  for (let i = 0; i < 4; i += 1) {
    await page.keyboard.press('Escape');
    await page.waitForTimeout(200);
    const removed = await page.evaluate(() => {
      let n = 0;
      document.querySelectorAll('[role="presentation"]').forEach((node) => {
        if (node.querySelector('[role="dialog"]')) {
          node.remove();
          n += 1;
        }
      });
      document.querySelectorAll('[role="dialog"]').forEach((node) => {
        if (node.getAttribute('aria-label') === '开始使用') node.remove();
      });
      return n;
    });
    await page.addStyleTag({
      content: '[class*="_mask_"]{pointer-events:none !important}',
    }).catch(() => {});
    if (!removed) break;
    await page.waitForTimeout(200);
  }
};

await page.goto(url, { waitUntil: 'networkidle' });
await page.waitForTimeout(900);
await dismissOnboarding();

// 侧栏 → 学习台面板
await page.getByText('学习台', { exact: true }).first().click({ force: true });
await page.waitForTimeout(1800);

await shot('home');

// 深色：等主题变量切完再拍（切换有过渡，拍早了会拍到亮色残留）
await page.getByTitle('深色').first().click();
await page.waitForTimeout(1100);
await shot('dark');
await page.getByTitle('浅色').first().click();
await page.waitForTimeout(600);

// 答题：进「答题」→ 点第一个主题 → 选一个选项 → 提交，拍「揭晓 + 解析」态
await page.getByText('答题', { exact: true }).first().click();
await page.waitForTimeout(1000);
const firstTheme = page.getByText('Git 基础').first();
if (await firstTheme.count()) {
  await firstTheme.click();
  await page.waitForTimeout(1200);
}
const optionIndex = Number(arg('option', '2'));
const options = page.locator('.dsh-study-root label');
if (await options.count()) {
  await options.nth(Math.min(optionIndex, (await options.count()) - 1)).click();
  await page.waitForTimeout(300);
  await page.getByText('提交答案').first().click();
  await page.waitForTimeout(1200);
}
await shot('practice');

// 闪卡：开始今日复习 → 翻面（露出答案与四级评分）
await page.getByText('闪卡', { exact: true }).first().click();
await page.waitForTimeout(1000);
const startReview = page.getByText(/开始今日复习/).first();
if (await startReview.count()) {
  await startReview.click();
  await page.waitForTimeout(1200);
}
const reveal = page.getByText(/显示答案/).first();
if (await reveal.count()) {
  await reveal.click();
  await page.waitForTimeout(900);
}
await shot('flashcards');

// 全景
await page.getByText('全景', { exact: true }).first().click();
await page.waitForTimeout(1400);
await shot('panorama');

await browser.close();
if (errors.length) {
  console.error('页面报错：', errors);
  process.exit(2);
}
console.log('完成：', out);
