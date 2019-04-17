<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <Header :addTodo="addTodo"/>
      <Main :todos="todos" :deleteTodo="deleteTodo" :selectTodo="selectTodo"/>
      <Footer :todos="todos" :slectAllTodos="slectAllTodos" :deleteAllCompleted="deleteAllCompleted"/>
    </div>
  </div>
</template>
<script>
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
