// miniprogram/pages/posters/posters.js
import QrcodeController from '../../lifeSite/QrcodeController.js';

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: wx.getStorageSync('userInfo') || {},
    config: {},
  },
  // 设置canvas尺寸自适应
  setCanvasInfo() {
    let rpx = 1;
    wx.getSystemInfo({
      success(res) {
        rpx = res.windowWidth / 375;
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const todayWeather = JSON.parse(options.todayWeather)
    console.log(todayWeather)
    wx.showLoading({
      title: '生成中...',
      mask: true,
    });
    const config = {}
    const {
      windowWidth
    } = wx.getSystemInfoSync();
    config.canvasWidth = parseInt(windowWidth * 0.8);
    config.canvasHeight = parseInt(config.canvasWidth * 1.5);
    this.setData({
      config
    })
    // /pages/index/index
    const indexPage = ''
    QrcodeController.getQrCode(indexPage, app.globalData.scene)
      .then(res => {
        wx.cloud.getTempFileURL({
          fileList: [res.result.wxacodefileID],
          success: file => {

            wx.downloadFile({
              url: file.fileList[0].tempFileURL,
              success: code => {
                wx.hideLoading();
                const qrCode = code.tempFilePath;
                const bgCode = '../../images/posters.png';
                const ctx = wx.createCanvasContext('posters-canvas');
                ctx.drawImage(bgCode, 0, 0, 300, 350);
                ctx.drawImage(qrCode, 210, 360, 80, 80);
                this.setText(ctx, 20, '#fff', 20, 30, todayWeather.city);
                this.setText(ctx, 20, '#fff', 20, 55, todayWeather.temp);
                this.setText(ctx, 16, '#fff', 20, 80, todayWeather.weather);
                this.setText(ctx, 16, '#fff', 20, 105, todayWeather.wind);
                this.setText(ctx, 14, '#999999', 40, 400, '微信扫码或长按识别');
                this.setText(ctx, 14, '#999999', 40, 420, '重拳出击');
                ctx.draw()
              },
              fail: err => {
                console.log(err)
              }
            })
          },
        })
      })

  },
  setText(context, fs, color, x, y, c) {
    context.setFontSize(fs);
    context.setFillStyle(color);
    context.setTextAlign('left');
    context.fillText(c, x, y);
    context.restore();
  },
  savePosters() {
    wx.showLoading({
      title: '正在保存',
      mask: true,
    })
    wx.canvasToTempFilePath({
      canvasId: 'posters-canvas',
      success: res => {
        wx.hideLoading();
        const tempFilePath = res.tempFilePath;
        wx.saveImageToPhotosAlbum({
          filePath: tempFilePath,
          success: res => {
            wx.showModal({
              content: '图片已保存到相册',
              showCancel: false,
              confirmText: '好的',
              confirmColor: '#333',
              success: function (res) {
                if (res.confirm) { }
              },
              fail: function (res) { }
            })
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})