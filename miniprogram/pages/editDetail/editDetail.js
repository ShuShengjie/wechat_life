// miniprogram/pages/editDetail/editDetail.js
import TimeUtils from '../../utils/timeUtils.js';
import Notify from '@vant/weapp/notify/notify';
import Toast from '@vant/weapp/toast/toast';

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    editDetails: {},
    showAddTarget: false,
    // 目标标题
    editTitle: '',
    // 目标记录list
    recordsList: [],
    eid: '',
    // 请求是否完毕
    loading: false
  },
  // 修改目标名称
  editTargetTitle() {
    this.setData({
      showAddTarget: true
    })
  },
  // 取消弹窗
  closeDialog(e) {
    this.setData({
      showAddTarget: e.detail,
    })
  },
  // 添加目标
  addTarget(e) {
    wx.cloud.callFunction({
      name: 'modifyTarget',
      data: {
        modifyTitle: e.detail,
        targetId: this.data.editDetails._id
      },
      complete: res => {
        this.setData({
          editTitle: res.result
        })
        Notify({ type: 'success', message: '修改目标成功' });
      }
    })
  },
  // 删除目标名称
  deleteTargetTitle() {
    wx.showModal({
      title: '你确定想当一条咸鱼吗',
      success: res => {
        if (res.confirm) {
          wx.cloud.callFunction({
            name: 'deleteTarget',
            data: {
              targetId: this.data.editDetails._id
            },
            success: res => {
              wx.navigateBack({
                delta: 1
              })
            }
          })
        }
      }
    })
  },
  // 进入计时页
  goToTimer(e) {
    const { id, title } = e.currentTarget.dataset;
    const globalData = app.globalData;
    if (globalData.targetId !== '' && globalData.targetId !== id) {
      Toast({
        message: '目前已有目标正在进行中',
        selector: '#editDetail-toast',
        context: this
      });
      return
    }
    wx.navigateTo({
      url: `/pages/editTimer/editTimer?id=${id}&title=${title}`,
    })
  },
  getEditRecords(targetId) {
    wx.cloud.callFunction({
      name: 'getTargetRecords',
      data: {
        targetId
      },
      success: async res => {
        let records = res.result.data[0].records;
        if (records) {
          let recordsList = [];
          console.log(11)
          recordsList = new Array(records.length);
          // recordsList = new Array(records.length).fill({})
          // recordsList = [{}, {}];
          console.log(recordsList, '0000000000')
          await records.forEach((record, index) => {
            console.log(record, index, '11111111111');
            recordsList[index] = {};
            recordsList[index].conclusion = record.conclusion;
            recordsList[index].beginDate = TimeUtils.formatFullDate(record.beginDate);
            recordsList[index].endDate = TimeUtils.formatFullDate(record.endDate);
            recordsList[index].duration = TimeUtils.formatDuration(record.duration);
            console.log(recordsList, ' recordsList[index],')
          })
          console.log(recordsList, '22222222222')
          this.setData({
            recordsList
          })
          
        }
        this.setData({
          loading: true
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let editDetails = JSON.parse(options.edit);
    editDetails.createDate = TimeUtils.formatDay(editDetails.createDate);
    this.data.eid = editDetails._id
    this.setData({
      editDetails,
      editTitle: editDetails.title
    })
    // this.getEditRecords(this.data.eid);
  },
  onShow() {
    console.log(this.data.eid)
    this.getEditRecords(this.data.eid);
  }
})