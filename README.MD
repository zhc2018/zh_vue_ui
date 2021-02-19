# 说明： 此配置只是用来模仿练习UI库文件打包使用，内部使用了element-UI的一些组件，省去自己编写的繁琐，为了验证一些打包流程，只为练习！！内部出现的相关名称和图片等仅为练习方便。

### example 启动开发示例，里边是完全是个开发环境下的展示界面用来查看调试等
 ` npm run serve `

### build 综合的打包处理，包含一系列的操作，删除文件，创建依赖文件，打包umd,commonjs2,component, utils工具函数的压缩转换移动，scss gulp 转换压缩移动
 ` npm run build `

 build 创建umd commonjs2 按需加载方式lib 

 其余相关操作

### 清除相关文件或文件夹 使用rimraf 这个包 删除相关自动生成的文件 包括组件入口json component.json, src 下入口文件index.js，packages/theme/src 下index.scss ，gulp 打包生成的 package/theme 样式的lib文件，包括总的生成build的 lib库
  ` npm run clean `

### utils 工具函数的编译拷贝 通过babel 对src 下除了 index.js入口文件外的utils 等工具函数进行编译及移动处理。现在想里边的路径是不是有问题？做个疑问。 @babel/cli 进行处理 编译处理整个src目录下的文件，排除index.js；并将结果输出到lib文件下，不会覆盖lib下的任何文件或目录
  ` npm run build:utils `

**以下单独文件的创建需要依赖相关文件的生成**
 需要首先创建components.json文件
  ` npm run build:files `

### build:umd
  ` npm run build:umd `

### build:commonjs2
  ` npm run build:com2 `

### build:components
  ` npm run build:component `

上述几个文件创建都不包含样式文件

### build:style
  ` npm run build:style `
样式文件创建这边，特别注意内部路径问题，如果直接借用第三方库的话，建议直接复制相关样式文件到相应目录下

## 此文件是在原UI封装练习库的配置基础上copy出来用来做文字注释的版本，内部配置相同，只是添加了相关的文字注释，问题出现在自己配置的webpack经过两个星期没有触碰之后完全看不懂内部是什么了，因此，在重新梳理一遍的基础做一个较为详细的注释，供以后不知掉什么时间拿出来的时候不至于一脸闷逼