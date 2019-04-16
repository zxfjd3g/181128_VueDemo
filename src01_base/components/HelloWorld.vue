<template>
  <div>
    <h2>{{title}}</h2>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        title: 'HelloWorld组件'
      }
    }
  }
</script>
<style scoped>
  h2 {
    color: red;
  }
</style>
