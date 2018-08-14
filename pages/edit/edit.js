Page({
  data: {
    title: '',
    content: '',
    count: 0,
    disabled: false
  },
  changeTit (event) {
    this.setData({
      title: event.detail.value
    })
  },
  changeCon (event) {
    this.setData({
      content: event.detail.value,
      count: event.detail.value.length <= 200 ? event.detail.value.length : 200
    })
  },
  publish () {
    if(this.data.disabled) return
    if(!this.data.title || !this.data.content) {
      wx.showToast({
        title: '请填写完整内容',
        icon: 'none'
      })
      return
    }
    this.setData({
      disabled: true
    })
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
          _this.setData({
            disabled: false
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