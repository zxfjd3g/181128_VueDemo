/*
包含n个状态数据属性的对象
 */
export default {
  firstView: true, // 是否显示初始的默认界面
  loading: false, // 是否正在请求中
  users: [],  // 搜索到的用户列表
  errorMsg: '', // 请求失败的错误信息
}