/*
 * @Author: zhc
 * @Date: 2020-09-16 10:40:51
 * @LastEditTime: 2020-11-17 16:17:17
 * @LastEditors: Please set LastEditors
 * @Description: 根据目录结构创建相关的json 文件
 * @FilePath: /ui注释/build/bin/build-json.js
 */
const fs = require('fs');
const path = require('path');

// 文件操作，对于开发过程中添加相关的component 后自动生成相关的json 文件，免去一些手动的添加；需要注意的是，在package.json中使用这些文件的时候一定要使用&& 确保前边的生成后在运行后便的 & 和&& 查看相关的介绍
fs.readdir(path.resolve(process.cwd(),'./packages'),(err,files) => { // 读取相关路径下的dir 
  err && console.log(err);
  const filterFiles = files.filter(item=>{
    if(fs.statSync(path.resolve(process.cwd(),'./packages',item)).isDirectory()){ // 过滤是否为文件夹
      return item;
    }
  });
  const filesObject = {};
  filterFiles.forEach(item=>{
    if(item === 'theme') return;
    filesObject[item] = `./packages/${item}/index.js`;  // 排除theme 样式文件夹
  });
  fs.writeFile(path.resolve(process.cwd(),'./components.json'),JSON.stringify(filesObject,null,'\t'),'utf8',(err)=>{ // 将上边筛选的内容写入相关文件json 
    err && console.log(err);
    console.log('build json done');
  });
})