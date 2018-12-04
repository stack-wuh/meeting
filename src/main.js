import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/utils/vant'

Vue.config.productionTip = false

window.$router = router

router.beforeEach((to, from, next) => {
  const userInfo = window.localStorage.getItem('userInfo') ? true : false
  const name = to.name
  if(name === 'login') next()
  if(name !== 'login'){
    if(userInfo){
      next()
    }else{
      next({
        name: 'login'
      })
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
