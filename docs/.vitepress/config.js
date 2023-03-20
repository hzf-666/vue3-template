import { defineConfig } from 'vitepress';

export default defineConfig({ // https://vitepress.dev/reference/site-config
  base: '/docs/',
  lang: 'zh-CN',
  title: 'vue3 项目模板使用文档',
  titleTemplate: 'vue3-template',
  description: 'A VitePress Site',
  srcDir: './pages',
  srcExclude: ['**/README.md'],
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: 'vite.svg' }],
  ],

  themeConfig: { // https://vitepress.dev/reference/default-theme-config
    logo: '/vite.svg',
    siteTitle: 'vue3-template',
    outline: 2,
    outlineTitle: '大纲',
    nav: [
      { text: '首页', link: '/' },
      { text: '文档', link: '/getting-started' },
    ],

    sidebar: [
      {
        text: '文档',
        items: [
          { text: '起步', link: '/getting-started' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/hzf-666/vue3-template' },
    ],

    docFooter: {
      prev: '上一页',
      next: '下一页',
    },

    footer: {
      message: 'Released under the <a href="https://opensource.org/licenses/MIT" target="_blank" style="color: var(--vp-c-brand); text-decoration: underline;">MIT License</a>.',
      copyright: 'Copyright © 2023-present <a href="https://github.com/hzf-666" target="_blank" style="color: var(--vp-c-brand); text-decoration: underline;">hzf-666</a>',
    },
  },
});
