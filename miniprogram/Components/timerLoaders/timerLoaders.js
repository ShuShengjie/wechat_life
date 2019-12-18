// Components/timerLoaders/timerLoaders.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isPlay: {
      type: Boolean,
      value: true,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    iconImage: 'timer-play'
  },
  pageLifetimes: {
    show() {
      this.setData({
        iconImage: this.data.isPlay ? 'timer-play' : 'timer-pause'
      })
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    changeState() {
      this.setData({
        iconImage: this.data.isPlay ? 'timer-pause' : 'timer-play'
      })
      this.triggerEvent('changePlay', !this.data.isPlay);
    }
  }
})
