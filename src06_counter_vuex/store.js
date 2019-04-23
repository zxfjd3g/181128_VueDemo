/*
vuex最核心的管理对象store
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

/*
包含n个状态数据的对象, 相当于data
 */
const state = {
  count: 1
}

/*
包含n个用于直接更新状态数据方法的对象
    不能包含异步代码
 */
const mutations = {
  // 增加1
  INCREMENT (state) {
    state.count++
  },

  // 减少1
  DECREMENT (state) {
    state.count--
  }
}

/*
包含n个用于间接更新状态数据方法的对象
  可能包含逻辑代码
  可能包含异步代码

 */
const actions = {
  /*increment ({commit}) {
    // 提交mutation: 执行commit(), 触发对应的mutation调用
    commit('INCREMENT')
  },

  decrement ({commit}) {
    // 提交mutation: 执行commit(), 触发对应的mutation调用
    commit('DECREMENT')
  },*/

  incrementIfOdd ({commit, state}) {
    if (state.count %2 === 1) {
      commit('INCREMENT')
    }
  },

  incrementAsync ({commit}) {
    setTimeout(() => {
      commit('INCREMENT')
    }, 1000)
  },

}

/*
包含n个计算属性getter方法的对象
 */
const getters = {
  evenOrOdd (state) {
    return state.count%2===0 ? '偶数' : '奇数'
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})