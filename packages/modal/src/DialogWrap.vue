<!--
 * @Author: your name
 * @Date: 2021-01-22 13:41:59
 * @LastEditTime: 2021-01-22 15:29:44
 * @LastEditors: Please set LastEditors
 * @Description: 将mask 和 dialog 进行组合
 * @FilePath: /ui注释/packages/modal/src/DialogWrap.vue
-->

<template>
  <div class="zh-modal-root">
    <zh-mask :modal="modal" :visible="visible" :style="{zIndex}" />
    <Dialog
      :width="width"
      :visible="visible"
      :style="{zIndex}"
      :modalClosable="modalClosable"
      :enableAnimation="enableAnimation"
      :showClose="showClose"
      @close="handleClose"
    >
    <slot></slot>
    </Dialog>
  </div>
</template>
<script>
import ZhMask from './Mask.vue';
import Dialog from './Dialog.vue';
export default {
  name: 'DialogWrap',
  components: {
    ZhMask,
    Dialog
  },
  props: {
    // 是否显示mask-默认显示
    modal: {
      type: Boolean,
      default: true
    },
    // 显示隐藏控制-默认隐藏
    visible: {
      type: Boolean
    },
    // dialog 内容宽度-默认40%
    width: {
      type: String,
      default: '40%'
    },
    // 是否点击mask 关闭modal-默认不启用
    modalClosable: {
      type: Boolean,
      default: false
    },
    // 是否添加到body-默认添加到根结点
    appendToBody: {
      type: Boolean,
      default: true
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
		}
  },
  data() {
    return {
      key: 0,
      zIndex: 1000
    }
  },
  watch: {
  /**
   * @description: 监听visible 判断 是否需要添加class控制滚动穿透，和判断当前modal的zIndex 正确现实图层位置
   */  
		visible(value) {
      // 如果显示、添加到根结点、body不是当前组件的父节点
			if(value && this.appendToBody && document.body !== this.$el.parentNode) {
				document.body.appendChild(this.$el);
      }
      if (value) {
        // 显示的情况后下，如果根节点含有滚动穿透控制，则处理显示层级和key值记录，没有证明第一次打开，直接添加类名
        if(this.hasClass(document.body,'zh-dialog-hide-control')) {
          this.key++;
          this.zIndex = this.getMaxZindex() + 1;
        } else {
          document.body.classList.add('zh-dialog-hide-control')
        }
      } else  {
        // 关闭的时候如果key值大于0 这说明含有另外的modal处于打开中
        if(this.key > 0) {
          this.key--;
          this.zIndex -=1;
          return;
        }
        document.body.classList.remove('zh-dialog-hide-control')
      }
		}
  },
  methods: {
    /**
     * @description: modal 关闭控制函数
     */
    handleClose() {
      this.$emit("update:visible", false);
      this.$emit("close");
    },
    /**
     * @description: 判断element 是否含有某class
     * @param {element} DOM元素 
     * @param {className:string} class 名称，纯名称不含有.
     * @return {Boolean} 判断时候含有的结果
     */ 
    hasClass(el,className) {
      if(!el || !className) return;
      // class 名称中不能含有空格
      if(className.trim().indexOf(' ') !== -1) throw new Error('className should not contain space.')
      // 通过判断是否含有类名
      if(el.classList) {
        return el.classList.contains(className)
      } else {
        return (''+el.classList).indexOf(className) !== -1
      }
    },
    /**
     * @description: 获取modal元素中zIndex最大值
     */ 
    getMaxZindex() {
      let els = document.querySelectorAll('.zh-modal-root')
      let zIndex = this.zIndex
      Array.prototype.forEach.call(els, (item) => {
        zIndex = Math.max(zIndex, item.firstChild.style.zIndex)
      })
      return zIndex
    } 
  },
  mounted() {
    // 直接显示
    if (this.visible) {
      if (this.appendToBody) {
        document.body.appendChild(this.$el)
      }
    }
  },
  destroyed() {
    // 组件卸载移除组件
    if (this.appendToBody && this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el)
    }
  }
}
</script>