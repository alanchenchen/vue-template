'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')
const os = require('os')
//通过os模块动态获取当前本机的局域网IP，然后更改webpack devserver的host地址，解决localhost无法被局域网访问的问题
function GetIPV4_IP() {
  const network = os.networkInterfaces()['以太网'] || os.networkInterfaces()['WLAN']
  const IPV4_Ip = network.filter(a => a.family == 'IPv4')[0].address
  return IPV4_Ip
}

// 必须区分系统平台，因为此文件在dev和prod环境都会执行！为了避免Jenkins在linux自动打包，必须区分。否则在linux中GetIPV4_IP()无法找到网卡会打包报错
let localDevHost = os.platform() == 'linux'
                  ? 'localhost'
                  : GetIPV4_IP()

module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      // '/': {
      //   target: 'https://www.baidu.com' 
      // }
    },

    // Various Dev Server settings
    host: localDevHost, // can be overwritten by process.env.HOST
    port: 7070, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    
    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: './static',
    assetsPublicPath: '/',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
