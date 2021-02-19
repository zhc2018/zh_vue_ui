### notification

#### 使用
Vue.prototype.$notify = Notification

this.$notify(config)

#### config
  参数 | 说明 | 类型 | 默认 | 版本 
  --- | --- | ---- | --- | ----
  bottom | 消息从底部弹出，距离底部的位置 | String | '16px' | v1.0.0
  content | 消息内容主体，必填 | String\VNode | - | v1.0.0
  duration | 消息提示关闭时间设置，默认5秒后自动关闭，设置为0时则不自动关闭 | Number | 5 | v1.0.0
  key | 当前通知的唯一标识，通过唯一标识可以设置该通知的内容更新及关闭 | Number\String | - | v1.0.0
  location | 弹出的位置，有效值`topRight`,`topLeft`,`bottomRight`,`bottomLeft` | String | 'topRight' | v1.0.0
  top | 消息从顶部弹出时候，距离顶部的位置 | String | '16px' | v1.0.0
  title | 通知标题，必填 | String | - | v1.0.0
  type | 通知类型,有效值`success`,`info`,`warning`,`error`,`loading`,通知方法优先 | String |  'info' | v1.0.0
  mountPoint | 实例挂载的位置 | () => HTMLNode | () => document.body | v1.0.0 
  style | 自定义内联样式 | CSSProperties | - | v1.0.0

  #### 全局配置一次生效
  参数 | 说明 | 类型 | 默认 | 版本
  --- | --- | --- | --- | ---
  bottom | 消息从底部弹出，距离底部的位置 | String | '16px' | v1.0.0
  duration | 消息提示关闭时间设置，默认5秒后自动关闭，设置为0时则不知道关闭 | Number | 5 | v1.0.0
  location | 弹出位置，有效值`topRight`,`topLeft`,`bottomRight`,`bottomLeft` | String | 'topRight' | v1.0.0
  top | 消息从顶部弹出时候，距离顶部的位置 | String | '16px' | v1.0.0
  mountPoint | 实例挂载的位置 | () => HTMLNode | () => document.body | v1.0.0
  maxCount | 设置显示通知个数 | Number | 5 | v1.0.0

  #### 事件
  - onClick 点击通知内容的回调函数
  - onClose 通知关闭时的回调函数

  #### 实例方法
  - 实例返回值result方法可以通过调用该返回值手动关闭通知，此时不触发回调函数
  - 每个实例可以使用promise 方式调用 result.then() 当关闭通知时触发
  - 可以通过相同的key值进行同一notify内容消息的更新

  #### 全局方法
  - notification.config(config) 用来设置全局配置
  - notification.close(key) 用来手动关闭通知，key为通知实例中唯一标识
  - notification.destroy() 销毁所有通知实例
  - notification.success(config) 成功通知提示config选项中排除type即可
  - notification.info(config) 普通通知提示config同上
  - notification.warning(config) 警告通知提示config同上
  - notification.error(config) 错误通知提示config同上
  - notification.loading(config) 等待通知提示config同上