// miniprogram/pages/posters/posters.js
import QrcodeController from '../../lifeSite/QrcodeController.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: wx.getStorageSync('userInfo') || {},
    config: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    QrcodeController.getQrCode()
      .then(res => {
        console.log(res);
      })
    const context = wx.createCanvasContext('posters-canvas', this);
    const config = {}
    const { windowWidth } = wx.getSystemInfoSync();
    config.canvasWidth = parseInt(windowWidth * 0.8);
    config.canvasHeight = parseInt(config.canvasWidth * 1.5);
    this.setData({
      config
    })
    console.log(windowWidth);
    // ctx.clearRect(0, 0, 0, 0); 
    // const arr2 = []
    context.drawImage('../../images/posters.png', 0, 0, 300, 150);
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