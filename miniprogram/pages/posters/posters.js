// miniprogram/pages/posters/posters.js
import QrcodeController from '../../lifeSite/QrcodeController.js';

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    config: {},
    loading: true
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    const todayWeather = JSON.parse(options.todayWeather)
    wx.showLoading({
      title: '生成中...',
      mask: true,
    });
    const config = {}
    const {
      windowWidth
    } = wx.getSystemInfoSync();
    const radio = windowWidth / 375;
    config.canvasWidth = 300 * radio;
    config.canvasHeight = parseInt(config.canvasWidth * 1.5);
    this.setData({
      config
    })
    // /pages/index/index
    const indexPage = '';
    const fileId = await QrcodeController.getQrCode(indexPage, app.globalData.scene);
    const fileUrl = await QrcodeController.getTempFileURL([fileId.result.wxacodefileID]);
    QrcodeController.downloadFile(fileUrl.fileList[0].tempFileURL)
      .then(code => {
        this.drawPoster(code, todayWeather, radio);
      })
  },
  // 绘制海报
  drawPoster(code, todayWeather, radio) {
    wx.hideLoading();
    const { config } = this.data;
    const { canvasWidth, canvasHeight } = config;
    const qrCode = code.tempFilePath;
    const bgCode = '../../images/posters.png';
    const ctx = wx.createCanvasContext('posters-canvas');
    this.roundRect(ctx, 0, 0, 300 * radio, 450 * radio, 10 * radio);
    ctx.drawImage(bgCode, 0, 0, 300 * radio, 350 * radio);
    ctx.drawImage(qrCode, 210 * radio, 360 * radio, 80 * radio, 80 * radio);
    // ctx.shadowOffsetX = 0;
    // ctx.shadowOffsetY = 10;
    // ctx.shadowColor = '#efefef';
    // ctx.shadowBlur = 10;
    this.setText(ctx, 20 * radio, '#fff', 20 * radio, 30 * radio, todayWeather.city);
    this.setText(ctx, 20 * radio, '#fff', 20 * radio, 55 * radio, todayWeather.temp);
    this.setText(ctx, 16 * radio, '#fff', 20 * radio, 80 * radio, todayWeather.weather);
    this.setText(ctx, 16 * radio, '#fff', 20 * radio, 105 * radio, todayWeather.wind);
    this.setText(ctx, 14 * radio, '#999999', 40 * radio, 400 * radio, '微信扫码或长按识别');
    this.setText(ctx, 14 * radio, '#999999', 40 * radio, 420 * radio, '重拳出击');
    ctx.draw()
    this.setData({
      loading: false
    })
  },
  // 绘制圆角
  roundRect(ctx, x, y, w, h, r) {
    // 开始绘制
    ctx.beginPath()
    ctx.setFillStyle('transparent')
    // 左上角
    ctx.arc(x + r, y + r, r, Math.PI, Math.PI * 1.5)

    // border-top
    ctx.moveTo(x + r, y)
    ctx.lineTo(x + w - r, y)
    ctx.lineTo(x + w, y + r)
    // 右上角
    ctx.arc(x + w - r, y + r, r, Math.PI * 1.5, Math.PI * 2)

    // border-right
    ctx.lineTo(x + w, y + h - r)
    ctx.lineTo(x + w - r, y + h)
    // 右下角
    ctx.arc(x + w - r, y + h - r, r, 0, Math.PI * 0.5)

    // border-bottom
    ctx.lineTo(x + r, y + h)
    ctx.lineTo(x, y + h - r)
    // 左下角
    ctx.arc(x + r, y + h - r, r, Math.PI * 0.5, Math.PI)

    // border-left
    ctx.lineTo(x, y + r)
    ctx.lineTo(x + r, y)

    // 这里是使用 fill 还是 stroke都可以，二选一即可，但是需要与上面对应
    ctx.fill()
    ctx.closePath()
    // 剪切
    ctx.clip()
  },
  // 绘制文本
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
              success: res => {
                if (res.confirm) {
                  setTimeout(() => {
                    wx.navigateBack({
                      delta: 1
                    }, 500)
                  })
                }
              }
            })
          }
        })
      }
    })
  },
})