/**
 * @Author liujie22
 * @Date 2020-07-14 09:42:50
 * @Desc 
 */
module.exports = {
  title: 'QiCheng',
  description: '我的个人网站',
  head: [ // 注入到当前页面的 HTML <head> 中的标签
    ['link', { rel: 'icon', href: '../vuepress/log.gif' }], // 增加一个自定义的 favicon(网页标签的图标)
  ],
  base: '/', // 这是部署到github相关的配置
  markdown: {
    lineNumbers: false // 代码块显示行号
  },
  themeConfig: {
    nav: [ // 导航栏配置
      {
        text: '知识梳理',
        link: "/KnowledgeComb/vue"
      },
      {
        text: '学习记录',
        items: [
          {
            text: "2020",
            link: "/record/2020/first"
          }
        ]
      },
      {
        text: '思考备录',
        items: [
          {
            text: "2020",
            link: "/thinking/2020/first"
          }
        ]
      },
      {
        text: '知识小结',
        items: [
          {
            text: "2020",
            link: "/conclusion/2020/将base64转换为文件对象"
          }
        ]
      },
      {
        text: '联系我',
        link: "https://github.com/liujie1991/myBlog/issues"
      },
    ],
    sidebar: {
      '/KnowledgeComb/': [
        'vue',
        'js',
        'html',
        'css',
      ],
      '/conclusion/2020/': [
        '将base64转换为文件对象',
        'Popover 弹出框用法总结'
      ],
      '/record/2020/': [
        'first'
      ],
      '/thinking/2020/': [
        'first'
      ]
    }, // 侧边栏配置
    markdown: {
      extendMarkdown: md => {
        md.use(require('markdown-it-task-lists'))
      }
    },
    plugins: ['code-box'],
    sidebarDepth: 1, // 侧边栏显示1级
  }
};