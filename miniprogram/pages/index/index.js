//index.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showTemp: wx.getStorageSync('userInfo') || ''
  },
  // 获取当前位置
  getCurrentPos() {
    wx.getLocation({
      type: 'wgs84',
      success:(res) => {
        var latitude = res.latitude
        var longitude = res.longitude
        console.log("lat:" + latitude + "lon:" + longitude)
        this.getCity(latitude, longitude);
      }
    })
  },

  //调用百度地图API获取位置详细信息
  getCity(latitude, longitude) {
    var that = this
    var url = "https://api.map.baidu.com/reverse_geocoding/v3/";
    var params = {
      ak: "lL1PUa4x1xZSvfqT1j5fIvaQs9UtUbAp",
      output: "json",
      location: latitude + "," + longitude
    }
    wx.request({
      url: url,
      data: params,
      success:  (res) => {
        console.log(res);
        this.getWeather(res.data.result.addressComponent.city)
      },
    })
  },
  getWeather (city) {
    var that = this
    var url = "https://api.seniverse.com/v3/weather/daily.json"
    var params = {
      location: city,
      key: "SKDJ5b2kJ6_fuJFO6"
    }
    wx.request({
      url: url,
      data: params,
      success: function (res) {
        console.log(res)
      },
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      showTemp: wx.getStorageSync('userInfo')
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})