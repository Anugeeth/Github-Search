import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'


// axios global configuration

const http = axios.create({
  baseURL: 'https://api.github.com/',
  headers: {
      'Content-Type': 'application/json',
  }
})


Vue.config.productionTip = false
Vue.prototype.$axios = http

new Vue({
  router,axios,
  render: h => h(App)
}).$mount('#app')