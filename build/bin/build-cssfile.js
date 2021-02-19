/*
 * @Author: zhc
 * @Date: 2020-09-16 18:19:29
 * @LastEditTime: 2020-11-17 18:03:44
 * @LastEditors: Please set LastEditors
 * @Description: 创建统一的样式入口
 * @FilePath: /ui注释/build/bin/build-cssfile.js
 */

// 现阶段文件格式正确，需要定义好格式修改内部

const fs = require('fs');
const path = require('path');
const endOfLine = require('os').EOL; // 操作系统的行末标志
const components = require('../../components.json');


const theme = 'theme';
const basepath = path.resolve(process.cwd(),'./packages/');
/**
 * @description: 判断时候为文件
 * @param {*} filepath 文件路径
 * @return {*} boolean
 */
function isFiles(filepath) {
  try {
    return fs.statSync(filepath).isFile();
  } catch(err) {
    return false
  }
};

let indexContent = '@import "./base.scss";'+endOfLine;  // 路径拼接，先加入基本文件

Object.keys(components).forEach(name => { // 循环生成相关的导入字符串
  const filename = `${name}.scss`;
  indexContent += `@import "./${filename}";`+endOfLine;
  const filePath = path.resolve(basepath,theme,'src',filename);
  if(!isFiles(filePath)) {  // 漏掉的或者没有样式的文件也需要创建相关的scss文件
    fs.writeFileSync(filePath,'','utf8');
    console.log('创建遗漏的样式文件',filename)
  }
});
fs.writeFile(path.resolve(basepath,theme,'src','index.scss'),indexContent,(err)=>{ // 写入这个index.scss文件
  err && console.log(err);
  console.log('build styleFile done');
})
