<template>
  <div>
    <h2>About</h2>
    <p>{{msg}}</p>
    <input type="text">
  </div>
</template>
<script>
  import {mixin1} from '../mixins'

  export default {
    mixins: [mixin1],
    props: {
      msg: String
    },

    data () {
      return {
        msg2: 'atguigu'
      }
    },
  }
</script>
<style scoped>

</style>