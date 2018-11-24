import Vue from 'vue'
import Vuex from 'vuex'

import Index from '@/vuex/index'
import Common from '@/vuex/modules/common'
import Sign from '@/vuex/modules/sign'

Vue.use(Vuex)



export default new Vuex.Store({
  ...Index,
  modules: {
    Common,
    Sign
  }
})