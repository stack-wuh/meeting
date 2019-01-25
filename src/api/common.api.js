import $http from '@/utils/axios'
import {
  _catch
} from '@/utils/global'

export const getDateInfo = ({
  data = {}
}) => $http.post({
  url: '/v2/launches',
  data
})

export const getUserInfo = () => $http.post({
  url: window.rootPath + '/userPo/init.do'
}).catch(err => _catch(err))

export const getMeetting = () => $http.post({
  url: window.rootPath + '/meetingMaterial/init.do'
}).catch(err => _catch(err))

export const getVoteList = () => $http.post({
  url: window.rootPath + '/vote/init.do'
}).catch(err => _catch(err))

export const postVoteListInfo = ({
  data
}) => $http.post({
  url: window.rootPath + '/vote/voting.do',
  data: {
    data
  }
}).catch(err => _catch(err))

export const getGradeList = () => $http.post({
  url: window.rootPath + '/grade/init.do',
}).catch(err => _catch(err))

export const _getSeating = () => $http.post({
  url: window.rootPath + '/index/seatManage.do'
}).catch(err => _catch(err))

export const getGradeInfo = ({
  phone
}) => $http.post({
  url: window.rootPath + '/grade/init.do',
  data: {
    phone
  }
}).catch(err => _catch(err))

export const download = ({
  materialUrl
}) => $http.post({
  url: window.rootPath + '/meetingMaterial/downLoad.do',
  data: {
    materialUrl
  }
}).catch(err => _catch(err))

export const successful = ({
  userId,
  meetingId
}) => $http.post({
  url: window.rootPath + '/grade/addSucInfo.do',
  data: {
    userId,
    meetingId
  }
}).catch(err => _catch(err))

export const validGread = ({
  userId
}) => $http.post({
  url: window.rootPath + '/grade/checkTopicGread.do',
  data: {
    userId
  }
})

export const _getMsg = ({
  id
}) => $http.post({
  url: window.rootPath + '/index/getMsg.do',
  data: {
    id
  }
}).catch(err => _catch(err))

export const _getBgPic = () => $http.post({
  url: window.rootPath + '/index/getbgPic.do'
}).catch(err => _catch(err))

export const getChecked = ({
  data
}) => $http.post({
  url: window.rootPath + '/index/init.do',
  data
}).catch(err => _catch(err))

export const handleCheck = ({data}) => $http.post({
  url: window.rootPath + '/index/sign.do',
  data
}).catch(err => _catch(err))


export const wrongQue = ({
  userId,
  questionId,
}) => $http.post({
  url: window.rootPath + 'userPo/wrongQue.do',
  data: {
    userId, questionId
  }
}).catch(_catch)
