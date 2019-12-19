// pages/index/weekTemp/weekTemp.js
import * as echarts from '../../../ec-canvas/echarts';
import weekTempOption from '../weekTemp/weekTempOption.js';
let chart = null;

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    weatherData: {
      type: Array,
      value: []
    }
  },
  lifetimes: {
    ready() {
      // 天气情况数组
      const dayWeatherList = [];
      const nightWeatherList = []; 
      const windDirection = [];
      const windIntensity = [];
      this.data.weatherData.forEach(temp => {
        // 当日最高气温与最低气温数组
        this.data.highTemList.push(temp.temperature.slice(0, -1).split(' ~ ')[0]);
        this.data.LowTemList.push(temp.temperature.slice(0, -1).split(' ~ ')[1]);
        // 天气情况数组
        const isChangeWeather = temp.weather.indexOf('转');
        if (isChangeWeather !== -1) {
          dayWeatherList.push(temp.weather.slice(0, isChangeWeather))
          nightWeatherList.push(temp.weather.slice(isChangeWeather + 1))
        } else {
          dayWeatherList.push(temp.weather)
          nightWeatherList.push(temp.weather)
        }
      })
      this.setData({
        dayWeatherList,
        nightWeatherList,
        windDirection,
        windIntensity
      })
      const $weekTemp = this.selectComponent('#weekTemp')
      $weekTemp.init((canvas, width, height) => {
        const chart = echarts.init(canvas, null, {
          width,
          height
        })
        canvas.setChart(chart)
        this.chart = chart;
        this.updateOption();
        return chart
      })
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    // ec: {
    //   onInit: initChart
    // },
    ec: {},
    // 最高气温数组
    highTemList: [],
    LowTemList: [],
    // 天气情况数组
    dayWeatherList: [],
    nightWeatherList: [],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 更新echarts
    updateOption() {
      const option = weekTempOption;
      option.series[0].data = this.data.highTemList;
      option.series[1].data = this.data.LowTemList;
      this.chart.setOption(option);
    },
    // 查找字符串里第一个数字
    getFirstNum(str) {
      let pattern = new RegExp('[0-9]+');
      let num = str.match(pattern)
      return num;
    }
  }
})