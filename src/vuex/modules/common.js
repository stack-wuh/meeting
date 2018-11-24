import {
  getUserInfo,
  getMeetting,
  getVoteList,
  postVoteListInfo,
  getGradeList,
  _getSeating
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

  async getSeating() {
    try {
      const response = await _getSeating()
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