import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const files = require.context('../views/',true,/\.vue$/); // 自动化引入 路径 查找子目录 匹配的文件格式
export const constantRouter = files.keys().reduce((arr,curr)=>{  //  context.keys() 提供的文件名数组，调用reduce 生成相应的路由数组 
  if(files(curr).default) {   // files(curr) 拿到exports的内容 default 就相当与commonjs或这import 引入的文件文件内容
    arr.push({
      component:files(curr).default,
      path: '/'+files(curr).default.name,
      name: files(curr).default.name
    })
  }
  return arr
},[])
console.log(constantRouter);
constantRouter.unshift({    // 把介绍页面添加上
  path:'/',
  name: 'ExampleIndex'
})
export default new VueRouter({
  mode: 'history',
  routes: constantRouter
})