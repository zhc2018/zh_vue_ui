<!--
 * @Author: your name
 * @Date: 2021-01-22 10:17:45
 * @LastEditTime: 2021-01-22 15:20:04
 * @LastEditors: Please set LastEditors
 * @Description: 此组件为modal的蒙板，仅为展示和实现显示隐藏动画效果
 * @FilePath: /ui注释/packages/modal/src/Mask.vue
-->

<template>
  <transition name="mask">
    <div class="zh-modal-mask" v-if="modal" v-show="visible"></div>
  </transition>
</template>
<script>
export default {
  name: 'ZhMask',
  props: {
    // 是否显示modal 层
    modal: {
      type: Boolean,
      default: true
    },
    // 显示隐藏控制
    visible: {
      type: Boolean,
      default: false
    }
  }
}
</script>