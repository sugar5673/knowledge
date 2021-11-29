module.exports = {
    title: 'Summer',
    description: '相关知识点的记录',
    head: [ // 注入到当前页面的 HTML <head> 中的标签
        ['link', { rel: 'icon', href: '/logo.jpg' }], // 增加一个自定义的 favicon(网页标签的图标)
        ['link', { rel: 'manifest', href: '/photo.jpg' }],
        ['link', { rel: 'apple-touch-icon', href: '/photo.jpg' }],
    ],
    base: '/', // 这是部署到github相关的配置
    serviceWorker: true, // 是否开启 PWA
    markdown: {
        lineNumbers: false // 代码块显示行号
    },
    themeConfig: {
      nav:[ // 导航栏配置
        {text: '基础知识', link: '/accumulate/' },
        {text: '题库', link: '/algorithm/'},   
      ],
      sidebar: 'auto', // 侧边栏配置
      sidebarDepth: 2, // 侧边栏显示2级
    }
};