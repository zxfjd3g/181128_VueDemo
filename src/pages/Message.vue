<template>
  <ul>
    <li v-for="m in messages" :key="m.id">
      <router-link to="???">{{m.title}}</router-link>
    </li>
  </ul>
</template>
<script>
  export default {
    data () {
      return {
        messages: []
      }
    },

    mounted () {
      // 模拟发异步ajax请求, 获取messages
      setTimeout(() => {
        const messages = [
          {id: 1, title: 'message001'},
          {id: 3, title: 'message003'},
          {id: 5, title: 'message005'},
        ]
        this.messages = messages
      }, 1000)
    }
  }
</script>
<style scoped>

</style>