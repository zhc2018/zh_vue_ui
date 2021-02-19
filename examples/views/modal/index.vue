<template>
  <div>
    <button @click="handleClick" style="margin:600px 0">通用modaltest</button>
    <zh-modal :visible.sync="show" title="修改密码" width="624px" modal-closable @confirm="ConfirmHandle" type="warn" :confirm-disable="true" >
      <div>
        <button @click="handleClick2">层级嵌套验证zindex</button>
      </div>
    </zh-modal>
    <zh-modal :visible.sync="show2" title="modal" width="300px">
      <div>
        <button @click="handleClick3">禁用根结点验证层级嵌套zindex</button>
      </div>
      <template v-slot:footer>
        <div>footer部分</div>
      </template>
    </zh-modal>
    <zh-modal :visible.sync="show3" :appendToBody="false" title="modal" width="300px">
      <div>
        禁用根结点验证层级嵌套zindex效果
      </div>
      <template v-slot:footer>
        <div>footer部分</div>
      </template>
    </zh-modal>
  </div>
</template>
<script>
import ZhModal from '@/modal'
export default {
  name: 'ExampleModal',
  components: {
    ZhModal
  },
  data() {
    return {
      show: false,
      show2: false,
      show3: false,
    }
  },
  methods: {
    handleClick(e) { 
      this.show = true
    },
    handleClick2(e) { 
      this.show2 = true
    },
    handleClick3(e) { 
      this.show3 = true
    },
    ConfirmHandle() {
      console.log('关闭了')
      this.show = false
    }
  }
}
</script>