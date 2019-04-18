<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <Header @addTodo="addTodo"/>
      <Main :todos="todos"/>
      <Footer>
        <input slot="left" type="checkbox" v-model="checkAll"/>
        <span slot="middle">已完成{{completedCount}} / 全部{{todos.length}}</span>
        <button slot="right" class="btn btn-danger" v-show="completedCount>0" @click="deleteAllCompleted">清除已完成任务</button>
      </Footer>
    </div>
  </div>
</template>
<script>
  import PubSub from 'pubsub-js'

  import vm from './vm'
  // import Header from './components/Header.vue'
  import Main from './components/Main.vue'
  import Footer from './components/Footer.vue'
  import storageUtils from './utils/storageUtils'

  export default {

    data () {
      return {
        todos: storageUtils.getTodos()
      }
    },

    mounted () {
      // 订阅消息
      PubSub.subscribe('deleteTodo', (msgName, index) => {
        this.deleteTodo(index)
      })
      // 绑定自定义监听
      vm.$on('selectTodo', (todo, isCheck) => {
        this.selectTodo(todo, isCheck)
      })
    },

    computed: {
      // 已完成的数量
      completedCount () {
        return this.todos.reduce((pre, todo) => pre + (todo.completed ? 1 : 0), 0)
      },

      // 是否全全选
      checkAll: {
        get () {
          return this.todos.length=== this.completedCount && this.completedCount>0
        },

        set (val) {//  勾选状态已经发生了改变
          // 更新todos中所有todo的completed值
          this.slectAllTodos(val)
        }
      }

    },

    methods: {
      // 添加todo
      addTodo (todo) {
        this.todos.unshift(todo)
      },

      // 删除todo
      deleteTodo (index) {
        this.todos.splice(index, 1)
      },

      // 对所有todo进行全选或全不选
      slectAllTodos (isCheck) {
        this.todos.forEach(todo => todo.completed = isCheck)
      },

      // 删除所有已完成的
      deleteAllCompleted () {
        this.todos = this.todos.filter(todo => !todo.completed)
      },

      selectTodo (todo, isCheck) {
        todo.completed = isCheck
      }


    },

    watch: {
      todos: {
        deep: true, // 深度监视
        /*handler: function (val) {  // todos发生了任何改变都会调用
          // 将todos最新的值保存到local
          // localStorage.setItem('todos_key', JSON.stringify(val))
          storageUtils.saveTodos(val)
        }*/
        handler: storageUtils.saveTodos
        /*handler: function (todos) {
          localStorage.setItem('todos_key', JSON.stringify(todos))
        }*/
      }
    },

    components: {
      // Header,
      Main,
      Footer
    }
  }
</script>
<style>
  .todo-container {
    width: 600px;
    margin: 0 auto;
  }

  .todo-container .todo-wrap {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
</style>
