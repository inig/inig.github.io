import Vue from 'vue'
import Router from 'vue-router'
import { routerAuth } from './authRoutes'
import { routerConverter } from './converterRoutes'

const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch((err) => err)
}

const originalReplace = Router.prototype.replace
Router.prototype.replace = function replace (location) {
  return originalReplace.call(this, location).catch((err) => err)
}

Vue.use(Router)

export const HomeRoutes = {
  path: '/',
  name: 'index',
  meta: {
    title: 'BDP'
  },
  components: {
    HomeRouter: () => import('../views/Home.vue'),
  },
  children: [
    ...routerAuth.children,
    ...routerConverter.children,
  ],
}

// export const routerLogin = {
//   path: '/login',
//   name: 'Login',
//   meta: {
//     title: '登录',
//     needAuthorize: false,
//     needLogin: false,
//   },
//   components: {
//     HomeRouter: () => import('../components/views/Login'),
//   },
// }

// export const routerNotAllowed = {
//   path: '/not-allowed',
//   name: 'NotAllowed',
//   meta: {
//     title: '页面未授权',
//     needAuthorize: false,
//     needLogin: false,
//   },
//   components: {
//     HomeRouter: () => import('../components/views/NotAllowed'),
//   },
// }

// export const routerInaccess = {
//   path: '/inaccess',
//   name: 'Inaccess',
//   meta: {
//     title: '页面维护中',
//     needAuthorize: false,
//     needLogin: false,
//   },
//   components: {
//     HomeRouter: () => import('../components/views/Inaccess'),
//   },
// }

// export const routerJsonPreviewer = {
//   path: '/json-previewer',
//   name: 'JsonPreviewer',
//   meta: {
//     title: 'Json预览',
//     needAuthorize: false,
//     needLogin: false,
//   },
//   components: {
//     HomeRouter: () => import('../components/views/Json'),
//   },
// }

// export const routerNotFound = {
//   path: '/*',
//   name: 'NotFound',
//   meta: {
//     title: '页面未找到',
//     needAuthorize: false,
//     needLogin: false,
//   },
//   components: {
//     HomeRouter: () => import('../components/views/NotFound'),
//   },
// }

export default new Router({
  mode: 'history',
  routes: [
    HomeRoutes
  ],
})
