//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    width: 0,
    height: 0
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  gotoweather: function () {
    wx.navigateTo({
      url: '../weather/weather'
    })
  },
  onLoad: function () {
    var that = this;
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

    wx.getSystemInfo({
      success: function (res) {
        that.width = res.windowWidth;
        that.height = res.windowHeight;
      }
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  onReady: function(){
    this.startanimation();
  },
  startanimation: function(){
    var ctx = wx.createCanvasContext('backcanvas');
    var width = this.width;
    var height = this.height;
    //如果浏览器支持requestAnimFrame则使用requestAnimFrame否则使用setTimeout  
    //setTimeout(this, 1000 / 60);
    // 波浪大小
    var boHeight = height / 10;
    var posHeight = height / 1.6;
    //初始角度为0  
    var step = 0;
    //定义三条不同波浪的颜色  
    var lines = ["rgba(0,222,255, 0.2)",
      "rgba(157,192,249, 0.2)",
      "rgba(0,168,255, 0.2)"];
    function loop() {
      ctx.clearRect(0, 0, width, height);
      step++;
      //画3个不同颜色的矩形  
      for (var j = lines.length - 1; j >= 0; j--) {
        //ctx.fillStyle = lines[j];
        ctx.setFillStyle(lines[j]);
        //每个矩形的角度都不同，每个之间相差45度  
        var angle = (step + j * 50) * Math.PI / 180;
        var deltaHeight = Math.sin(angle) * boHeight;
        var deltaHeightRight = Math.cos(angle) * boHeight;
        ctx.beginPath();
        ctx.moveTo(0, posHeight + deltaHeight);
        ctx.bezierCurveTo(width / 2, posHeight + deltaHeight - boHeight, width / 2, posHeight + deltaHeightRight - boHeight, width, posHeight + deltaHeightRight);
        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.lineTo(0, posHeight + deltaHeight);
        ctx.closePath();
        ctx.fill();     

      }
      ctx.draw();
      setTimeout(loop,1000/60);
    }
    loop();
  }
})
