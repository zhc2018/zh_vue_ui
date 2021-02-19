import Vue from 'vue';
import App from './App.vue';
import router from './router';
import '@/theme/index.scss';
import Notification from '@/notification'; // 测试notification
import Message from '@/message'; // 测试message

// import MyUI from '../lib/ui.common'; // 生产环境后组件全部引入
// import '../lib/theme/index.css'; // 生产环境后使用样式
// Vue.use(MyUI) // 生产环境测试

Vue.config.productionTip = false

Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')