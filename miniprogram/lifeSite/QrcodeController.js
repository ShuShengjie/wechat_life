export default class QrcodeController { 
  // 登录获取openid
  static getQrCode(page, scene) {
    return wx.cloud.callFunction({
      name: 'getQrCode',
      data: {
        page,
        scene
      }
    })
  }
}