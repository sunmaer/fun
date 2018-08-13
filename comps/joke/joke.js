const ajax = require('../../utils/util.js').ajax

Component({
  properties: {},

  data: {
    jokeList: [],
    pageNum: 1,
    isAll: false
  },
  ready () {
    ajax('http://www.gamemonkey.cn/joke_feeds_interface.php', {
      type: 3,
      pageNum: this.data.pageNum
    }).then((res) => {
      this.setData({
        jokeList: res
      })
    }).catch((error) => {
      wx.showToast({
        title: '接口请求失败：' + 'error',
        icon: 'none'
      })
    })
  },
  
  methods: {
    detail() {
      wx.navigateTo({
        url: '/pages/detail/detail',
      })
    },
    // 上拉加载数据
    loadMore () {
      if(this.data.isAll) return
      this.setData({
        pageNum: this.data.pageNum + 1
      })
      ajax('http://www.gamemonkey.cn/joke_feeds_interface.php', {
        type: 3, 
        pageNum: this.data.pageNum
      }).then((res) => {
        if(this.data.jokeList.length === res.length) { // 没有更多数据
          this.setData({
            isAll: true
          })
          return
        }
        this.setData({
          jokeList: res
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