<template>
  <ul>
    <li>id: {{messageDetail.id}}</li>
    <li>title: {{messageDetail.title}}</li>
    <li>content: {{messageDetail.content}}</li>
  </ul>
</template>
<script>
  const allMessageDetails = [
    {id: 1, title: 'message001', content: 'message content001'},
    {id: 3, title: 'message003', content: 'message content003'},
    {id: 5, title: 'message005', content: 'message content005'},
  ]

  export default {
    data () {
      return {
        messageDetail: {}
      }
    },

    // 第一次显示之后调用(只调用一次)
    mounted () {
      console.log('detail mounted()')
      // 根据请求参数id查找对应的detail对象
      const id = this.$route.params.id - 0
      this.showDetail(id)
    },

    watch: {
      $route (value) { // 说明请求路径参数变了
        const id = value.params.id * 1
        this.showDetail(id)
      }
    },

    methods: {
      /*
      根据id查找对应的detail显示
       */
      showDetail (id) {
        setTimeout(() => {
          const detail = allMessageDetails.find(detail => detail.id===id)
          this.messageDetail = detail
        }, 1000)
      }
    }

  }
</script>
<style scoped>

</style>