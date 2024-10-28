import { defineConfig } from 'vitepress'

import { fileURLToPath } from 'node:url'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'gsap zh doc',
  description: 'test',
  // 在 github page中，一定要添加这个，否则静态目录路径都是错的，都是相对于根目录
  base: '/gsap-zh-doc',
  vite: {
    server: {
      host: true
    }
  },

  lang: 'zh-CN',

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      {
        text: 'Tools 工具',
        link: '/docs/tools'
      },
      {
        text: '文档',
        link: '/docs/docs/index'
      }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/luoriwusheng-xia/gsap-zh-doc'
      }
    ],
    search: {
      provider: 'local'
    },

    outline: 'deep',
    lastUpdated: {
      text: '最新更新时间：'
    }
  },
  // 打包输出目录， 默认是 .vitepress/dist
  outDir: fileURLToPath(new URL('../dist', import.meta.url))
})
