// miniprogram/pages/edit/edit.js
import Notify from '@vant/weapp/notify/notify';
import Toast from '@vant/weapp/toast/toast';


const globalEnv = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 新增目标弹窗
    showAddTarget: false,
    // 目标列表
    targetList: []
  },
  // 查看是否登录，登录则弹出新增弹窗
  showTarget() {
    this.setData({
      showAddTarget: true,
    })
  },
  // 获取输入的title
  changeCreateTitle(e) {
    this.setData({
      createTitle: e.detail.value
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
      name: 'createTarget',
      data: {
        targetTitle: e.detail,
        userId: wx.getStorageSync('openid')
      },
      complete: res => {
        Notify({ type: 'success', message: '新增目标成功' });
        this.getTargetList();
      }
    })
  },
  // 获取所有目标
  getTargetList() {
    wx.cloud.callFunction({
      name: 'getTargetList',
      data: {
        userId: wx.getStorageSync('openid')
      },
      complete: res => {
        this.setData({
          targetList: res.result.data
        })
        console.log(this.data.targetList)
      }
    })
  },
  // 进入详情页
  gotoEditDetail(e) {
    const edit = JSON.stringify(e.currentTarget.dataset.edit);
    wx.navigateTo({
      url: '/pages/editDetail/editDetail?edit=' + edit,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getTargetList();
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
    if (!wx.getStorageSync('openid')) {
      wx.cloud.callFunction({
        name: 'login',
        success: res => {
          console.log(res);
          wx.setStorageSync('openid', res.result.openid)
          this.getTargetList();
        }
      })
    } else {
      this.getTargetList();
    }
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

  // 下拉刷新
  onPullDownRefresh() {
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