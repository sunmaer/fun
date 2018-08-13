var sliderWidth = 110; // 需要设置slider的宽度，用于计算中间位置

Page({
  data: {
    tabs: ["搞笑段子", "趣味动图", "表情包"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0
  },
  onLoad: function () {
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        })
      }
    })
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    })
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '开心一刻，不负好笑话',
      path: 'https://v.qq.com',
      imageUrl: 'http://www.fengdu100.com/uploads/allimg/180611/1R4394462-3.jpg'
    }
  }
})