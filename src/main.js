import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/globel.css'

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

import './utils/request.js'

Vue.config.productionTip = false
Vue.use(Element)
Vue.use(mavonEditor)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
