Page({
  data: {
    title: '',
    content: ''
  },
  changeTit (event) {
    this.setData({
      title: event.detail.value
    })
  },
  changeCon (event) {
    this.setData({
      content: event.detail.value
    })
  },
  publish () {
    if(!this.data.title || !this.data.content) {
      wx.showToast({
        title: '发表失败，请填写完整',
        icon: 'none'
      })
      return
    }
    let _this = this
    // 请求数据
    wx.request({
      url: 'http://www.gamemonkey.cn/add_info.php?type=3',
      data: {
        title: this.data.title,
        content: this.data.content
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res && res.data && res.data.code === "200") {
          wx.showToast({
            title: '恭喜你，发表成功！',
            icon: 'none'
          })
        }
      },
      fail: function (error) {
        wx.showToast({
          title: '接口请求失败' + 'error',
          icon: 'none'
        })
      }
    })
  }
})