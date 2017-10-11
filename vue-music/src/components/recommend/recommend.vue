<template>
  <div class="recommend">
    <!--记录点2 要再用一层div包裹住轮播图和歌单列表，然后才用scroll组件
       这里初始化scroll是在mounted的钩子时触发的，而数据是异步获取的，这样会导致初始化scroll的时候，
      还没来得及计算数据撑开的高度，所以会失效。因此需要监听data，将实际的数据distList传给data，监听到变化，就再刷新一次
    -->
    <scroll ref="scroll" class="recommend-content" :data = "distList">
      <!--记录点1-->
      <div>
        <div v-if="recommends.length" class="slider-wrapper">
          <Slider>
            <div v-for="item in recommends" :key="item.id">
              <a :href="item.linkUrl">
                <img @load="loadImage" :src="item.picUrl" alt="轮播图片">
              </a>
            </div>
          </Slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li v-for="item in distList" :key="item.id" class="item">
              <div class="icon">
                <img width="60" height="60" v-lazy = "item.imgurl" alt="歌单图片" class="needsclick"/>
              </div>
              <div class="text">
                <h2 class="name" v-html="item.creator.name"></h2>
                <p class="desc" v-html="item.dissname"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="loading-container" v-show="!this.distList.length">
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>
<script type="text/ecmascript-6">
import loading from '@/base/loading/loading'
import scroll from '@/base/scroll/scroll'
import Slider from '@/base/slider/slider'
import { getRecommend, getDistList } from '@/api/recommend'
import {ERR_OK} from '@/api/config'
export default {
  data () {
    return {
      recommends: [],
      distList: []
    }
  },
  created () {
    this._getRecommend()
    this._getDistList()
  },
  methods: {
    _getRecommend () {
      getRecommend().then((res) => {
        if (res.code === ERR_OK) {
          this.recommends = res.data.slider
        }
      })
    },
    _getDistList () {
      getDistList().then((res) => {
        if (res.code === ERR_OK) {
          this.distList = res.data.list
        }
      })
    },
    loadImage () {
      if (!this.checkloaded) {
        this.$refs.scroll.refresh()
        this.checkloaded = true
      }
    }
    /* 优化的步骤，让轮播图的图片加载之后，重新refresh下scroll，保证轮播的图片高度能够被计算进去
       且使用标记位，这种手法记住。此处只需要一张图加载完成，就刷新就可以了。不必每张图片加载都刷新。
    */
  },
  components: {
    Slider, scroll, loading
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/variable"
  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)

</style>
