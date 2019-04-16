<template>
  <div class="todo-header">
    <input type="text" placeholder="请输入你的任务名称，按回车键确认" v-model="title" @keyup.enter="add"/>
  </div>
</template>
<script>
  export default {

    props: {
      addTodo: { // 指定属性名, 属性值的类型, 属性性的必要性
        type: Function,
        reuired: true
      }
    },
    data () {
      return {
        title: ''
      }
    },

    methods: {
      add () {
        // 1. 得到输入数据
        const title = this.title.trim()
        if(!title) {
          return alert('必须输入')
        }
        // 2. 封装成todo对象
        const todo = {
          title,
          completed: false
        }
        // 3. 调用 addTodo添加todo并显示
        this.addTodo(todo)

        // 4. 清除输入
        this.title = ''
      }
    }
  }
</script>
<style scoped>
  .todo-header input {
    width: 560px;
    height: 28px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 4px 7px;
  }

  .todo-header input:focus {
    outline: none;
    border-color: rgba(82, 168, 236, 0.8);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(82, 168, 236, 0.6);
  }
</style>
