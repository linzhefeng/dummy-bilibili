import Vue from 'vue'
import Vant, { Toast } from 'vant'
import 'vant/lib/index.css'

Vue.prototype.$msg = Toast

Vue.use(Vant)
