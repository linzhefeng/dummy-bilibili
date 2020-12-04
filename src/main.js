import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/vant.js'
import http from '../http'
import './assets/font_id55vp0i2u/iconfont.css'

Vue.config.productionTip = false

Vue.prototype.$http = http

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
