export default class LoginController { 
  // 登录获取openid
  static login() {
    return wx.cloud.callFunction({
      name: 'login',
      data: {}
    })
  }
}