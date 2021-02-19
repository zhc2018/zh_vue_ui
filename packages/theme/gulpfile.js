/*
 * @Author: zhc
 * @Date: 2020-09-17 11:18:41
 * @LastEditTime: 2021-01-21 16:53:26
 * @LastEditors: Please set LastEditors
 * @Description: css 打包移动
 * @FilePath: /ui注释/packages/theme/gulpfile.js
 */


'use strict';

const path = require('path');
const { src, dest, series } = require('gulp'); // gulp 4的一些操作
const autoprefixer = require('gulp-autoprefixer'); // css 自动添加前缀
const cssmin = require('gulp-cssmin'); // css 压缩
const sass = require('gulp-sass');  // scss 处理
sass.compiler = require('node-sass'); // gulp-scss 的处理器
// const aliases = require('gulp-style-aliases');  // gulp 下 别名处理，这个其实是可以不用的，正常情况的，该scss 都是开发人员手动书写，不会出现使用webpack 模块应用的文件
// const less = require('gulp-less'); glup-less 的处理器

// 现在使用打包报错，因为使用的是webpack ~模块系统，但是gulp不认识，导致文件操作错误,后续使用引入主题的本地文件就没有这个问题了，如果直接借用第三放库建议直接复制第三方库样式文件到相应的文件下
// 使用gulp-style-aliases 这个插件惊醒别名更换,但是好像只能更换第一层的，后续的引用中如果还有别名就解决不了
    // src('./src/*.scss')
    // .pipe(aliases({
    //   '~element-ui': path.join(__dirname,'../../node_modules/element-ui')
    // }))

// .pipe(less()) 使用less时候编译器里边的sass部分替换为less 的即可，添加gulp-less 更改相关配置即可
function compiler() {
  return src('./src/*.scss')
    .pipe(sass.sync().on('error',sass.logError))
    .pipe(autoprefixer())
    .pipe(cssmin())
    .pipe(dest('./lib'));
}
function copyfont() {
  return src('./src/fonts/**')
  .pipe(cssmin())
  .pipe(dest('./lib/fonts'))
}

exports.build = series(compiler, copyfont)