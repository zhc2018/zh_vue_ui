<!--
 * @Author: your name
 * @Date: 2021-01-22 13:45:22
 * @LastEditTime: 2021-01-22 13:46:58
 * @LastEditors: Please set LastEditors
 * @Description: modal 框本框
 * @FilePath: /ui注释/packages/modal/src/Modal.vue
-->

<template>
    <dialog-wrap
    :visible="visible"
    :modal="modal"
    :width="width"
    :appendToBody="appendToBody"
    :modalClosable="modalClosable"
    :enableAnimation="enableAnimation"
    :showClose="showClose"
    @close="handleClose"
  >
    <slot name="header">
      <div class="zh-modal-header" v-if="showHeader">
          <span class="zh-modal-title" :style="titleStyle">{{title}}</span>
      </div>
    </slot>
    <div class="zh-modal-body">
      <slot></slot>
    </div>
    <slot name="footer">
      <div class="zh-modal-footer" v-if="showFooter">
        <span class="zh-modal-footer-btn footer-btnConfirm" :class="[`footer-btnConfirm-${buttonType.trim()}`,confirmDisable && 'footer-btnConfirm-disable']" @click="handleConfirm">{{confirmText}}</span>
        <span class="zh-modal-footer-btn footer-btnCancel" @click="handleClose">{{cancelText}}</span>
      </div>
    </slot>
  </dialog-wrap>
</template>
<script>
import DialogWrap from "./DialogWrap.vue";
export default {
  name: "ZhModal",
  components: {
    DialogWrap,
  },
  props: {
    // 是否启用mask蒙板-默认启用
    modal: {
      type: Boolean,
      default: true,
    },
    // 显示隐藏控制-默认隐藏
    visible: {
      type: Boolean,
      default: false,
    },
    // 内容宽度控制-默认40%
    width: {
      type: String,
      default: "40%",
    },
    // 是否添加在根结点上-默认添加在根节点
    appendToBody: {
      type: Boolean,
      default: true,
    },
    // 点击蒙层是否关闭modal-默认不关闭
    modalClosable: {
      type: Boolean,
      default: false,
    },
    // 是否启用跟随动画效果-默认启动
    enableAnimation: {
      type: Boolean,
      default: true
    },
    // 是否显示关闭按钮-默认展示
    showClose: {
			type: Boolean,
			default: true
		},
    // 以上为dialog所需要
    // 显示标题，并且值传入的时候
		title: {
			type: String,
			default: ''
    },
    // 显示标题，并且值传入的时候的样式文件
		titleStyle: {
			type: Object,
			default: ()=>({})
    },
    // 是否显示header-默认显示
		showHeader: {
			type: Boolean,
			default: true
    },
    // 是否显示footer-默认显示
		showFooter: {
			type: Boolean,
			default: true
    },
    // 确认按钮类型
    buttonType: {
      type: String,
      default: 'primary'
    },
    // 确认按钮禁用
    confirmDisable: {
      type: Boolean,
      default: false
    },
    // confirm 按钮文字
    confirmText: {
      type: String,
      default: '确认'
    },
    // Cancel 按钮文字
    cancelText: {
      type: String,
      default: '取消'
    }
  },
  methods: {
    /**
     * @description: 关闭控制函数
     */
    handleClose() {
      this.$emit("update:visible", false);
      this.$emit("close");
    },
    /**
     * @description: 
     */  
    handleConfirm() {
      if (this.confirmDisable) return;
      this.$emit('confirm');
    }
  }
};
</script>