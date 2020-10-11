import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/globel.css'

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

import store from './store'
import service from './utils/request.js'

Vue.config.productionTip = false
Vue.prototype.$axios = service

Vue.use(Element)
Vue.use(mavonEditor)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
