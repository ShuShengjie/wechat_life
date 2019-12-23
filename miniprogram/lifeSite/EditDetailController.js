export default class EditDetailController {
  // 修改目标名称
  static modifyTarget(modifyTitle, targetId) {
    return wx.cloud.callFunction({
      name: 'modifyTarget',
      data: {
        modifyTitle,
        targetId
      },
    })
  }
  // 删除此目标
  static deleteTargetTitle(targetId) {
    return wx.cloud.callFunction({
      name: 'deleteTarget',
      data: {
        targetId
      }
    })
  }
  // 获取所有目标记录
  static getEditRecords(targetId) {
    return wx.cloud.callFunction({
      name: 'getTargetRecords',
      data: {
        targetId
      },
    })
  }
}