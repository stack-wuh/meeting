export const _toast = ({
  type = 1,
  msg = '',
}) => {
  switch (type) {
    case 1:
      return window.$toast.loading({
        mask: true,
        message: '加载中'
      })
    case 2:
      return msg && window.$toast.success({
        message: msg
      })
    case 3:
      return msg && window.$toast.fail({
        message: msg
      })
    case -1:
      return window.$toast.loading({
        mask: false,
        message: ''
      })
    default:
      return
  }
}
export const _catch = (err) => {
  const actions = new Map([
    [/404/, {
      type: 3,
      msg: '404错误'
    }],
    [/500/, {
      type: 3,
      msg: '500错误'
    }]
  ])
  let action = [...actions].filter(([key]) => key.test(err))
  action.forEach(([key, value]) => _toast(value))
}