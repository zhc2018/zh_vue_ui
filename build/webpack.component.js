/*
 * @Author: zhc
 * @Date: 2020-09-16 17:17:06
 * @LastEditTime: 2020-11-17 17:42:41
 * @LastEditors: Please set LastEditors
 * @Description: 按需加载打包配置，生成份文件放置在lib下
 * @FilePath: /ui注释/build/webpack.component.js
 */

const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const components = require('../components.json');

const componentConfig = {
  mode: 'production', // 生产环境，最终文件，启用一些打包等操作
  entry: components,  // 多入口打包，多文件生成{a:路径,b:路径}
  output: {
    path: path.resolve(process.cwd(),'./lib'), // 打包后生成文件的路径
    filename: '[name].js', // 打包后生成的文件名称，多文件打包，生成的名字使用chunk => name => bundle
    chunkFilename: '[id].js', // chunk内部引入模块的的生成的chunk 将使用内部id 命名?
    publicPath: '/dist/', // 内部文件的加载路径名称；例如：/dist/4.chunk.js。  这个地方是静态资源的路径特别注意下
    libraryTarget: 'commonjs2', // 设置为commonjs2模块 入口起点的返回值将分配给 module.exports 对象
    library:'MyLibrary', // commonjs 可以不用设置这个名字
  },
  resolve: { // 解析设置
    extensions: ['.js', '.json', '.vue'],
    modules: ['node_modules'] //在后续npm 使用的时候，告诉webpack解析模块时候应该解析的目录
  },
  externals: { //将vue 设置为外部扩展
    vue: {
      root: 'Vue',
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue'
    }
  },
  module: {
    rules: [
      {
        test: '/\.(js|jsx)$/',
        loader: 'babel-loader',
        exclude: /node_modules/,
        include: process.cwd(),
      }
    ]
  },
  performance: { //性能提示关闭
    hints: false
  },
  // optimization: {} //production mode 下默认启用TerserPlugin压缩
}

module.exports = merge(componentConfig, common);