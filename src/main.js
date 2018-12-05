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

router.beforeEach((to, from, next) => {
  let userInfo = window.localStorage.getItem('userInfo')
    userInfo = userInfo && JSON.parse(userInfo)
  const exprie = userInfo && userInfo.exprie - new Date().getTime() > 0 ? true : false
  const name = to.name
  if(name !== 'login'){
    console.log(exprie)
    if(exprie){
      _signIn({phone: userInfo.phone}).then(res => {
        window.localStorage.setItem('userInfo', JSON.stringify({...res.data, exprie: +new Date() + (60 * 60 * 4 * 1000)}))
      })
      next()
    }else {
      router.push({path: '/login'})
    }
  }
  next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
