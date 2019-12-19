// pages/edit/weekTime/weekTime.js
import * as echarts from '../../../ec-canvas/echarts';
import weekTimeOption from './weekTimeOption.js';
let chart = null;

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  lifetimes: {
    ready() {
      const $weekTemp = this.selectComponent('#weekTime')
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
    ec: {},
  },

  /**
   * 组件的方法列表
   */
  methods: {
    updateOption() {
      const option = weekTimeOption;
      this.chart.setOption(option);
    },
  }
})
