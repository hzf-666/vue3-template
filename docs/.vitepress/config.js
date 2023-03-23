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
    outline: 'deep',
    outlineTitle: '页面内容',
    nav: [
      { text: '首页', link: '/' },
      { text: '文档', link: '/start' },
    ],

    sidebar: [
      {
        text: '文档',
        items: [
          { text: '起步', link: '/start' },
          { text: '目录结构', link: '/directory' },
          { text: '配置文件说明', link: '/config' },
          { text: '其他文件说明', link: '/other' },
          {
            text: 'src 文件夹',
            link: '/http',
            collapsed: true,
            items: [
              { text: 'http封装', link: '/http' },
              { text: 'api管理', link: '/api' },
              { text: '静态资源管理', link: '/assets' },
              { text: '通用组件管理', link: '/components' },
              { text: '全局指令管理', link: '/directives' },
              { text: '全局hook管理', link: '/hooks' },
              { text: '项目插件管理', link: '/plugins' },
              { text: '路由管理', link: '/router' },
              { text: '项目样式管理', link: '/scss' },
              { text: '项目store管理', link: '/store' },
              { text: '工具函数管理', link: '/utils' },
              { text: '页面组件管理', link: '/views' },
            ],
          },
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
