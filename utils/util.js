const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/** 
 * 数据请求
 * @param {string} url
 * @param {object} data
 * @param {string} method
 * @retrun {promise}
 */
const ajax = (url, data, method) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      data: data,
      method: method || 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res && res.data && res.data.code === "200") {
          resolve(res.data.data)
        }
      },
      fail: function (error) {
        reject(error)
      }
    })
  })
}

module.exports = {
  formatTime: formatTime,
  ajax: ajax
}
