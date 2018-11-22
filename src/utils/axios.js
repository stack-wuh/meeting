import axios from 'axios'
import qs from 'qs'
import {
  _toast,
} from '@/utils/global'

axios.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  return response
}, error => {
  return Promise.reject(error)
})

const checkStatus = response => {
  switch (response.status) {
    case 200:
      return _toast({
        type: 2,
        msg: '加载成功'
      })
    case 400:
      return _toast({
        type: 3,
        msg: '400错误'
      })
    case 404:
      return _toast({
        type: 3,
        msg: '404错误'
      })
    case 500:
      return _toast({
        type: 3,
        msg: '500错误'
      })
    default:
      return response
  }
}

export default {
  post({
    url,
    data,
  }) {
    return axios({
      methods: 'post',
      baseURL: window.rootPath,
      url,
      data: qs.stringify(data),
      timeout: 10000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      }
    }).then(res => {
      checkStatus(res)
      return res
    }).catch(err => {
      _toast({
        type: 3,
        msg: '网络错误,请重试!'
      })
    })
  }
}