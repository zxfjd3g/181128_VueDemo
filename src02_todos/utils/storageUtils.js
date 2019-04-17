/*
包含一些操作local存储的工具函数的模块
 */
export default {
  // 读取todos
  getTodos () {
    return JSON.parse(localStorage.getItem('todos_key') || '[]')
  },

  // 保存todos
  saveTodos (todos) {
    localStorage.setItem('todos_key', JSON.stringify(todos))
  }
}
