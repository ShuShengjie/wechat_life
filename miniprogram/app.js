//app.js
import {
  TimerState
} from '/config/timerState.js';

App({
  onLaunch: function() {

    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        env: 'ssj-wechat-ey5nh',
        traceUser: true,
      })
    }

    this.globalData = {
      // 计时器
      timerLopper: -1,
      // 目标id
      targetId: '',
      // 目标标题
      targetTitle: '',
      // timer状态
      timerState: TimerState.NONE,
      // 目标开始时间
      beginTime: 0,
      // 目标暂停时间
      pauseTime: 0,
      // 目标暂停了多少时间
      pauseDuration: 0,
      // 目标持续时间
      duration: 0
    }
  },
  // 开始计时
  startTimer(targetId, targetTitle, onCount) {
    const {
      globalData
    } = this;
    const {
      timerState,
      timerLopper
    } = globalData;
    if (timerState === TimerState.NONE) {
      globalData.targetId = targetId;
      globalData.targetTitle = targetTitle;
      globalData.beginTime = Date.now();
    } else if (timerState === TimerState.PAUSE) {
      globalData.pauseDuration = globalData.pauseDuration + (Date.now() - globalData.pauseTime)
      globalData.pauseTime = 0;
    }

    globalData.timerState = TimerState.PLAY;

    if (timerLopper !== -1) {
      clearInterval(timerLopper)
    }


    globalData.duration = Date.now() - globalData.beginTime - globalData.pauseDuration;
    onCount(globalData.duration)

    const timerPlay = setInterval(() => {
      globalData.duration = Date.now() - globalData.beginTime - globalData.pauseDuration;
      onCount(globalData.duration)
    }, 1000)


    globalData.timerLopper = timerPlay
  },
  // 暂停计时
  pauseTimer() {
    this.globalData.pauseTime = Date.now();
    clearInterval(this.globalData.timerLopper);
    this.globalData.timerId = -1;
    this.globalData.timerState = TimerState.PAUSE;
  },
  // 取消计时
  cancelTimer() {
    clearInterval(this.globalData.timerLopper);
    this.globalData.timerLopper = -1;
    this.globalData.targetId = '';
    this.globalData.targetTitle = '';
    this.globalData.timerState = TimerState.NONE;
    this.globalData.beginTime = 0;
    this.globalData.pauseTime = 0;
    this.globalData.pauseDuration = 0;
    this.globalData.duration = 0;
    console.log(this.globalData);
  }
})