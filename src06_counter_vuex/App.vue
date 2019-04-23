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

  import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'

  export default {

    computed: {
      ...mapState(['count']),  // {'count' () {return this.$store.state['count']}}
      /*...mapState({
        count2: 'count'
      }),*/
      ...mapGetters(['evenOrOdd']), // {'evenOrOdd' () {return this.$store.getters['evenOrOdd']}}
    },

    methods: {
      ...mapMutations({
        increment: 'INCREMENT',
        decrement: 'DECREMENT'
      }),
      ...mapActions(['incrementIfOdd', 'incrementAsync'])
    }

    /*computed: {
      count () {
        return this.$store.state.count
      },
      evenOrOdd () {
        return this.$store.getters.evenOrOdd
      }
    },*/

    /*methods: {
      increment() {
        this.$store.commit('INCREMENT') // 触发对应的mutation调用
      },
      decrement() {
        this.$store.commit('DECREMENT')
      },
      incrementIfOdd() {
        this.$store.dispatch('incrementIfOdd')  // 触发对应的action调用
      },
      incrementAsync() {
        console.log('---')
        this.$store.dispatch('incrementAsync')
      },
    }*/
  }
</script>
<style>

</style>
