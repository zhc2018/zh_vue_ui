/*
 * @Author: your name
 * @Date: 2021-01-22 16:17:12
 * @LastEditTime: 2021-01-28 14:05:33
 * @LastEditors: Please set LastEditors
 * @Description:  message 消息提示                                                                                                  
 * @FilePath: /ui注释/packages/message/index.js
 */

import Vue from 'vue';
import { isVNode } from '../../src/utils/vdom.js'; // 引入vnode判断函数
import { REPLACE_BY_VNODE } from '../../src/utils/variable.js'; // 引入vnode 替换变量
import Notification from '../notification/src/Notification.vue'; // 引入基础vue构造器
const Notice = Vue.extend(Notification) // 创建一个子类
 // 相关参数
let messageInstance;//挂载实例
let key = 0;//key 值，用以记录当前message
let defaultDuration = 3; //默认保留时间 0为默认不关闭
let defaultTop = '16px'; //默认距离顶部的距离
let maxCount = 10; // 最大现实数量
let mountPoint = () => document.body; //实例挂载位置
let className = 'zh-message'; //实例类名
let single = false; // 关闭居中展示方式
/**
 * @description: 对外暴露 message 函数 可以传递字符串类型和对象类型
 * @param {options:String|Object} 字符串格式或者对象类型 对象为{ content:string, [key: string, duration: number,  onClose: callback,type: string] }
 * @param {duration:Number} 显示时常默认3s 
 * @param {onClose:Function} -callback
 * @return {Function} 
 */
function Message(options, duration, onClose) {
  return messageCore(undefined, options, duration, onClose)
}
/**
 * @description: message 函数处理 可以传递字符串类型和对象类型
 * @param {type:String|undefined} - message 类型 type 不为undefined后options.type 将不起作用
 * @param {options:String|Object} - 字符串格式或者对象类型 对象为 { content:string, [key: string, duration: number,  onClose: callback,type: string] }
 * @param {0:Number} - 显示时常
 * @param {duration:Function} - callback
 * @return {Function} 
 */
function messageCore(type, options, duration, onClose) {
  if (typeof options === 'undefined') return;
  if (typeof options === 'string') {
    if (typeof duration === 'function') {
      onClose = duration;
      duration = undefined;
    }
    const formatDuration = parseFloat(duration);
    let opts = {
      content: options,
      type: type || 'info',
      key: key++,
      duration: formatDuration === 0 ? formatDuration : formatDuration < 0 ? defaultDuration : (formatDuration || defaultDuration),
      onClose: onClose
    }
    return promisWrap(opts);
  } else if (Object.prototype.toString.call(options) === '[object Object]' && !!options.content) {
    const formatDuration = parseFloat(options.duration);
    return promisWrap({
      ...options,
      vNode: isVNode(options.content)? REPLACE_BY_VNODE : false,
      content: options.content || ' ',
      key: options.key || key++,
      duration: formatDuration === 0 ? formatDuration : formatDuration < 0 ? defaultDuration : (formatDuration || defaultDuration),
      type: type ? type : options.type || 'info',
    })
  } else {
    throw new Error('message Incorrect format.')
  }
}
/**
 * @description: 配置参数
 * @param {Object}  
 *  {top:String} 弹出位置距离顶部的距离默认值为'16px'
 *  {duration:Number} 设置保留时间默认值为3s
 *  {maxCount:Number} 设置显示message的个数默认值为10个
 *  {mountPoint:Function} 设置message实例的挂载位置默认值为返回body的函数 ()=>document.body
 */
Message.config = function (obj = {}) {
  obj.top && (defaultTop = obj.top);
  obj.duration && (defaultDuration = parseFloat(obj.duration));
  obj.maxCount && (maxCount = parseFloat(obj.maxCount));
  obj.mountPoint && (mountPoint = obj.mountPoint);
  obj.single && (single = obj.single)
  Message.destroy()
}
/**
 * @description: message 销毁
 */
Message.destroy = function () {
  if (messageInstance) {
    messageInstance.destroy();
  }
  messageInstance = null;
}
/**
 * @description: promise 封装，使得毁掉可以使用.then
 * @param {Object}  Message函数 内部组装对象
 * @return {Function} 实例的删除函数
 */
function promisWrap(opts) {
  const promise = new Promise(resolve => {
    const callback = () => {
      if (opts.onClose && typeof opts.onClose === 'function') {
        opts.onClose()
      }
      return resolve(true);
    };
    const options = {
      ...opts,
      onClose: callback
    }
    open(options)
  });
  const result = () => {
    if (messageInstance) {
      messageInstance.remove(opts.key)
    }
  };
  result.then = (resolve, reject) => promise.then(resolve, reject)
  result.promise = promise;
  return result
}

/**
 * @description: message 打开方法
 * @param {Object} - Message函数经过promisWrap 内部组装对象
 */
function open(opts) {
  if (messageInstance) {
    messageInstance.add(opts)
  } else {
    messageInstance = new Notice({
      data: {
        style: { paddingTop: defaultTop },
        className,
        maxCount,
        single
      }
    });
    messageInstance.$mount();
    const root = mountPoint();
    root.appendChild(messageInstance.$el);
    messageInstance.add(opts);
  }
}
// 循环添加一些方法
['success', 'info', 'warning', 'error', 'loading'].forEach(type => {
  Message[type] = (options, duration, onClose) => messageCore(type, options, duration, onClose)
})

export default Message