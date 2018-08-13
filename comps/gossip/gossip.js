const ajax = require('../../utils/util.js').ajax
const relativeHttp = require('../../utils/util.js').relativeHttp
const errImgHandler = require('../../utils/util.js').errImgHandler

Component({
  properties: {},

  data: {
    picList: [],
    pageNum: 1,
    isAll: false
  },

  ready() {
    ajax('http://www.gamemonkey.cn/joke_feeds_interface.php', {
      type: 1,
      pageNum: this.data.pageNum
    }).then((res) => {
      if(res) {
        res.forEach((item, index, arr) => {
          item.content = relativeHttp(item.content)
        })
        this.setData({
          picList: res
        })
      }
    }).catch((error) => {
      wx.showToast({
        title: '接口请求失败：' + 'error',
        icon: 'none'
      })
    })
  },

  methods: {
    errImg (event) {
      errImgHandler(event, 'https://puui.qpic.cn/vupload/0/common_pic_h.png/0')
    },
    // 上拉加载数据
    loadMore() {
      if (this.data.isAll) return
      this.setData({
        pageNum: this.data.pageNum + 1
      })
      ajax('http://www.gamemonkey.cn/joke_feeds_interface.php', {
        type: 1,
        pageNum: this.data.pageNum
      }).then((res) => {
        if (res && this.data.picList.length === res.length) { // 没有更多数据
          this.setData({
            isAll: true
          })
          return
        }
        if(res) {
          res.forEach((item, index, arr) => {
            item.content = relativeHttp(item.content)
          })
          this.setData({
            picList: res
          })
        }
      }).catch((error) => {
        wx.showToast({
          title: '接口请求失败：' + 'error',
          icon: 'none'
        })
      })
    }
  }
})