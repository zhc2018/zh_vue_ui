<template>
  <div class="app-example-box">
    <div>
      <button @click="messageHandle">普通stingMessgae</button>
      <button @click="messageObjectHandle">普通objectMessgae</button>
      <button @click="messageResultHandle">返回值关闭messgae</button>
      <button @click="messagePromiseHandle">promiseMessgae</button>
      <button @click="messageChangeHandle">5秒后内容替换</button>
      <button @click="messageVNodeHandle">VNode</button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ExampleMessage',
  methods: {
    messageHandle() {
      this.$message('只有一个字符串',0)
    },
    messageObjectHandle () {
      this.$message({
        content: 'object消息主体',
        type: 'warning',
        duration: 10,
        onClose: function() {
          console.log('object消息主体关闭了')
        }
      })
    },
    messageResultHandle () {
      const result = this.$message({
        content: '5秒后调用返回值关闭message',
        type: 'success',
        duration: 0,
        onClose: function() {
          console.log('调用返回值关闭的message')
        }
      });
      setTimeout(result, 5000)
    },
    messagePromiseHandle() {
      this.$message({
        content: 'promise方式关闭回调函数',
        duration: 5
      }).then(() => {
        console.log('5秒后通过promise方式关闭')
      })
    },
    messageChangeHandle() {
      this.$message({
        content: '5秒后内容将被替换，并且不自动关闭',
        key: 'xxxxx',
        duration:0
      })
      setTimeout(()=> {
        this.$message({
          content: '这里是用来替换的内容,并且在5秒后自动关闭',
          key: 'xxxxx',
          duration: 5
        })
      },5000)
    },
    messageVNodeHandle() {
      this.$message({
        content: this.$createElement(
          'span',
          {
            title: 'vnode-span'
          },
          '用来测试的vnode'
        ),
        duration: 8,
      }).then(() => {
        console.log('vnode关闭了')
      })
    }
  },
  mounted() {
    // this.$message.config({
    //   single: true
    // })
  }
}
</script>
<style lang="scss">
  
</style>