<template>
  <div>
    <h2 v-if="!repoName">LOAGING...</h2>
    <h3 v-else>
      most star repo is <a :href="repoUrl">{{repoName}}</a>
    </h3>
  </div>
</template>
<script>
  import axios from 'axios'

  export default {
    data () {
      return {
        repoName: '', // 仓库的名称
        repoUrl: '', // 仓库的url
      }
    },

    async mounted () {

      const url = `https://api.github.com/search/repositories2?q=v&sort=stars`

      // 使用vue-resource发送异步ajax请求
      /*this.$http.get(url).then(response => { // 请求成功了
        // 取出数据
        const result = response.data
        const {name, html_url} = result.items[0]
        // 更新状态数据
        this.repoName = name
        this.repoUrl = html_url
      }).catch(error => { // 请求出错了
        alert('请求出错了')
      })*/

      // 使用axios发送异步ajax请求
      /*axios.get(url).then(response => { // 请求成功了
        // 取出数据
        const result = response.data
        const {name, html_url} = result.items[0]
        // 更新状态数据
        this.repoName = name
        this.repoUrl = html_url
      }).catch(error => { // 请求出错了
        alert('请求出错了222')
      })*/

      try {
        const response = await axios.get(url)
        // 取出数据
        const result = response.data
        const {name, html_url} = result.items[0]
        // 更新状态数据
        this.repoName = name
        this.repoUrl = html_url
      } catch(error) { // reject(error)
        alert('请求出错了222')
      }

    }
  }

  /*
  1. async/await的作用
     1). 简化promise的使用编码, 不通过then()/catch()来指定回调函数
     2). 以同步编码方式实现异步流程
  2. 哪里用await?
     在返回promise的表达式的左侧  ===> 不想要promise, 而想要promise异步返回的成功的结果(reslove(response))
  3. 哪里用async
     await所在函数定义的左侧
   */
</script>
<style>
  .todo-container {
    width: 600px;
    margin: 0 auto;
  }

  .todo-container .todo-wrap {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
</style>
