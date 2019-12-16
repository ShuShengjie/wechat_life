// miniprogram/pages/edit/edit.js
import Notify from '@vant/weapp/notify/notify';

/**
 * 
 * 
 * 目标页应该进入获取用户参数
 * 不然无法获取用户列表
 * 
 * 
 */

const globalEnv = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 新增目标弹窗
    showAddTarget: false,
    // 新增内容
    createTitle: '',
    userInfo: wx.getStorageSync('userInfo') || {},
    // 目标列表
    targetList: []
  },
  // 查看是否登录，登录则弹出新增弹窗
  showTarget(e) {
    console.log(e);
    let userInfo = e.detail.userInfo;
    wx.cloud.callFunction({
      name: 'login',
      complete: res => {
        userInfo.openid = res.result.openid;
        this.setData({
          userInfo,
          showAddTarget: true,
        })
        wx.setStorageSync('userInfo', userInfo)
      }
    })
  },
  // 获取输入的title
  changeCreateTitle(e) {
    console.log(e.detail.value)
    this.setData({
      createTitle: e.detail.value
    })
  },
  // 添加目标
  addTarget() {
    if (this.data.createTitle.trim() === '') {
      Notify({ type: 'danger', message: '目标不能为空' });
      return
    }
    console.log(54564456)
    wx.cloud.callFunction({
      name: 'createTarget',
      data: {
        targetTitle: this.data.createTitle,
        userId: wx.getStorageSync('userInfo').openid
      },
      complete: res => {
        console.log(12321312)
        Notify({ type: 'success', message: '新增目标成功' });
        this.setData({
          createTitle: ''
        })
      }
    })
  },
  // 获取所有目标
  getTargetList() {
    wx.cloud.callFunction({
      name: 'getTargetList',
      data: {
        userId: wx.getStorageSync('userInfo').openid
      },
      complete: res => {
        this.setData({
          targetList: res.result.data
        })
        console.log(this.data.targetList)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getTargetList();
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