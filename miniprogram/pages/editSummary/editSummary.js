// miniprogram/pages/editSummary/editSummary.js
import TimeUtils from '../../utils/timeUtils';
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    beginTime: '',
    beginDate: '',
    endTime: '',
    endDate: '',
    id: '',
    duration: '',
    conclusion: '',
    begin: '',
    end: '',
    durationDate: '',
  },
  saveEdit() {
    const { id, begin, end, durationDate, conclusion} = this.data;
    wx.cloud.callFunction({
      name: 'addTargetRecords',
      data: {
        targetId: id, 
        beginDate: begin, 
        endDate: end, 
        duration: durationDate, 
        conclusion: conclusion ? conclusion : '未命名'
      },
      complete: res => {
        app.cancelTimer();
        wx.switchTab({
          url: '/pages/edit/edit',
        })
      }
    })
  },
  changeConclusion(e) {
    this.data.conclusion = e.detail.value;
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { id, title, beginTime, endTime, duration } = JSON.parse(options.details);
    this.data.begin = beginTime;
    this.data.end = endTime;
    this.data.durationDate = duration;
    this.setData({
      id,
      title,
      beginDate: TimeUtils.formatDay(beginTime, false), 
      beginTime: TimeUtils.formatDate(beginTime, false),
      endDate: TimeUtils.formatDay(endTime, false),
      endTime: TimeUtils.formatDate(endTime, false),
      duration: TimeUtils.formatDurationToStr(duration)
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