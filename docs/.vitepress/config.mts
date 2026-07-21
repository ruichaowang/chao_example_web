import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: 'Chao Docs',
  description: 'Chao 的第一个 Markdown 文档网站',

  // GitHub Pages 项目站点地址会是：
  // https://<用户名>.github.io/chao_example_web/
  base: '/chao_example_web/',

  head: [
    ['meta', { name: 'theme-color', content: '#ffffff' }]
  ],

  themeConfig: {
    nav: [{ text: '首页', link: '/' }],
    sidebar: false,
    outline: false,
    darkModeSwitchLabel: '切换主题',
    returnToTopLabel: '返回顶部',
    sidebarMenuLabel: '菜单'
  }
})
