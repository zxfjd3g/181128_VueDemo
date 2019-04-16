<template>
  <div>
    <h2>App组件</h2>
    <img src="./assets/logo.png" alt="logo">

    <HelloWorld/>
    <hello-world/>
  </div>
</template>
<script>
  import HelloWorld from './components/HelloWorld.vue'
  export default {
    components: {
      HelloWorld
    }
  }
</script>
<style>

</style>
