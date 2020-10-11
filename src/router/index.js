import Vue from 'vue'
import Router from 'vue-router'

import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'

import BlogList from '../components/blog/blogList.vue'
import BlogPublish from '../components/blog/blogPublish.vue'

import ClassifyList from '../components/classify/ClassifyList.vue'
import ClassifyAdd from '../components/classify/ClassifyAdd.vue'

import LabelList from '../components/label/LabelList.vue'
import LabelAdd from '../components/label/LabelAdd.vue'

Vue.use(Router)

const router = new Router({
    routes: [
        { path: '/', redirect: '/login' },
        { path: '/login', component: Login },
        {
            path: '/home',
            component: Home,
            redirect: '/welcome',
            children: [
                { path: '/welcome', component: Welcome,name:'welcome',meta:{mountMenu:'blog'} },
                { path: '/bloglist', component: BlogList, name: 'bloglist' ,meta:{mountMenu:'blog'}},
                { path: '/blogpublish', component: BlogPublish, name: 'blogpublish' ,meta:{mountMenu:'blog'}},
                { path: '/classifylist', component: ClassifyList,name: 'classifylist' ,meta:{mountMenu:'classify'}},
                { path: '/classifyadd', component: ClassifyAdd, name: 'classifyadd' ,meta:{mountMenu:'classify'}},
                { path: '/labellist', component: LabelList ,name: 'labellist' ,meta:{mountMenu:'label'}},
                { path: '/labeladd', component: LabelAdd ,name: 'labeladd' ,meta:{mountMenu:'label'}}
            ]
        },
        {
            path:'*', redirect:'/'
        }
    ]
})

// 路由导航守卫
router.beforeEach((to, from, next) => {
    if (to.path === '/login') return next();
    let token = localStorage.getItem('Authorization');
    if (!token) return next('/login');
    next();
})

export default router