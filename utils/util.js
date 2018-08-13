const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
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

/**
 * 图片 URL 相对协议
 * @param {string} url
 * @return {string}
 */
const relativeHttp = (url) => {
  // 图片不支持 https 协议
  // return url ? url.replace(/^http\w*:\/\//g, '//') : ''
  return url
}

/**
 * 图片出错处理
 * @param {object} event
 * @param {string} url
 * @return
 */
const errImgHandler = (event, url) => {
  event.target.src = url
}

module.exports = {
  formatTime: formatTime,
  ajax: ajax,
  relativeHttp: relativeHttp,
  errImgHandler: errImgHandler
}
