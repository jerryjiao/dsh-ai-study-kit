// @ts-check
import { defineConfig } from 'astro/config';

// GitHub Pages 项目站：https://jerryjiao.github.io/dsh-ai-study-kit/
// base 是项目站子路径；页面内站内链接与静态资源一律走 import.meta.env.BASE_URL。
export default defineConfig({
  site: 'https://jerryjiao.github.io',
  base: '/dsh-ai-study-kit/',
});
