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
    axios({
      method: 'post',
      url: window.rootPath + 'index/checkLogin.do',
      data: {
        phone: userInfo.phone
      }
    }).then(res => {
      let exprie = +new Date() - res.data > 0 ? false : true
      if(exprie && res.status == 0){
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
