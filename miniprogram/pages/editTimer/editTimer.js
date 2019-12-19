// miniprogram/pages/editTimer/editTimer.js
import TimeUtils from '../../utils/timeUtils';
import { TimerState } from '../../config/timerState.js';

const app = getApp()

Page({
  /**
   * 
   * 将名称和id传过来
   * 每次只记录当次时间
   * 
   */
 
  /**
   * 页面的初始数据
   */
  data: {
    isPlay: true,
    editTitle: '',
    editId: '',
    timer: '00:00:00'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const globalData = app.globalData;
    const { id, title} = options;
    this.setData({
      editId: id,
      editTitle: title
    })
    this.initCounter();
  },

  // 进入页面
  initCounter() {
    const globalData = app.globalData;
    switch (globalData.timerState) {
      case TimerState.PLAY:
      case TimerState.NONE:
      this.setData({
        timer: TimeUtils.formatDurationToTimer(globalData.duration)
      })
      this.startCounter()
      break
      case TimerState.PAUSE:
        this.setData({
          timer: TimeUtils.formatDurationToTimer(globalData.duration),
          isPlay: false
        })
      break
    }
  },

  // 开始/暂停
  changePlay(e) {
    this.setData({
      isPlay: e.detail
    })
    e.detail ? this.startCounter() : this.pauseCounter();
  },

  // 开始计时
  startCounter() {
    this.setData({
      isPlay: true
    })

    const { editId, editTitle } = this.data;
    app.startTimer(editId, editTitle, duration => {
      this.setData({
        timer: TimeUtils.formatDurationToTimer(duration)
      })
    })
  },
  // 暂停计时
  pauseCounter() {
    app.pauseTimer();
  },
  
  // 取消本次计时并返回上一页
  cancelPlay() {
    wx.showModal({
      title: '是否取消本次计时',
      success: res => {
        if (res.confirm) {
          app.cancelTimer();
          wx.navigateBack({
            delta: 1
          })
        }
      }
    })
  },

  // 保存此次记录
  saveThisEdit() {
    const globalData = app.globalData;
    const {editId, editTitle} = this.data;
    const details = {};
    details.id = editId;
    details.title = editTitle;
    details.beginTime = globalData.beginTime;
    details.endTime = Date.now();
    details.duration = globalData.duration;
    app.cancelTimer();
    wx.navigateTo({
      url: `/pages/editSummary/editSummary?details=${JSON.stringify(details)}`,
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