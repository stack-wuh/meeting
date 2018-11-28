import {
  signIn,
  getIdentifyCode,
  getIndexInfo,
  vliadVote
} from '@/api/signin.api.js'


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
      window.localStorage.setItem('userInfo', JSON.stringify(res.data))
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
      const response = await getIdentifyCode({
        phone
      })
      document.cookie = `JSESSIONID = ${response.data.sessionId}`
      return response
    } catch (err) {
      throw new Error(err)
    }
  },

  /**
   * [handleIndexInfo 获取首页的详情]
   * @return {Promise} [description]
   */
  async handleIndexInfo() {
    try {
      const response = await getIndexInfo()
      return response
    } catch (err) {
      throw new Error(err)
    }
  },

  /**
   * [handleCheckVote 验证是否部门投票]
   * @param  {[type]}  context [vuex对象]
   * @param  {[type]}  userId  [用户ID]
   * @return {Promise}         [description]
   */
  async handleCheckVote(context, {
    userId
  }) {
    try {
      const response = await vliadVote({
        data: {
          userId
        }
      })
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