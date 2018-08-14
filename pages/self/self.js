const getChina = require('../../utils/china.js').getChina

Page({
  data: {
    avatar: '',
    nick: '',
    address: ''
  },
  onLoad () {
    let _this = this
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              if(res && res.userInfo) {
                _this.setData({
                  avatar: res.userInfo.avatarUrl || '//puui.qpic.cn/vupload/0/common_avatar.png/0',
                  nick: res.userInfo.nickName || '微信用户',
                  address: (getChina(res.userInfo.province.toLowerCase()) + '' + getChina(res.userInfo.city.toLowerCase())) || '广东深圳'
                })
              }
            }
          })
        }
      }
    })
  },
  // 我的收藏
  collect () {
    wx.showToast({
      title: '敬请期待',
      icon: 'none'
    })
  },
  // 我的发表
  publish () {
    wx.showToast({
      title: '敬请期待',
      icon: 'none'
    })
  },
  // 关于系统
  about () {
    wx.showModal({
      title: '开心一刻',
      content: '系统版本：1.0\r\n说明：用心创造快乐\r\n开发人员：唯一C位小组',
      showCancel: false,
      success: function (res) {}
    })
  }
})