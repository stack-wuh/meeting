import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/utils/vant'
import axios from 'axios'

Vue.config.productionTip = false

window.$router = router

const userInfo = window.localStorage.getItem('userInfo') && JSON.parse(window.localStorage.getItem('userInfo'))
const exprie = userInfo && userInfo.exprie - new Date().getTime() > 0 ? true : false
router.beforeEach((to, from, next) => {
  if(to.name !== 'login'){
    axios.post(rootPath + '/index/checkLogin.do').then(res => {
      let exprie = +new Date() - 1544695200000 > 0 ? false : true
      if(exprie){
          next()
      }else{
        router.push({path: '/login'})
      }
    })
  }
  next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
