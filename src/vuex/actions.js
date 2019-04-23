/*
包含n个用来间接更新状态数据方法的对象
 */
import axios from 'axios'

export default {

  // 搜索的异步action: 包含异步代码的action
  async search ({commit}, searchName) {

    // 更新状态(请求中)
    commit('REQUESTING')

    // 发送异步ajax请求
    const url = `https://api.github.com/search/users2?q=${searchName}`
    try {
      const response = await axios.get(url)
      // 如果成功, 更新状态(成功)
      const result = response.data
      const users = result.items.map(item => ({
        username: item.login,
        avatar_url: item.avatar_url,
        url: item.html_url
      }))
     commit('REQ_SUCCESS', {users})
    } catch (error) {
      // 如果失败, 更新状态(失败)
      commit('REQ_ERROR', '请求失败: ' + error.message)
    }
  }
}