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
window.rootPath = '/my_api'