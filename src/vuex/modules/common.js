import {
  getDateInfo
}
from '@/api/common.api'

const state = {

}

const mutations = {

}

const actions = {
  async getAdminDate({
    commit
  }) {
    try {
      const res = await getDateInfo({
        data: 1
      })
      console.log(res, 'this is datainfo')
    } catch (err) {
      console.log(err)
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