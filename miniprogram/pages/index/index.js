import * as echarts from '../../ec-canvas/echarts';
//index.js
const app = getApp()

// function initChart(canvas, width, height, count, total) {
//   const chart = echarts.init(canvas, null, {
//     width: width,
//     height: height
//   });
//   canvas.setChart(chart);
//   setOption(chart, count, total);

//   return chart;
// }

// function setOption(chart, count, total) {
//   let runCount = (count / total) * 100 || 0;
//   let option = {
//     backgroundColor: "transparent",
//     series: [{
//       color: ["#91bef0", "#DCDCDC"],
//       name: '今日步数',
//       type: 'pie',
//       radius: ['85%', '100%'],
//       avoidLabelOverlap: false,
//       label: {
//         normal: {
//           show: true,
//           position: 'center'
//         },
//         emphasis: {
//           show: true,
//           textStyle: {
//             fontSize: '10',
//             fontWeight: 'bold'
//           },
//         }
//       },
//       labelLine: {
//         normal: {
//           show: false
//         }
//       },
//       data: [{
//         value: runCount,
//         name: count ? count : '0',
//         label: {
//           normal: {
//             textStyle: {
//               fontSize: '20',
//               fontWeight: 'bold'
//             },
//           }
//         },
//       },
//       {
//         value: 100 - runCount,
//         name: '今日步数',
//         label: {
//           normal: {
//             textStyle: {
//               fontSize: '14',
//               color: '#999',
//               fontWeight: 'bold'
//             },
//             padding: [-70, 0, 0, 0]
//           }
//         },
//       }
//       ]
//     }]
//   };
//   chart.setOption(option);
// }

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showTemp: wx.getStorageSync('userInfo') || '',
    ec: {
    },
    // 判断接口是否请求完
    isPedding: true,
    // 首页通知
    barText: '',
    // 天气类
    weatherClass: {
      weatherList: [],
      weatherPlace: ''
    },
    todayWeather: ['穿衣', '感冒', '空调', '运动', '紫外线']
    // runCount: 0,
    // total: 4000,
    // ecComponent: null
  },
  // echartInit(e) {
  //   console.log(e, 'echarts');
  //   initChart(e.detail.canvas, e.detail.width, e.detail.height, 0, this.data.total);
  // },
  // 获取运动步数
  getRunData() {
    wx.getWeRunData({
      success: (res)=> {
        console.log(res.cloudID);
        let cloudId = res.cloudID;
        wx.cloud.callFunction({
          name: 'getRunData',
          data: {
            weRunData: wx.cloud.CloudID(cloudId)
          },
          success: ({result}) => {
            console.log(result, 'result');
            const todayRunCount = result[result.length - 1].step;
            console.log(this, 'this');
            this.setData({
              runCount: todayRunCount
            })
            // this.init(todayRunCount);
          }
        })
      }
    })
  },
  // 点击按钮后初始化图表
  // init(step) {
  //   console.log(this.ecComponent, 1111);
  //   this.ecComponent.init((canvas, width, height) => {
  //     console.log(echarts);
  //     // 获取组件的 canvas、width、height 后的回调函数
  //     // 在这里初始化图表
  //     const chart = echarts.init(canvas, null, {
  //       width: width,
  //       height: height
  //     });
  //     setOption(chart, step, this.data.total);

  //     // 将图表实例绑定到 this 上，可以在其他成员函数（如 dispose）中访问
  //     this.chart = chart;

  //     // 注意这里一定要返回 chart 实例，否则会影响事件处理等
  //     return chart;
  //   });
  // },
  // 获取当前位置
  getCurrentPos() {
    wx.getLocation({
      type: 'wgs84',
      success: (res) => {
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
      success: (res) => {
        console.log(res);
        let weatherPlace = res.data.result.formatted_address;
        let weatherClass = Object.assign({}, { weatherPlace: weatherPlace})
        this.setData({
          weatherClass
        })
        this.getWeather(res.data.result.addressComponent.city)
      },
    })
  },
  // getWeather(city) {
  //   var url = "https://api.seniverse.com/v3/weather/daily.json"
  //   var params = {
  //     location: city,
  //     key: "SKDJ5b2kJ6_fuJFO6"
  //   }
  //   wx.request({
  //     url: url,
  //     data: params,
  //     success: (res) => {
  //       console.log(res);
  //       let weatherList = res.data.results[0].daily;
  //       this.setData({
  //         weatherClass: { ...this.data.weatherClass, weatherList}
  //       })
  //       console.log(this.data.weatherClass)
  //     },
  //   })
  // },
  // 获取天气接口，之后改成云函数
  getWeather(city) {
    console.log(city);
    let key = 'db2a938913344b78a12a1340ca2fcdbc';
    let url = `https://api.avatardata.cn/Weather/Query?key=${key}&cityname=${city}`;
    wx.request({
      url: url,
      success: (res) => {
        console.log(res);
        let lifeList = res.data.result.life.info;
        let weatherList = res.data.result.weather;
        let realtime = res.data.result.realtime;
        let pm25 = res.data.result.pm25;
        this.setData({
          weatherClass: { ...this.data.weatherClass, lifeList, weatherList, realtime, pm25},
          barText: lifeList['chuanyi'][1],
          isPedding: !this.data.isPedding
        })
        console.log(this.data.weatherClass)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getRunData();
    // this.ecComponent = this.selectComponent('#mychart-runProcess');
    // console.log(this.ecComponent);
  },
  // 下拉刷新
  onPullDownRefresh() {
    this.getRunData();
    console.log(1);
    setTimeout(function () {
      // 不加这个方法真机下拉会一直处于刷新状态，无法复位
      wx.stopPullDownRefresh()
      console.log(2);
    }, 2000)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 获取组件
    // this.ecComponent = this.selectComponent('#mychart-dom-pie');
    // console.log(this.ecComponent, 'eeeee');

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.setData({
      showTemp: wx.getStorageSync('userInfo')
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})