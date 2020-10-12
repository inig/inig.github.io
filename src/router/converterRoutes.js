export const routerConverter = {
  label: '转换器',
  enLabel: 'Converter',
  name: 'converter',
  path: '/converter',
  icon: 'https://static.dei2.com/images/bdp/menu_auth.png',
  children: [
    {
      path: '/converter/image',
      name: 'image-converter',
      label: '图片格式转换',
      enLabel: 'Image Converter',
      meta: {
        title: '图片格式转换',
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
