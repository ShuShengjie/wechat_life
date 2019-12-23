// pages/edit/weekTime/weekTime.js
import * as echarts from '../../../ec-canvas/echarts';
import WeekTimeOption from './weekTimeOption.js';
let chart = null;

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    echartList: {
      type: Array,
      value: [],
    },
    echartsTotal: {
      type: String,
      value: '',
    }
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
    weekTimeOption: new WeekTimeOption()
  },

  /**
   * 组件的方法列表
   */
  methods: {
    updateOption() {
      this.weekTimeOption = new WeekTimeOption();
      this.weekTimeOption.total = this.data.echartsTotal;
      this.weekTimeOption.dataList = this.data.echartList;
      const option = this.weekTimeOption.getOption;
      this.chart.setOption(option);
    },
  }
})
