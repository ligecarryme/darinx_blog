import Vue from 'vue'
import axios from 'axios'
import Vueaxios from 'vue-axios'

// axios全局默认
axios.defaults.baseURL = "http://localhost:8079/admin";
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
// axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.withCredentials = true;

// const instance = axios.create({
//     baseURL: 'http://localhost:8079/admin',
//     timeout: 12000,
//     headers: {
//         'X-Requested-With': 'XMLHttpRequest',
//         'Content-Type': 'application/json'
//     }
// })

Vue.prototype.$axios = axios
Vue.use(axios,Vueaxios)
