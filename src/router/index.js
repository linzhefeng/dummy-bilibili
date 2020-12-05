import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/Home.vue')
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('@/views/register.vue')
    },
    {
        path: '/login',
        component: () => import('../views/Login.vue')
    },
    {
        path: '/userinfo',
        name: 'UserInfo',
        component: () => import('../views/UserInfo.vue'),
        meta: {
            isToken: true
        }
    },
    {
        path: '/edit',
        name: 'Edit',
        component: () => import('../views/Edit.vue'),
        meta: {
            isToken: true
        }
    },
    {
        path: '/article/:id',
        name: 'Article',
        component: () => import('../views/Article.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    if (
        !localStorage.getItem('token') &&
        !localStorage.getItem('id') &&
        to.meta.isToken
    ) {
        router.push('/login')
        Vue.prototype.$msg.fail('请先登录')
    }
    next()
})

export default router
