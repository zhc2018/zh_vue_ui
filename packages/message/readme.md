### message 

#### 使用
Vue.prototype.$message = Message

this.$message(string|object)

#### string
参数为 message,[duration,onClose]
- message : message消息字符串 -必填 string
- duration : 消息提醒保留的时间，即默认3秒后关闭 number
- onClose : callback message关闭时回调函数 function

#### object
 参数 | 说明 | 类型 | 默认值 | 版本 
 --- | --- | --- | --- | ---
 content | 消息提醒主体内容,必填 | String\VNode | - | v1.0.0
 duration | 消息提醒关闭时间设置，默认3后自动关闭，设置为0时则不自动关闭 | Number | 3 | v1.0.0
 type | 消失提醒类型，有效值`success`,`info`,`warning`,`error`,`loading`,通知方法优先 | String | 'info' | v1.0.0
 key | 当前通知的唯一标识，可以通过唯一标识对通知内容更新和关闭 | String\Number | - | v1.0.0
 onClose | 关闭消息通知的回调函数 | callback | - | v1.0.0

#### 全局config
 参数 | 说明 | 类型 | 默认值 | 版本 
 --- | --- | --- | --- | --- 
 top | 弹出位置距离顶部的距离 | String | '16px' | v1.0.0
 duration | 设置默认保留时间 | Number | 3 | v1.0.0
 maxCount | 设置显示message的个数 | Number | 10 | v1.0.0
 mountPoint | 实例挂载的位置 | () => HTMLNode | () => document.body | v1.0.0
 single | 启用居中展示方式，启用后只能展示一条消息通知，并且top设置和maxCount不起作用，多条信息展示的时候，后续的信息会直接顶替掉前面的信息 | Boolean | false | v1.0.0

#### 实例方法
- 实例返回值result方法，可以通过调用该方法进行手动关闭消息,此时不触发回调函数
- 关闭回调函数支持result.then() promise调用方式

#### 全局方法
- message.config(config) 用来设置全局配置
- message.destroy() 销毁所有通知实例
- message.success(string|object) 成功消息通知，此时object中的type将不起作用
- message.info(string|object) 普通消息通知，默认info,object配置同上
- message.warning(string|object) 警告信息通知，object配置同上
- message.error(string|object) 错误信息通知，object配置同上
- message.loading(string|object) 等待消息通知，object配置同上