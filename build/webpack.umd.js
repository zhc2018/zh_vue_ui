/*
 * @Author: zhc
 * @Date: 2020-09-16 10:29:56
 * @LastEditTime: 2020-11-17 17:31:48
 * @LastEditors: Please set LastEditors
 * @Description: 用于创建lib index.js 通用文件创建流程
 * @FilePath: /ui注释/build/webpack.conf.js
 */

const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

const umdConfig = {
  mode: 'production', // 生成最后文件必须使用生产环境，免去配置一些相关的文件处理操作
  entry: {
    app: [path.join(process.cwd(),'./src/index.js')] // 入口文件 chunk 名为app 仅仅为chunk 名字,  => modules : './src/index.js'; chunk : app 
  },
  output: {
    path: path.resolve(process.cwd(),'./lib'), // 文件生成的路径
    filename: 'index.js', // 最后文件输出的名字bundle  => bundle: index.js
    chunkFilename: '[id].js', // 非初始化chunk 文件的名称，内部加载modules文件的chaunk名字？
    publicPath: '/dist/', // 内部文件的加载路径名称；例如：/dist/4.chunk.js。  这个地方是静态资源的路径特别注意下
    libraryTarget: 'umd', // 设置为模块通用模式 
    library:'MyLibrary', // 需要配合上边的libraryTarget 进行理解 umd下将模块导出到 global 下的变量MyLibrary
    libraryExport: 'default', // 入口的默认导出将分配给 libraryTarget
    umdNamedDefine: true, // umd 特使的 umd => amd 不懂，写就对了
    globalObject: 'this' // umd 下的东西 将umd 生成的lib 挂在到全局this 包含了web window 和node global
  },
  resolve: { // 解析设置
    extensions: ['.js', '.json', '.vue'], // 尝试解析的后缀名
  },
  externals: { //将vue 设置为外部扩展，就是说在打包的bundle 中把引入的vue 去除，在外界使用时候，需要先引入 vue 才能使用
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

module.exports = merge(umdConfig, common);