export const routerConverter = {
  label: '转换器',
  name: 'converter',
  path: '/converter',
  icon: 'https://static.dei2.com/images/bdp/menu_auth.png',
  children: [
    {
      path: '/converter/image',
      name: 'image-converter',
      label: '图片转换器',
      meta: {
        title: '图片转换器',
        needAuthorize: true
      },
      components: {
        ContentRouter: () => import('../tools/converter/image/index')
      }
    },
    // {
    //   path: '/auth/router',
    //   name: 'router',
    //   label: '路由管理',
    //   meta: {
    //     title: '路由管理',
    //     needAuthorize: true
    //   },
    //   components: {
    //     ContentRouter: () => import('../components/pages/auth/Router')
    //   }
    // }
  ]
}

export const converterRoutes = [
  routerConverter
]
