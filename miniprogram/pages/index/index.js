//index.js
const app = getApp()
const bmap = require('../../utils/bmap-wx.min.js');
// 今日天气类
class TodayWeather {
  constructor(city, temp, weather, pm25, pm25Level, wind) {
    this.city = city;
    this.temp = temp;
    this.weather = weather;
    this.pm25 = pm25;
    this.pm25Level = pm25Level;
    this.wind = wind;
  }
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    runCount: 0,
    BMap: null,
    // 判断接口是否请求完
    isPedding: true,
    // 首页通知
    barText: '',
    // 天气类
    weatherClass: {},
    // 今日显示
    weatherToday: new TodayWeather()
  },
  // 获取运动步数
  getRunData() {
    wx.getWeRunData({
      success: (res) => {
        let cloudId = res.cloudID;
        wx.cloud.callFunction({
          name: 'getRunData',
          data: {
            weRunData: wx.cloud.CloudID(cloudId)
          },
          success: ({ result }) => {
            console.log(result, 'result');
            const todayRunCount = result[result.length - 1].step;
            this.setData({
              runCount: todayRunCount
            })
          }
        })
      }
    })
  },
  // pm2.5等级
  getPm25Level(num) {
    let level = '';
    let bgColor = '';
    switch(true) {
      case num <= 35:
        level = '优'
        bgColor = 'grren';
        break;
      case num <= 75:
        level = '良'
        bgColor = 'yellow';
        break;
      case num <= 115:
        level = '轻度污染'
        bgColor = 'organge';
        break;
      case num <= 150:
        level = '中度污染'
        bgColor = 'red';
        break;
      case num <= 250:
        level = '重度污染'
        bgColor = 'pruple';
        break;
      default: 
        level = '严重污染'
        bgColor = 'brown';
    }
    return {
      level,
      bgColor
    };
  },
  // 获取天气处理天气数据
  getWeather() {
    this.data.BMap.weather({
      success: (res) => {
        let barText = res.originalData.results[0].index[0].des;
        let weaherIcon = res.originalData.results[0].index;
        let weatherData = res.originalData.results[0].weather_data;
        weatherData[0].date = weatherData[0].date.slice(0, 2);
        // let weatherToday = res.currentWeather[0];
        // 今日天气卡片类
        let weatherToday = new TodayWeather(
          res.currentWeather[0].currentCity,
          res.currentWeather[0].date.split(' ')[2].slice(0, -1).slice(4),
          res.currentWeather[0].weatherDesc,
          res.currentWeather[0].pm25,
          this.getPm25Level(res.currentWeather[0].pm25),
          res.currentWeather[0].wind
        );
        this.setData({
          weatherClass: { weaherIcon, weatherData },
          weatherToday,
          barText,
          isPedding: false,
        })
        console.log(res, 'weawww');
        console.log(this.data.weatherClass, 'dddwwww');
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getRunData();
    this.setData({
      BMap: new bmap.BMapWX({
        ak: 'lL1PUa4x1xZSvfqT1j5fIvaQs9UtUbAp'
      })
    })
    this.getWeather()
  },
  goToLife(e) {
    let lifeValue = JSON.stringify(e.currentTarget.dataset.life);
    wx.navigateTo({
      url: '/pages/lifeDetail/lifeDetail?lifeValue=' + lifeValue
    })

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
    console.log(1);
    this.getRunData();
    this.getWeather()
    setTimeout(function () {
      // 不加这个方法真机下拉会一直处于刷新状态，无法复位
      wx.stopPullDownRefresh()
      // wx.pageScrollTo({
      //   scrollTop: 0,
      // })
      console.log(2);
    }, 2000)
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