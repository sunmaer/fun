const ajax = require('../../utils/util.js').ajax

Component({
  properties: {

  },

  data: {
    show: false,
    curPic: 'www.fengdu100.com/uploads/allimg/180611/1R4394462-3.jpg',
    picList: [],
    pageNum: 1,
    isAll: false
  },

  ready() {
    ajax('http://www.gamemonkey.cn/joke_feeds_interface.php', {
      type: 2,
      pageNum: this.data.pageNum
    }).then((res) => {
      this.setData({
        picList: res
      })
    }).catch((error) => {
      wx.showToast({
        title: '接口请求失败：' + 'error',
        icon: 'none'
      })
    })
  },

  methods: {
    show (event) {
      this.setData({
        curPic: event.currentTarget.dataset.url,
        show: true
      })
    },
    hide () {
      this.setData({
        show: false
      })
    },
    loadMore() {
      if (this.data.isAll) return
      this.setData({
        pageNum: this.data.pageNum + 1
      })
      ajax('http://www.gamemonkey.cn/joke_feeds_interface.php', {
        type: 2,
        pageNum: this.data.pageNum
      }).then((res) => {
        if (this.data.picList.length === res.length) { // 没有更多数据
          this.setData({
            isAll: true
          })
          return
        }
        this.setData({
          picList: res
        })
      }).catch((error) => {
        wx.showToast({
          title: '接口请求失败：' + 'error',
          icon: 'none'
        })
      })
    }
  }
})
