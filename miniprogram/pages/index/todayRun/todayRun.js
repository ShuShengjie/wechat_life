// pages/index/todayRun/todayRun.js
import * as echarts from '../../../ec-canvas/echarts';
let chart = null;

function initChart(canvas, width, height, count, total) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);
  setOption(chart, count, total);

  return chart;
}

function setOption(chart, count, total) {
  let runCount = (count / total) * 100 || 0;
  let option = {
    backgroundColor: "transparent",
    series: [{
      color: ["#91bef0", "#DCDCDC"],
      name: '今日步数',
      type: 'pie',
      radius: ['85%', '100%'],
      silent: true,
      label: {
        normal: {
          show: true,
          position: 'center'
        },
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
}

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    oData: {
      type: Number,
      value: 0,
      observer: function (newVal, oldVal, changedPath) {
        console.log(newVal, oldVal, changedPath);
        if (newVal !== oldVal) {
          console.log(this, 1111)
          setOption(chart, newVal, 4000);
        }
      }
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    ec: {
      onInit: initChart
    },
    isLoading: false
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
