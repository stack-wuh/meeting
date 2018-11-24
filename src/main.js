import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/utils/vant'

Vue.config.productionTip = false

window.$router = router


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')