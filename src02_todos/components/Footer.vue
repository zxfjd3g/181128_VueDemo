<template>
  <div class="todo-footer">
    <label>
      <input type="checkbox" v-model="checkAll"/>
    </label>
    <span>
          <span>已完成{{completedCount}}</span> / 全部{{todos.length}}
        </span>
    <button class="btn btn-danger" v-show="completedCount>0" @click="deleteAllCompleted">清除已完成任务</button>
  </div>
</template>
<script>
  export default {
    props: {
      todos: Array,
      slectAllTodos: Function,
      deleteAllCompleted: Function
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

    }
  }
</script>
<style scoped>
  .todo-footer {
    height: 40px;
    line-height: 40px;
    padding-left: 6px;
    margin-top: 5px;
  }

  .todo-footer label {
    display: inline-block;
    margin-right: 20px;
    cursor: pointer;
  }

  .todo-footer label input {
    position: relative;
    top: -1px;
    vertical-align: middle;
    margin-right: 5px;
  }

  .todo-footer button {
    float: right;
    margin-top: 5px;
  }

</style>
