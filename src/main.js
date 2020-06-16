import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import http from '@/http/httpRequest.js'
//引入elememtui
import ElementUI from 'element-ui'
//引入样式
import 'element-ui/lib/theme-chalk/index.css'
import i18n from '@/i18n/index'

// 声明使用 element-ui
Vue.use(ElementUI)

Vue.config.productionTip = false
//全局挂载 http（axios),使用时直接使用this.$http 即可
Vue.prototype.$http = http

//非生产环境，适配mockjs模拟数据
if (process.env.NODE_ENV !== 'production') {
  require('@/mock')
}

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
