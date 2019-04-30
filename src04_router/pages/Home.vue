<template>
  <div>
    <h2>Home</h2>
    <div>
      <ul class="nav nav-tabs">
        <li>
          <router-link to="/home/news">News</router-link>
        </li>
        <li>
          <router-link to="/home/message">Message</router-link>
        </li>
      </ul>
      <router-view/>
    </div>
  </div>
</template>
<script>
  import {mixin1} from '../mixins'

  export default {
    mixins: [mixin1],

    methods: {
      test2 () {
        console.log('test2()')
      }
    }
  }
</script>
<style scoped>

</style>