/*
入口js
 */
import Vue from 'vue'
import App from './App.vue'
import { Button} from 'mint-ui'

// 注册全局组件
Vue.component(Button.name, Button)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { // 注册组件
    App
  },
  template: '<App/>',
})
