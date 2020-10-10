import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import mixins from './mixins'
import VueI18n from 'vue-i18n'
import 'github-markdown-css'
import 'view-design/dist/styles/iview.css'

Vue.use(VueI18n)

const messages = {
  "en": {
    "ok": "ok",
    "cancel": "cancel",
    "width": "width",
    "height": "height"
  },
  "cn": {
    "ok": "确定",
    "cancel": "取消",
    "width": "宽",
    "height": "高"
  }
}

const i18n = new VueI18n({
  locale: store.state.language,
  messages
})

Vue.config.productionTip = false
Vue.mixin(mixins)
new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
