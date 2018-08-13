Component({
  properties: {

  },

  data: {
    show: false,
    picList: []
  },

  ready() {
    let _this = this
    // 请求数据
    wx.request({
      url: 'http://www.gamemonkey.cn/joke_feeds_interface.php?type=3',
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res && res.data && res.data.code === "200") {
          _this.setData({
            picList: res.data.data
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
  },

  methods: {
    show () {
      this.setData({
        show: true
      })
    },
    hide () {
      this.setData({
        show: false
      })
    }
  }
})
