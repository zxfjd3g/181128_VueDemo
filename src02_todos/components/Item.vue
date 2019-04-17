<template>
  <li :style="{background: bgColor}" @mouseenter="handleEnter(true)" @mouseleave="handleEnter(false)">
    <label>
      <input type="checkbox" v-model="completed"/>
      <span>{{todo.title}}</span>
    </label>
    <button class="btn btn-danger" v-show="isShow" @click="deleteItem">删除</button>
  </li>
</template>
<script>
  export default {
    props: { // 指定了属性名, 属性值的类型
      todo: Object,
      deleteTodo: Function,
      index: Number,
      selectTodo: Function
    },
    data () {
      return {
        bgColor: 'white',
        isShow: false,
      }
    },

    // 为第一次渲染显示做一个同步的准备工作
    beforeMount () {
      // 根据接收的todo来指定completed
      this.completed = this.todo.completed
    },

    // 在第一次显示后, 立即做一个异步工作(发ajax请求, 启动定时器)
    mounted () {
      // this.completed = this.todo.completed
    },

    methods: {
      handleEnter (isEnter) {
        if(isEnter) {
          this.bgColor = '#cccccc'
          this.isShow = true
        } else {
          this.bgColor = '#ffffff'
          this.isShow = false
        }
      },

      deleteItem () {
        if (confirm('确定删除吗?')) {
          this.deleteTodo(this.index)
        }
      }
    },

    computed: {
      completed: {
        get () {
          console.log('get()')
          return this.todo.completed
        },

        set (value) {
          console.log('set()')
          this.selectTodo(this.todo, value)
        }
      }
    }
  }
</script>
<style scoped>
  li {
    list-style: none;
    height: 36px;
    line-height: 36px;
    padding: 0 5px;
    border-bottom: 1px solid #ddd;
  }

  li label {
    float: left;
    cursor: pointer;
  }

  li label li input {
    vertical-align: middle;
    margin-right: 6px;
    position: relative;
    top: -1px;
  }

  li button {
    float: right;
    margin-top: 3px;
  }

  li:before {
    content: initial;
  }

  li:last-child {
    border-bottom: none;
  }
</style>
