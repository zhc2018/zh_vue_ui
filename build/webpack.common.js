/*
 * @Author: zhc
 * @Date: 2020-09-14 09:59:40
 * @LastEditTime: 2020-11-17 16:08:47
 * @LastEditors: Please set LastEditors
 * @Description: webpack 公共配置文件
 * @FilePath: /ui注释/build/webpack.common.js
 */


const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin') // vuel-loader 的一个插件
const ProgressBarPlugin = require('progress-bar-webpack-plugin'); // 打包的时候美观一点，会出现[=======    ] 这样的进度条

module.exports = {
  module: {  // loader 规则 模块处理
    rules: [
      {
        test: /\.(png|jpg|gif|svg|jpeg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          }
        ]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  plugins: [
    new ProgressBarPlugin(),
    new VueLoaderPlugin(),
  ]
}