// import Vue from 'vue'
import axios from 'axios'

// axios全局默认
// axios.defaults.baseURL = "http://localhost:8079/admin";
// axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
// axios.defaults.headers.post['Content-Type'] = 'application/json';
// axios.defaults.withCredentials = true;

// Vue.prototype.$axios = axios
// Vue.use(axios)

const service = axios.create({
    baseURL: 'http://47.102.214.242:8079/admin',
    timeout: 12000,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    }
})

service.interceptors.request.use(
    config => {
        if (localStorage.getItem('Authorization')){
            config.headers.token = localStorage.getItem('Authorization');
        }
        return config;   
    },
    error => {
        return Promise.reject(error);
    }
)

export default service

