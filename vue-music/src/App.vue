<template>
  <div id="app">
    <Mheader></Mheader>
    <Tab></Tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<!--
keep-alive主要用于保留组件状态或避免重新渲染。记录点3
这里避免tab切换，然后轮播图要反复发送请求
-->
<script>
import Mheader from '@/components/m-header/m-header'
import Tab from '@/components/tab/tab'
export default {
  name: 'app',
  components: {
    Mheader,
    Tab
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
// @import "./common/stylus/index"
@import "common/stylus/variable"
#app {
  // color: $color-theme;
}
</style>
