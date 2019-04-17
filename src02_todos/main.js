/*
入口js
 */
import Vue from 'vue'
import App from './App.vue'
import Header from './components/Header.vue'

// import './base.css'

// 注册全局组件
Vue.component('Header', Header)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { // 注册组件
    App
  },
  template: '<App/>'
})
