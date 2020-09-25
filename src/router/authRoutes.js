export const routerAuth = {
  label: '权限管理',
  name: 'auth',
  path: '/auth',
  icon: 'https://static.dei2.com/images/bdp/menu_auth.png',
  children: [
    // {
    //   path: '/auth/user',
    //   name: 'user',
    //   label: '用户管理',
    //   meta: {
    //     title: '用户管理',
    //     needAuthorize: true
    //   },
    //   components: {
    //     ContentRouter: () => import('../components/pages/auth/User')
    //   }
    // },
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

export const authRoutes = [
  routerAuth
]
