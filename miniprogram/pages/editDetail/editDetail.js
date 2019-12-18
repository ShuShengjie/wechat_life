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
    editTitle: ''
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let editDetails = JSON.parse(options.edit);
    editDetails.createDate = TimeUtils.formatDay(editDetails.createDate);
    this.setData({
      editDetails,
      editTitle: editDetails.title
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})