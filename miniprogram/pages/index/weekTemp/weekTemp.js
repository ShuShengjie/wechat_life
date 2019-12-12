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
    attached() {
    },
    ready() {
      this.data.weatherData.forEach(temp => {
        this.data.highTemList.push(temp.temperature.slice(0, -1).split(' ~ ')[0]);
        this.data.LowTemList.push(temp.temperature.slice(0, -1).split(' ~ ')[1]);
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

  },

  /**
   * 组件的方法列表
   */
  methods: {
    updateOption() {
      const option = weekTempOption;
      option.series[0].data = this.data.highTemList;
      option.series[1].data = this.data.LowTemList;
      this.chart.setOption(option);
    },
    sliceDate(str) {
      return str.slice(0, 2)
    }
  }
})
