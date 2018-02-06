// pages/weather/weather.js
Page({
  data: {
    duration: 2000,
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    loading: false,
    plain: false
  },
  onLoad: function () {
    var that = this//不要漏了这句，很重要
    wx.request({
      url: 'http://news-at.zhihu.com/api/4/news/latest',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        //将获取到的json数据，存在名字叫zhihu的这个数组中
        that.setData({
          zhihu: res.data.stories,
          //res代表success函数的事件对，data是固定的，stories是是上面json数据中stories

        })
        console.log(res.data.stories)
      }
    })

  }
})