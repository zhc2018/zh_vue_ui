<!--
 * @Author: your name
 * @Date: 2021-01-22 16:19:01
 * @LastEditTime: 2021-01-28 13:39:31
 * @LastEditors: Please set LastEditors
 * @Description: 通知主体部分
 * @FilePath: /ui注释/packages/notification/src/notice.vue
-->

<template>
  <div :class="`${className}-notice`" @mouseenter="stopTimerClose" @mouseleave="startTimerClose">
    <div class="zh-notification-notice-content" v-if="title" @click="handleNoticeClick">
      <div class="zh-notification-content-title">
        <div class="zh-notification-content-titleText">{{title+type}}</div>
        <span class="zh-notification-content-close" @click.stop="handleClose">&times;</span>
      </div>
      <slot></slot>
    </div>
    <div class="zh-message-notice-content" v-else>
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "Notice",
  props: {
    // 关闭时间控制
    duration: {
      type: Number,
    },
    // 当前notice的唯一标识
    flag: {
      type: [Number, String],
    },
    // 关闭回调函数
    callback: [Function, Boolean],
    // notification通知类型
    type: {
      type: String,
    },
    //  notice通知类型通过class进行格式控制
    className: String,
    // notification 通知标题
    title: [String, Number],
    // notification 通知主体点击事件
    onClick: [Function, Boolean],

  },
  data() {
    return {
      timer: null,
    };
  },
  watch: {
    $props: {
      handler() {
        this.startTimerClose();
      },
      deep:true
    }
  },
  methods: {
    /**
     * @description: 关闭控制
     */
    startTimerClose() {
      this.timer && clearTimeout(this.timer)
      if (this.duration === 0) {
        return;
      }
      this.timer = setTimeout(() => {
        this.$emit("destroy", this.flag);
        this.callback && typeof this.callback === "function" && this.callback();
      }, this.duration * 1000);
    },
    /**
     * @description: 暂停 取消
     */
    stopTimerClose() {
      this.timer && clearTimeout(this.timer);
      this.timer = null;
    },
    /**
     * @description: notification 关闭按钮控制关闭
     */
    handleClose() {
      this.$emit("destroy", this.flag);
      this.callback && typeof this.callback === "function" && this.callback();
    },
    /**
     * @description: notification 消息通知的点击毁掉
     */
    handleNoticeClick() {
      this.onClick && typeof this.onClick === 'function' && this.onClick();
    }
  },
  mounted() {
    this.startTimerClose();
  },
  destroyed() {
    this.timer && clearTimeout(this.timer);
  },
};
</script>