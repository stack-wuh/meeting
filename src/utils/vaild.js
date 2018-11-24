import {
  _toast
} from '@/utils/global'

export const validPhone = value => {
  const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
  if (!value) {
    _toast({
      type: 3,
      msg: '请编辑手机号'
    })
    return false
  }
  if (!reg.test(value)) {
    _toast({
      type: 3,
      msg: '手机号格式错误,请重试!'
    })
    return false
  } else {
    return true
  }
}