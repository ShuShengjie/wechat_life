// Components/targetDialog/targetDialog.js
import Toast from '@vant/weapp/toast/toast';
// import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast.js';

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: ''
    },
    placeholder: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    createTitle: ''
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // input输入
    changeCreateTitle(e) {
      this.setData({
        createTitle: e.detail.value
      })
    },
    // 添加目标
    addTarget() {
      if (this.data.createTitle.trim() === '') {
        Toast({
          text: '目标不能为空',
          selector: '#van-toast',
          context: this 
        });
        return
      }
      this.triggerEvent('addTarget', this.data.createTitle);
      this.setData({
        createTitle: ''
      })
    },
    // 取消
    onClose() {
      this.triggerEvent('closeDialog', false)
    }
  }
})
