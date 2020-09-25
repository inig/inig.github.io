import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import mixins from './mixins'
import 'github-markdown-css'
import 'view-design/dist/styles/iview.css'

Vue.config.productionTip = false
Vue.mixin(mixins)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
