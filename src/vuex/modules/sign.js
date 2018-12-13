import {
  signIn,
  getIdentifyCode,
  getIndexInfo,
  vliadVote,
} from '@/api/signin.api.js'
import {
_toast
} from '@/utils/global'

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
    identify,
    check_identify
  }) {
    try {
      // if (!phone || !identify) {
      //   _toast({
      //     type: 3,
      //     msg: '请编辑必填项后登陆!'
      //   })
      //   return
      // }
      // if(identify != check_identify){
      //   _toast({
      //     type: 3,
      //     msg: '验证码错误!'
      //   })
      //   return
      // }
      const res = await signIn({
        phone,
      })
      window.localStorage.setItem('userInfo', JSON.stringify({...res.data, exprie: +new Date() + (60 * 60 * 4 * 1000)}))
      setTimeout(() => {
        res.status === 0 && window.$router.push({
          name: 'index'
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
      // document.cookie = `JSESSIONID = ${response.data.sessionId}`
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
      let userInfo = window.localStorage.getItem('userInfo')
      userInfo = userInfo && JSON.parse(userInfo)
      const response = await getIndexInfo({
        phone: userInfo && userInfo.phone
      })
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
  },
}

const getters = {

}

export default {
  state,
  mutations,
  actions,
  getters
}
