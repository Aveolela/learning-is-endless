module.exports = {
  title: '学无止境',
  description: '前端学习笔记',
  theme: 'reco',
  locales: {
    '/': {
      lang: 'zh-CN',
    }
  },
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      {
        text: '刘亚辉的博客',
        items: [
          { text: 'GitHub', link: '/' },
          { text: '掘金', link: '/' }
        ]
      }
    ],
    sidebar: [
      { title: '前言', path: '/', collapsable: false },
      { title: 'Node', path: '/', collapsable: false },
      { title: 'Webpack', path: '/', collapsable: false },
      {
        title: 'JavaScript',
        path: '/',
        collapsable: false,
        children: [
          { title: 'this', path: '/javascript/this' },
          { title: '原型链', path: '/javascript/原型链' },
          { title: '闭包', path: '/javascript/闭包' },
          { title: '数据类型', path: '/javascript/数据类型' },
        ]
      },
      { title: 'TypeScript', path: '/', collapsable: false },
      { title: '浏览器', path: '/', collapsable: false },
      { title: '计算机网络', path: '/', collapsable: false },
    ]
  }
}