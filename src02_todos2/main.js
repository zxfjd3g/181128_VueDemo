/*
入口js
 */
import Vue from 'vue'
import App from './App.vue'
import Header from './components/Header.vue'

// import './base.css'

// 将事件总线对象挂载在Vue原型对象上(所有的组件对象都能看到)
Vue.prototype.$eventBus = new Vue()

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
