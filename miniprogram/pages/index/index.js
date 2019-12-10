import * as echarts from '../../ec-canvas/echarts';
//index.js
const app = getApp()

function initChart(canvas, width, height, count, total) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);
  let runCount = (count / total) * 100 || 0;
  var option = {
    backgroundColor: "transparent",
    series: [{
      color: ["#91bef0", "#DCDCDC"],
      name: '今日步数',
      type: 'pie',
      radius: ['85%', '100%'],
      avoidLabelOverlap: false,
      label: {
        normal: {
          show: true,
          position: 'center'
        },
        emphasis: {
          show: true,
          textStyle: {
            fontSize: '10',
            fontWeight: 'bold'
          },
        }
      },
      labelLine: {
        normal: {
          show: false
        }
      },
      data: [{
        value: runCount,
        name: count ? count : '0',
          label: {
            normal: {
              textStyle: {
                fontSize: '20',
                fontWeight: 'bold'
              },
            }
          },
        },
        {
          value: 100 - runCount,
          name: '今日步数',
          label: {
            normal: {
              textStyle: {
                fontSize: '14',
                color: '#999',
                fontWeight: 'bold'
              },
              padding: [-70, 0, 0, 0]
            }
          },
        }
      ]
    }]
  };

  chart.setOption(option);
  return chart;
}


Page({

  /**
   * 页面的初始数据
   */
  data: {
    showTemp: wx.getStorageSync('userInfo') || '',
    ec: {
    },
    todayRunCount: 2000,
    total: 4000,
    ecComponent: null
  },
  echartInit(e) {
    console.log(e, 'echarts');
    initChart(e.detail.canvas, e.detail.width, e.detail.height, 2345, 4000);
  },
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
            this.init();
          }
        })
      }
    })
  },
  // 点击按钮后初始化图表
  init() {
    console.log(this.ecComponent, 1111);
    this.ecComponent.init((canvas, width, height) => {
      console.log(echarts);
      // 获取组件的 canvas、width、height 后的回调函数
      // 在这里初始化图表
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      setOption(chart);

      // 将图表实例绑定到 this 上，可以在其他成员函数（如 dispose）中访问
      this.chart = chart;

      this.setData({
        isLoaded: true,
        isDisposed: false
      });

      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return chart;
    });
  },
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
        this.getWeather(res.data.result.addressComponent.city)
      },
    })
  },
  getWeather(city) {
    var that = this
    var url = "https://api.seniverse.com/v3/weather/daily.json"
    var params = {
      location: city,
      key: "SKDJ5b2kJ6_fuJFO6"
    }
    wx.request({
      url: url,
      data: params,
      success: function(res) {
        console.log(res)
      },
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    // this.ecComponent = this.selectComponent('#mychart-runProcess');
    // console.log(this.ecComponent);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 获取组件
    this.ecComponent = this.selectComponent('#mychart-dom-pie');
    console.log(this.ecComponent);

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