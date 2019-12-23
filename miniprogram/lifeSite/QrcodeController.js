export default class QrcodeController { 
  // 登录获取openid
  static getQrCode() {
    return wx.cloud.callFunction({
      name: 'getQrCode',
      data: {}
    })
  }
}