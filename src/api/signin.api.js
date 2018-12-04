import $http from '@/utils/axios'
import {
  _catch
} from '@/utils/global'
export const signIn = ({
  phone,
  sessionId
}) => $http.post({
  url: window.rootPath + '/index/getLogin.do',
  data: {
    phone,
    sessionId
  }
}).catch(err => _catch(err))

export const _signIn = ({
  phone
}) => $http.post({
  url: window.rootPath + '/index/getLogin.do',
  data: {
    phone
  }
}).catch(err => _catch(err))

export const getIdentifyCode = ({
  phone
}) => $http.post({
  url: window.rootPath + '/index/getIdentify.do',
  data: {
    phone
  }
}).catch(err => _catch(err))


export const getIndexInfo = () => $http.post({
  url: window.rootPath + '/index/init.do'
}).catch(err => _catch(err))

export const vliadVote = ({
  data
}) => $http.post({
  url: window.rootPath + '/vote/checkVote.do',
  data
}).catch(err => _catch(err))
