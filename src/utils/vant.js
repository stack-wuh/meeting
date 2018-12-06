import Vue from 'vue'
import $http from '@/utils/axios'

import 'vant/lib/index.css'
import '@/assets/style/base.less'
import '@/assets/style/color.less'
import '@/assets/style/elem.less'

import {
  _toast
} from '@/utils/global'

import {
  Button,
  Checkbox,
  Toast,
  Field,
  Cell,
  CellGroup,
  NoticeBar,
  Dialog,
  CheckboxGroup,
  NumberKeyboard,
} from 'vant'

Vue.use(Button)
Vue.use(Checkbox)
Vue.use(Toast)
Vue.use(Field)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(NoticeBar)
Vue.use(Dialog)
Vue.use(CheckboxGroup)
Vue.use(NumberKeyboard)

window.$http = $http
Vue.prototype.$http = $http
Vue.prototype.$toast = _toast
Vue.prototype.$dialog = Dialog
window.$toast = Toast

window.rootPath = '/meeting'
//线上webSocket地址
// window.socketPath = 'ws://47.105.94.178:8081/'
//线下webSocket地址
window.socketPath = 'ws://192.168.10.117:8081/'
// window.socketPath = 'ws://192.168.10.108:8085/'
