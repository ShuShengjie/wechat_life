// miniprogram/pages/edit/edit.js
import Notify from '@vant/weapp/notify/notify';
import Toast from '@vant/weapp/toast/toast';
import TimeUtils from '../../utils/timeUtils';
import Utils from '../../utils/utils.js';
import { TimerState } from '../../config/timerState.js';
import EditController from '../../lifeSite/EditController.js';
import LoginController from '../../lifeSite/LoginController.js';

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 新增目标弹窗
    showAddTarget: false,
    // 目标列表
    targetList: [],
    // 当前进行的目标
    goingEdit: '',
    targetId: '',
    // 当前进行的目标计时
    timer: '00:00:00',
    stateDesc: '',
    // 本周累计目标总数
    weekTotal: 0,
    // 图表所需数据
    echartList: [],
    echartsTotal: '',
    showEcharts: false
  },
  // 标签信息跳转
  showThisEdit() {
    wx.navigateTo({
      url: `/pages/editTimer/editTimer?id=${this.data.targetId}&title=${this.data.goingEdit}`,
    })
  },
  // 获取标签信息
  getTimerTips() {
    const globalData = app.globalData;
    let stateDesc = '';
    switch (globalData.timerState) {
      case TimerState.NONE:
        stateDesc = '';
        break
      case TimerState.PAUSE:
        stateDesc = '暂停中';
        this.setData({
          timer: TimeUtils.formatDurationToTimer(globalData.duration)
        })
        break
      case TimerState.PLAY:
        stateDesc = '进行中';
        this.setData({
          timer: TimeUtils.formatDurationToTimer(globalData.duration)
        })
        app.startTimer(null, null, duration => {
          this.setData({
            timer: TimeUtils.formatDurationToTimer(duration)
          })
        })
        break
    }
    this.setData({
      stateDesc,
      goingEdit: globalData.targetTitle,
      targetId: globalData.targetId
    })
  },
  // 查看是否登录，登录则弹出新增弹窗
  showTarget() {
    this.setData({
      showAddTarget: true,
    })
  },
  // 获取输入的title
  changeCreateTitle(e) {
    this.setData({
      createTitle: e.detail.value
    })
  },
  // 取消弹窗
  closeDialog(e) {
    this.setData({
      showAddTarget: e.detail,
    })
  },
  // 添加目标
  addTarget(e) {
    if (this.data.weekTotal >= 3) {
      Notify({
        type: 'warning',
        message: '本周累计目标超过8条，给自己放个假把'
      });
      return
    }
    EditController.createTarget(e.detail, wx.getStorageSync('openid'))
      .then(res => {
        Notify({
          type: 'success',
          message: '新增目标成功'
        });
        this.getTargetList();
      })
  },
  // 获取所有目标
  getTargetList() {
    const firstDay = TimeUtils.getFirstdayDateZeroTime(Date.now());
    EditController.getTargetList(wx.getStorageSync('openid'), firstDay)
      .then(res => {
        let echartList = [];
        let echartsTotal = 0;
        this.data.showEcharts = false;
        this.data.weekTotal = res.result.listCount.total;
        // 使用了深拷贝，返回的对象是对象数组
        let targetList = Utils.deepClone(res.result.createList.data);
        echartList = new Array(targetList.length);
        res.result.createList.data.forEach((data, index) => {
          echartsTotal += data.time;
          targetList[index].time = TimeUtils.formatDurationToStr(data.time)
          targetList[index].lastUpdate = data.lastUpdate ? TimeUtils.formatFullDate(data.lastUpdate) : data.lastUpdate
          echartList[index] = {};
          echartList[index].name = data.title
          echartList[index].value = data.time
          echartList[index].time = TimeUtils.formatDurationToStr(data.time)
        })
        this.setData({
          targetList,
          echartList,
          echartsTotal: TimeUtils.formatDurationToStr(echartsTotal),
          showEcharts: true
        })
      })
  },
  // 进入详情页
  gotoEditDetail(e) {
    const edit = JSON.stringify(e.currentTarget.dataset.edit);
    wx.navigateTo({
      url: '/pages/editDetail/editDetail?edit=' + edit,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    if (!wx.getStorageSync('openid')) {
      LoginController.login()
        .then(res => {
          wx.setStorageSync('openid', res.result.openid)
          this.getTargetList();
        })
    } else {
      this.getTargetList();
    }
    this.getTimerTips();
  },
})