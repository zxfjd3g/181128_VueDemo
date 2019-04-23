<template>
  <div>
    <mt-button style="width: 100%" type="primary" @click="test">测试mint-ui</mt-button>
  </div>
</template>
<script>

  import Vue from 'vue'
  import { MessageBox } from 'mint-ui';

  export default {
    methods: {
      test () {
        debugger
        MessageBox('提示', '操作成功');
      }
    }
  }
</script>
<style>

</style>
