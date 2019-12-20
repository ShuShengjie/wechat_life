export default class WeekTimeOption {
  total = '10小时';
  dataList = [];
  get getOption() {
    let option = {
      title: {
        text: `本周累计完成时间为${this.total}`,
        x: 'center'
      },
      color: ['#37a2da', '#32c5e9', '#9fe6b8', '#ffdb5c', '#ff9f7f', '#fb7293', '#e7bcf3', '#8378ea'],
      tooltip: {
        trigger: 'item',
        formatter: "{b} : {c} ({d}%)"
        // tooltip: {
        //   show: true,
        //   trigger: 'item',
        //   axisPointer: {
        //     type: 'shadow',
        //   },
        //   formatter: (params: any) => {
        //     if (params.seriesName === '背景' || params.componentType === 'markPoint') {
        //       return;
        //     }
        //     let str = `<div class="tool-tip"><div class="tool-tip-title">${this.title}</div>`;
        //     let market = `<span class="showFormatter" style="background-color:${params.color.colorStops[0].color};"></span>`;
        //     str += `<div class="tool-tip-content">${market} ${params.seriesName} : ${this.logDataInfo.valueList[params.seriesIndex/2]}</div></div>`;
        //     return str;
        //   }
        // },
        // tooltip: { show: true, trigger: 'item' },
      },
      calculable: true,
      series: [
        {
          name: '本周统计',
          type: 'pie',
          radius: [20, 90],
          animationType: 'scale',
          animationEasing: 'elasticOut',
          animationDelay: () => {
            return Math.random() * 200
          },

          roseType: 'radius',
          data: this.dataList
        }
      ]
    }
    return option
  }
};
