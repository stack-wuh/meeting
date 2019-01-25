import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import qs from 'qs'
import '@/utils/vant'
import axios from 'axios'

Vue.config.productionTip = false

window.$router = router

const userInfo = window.localStorage.getItem('userInfo') && JSON.parse(window.localStorage.getItem('userInfo'))

// router.beforeEach((to, from, next) => {
//   if(to.name !== 'login'){
//     let data = {
//       phone: store.state.phone || userInfo && userInfo.phone
//     }
//     axios({
//       method: 'post',
//       url: window.rootPath + '/index/checkLogin.do',
//       data: qs.stringify(data)
//     }).then(res => {
//       let exprie = +new Date() - (res.data.data - 0) > 0 ? false : true
//       if(exprie && res.data.status == 0){
//         next()
//       }else{
//         router.push({path: '/login'})
//       }
//     })
//   }
//   next()
// })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
