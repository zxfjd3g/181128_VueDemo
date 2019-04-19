/*
路由器对象模块
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'

// 声明使用插件
Vue.use(VueRouter)

export default new VueRouter({
  // 配置应用中的所有路由
  routes,
  mode: 'history', // hash: 带#  history: 不带#
})