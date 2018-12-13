import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/utils/vant'

import {
  _signIn
} from '@/api/signin.api.js'

Vue.config.productionTip = false

window.$router = router

const userInfo = window.localStorage.getItem('userInfo') && JSON.parse(window.localStorage.getItem('userInfo'))
const exprie = userInfo && userInfo.exprie - new Date().getTime() > 0 ? true : false
const canGo = false
router.beforeEach((to, from, next) => {
  if(to.name !== 'login'){
    if(exprie){
      next()
    }else{
      next('/login')
    }
  }
  next()
  // if(to.name !== 'login'){
  //   if(exprie == false){
  //     router.push({name: 'login'})
  //   }else {
  //     next()
  //   }
  // }else {
  //   next()
  // }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
