import Vue from 'vue'
import App from './App'
import v2gogoConfig from './common/v2gogoConfig'
console.log('%c 🍿 v2gogoConfig: ', 'font-size:20px;background-color: #4b4b4b;color:#fff;', v2gogoConfig);

import './common/v2gogo'
import './assets/css/base.css'

import * as filters from './filters' // global filters


Vue.config.productionTip = false
// 全局方法
Vue.prototype.$v2gogo = v2gogoH5;
Vue.prototype.config = v2gogoConfig;
App.mpType = 'app'

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

const app = new Vue({
  ...App
})
app.$mount()
