/*
 * @Author: zhc
 * @Date: 2020-09-16 16:36:49
 * @LastEditTime: 2020-11-17 17:41:30
 * @LastEditors: Please set LastEditors
 * @Description: 用于打包生成只用于commonjs 方式的包
 * @FilePath: /ui注释/build/webpack.commonjs2.js
 */

const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
var nodeExternals = require('webpack-node-externals'); // 为了忽略node_modules文件夹中的所有模块

const commonjs2Config = { // commonjs2文件是日常用的文件，element-ui npm 用的就是这个
  mode: 'production', // 生成最后文件必须使用生产环境，免去配置一些相关的文件处理操作
  entry: {
    app: [path.join(process.cwd(),'./src/index.js')] // 入口文件 chunk 名为app
  },
  output: {
    path: path.resolve(process.cwd(),'./lib'), // 出口文件生成的路径
    publicPath: '/dist/', // 内部文件的加载路径名称；例如：/dist/4.chunk.js。  这个地方是静态资源的路径特别注意下
    filename: 'ui.common.js',  // 最后文件输出的名字bundle 
    chunkFilename: '[id].js', // chunk内部引入模块的的生成的chunk 将使用内部id 命名?
    libraryExport: 'default', // 入口的默认导出将分配给 libraryTarget
    library:'MyLibrary', //  commonjs2 可以不用设置这个
    libraryTarget: 'commonjs2' // 设置为模块commonjs2 入口起点的返回值将分配给 module.exports 对象
  },
  resolve: { // 解析设置
    extensions: ['.js', '.json', '.vue'],
    modules: ['node_modules'] //在后续npm 使用的时候，告诉webpack解析模块时候应该解析的目录
  },
  externals: [{ //将vue 设置为外部扩展
    vue: {
      root: 'Vue',
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue'
    }
  },nodeExternals()],
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
  optimization: {
    minimize: false //关闭压缩处理
  } //production mode 下默认启用TerserPlugin压缩
}

module.exports = merge(commonjs2Config, common);
 