export default {
  color: ["#F7C709", "#67E0E3"],
  grid: {
    top: '15%',
    bottom: '10%',
    left: '12%',
    right: '12%',
    containLabel: false
  },
  xAxis: {
    show: false,
    type: 'category',
    boundaryGap: false,
    data: ['', '', '', ''],
  },
  yAxis: {
    show: false,
    x: 'center',
    type: 'value',
    splitLine: {
      lineStyle: {
        type: 'dashed'
      }
    }
    // show: false
  },
  series: [{
    name: 'A',
    type: 'line',
    smooth: true,
    label: {
      show: true,
      position: "top",
      formatter: function (p) {
        return p.value + '℃';
      }
    },
    data: [18, 36, 65, 30]
  }, {
    name: 'B',
    type: 'line',
      smooth: true,
      label: {
        show: true,
        position: "bottom",
        formatter: function (p) {
          return p.value + '℃';
        }
      },
    data: [5, 5, 5, 5]
  }]
}