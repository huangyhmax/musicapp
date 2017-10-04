<template>
  <div id="app">
    <Mheader></Mheader>
    <Tab></Tab>
    <router-view></router-view>
  </div>
</template>

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
