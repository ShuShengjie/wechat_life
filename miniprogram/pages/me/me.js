// miniprogram/pages/me/me.js
import request from '../../utils/request.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: wx.getStorageSync('userInfo') || {},
    popupShow: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // request({
    //   url: 'http://123.207.32.32:8000/recommend'
    // }).then(res => {
    //   console.log(res, 'res')
    // }).catch(err => {
    //   console.log(err, 'err')
    // })
    wx.cloud.callFunction({
      name: 'login',
      success: res => {
        console.log(res);
        wx.setStorageSync('openid', res.result.openid)
      }
    })
  },
  // 获取登陆信息
  getUserInfo(e) {
    let userInfo = e.detail.userInfo;
    wx.cloud.callFunction({
      name: 'login',
      complete: res => {
        userInfo.openid = res.result.openid;
        this.setData({
          userInfo
        })
        wx.setStorageSync('userInfo', userInfo)
      }
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