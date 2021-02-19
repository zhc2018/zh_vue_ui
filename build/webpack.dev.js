/*
 * @Author: zhc
 * @Date: 2020-09-14 10:30:15
 * @LastEditTime: 2021-01-21 16:05:08
 * @LastEditors: Please set LastEditors
 * @Description: webpack 开发环境，完全就是个自己配置的webpack 做个记录
 * @FilePath: /ui注释/build/webpack.dev.js
 */

const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 文件清理插件，可以用以处理每次的在dev本地文件的时候省层的dist 文件夹，不过使用webpack-deb-serve 就不需要开启，这个是在内存中的，不需要处理
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 自动将生成出口文件 引入 html 文件中的插件，同时创建html 入口，多页面官网了解
const common = require('./webpack.common.js');

const devConfig = {
  entry: path.join(__dirname,'../examples/main.js'), // 入口文件
  mode: 'development', // webpack 4以后的 模式，默认启动可以启动一些相关的配置，特别是生产环境，免除一些配置
  output: {  // 出口 出口文件的名字， 出口文件生成到什么位置
    filename: 'main.js',
    path: path.join(__dirname, '../dist')
  },
  devtool: 'inline-source-map',  // 相关的source-map 及打包速度处理，查webpack
  module: { // loader 规则 模块处理
    rules: [
      {
        test: /\.(c|sc|sa)ss$/,   // 此地方可以换用less 添加相关less 和 less-loader 即可
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              postcssOptions: {
                plugins: [
                  require('autoprefixer')({overrideBrowserslist: ['>0.15% in CN']})
                ]
              }
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  resolve: { // 解析 
    alias: {
      '@': path.join(__dirname, '../packages/')
    }
  },
  devServer: { // 开发服务器，配合webpack-dev-serve 使用，是吧？打个问号，比较的话可以运行下npm run serve 和 npm run start 
    clientLogLevel: 'warning', // 控制台展示的信息？
    hot: true, // 热替换开启
    contentBase: path.join(__dirname,'../dist'), // 上边打包生成的出口就是为服务提供的内容来源
    compress: true, // gzip 压缩
    host: 'localhost',
    port: 8080,
    open: true, // 自动打开浏览器 完全启用HMR 需要webpack.HotModuleReplacementPlugin 这个插件一起启用
    overlay: { // 编译出错的时候展示这些
      warning: true,
      error: true
    },
    publicPath:'/', // bundle相关文件的路径
    historyApiFallback:true // H5 history api 都返回index.html
  },
  plugins: [
    // new CleanWebpackPlugin(), // 生产环境使用，用来清楚相关的文件，开发模式下文件在内存中，
    new webpack.HotModuleReplacementPlugin(), // 启用热替换模块
    new HtmlWebpackPlugin({ // html-webpack-plugin 相关的配置
      filename: 'index.html', // 生成的文件名字
      favicon: path.join(__dirname, '../examples/favicon.ico'), // favicon 文件路径，会直接拷贝过去
      template: path.join(__dirname,'../examples/index.html') // 模版的文件路径
    })
  ]
}

module.exports = merge(common,devConfig); // 使用webpack-merge 将公共配置和各自配置合并