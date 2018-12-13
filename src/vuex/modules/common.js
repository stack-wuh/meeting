import {
  getUserInfo,
  getMeetting,
  getVoteList,
  postVoteListInfo,
  getGradeList,
  _getSeating,
  getGradeInfo,
  download,
  successful,
  validGread,
  _getMsg,
  _getBgPic
}
from '@/api/common.api'

const state = {

}

const mutations = {

}

const actions = {
  /**
   * [getUser 个人中心 -- 获取用户详情]
   * @return {Promise} [description]
   */
  async getUser() {
    try {
      const response = await getUserInfo()

      return response
    } catch (err) {
      throw new Error(err)
    }
  },

  /**
   * [getMeettingInfo 会议资料 -- 获取会议资料详情]
   * @return {Promise} [description]
   */
  async getMeettingInfo() {
    try {
      const response = await getMeetting()

      return response
    } catch (err) {
      throw new Error(err)
    }
  },

  /**
   * [getVoteInfo 部门投票 -- 获取部门列表]
   * @return {Promise} [description]
   */
  async getVoteInfo() {
    try {
      const response = await getVoteList()

      return response
    } catch (err) {
      throw new Error(err)
    }
  },

  /**
   * [postVoteList 部门投票]
   * @param  {[type]}  context [description]
   * @param  {[type]}  data    [description]
   * @return {Promise}         [description]
   */
  async postVoteList(context, {
    data
  }) {
    try {
      const response = await postVoteListInfo({
        data
      })

      return response
    } catch (err) {
      throw new Error(err)
    }
  },

  /**
   * [getAnswerList 获取打分的列表]
   * @return {Promise} [description]
   */
  async getAnswerList() {
    try {
      const response = await getGradeList()

      return response
    } catch (err) {
      throw new Error(err)
    }
  },

  /**
   * [getSeating 获取座位列表信息]
   * @return {Promise} [description]
   */
  async getSeating() {
    try {
      const response = await _getSeating()
      return response
    } catch (err) {
      throw new Error(err)
    }
  },

  /**
   * [getGradeInfo 获取打分列表]
   * @return {Promise} [description]
   */
  async getGradeInfo() {
    try {
      let userInfo = window.localStorage.getItem('userInfo')
      userInfo = userInfo && JSON.parse(userInfo)
      const response = await getGradeInfo({
        phone: userInfo.phone
      })
      return response
    } catch (err) {
      throw new Error(err)
    }
  },

  /**
   * [handleDownload 下载会议资料]
   * @param  {[type]}  context     [description]
   * @param  {[type]}  materialUrl [description]
   * @return {Promise}             [description]
   */
  async handleDownload(context, {
    materialUrl
  }) {
    try {

      const response = await download({
        materialUrl
      })
      location.href = response.data
      return response
    } catch (err) {
      throw new Error(err)
    }
  },

  async addSuccess(context, {
    userId,
    meetingId
  }) {
    try {
      const response = await successful({
        userId,
        meetingId
      })

      return response
    } catch (err) {
      throw new Error(err)
    }
  },

  /**
   * [handleVildaGrade 议题打分验证]
   * @param  {[type]}  context [description]
   * @param  {[type]}  userId  [description]
   * @return {Promise}         [description]
   */
  async handleVildaGrade(context, {
    userId
  }) {
    try {
      const response = await validGread({
        userId
      })

      return response
    } catch (err) {
      throw new Error(err)
    }
  },

/**
 * [hanleGetMsg 获取新增模块的具体内容]
 * @method hanleGetMsg
 * @param  {[type]}    context [description]
 * @param  {[type]}    id      [description]
 * @return {Promise}           [description]
 */
  async hanleGetMsg(context, {
    id
  }){
    try{
      const response = await _getMsg({id})

      return response
    }catch(err){
      throw new Error(err)
    }
  },

  /**
   * [handleGetBackground 获取弹幕背景图片]
   * @method handleGetBackground
   * @return {Promise}           [description]
   */
  async handleGetBackground(){
    try{
      const response = await _getBgPic()

      return response
    }catch(err) {
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
