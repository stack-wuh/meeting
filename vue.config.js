const autoprefixer = require('autoprefixer')
const pxtorem = require('postcss-pxtorem')
const modifyVars = require('./src/utils/vant.css.js')

module.exports = {
  lintOnSave: false,

  baseUrl: process.env.NODE_ENV === 'production' ? '/' : '/',

  devServer: {
    open: true,
    host: '0.0.0.0',
    port: '10040',
    https: false,
    proxy: {
      '/meeting': {
        target: 'http://192.168.10.117:8081/meeting/',
        changeOrigin: true,
        pathRewrite: {
          '^/meeting': ''
        },
      }
    },
  },
  productionSourceMap: false,

  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer(),
          pxtorem({
            rootValue: 37.5,
            propList: ['*']
          })
        ]
      },
      less: {
        modifyVars,
      }
    }
  },
}