<!-- 插槽：slide包裹的dom会被插入到slot所在的位置 -->
<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot>
      </slot>
    </div>
    <div class="dots">
      <span class="dot" v-for="(item,index) in this.dots" :key="item"
      :class="{active: currentPageIndex === index}"
      ></span>
    </div>
  </div>
</template>
<script type="text/ecmascript6">
import BScroll from 'better-scroll'
import { addClass } from '@/common/js/dom'
export default {
  data (){
    return {
      dots: [],
      currentPageIndex: 0
    }
  },
  props: {
    /* 循环播放属性 */
    loop: {
      type: Boolean,
      default: true
    },
    /* 自动播放属性 */
    autoPlay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 4000
    }
  },
  mounted() {
    setTimeout(() => {
      this._setSlideWidth()
      this._initDots()
      if (this.autoPlay) {
        this._play()
      }
      this._initSlide()
    }, 20)
    /* 记录点2,监听resize事件。刷新页面。 */
    window.addEventListener('resize', () => {
      if(!this.slider){
        return
      }
      this._setSlideWidth(true)
      this.slider.refresh()
    })
  },
  methods: {
    _setSlideWidth(isResize) {
      this.children = this.$refs.sliderGroup.children
      let width = 0
      let sliderWidth = this.$refs.slider.clientWidth  /* 父容器的宽度 */
      for (let i= 0; i < this.children.length; i++) {
        let child = this.children[i]
        addClass(child, 'slider-item')
        child.style.width = sliderWidth + 'px'
        width += sliderWidth
      }
      if (this.loop && !isResize) { /* loop为true,就是循环。则需要左右各克隆两个dom，保证左右循环切换 */
        width += 2 * sliderWidth
      }
      this.$refs.sliderGroup.style.width = width + 'px'
    },
    _initDots() {
      this.dots = new Array(this.children.length)
    },
    _initSlide() {
       this.slider = new BScroll(this.$refs.slider, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        snap: {
          loop: this.loop,
          threshold: 0.3,
          speed: 400
        },
        click: this.click
      })
      /* 这里让滚动和currentPageIndex结合在一起 */
      this.slider.on('scrollEnd', () => {
        let pageIndex = this.slider.getCurrentPage().pageX
        if(this.loop){
          pageIndex -= 1
        }
        this.currentPageIndex = pageIndex
        /* 此次实现无限自动联播 */
        if (this.autoPlay) {
          clearTimeout(this.timer)
          this._play()
        }
      })
    },
    _play() {
      // let pageIndex = this.slider.getCurrentPage().pageX + 1
      let pageIndex = this.currentPageIndex + 1
      if (this.loop) {
        pageIndex += 1
      }
      this.timer = setTimeout(() => {
        this.slider.goToPage(pageIndex, 0, 400)
      }, this.interval)
    }
  },
  destroyed() {
    clearTimeout(this.timer)
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/variable"
  .slider
    min-height: 1px
    .slider-group
      position: relative
      overflow: hidden
      white-space: nowrap
      .slider-item
        float: left
        box-sizing: border-box
        overflow: hidden
        text-align: center
        a
          display: block
          width: 100%
          overflow: hidden
          text-decoration: none
        img
          display: block
          width: 100%
    .dots
      position: absolute
      right: 0
      left: 0
      bottom: 12px
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: $color-text-l
        &.active
          width: 20px
          border-radius: 5px
          background: $color-text-ll
</style>

