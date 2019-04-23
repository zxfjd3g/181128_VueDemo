<template>
  <div>
    <p>click {{count}} times, count is {{evenOrOdd}}</p>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
    <button @click="incrementIfOdd">increment if odd</button>
    <button @click="incrementAsync"> increment async</button>
  </div>
</template>
<script>

  export default {

    data() {
      return {
        count: 0
      }
    },

    computed: {
      evenOrOdd() {
        return this.count % 2 === 0 ? '偶数' : '奇数'
      }
    },

    methods: {
      increment() {
        this.count++
      },
      decrement() {
        this.count--
      },
      incrementIfOdd() {
        if (this.count % 2 === 1) {
          this.count++
        }
      },
      incrementAsync() {
        setTimeout(() => {
          this.count++
        }, 1000)
      },
    }
  }
</script>
<style>

</style>
