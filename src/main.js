import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLogger from 'vuejs-logger'
import '@babel/polyfill'

const options = {
    isEnabled: true,
    logLevel : 'debug',
    stringifyArguments : false,
    showLogLevel : false,
    showMethodName : false,
    separator: '|',
    showConsoleColors: false
}

Vue.use(VueLogger, options)
//TODO 为什么Vue.use 失效
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
