export default class QrcodeController { 
  // 获取二维码fileId
  static getQrCode(page, scene) {
    return wx.cloud.callFunction({
      name: 'getQrCode',
      data: {
        page,
        scene
      }
    })
  }
  // 根据fileId获得二维码url
  static getTempFileURL(fileList) {
    return new Promise((resolve, reject) => {
      wx.cloud.getTempFileURL({
        fileList,
        success: resolve,
        fail: reject
      })
    })
  }
  // 根据二维码url下载图片
  static downloadFile(url) {
    return new Promise((resolve, reject) => {
      wx.downloadFile({
        url,
        success: resolve,
        fail: reject
      })
    })
  }
}