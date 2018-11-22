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
      '/my_api': {
        target: ' https://api.spacexdata.com/',
        changeOrigin: true,
        pathRewrite: {
          '^/my_api': ''
        },
      }
    }
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