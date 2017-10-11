<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'

  export default {
    props: {
      probeType: {
        type: Number,
        default: 1
      },
      click: {
        type: Boolean,
        default: true
      },
      listenScroll: {
        type: Boolean,
        default: false
      },
      data: {
        type: Array,
        default: null
      }
    },
    mounted () {
      /* 为了确保dom渲染后才往下执行，所以用settimeout */
      setTimeout(() => {
        this._initScroll()
      }, 20)
    },
    methods: {
      _initScroll () {
        if (!this.$refs.wrapper) {
          return
        }
        this.scroll = new BScroll(this.$refs.wrapper, {
          probeType: this.probeType,
          click: this.click
        })

        if (this.listenScroll) {
          let me = this
          this.scroll.on('scroll', (pos) => {
            me.$emit('scroll', pos)
          })
        }
      },
      disable () {
        /* &&运算符，就是左边为真时，就计算右边。如果左边为假，就不计算右边，直接return false
          此处为有this.scroll的情况下，才执行this.scroll.disable()右边的这些
          对应还有  || 运算符
        */
        this.scroll && this.scroll.disable()
      },
      enable () {
        this.scroll && this.scroll.enable()
      },
      refresh () {
        this.scroll && this.scroll.refresh()
      },
      scrollTo () {
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
      },
      scrollToElement () {
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
      }
    },
    watch: {
      data () {
        setTimeout(() => {
          this.refresh()
        }, 20)
      }
    }
    /* 监听数据，如果data有变化，就间隔20毫秒后调用定义的刷新方法。因为数据变化了，所以需要重新计算scroll的高度
      使用监听的方法，而不必手动调用this.scroll.refresh()
    */
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
