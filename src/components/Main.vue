<template>
  <!--组件中的模板能直接访问组件对象的属性-->
  <ul class="todo-main">
    <Item v-for="(todo, index) in todos" :key="index" :todo="todo"
          :deleteTodo="deleteTodo" :index="index" :selectTodo="selectTodo"/>
  </ul>
</template>
<script>
  import Item from './Item.vue'

  export default {
    // 声明接收什么属性: 属性名
    // 所有接收的属性都会成为组件对象属性
    // 组件对象相当于一个小的vm
    props: ['todos', 'deleteTodo', 'selectTodo'],
    components: {
      Item
    }
  }
</script>
<style scoped>
  .todo-main {
    margin-left: 0px;
    border: 1px solid #ddd;
    border-radius: 2px;
    padding: 0px;
  }

  .todo-empty {
    height: 40px;
    line-height: 40px;
    border: 1px solid #ddd;
    border-radius: 2px;
    padding-left: 5px;
    margin-top: 10px;
  }
</style>
