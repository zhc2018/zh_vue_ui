<template>
  <div class="app-example-box">
    <div>
      <button @click="topLeftHandle">topLeft</button>
      <button @click="topRightHandle">topRight</button>
      <button @click="bottomLeftHandle">bottomLeft</button>
      <button @click="bottomRightHandle">bottomRight</button>
      <button @click="bottomRightHandle">bottomRight</button>
      <button @click="updateHandle">更新内容</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ExampleNotification",
  methods: {
    topLeftHandle() {
      this.$notify({
        title:'topLeft',
        content: '全局配置方法，设置，可以放置string或者vnode,最简单的使用',
        location: 'topLeft',
      })
    },
    topRightHandle() {
      this.$notify.warning({
        title: 'topRight',
        content: 'warning 警告，默认配置,设置不关闭',
        duration: 0
      })
    },
    bottomLeftHandle() {
      this.$notify({
        title: 'botomLeft',
        content: this.$createElement(
          'div',
          {
            title: 'vnode'
          },
          '这里展示的是vnode'
        ),
        location: 'bottomLeft',
        bottom: '100px',
        duration: 0
      })
    },
    bottomRightHandle() {
      const result = this.$notify({
        title:'bottomRight',
        content: '点击能容使用回调函数关闭当前通知',
        duration: 0,
        location: 'bottomRight',
        onClick: () => {
          result()
        }
      })
    },
    updateHandle() {
      this.$notify({
        title:'bottomRight',
        content: '准备更新内容',
        key:'xxxx',
        duration: 0,
        location: 'bottomRight',
      });
      setTimeout(()=>{
        this.$notify({
          title:'bottomRight',
          content: '内容已经更新',
          key:'xxxx',
          duration: 10,
          location: 'bottomRight',
        });
      },5000)
    }
  },
}
</script>
<style lang="scss">
  
</style>