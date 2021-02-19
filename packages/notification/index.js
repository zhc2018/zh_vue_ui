/*
 * @Author: your name
 * @Date: 2021-01-22 16:18:07
 * @LastEditTime: 2021-01-28 14:05:25
 * @LastEditors: Please set LastEditors
 * @Description: notification 通知提醒
 * @FilePath: /ui注释/packages/notification/index.js
 */

 import Vue from 'vue';
 import { isVNode } from '../../src/utils/vdom.js';
 import { REPLACE_BY_VNODE } from '../../src/utils/variable.js';
 import NoticeTemplate from './src/Notification.vue'; // 引入基础vue构造器
 const Notice = Vue.extend(NoticeTemplate); // 创建一个子类

// 相关参数
let notificationInstance = {}; // notification 实例
let key = 0; // 默认唯一标志key
let defaultDuration = 5; //默认保留时间
let maxCount = 5; // 最大现实数量
let mountPoint = () => document.body; // 实例挂载位置
let className = 'zh-notification'; //class名称前缀，实例类名
let defaultTop = '16px'; // 默认距离顶端高度
let defaultBottom = '16px'; // 默认距离底部高度
let defaultLocation = 'topRight'; //默认位置为上右
/**
 * @description: 对外暴露 notification 函数，值接受object 对象
 * @param {Object} 暂时保留，配置项暂时不完善 {title:String, content:String|VNode, [duration:Number, key:Number|String, location:String,top:String,bottom:String,mountPoint:Function=>dom, style:Object, mountPoint onClick:callback, onClose:callback]}
 * top 、bottom、 mountPoint 只有在当前实例第一次创建时有效，后续使用过之后在设置无效；
 * @return {Function} 
 */
function Notification(options = {}) {
  return notificationCore(undefined, options)
}
/**
 * @description: notification 中枢转接多个方法函数
 * @param {type:String|undefined} - notification 类型 不为undefined 时候 配置项设置options.type 将不起作用
 * @param {options:Object} - 暂时保留，配置项暂时不完善 {title:String, content:String|VNode, [duration:Number, key:Number|String, location:String, style:Object, onClick:callback, onClose:callback]}
 * @return {Function} 
 */
function notificationCore(type = 'info', options) {
  // if (options === undefined || JSON.stringify(options) === '{}') return;
  if (Object.prototype.toString.call(options) === '[object Object]' && !!options.title && !!options.content) {
    const formatDuration = parseFloat(options.duration);
    const opts = {
      ...options,
      type: type ? type : options.type || 'info', // notification 通知类型
      key: options.key || key++,  // 通知信息标识
      title: options.title,   // 标题
      vNode: isVNode(options.content)? REPLACE_BY_VNODE : false,
      content: options.content, //内容
      duration: formatDuration === 0 ? formatDuration : formatDuration < 0 ? defaultDuration : (formatDuration || defaultDuration), // 延迟时间
      location: switchLocation(options.location).location // 位置信息
    }
    return promiseWrap(opts)
  } else {
    throw new Error('notification Incorrect format.')
  }

/**
 * @description: promise  包装，将callback 回调函数转为promise形式，并提供实例返回值用于取消notification通知
 * @param {opts:Object}  上层调用后组装成的对象object
 * @return {Function|Promise} 
 */
}
function promiseWrap(opts) {
  const promise = new Promise(resolve => {
    const callback = () => {
      if (opts.onClose && typeof opts.onClose === 'function') {
        opts.onClose()
      }
      return resolve(true)
    };
    const options = {
      ...opts,
      onClose: callback
    };
    open(options)
  });
  const result = () => {
    if (notificationInstance[opts.location]) {
      notificationInstance[opts.location].remove(opts.key);
    }
  };
  result.then = (resolve, reject) => promise.then(resolve, reject);
  result.promise = promise;
  return result;
}
/**
 * @description: notification 打开方法
 * @param {params:Object} 参数为上层调用后组装成的对象object
 */
function open(params) {
  if (notificationInstance[params.location]) {
    notificationInstance[params.location].add(params)
  } else {
    notificationInstance[params.location] = new Notice({
      data: {
        style: switchLocation(params.location, params.top, params.bottom).style,
        className,
        maxCount
      }
    });
    notificationInstance[params.location].$mount();
    const root = params.mountPoint && params.mountPoint() || mountPoint();
    root.appendChild(notificationInstance[params.location].$el)
    notificationInstance[params.location].add(params);
  }
}
/**
 * @description: 筛选配置项中location 并且根据location设置 实例的style
 * @param {str:String|undefined} 配置项设置的location 有效值值为topRight，topLeft，bottomRight，bottomLeft
 * @return {Object}}  含有location 位置和 实例style样式设置
 */
function switchLocation(str, top, bottom) {
  let options = {};
  switch (str) {
    case 'topRight':
      options.location = str;
      options.style = { top: top || defaultTop, right: 0, bottom: 'auto' };
      break;
    case 'topLeft':
      options.location = str;
      options.style = { top: top || defaultTop, left: 0, bottom: 'auto' };
      break;
    case 'bottomRight':
      options.location = str;
      options.style = { top: 'auto', right: 0, bottom: bottom || defaultBottom };
      break;
    case 'bottomLeft':
      options.location = str;
      options.style = { top: 'auto', left: 0, bottom: bottom || defaultBottom };
      break;
    default:
      options = { ...switchLocation(defaultLocation, top, bottom) };
      break;
  }
  return options
}
/**
 * @description: 提供open方法等同于直接方法调用
 */
Notification.open = Notification;
/**
 * @description: 全局配置 只使用前配置一次
 * @param {obj:Object} 
 *  {top:String} 设置为top时距离顶部的距离默认值'16px'
 *  {bottom:String} 设置为bottom时距离底部的距离默认值'16px'
 *  {duration:Number} 保留时间 默认为5s
 *  {maxCount:Number} 设置显示notification的个数 默认为5个
 *  {mountPoint:Function} 设置notification实例的挂载位置默认值为返回body的函数 ()=>document.body
 *  {location:String} 设置默认情况 notification弹出的位置 有效值为topRight，topLeft，bottomRight，bottomLeft
 */
Notification.config = function (obj = {}) {
  obj.top && (defaultTop = obj.top);
  obj.bottom && (defaultBottom = obj.bottom);
  obj.duration && (defaultDuration = parseFloat(obj.duration));
  obj.maxCount && (maxCount = parseFloat(obj.maxCount));
  obj.mountPoint && (mountPoint = obj.mountPoint);
  obj.location && (defaultLocation = obj.location);
  Object.keys(notificationInstance).forEach(item => {
    notificationInstance[item] = null;
  })
};
/**
 * @description: 手动关闭函数
 * @param {key:String} 唯一的key
 */
Notification.close = function (key) {
  Object.keys(notificationInstance).forEach(instance => {
    notificationInstance[instance].remove(key)
  })
};
/**
 * @description: 通知提醒销毁方法
 */
Notification.destroy = function () {
  Object.keys(notificationInstance).forEach(item => {
    notificationInstance[item].destroy()
    delete notificationInstance[item];
  })
};
// 循环挂载一些方法
['success', 'info', 'warning', 'error', 'loading'].forEach(type => {
  Notification[type] = (options) => notificationCore(type, options)
})

export default Notification;  