import {
  signIn,
  getIdentifyCode,
  getIndexInfo
} from '@/api/signin.api.js'

import {
  validPhone
} from '@/utils/vaild'

const state = {

}

const mutations = {

}

const actions = {
  /**
   * 登录事件
   * [handleSignIn description]
   * @param  {[type]}  content  [description]
   * @param  {[type]}  phone    [手机号]
   * @param  {[type]}  identify [验证码]
   * @return {Promise}          [description]
   */
  async handleSignIn(context, {
    phone,
    identify
  }) {
    try {
      const res = await signIn({
        phone,
        identify
      })
      setTimeout(() => {
        res.status === 0 && window.$router.push({
          path: 'index'
        })
      }, 1000)
    } catch (err) {
      throw new Error(err)
    }
  },

  /**
   * [handleIdentifyCode description] 根据手机号获取验证码
   * @param  {[type]}  context [vuex对象]
   * @param  {[type]}  phone   [手机号]
   * @return {Promise}         [description]
   */
  async handleIdentifyCode(context, {
    phone
  }) {
    try {
      if (!validPhone(phone)) return
      const response = await getIdentifyCode({
        phone
      })
      document.cookie = `JSESSIONID = ${response.data.sessionId}`
      return response
    } catch (err) {
      throw new Error(err)
    }
  },

  async handleIndexInfo() {
    try {
      const response = await getIndexInfo()
      return response
    } catch (err) {
      throw new Error(err)
    }
  }
}

const getters = {

}

export default {
  state,
  mutations,
  actions,
  getters
}