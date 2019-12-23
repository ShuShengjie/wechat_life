export default class EditController {
  // 添加本周目标
  static createTarget(targetTitle, userId) {
    return wx.cloud.callFunction({
      name: 'createTarget',
      data: {
        targetTitle,
        userId
      }
    })
  }
  // 获取本周目标
  static getTargetList(userId, firstDay) {
    return wx.cloud.callFunction({
      name: 'getTargetList',
      data: {
        userId,
        firstDay
      }
    })
  }
}