<template>
  <div>
    <div class="row">
      <div class="col-xs-offset-2 col-xs-8">
        <div class="page-header"><h2>Router Basic - 01</h2></div>
      </div>
    </div>

    <div class="row">
      <div class="col-xs-2 col-xs-offset-2">
        <div class="list-group">
          <!--显示路由链接-->
          <router-link class="list-group-item" to="/about">About</router-link>
          <router-link class="list-group-item" to="/home">Home</router-link>
        </div>
      </div>
      <div class="col-xs-6">
        <div class="panel">
          <div class="panel-body">
            <!--缓存通过router-view它显示的路由组件对象-->
            <keep-alive>
              <!--显示当前路由组件-->
              <router-view msg="abc"/>
            </keep-alive>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

  import Vue from 'vue'

  export default {
    
    mounted () {
      console.log(this instanceof Vue, this, this.__proto__.__proto__===Vue.prototype)
    }
  }
</script>
<style>

</style>
