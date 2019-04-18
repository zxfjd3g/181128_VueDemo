/*
入口js
 */
import Vue from 'vue'
import App from './App.vue'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { // 注册组件
    App
  },
  template: '<App/>'
})
