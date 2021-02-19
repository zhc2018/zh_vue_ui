<!--
 * @Author: your name
 * @Date: 2021-01-22 13:28:22
 * @LastEditTime: 2021-01-22 13:41:34
 * @LastEditors: Please set LastEditors
 * @Description: dialog 展示部分
 * @FilePath: /ui注释/packages/modal/src/Dialog.vue
-->

<template>
  <transition name="wrap">
    <div class="zh-modal-wrap" @click.self="handleDialogClose" v-show="visible">
      <transition name="modal">
        <div
          class="zh-modal-content"
          :style="{...modalWidth,...style}"
          v-show="visible"
          ref="dialog"
        >
          <span class="zh-modal-close" @click="handleClose" v-if="showClose">&times;</span>
          <slot></slot>
        </div>
      </transition>
    </div>
  </transition>
</template>
<script>
let mousePosition = null
function enableAnimaHandle (e) {
  mousePosition = {
    x: e.pageX,
    y: e.pageY
  }
  setTimeout(()=>{
    mousePosition = null
  }, 100)
}
if (typeof window !== 'undefined' && window.document && window.document.documentElement) {
  document.documentElement.addEventListener('click', enableAnimaHandle, true)
}
export default {
  name: "Dialog",
  props: {
    // 控制显示隐藏-默认隐藏
    visible: {
      type: Boolean,
      default: false
    },
    // 点击mask是否关闭dialog-默认不启用
    modalClosable: {
      type: Boolean,
      default: false
    },
    // dialog 内容宽度-默认40%
    width: {
      type: String,
      default: '40%'
    },
    // 是否启用跟随动画效果-默认启用
    enableAnimation: {
      type: Boolean,
      default: true
    },
    // 是否显示关闭按钮-默认展示
    showClose: {
			type: Boolean,
			default: true
		}
  },
  data() {
    return {
      style: {}
    }
  },
  computed: {
    modalWidth() {
      if (this.width) {
        return { width: this.width }
      }
      return {}
    }
  },
  watch: {
    visible(value) {
      if (value && this.enableAnimation) {
        // this.style = this.undataStyle()
        this.$nextTick(() => {
          this.style = this.undataStyle()
        })
      }
    }
  },
  methods: {
    /**
    * @description: 关闭控制，触发毁掉
    */
    handleClose() {
      // 不使用回调函数值的时候
      this.$emit("update:visible", false);
      // 使用回调函数值的时候
      this.$emit("close");
    },
    /**
     * @description: mask 控制关闭
     */
    handleDialogClose() {
      if (this.modalClosable) {
        this.handleClose();
      }
    },
    // 更想内容content部分的style
    /**
     * @description: 更新modal 的style样式
     * @return {Object}  style格式的属性样式transformOrigin
     */
    undataStyle() {
      if (this.enableAnimation && mousePosition) {
        const dialogNode = this.$refs.dialog;
        const elOffset = this.offset(dialogNode);
        return {
          transformOrigin: `${mousePosition.x - elOffset.left}px ${
            mousePosition.y - elOffset.top
          }px`,
        };
      }
    },
    /**
     * @description: 计算element的距离左侧和顶部距离 考虑到页面滚动后位置计算，主要是实现弹出层 出现时候动画的效果
     * @param {Element} 需要计算位置modal的节点
     * @return {Object}} 包含left 和right的 对象
     */
    offset(el) {
      // el元素的大小和相对于视口偏移量
      const pos = {
        left: el.offsetLeft ,
        top: el.offsetTop ,
      };
      // 顶层的 document 对象
      const doc = el.ownerDocument;
      // 全局window对象
      const w = doc.defaultView || doc.parentWindow;
      pos.left += this.getScroll(w);
      pos.top += this.getScroll(w, true);
      return pos;
    },
    /**
     * @description: 获取计算当前页面的滚动
     * @param {w} window 顶层对象
     * @param {top:boolean} 标志位 计算x轴还是y轴 
     * @return {number} 返回计算 当前页面的滚动值
     */
    getScroll(w, top) {
      let ret = w[`page${top ? "Y" : "X"}Offset`];
      const method = `scroll${top ? "Top" : "Left"}`;
      if (typeof ret !== "number") {
        const d = w.document;
        ret = d.documentElement[method];
        if (typeof ret !== "number") {
          ret = d.body[method];
        }
      }
      return ret;
    },
  },
}
</script>