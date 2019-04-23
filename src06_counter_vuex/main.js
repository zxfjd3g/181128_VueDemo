/*
入口js
 */
import Vue from 'vue'
import App from './App.vue'
import store from './store'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { // 注册组件
    App
  },
  template: '<App/>',
  store, // 配置vuex的store对象   ==> 所有组件对象都多了一个属性$store
})
