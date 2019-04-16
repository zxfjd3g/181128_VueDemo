<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <Header :addTodo="addTodo"/>
      <Main :todos="todos"/>
      <Footer/>
    </div>
  </div>
</template>
<script>
  import Header from './components/Header.vue'
  import Main from './components/Main.vue'
  import Footer from './components/Footer.vue'

  export default {

    data () {
      return {
        todos: [
          {completed: false, title: '吃饭'},
          {completed: true, title: '睡觉'},
          {completed: false, title: '打代码'},
        ]
      }
    },

    methods: {
      // 添加todo
      addTodo (todo) {
        this.todos.unshift(todo)
      }
    },

    components: {
      Header,
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
