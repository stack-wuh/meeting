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
  if (response.status === 200 && response.data.status === 10) {
    _toast({
      type: 3,
      msg: response.data.msg
    })
    setTimeout(() => {
      window.$router.push({
        path: '/login'
      })
    }, 1000)
    return
  }
  const map = new Map([
    [{
      resStatus: 200,
      msgStatus: 0
    }, {
      type: 2,
      msg: response.data.msg
    }],
    [{
        resStatus: 200,
        msgStatus: 1
      },
      {
        type: 3,
        msg: response.data.msg
      }
    ],
    [{
        resStatus: 300,
      },
      {
        type: 3,
        msg: '300错误'
      }
    ],
    [{
        resStatus: 400,
        msgStatus: 'undefined'
      },
      {
        type: 3,
        msg: '400错误'
      }
    ],
    [{
        resStatus: 404,
        msgStatus: 'undefined'
      },
      {
        type: 3,
        msg: '400错误'
      }
    ],
    [{
        resStatus: 500
      },
      {
        type: 3,
        msg: '500错误'
      }
    ]
  ])
  let result = [...map].filter(([key]) => (key.resStatus == response.status && key.msgStatus == response.data.status))
  result.forEach(item => _toast(item[1]))
  return response.data
}

let  userInfo = window.localStorage.getItem('userInfo')
userInfo = userInfo && JSON.parse(userInfo)
let result = false
if(userInfo){
  result = userInfo.exprie - (+new Date().getTime()) > 0 ? true : false
}
const ObjNotNull = (obj) => {
  let _obj = {}
  Object.keys(obj).map(oo => {
    if(obj[oo]) _obj[oo] = obj[oo]
  })
  return _obj
}

export default {
  post({
    url,
    data,
  }) {
    return axios({
      method: 'post',
      // baseURL: window.rootPath,
      url,
      data: qs.stringify(ObjNotNull({phone: result ? userInfo.phone : '', ...data})),
      timeout: 10000,
      crossDomain: true,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      }
    }).then(res => {
      return checkStatus(res)
    }).catch(err => {
      return Promise.reject(err)
    })
  }
}
