<!--
 * @Author: your name
 * @Date: 2021-01-22 16:34:42
 * @LastEditTime: 2021-01-28 14:08:48
 * @LastEditors: Please set LastEditors
 * @Description: notification 通知提醒框
 * @FilePath: /ui注释/packages/notification/src/Notification.vue
-->

<template>
  <div :class="[`${className}-root`,single?`${className}-flex`:'']" :style="style">
    <transition-group :name="className" tag="div" :class="`${className}-rootBox`" appear>
      <Notice
        v-for="(notice) in notices"
        :key="notice.key"
        :flag="notice.key"
        :type="notice.type"
        :duration="notice.duration"
        :callback="notice.onClose || false"
        :class-name="className"
        :class="notice.location?`${className}-${notice.location}`:''"
        :title="notice.title"
        :on-click="notice.onClick || false"
        @destroy="remove"
        :style="{...notice.style,position:notices.length === 1? 'static !important':'' }"
      >
        <template v-if="notice.vNode === REPLACE_BY_VNODE">
          <RenderVNode :vNode="notice.content" />
        </template>
        <template v-else>
          {{notice.content}}
        </template>
      </Notice>
    </transition-group>
  </div>
</template>
<script>
// 通过className 进行 message和notification 的区别
// location,title,onClick 属于 notification 其余共有
import Notice from "./Notice.vue";
import { REPLACE_BY_VNODE } from '../../../src/utils/variable.js'; // 引入vnode 替换变量
export default {
  name: "Notification",
  components: {
    Notice,
    RenderVNode: {
      props: {
        vNode: Object
      },
      render () {
        return this.vNode
      }
    }
  },
  data() {
    return {
      // 通知信息列表
      notices: [],
      // 时间戳，用来产生唯一标识
      now: Date.now(),
      seed: 0,
      REPLACE_BY_VNODE, // vnode变量
      // 以下为创建实例时，添加的参数
      // 自定义样式文件
      // style: {},
      // 传入的className 用以区分message和notification
      // className: null,
      // 最大通知数
      // maxCount: 1
    };
  },
  methods: {
    // 唯一标志
    getUid() {
      return `Notification_${this.now}_${this.seed++}`;
    },
    /**
     * @description: notices数组控制函数，对外实例暴露使用,用于添加通知信息
     * @param {Objectr} { content:string, [duration:number, key:number|string, type:string, callback:function ] }
     * @return {undefined}
     */
    add(notice) {
      const key = notice.key || this.getUid();
      const noticeIndex = this.notices.map((item) => item.key).indexOf(key);
      const copyNotices = this.notices.slice(0);
      if (this.single) {
        this.notices.splice(0, 1, notice)
        return
      }
      if (noticeIndex !== -1) {
        this.notices.splice(noticeIndex, 1, notice);
      } else {
        if (this.maxCount && this.notices.length >= this.maxCount) {
          this.notices.shift();
        }
        this.notices.push(notice);
      }
      // this.notices = copyNotices;
    },
    /**
     * @description: notices数组控制函数, 用于删除
     * @param {string|number}  对应的key值
     * @return {undefined}
     */
    remove(val) {
      this.notices = this.notices.filter((item) => item.key !== val);
    },
    /**
     * @description: 实例销毁
     */
    destroy() {
      this.$el.parentNode.removeChild(this.$el);
    },
  },
};
</script>