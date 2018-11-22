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
    default:
      return
  }
}