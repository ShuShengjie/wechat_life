export default class TimeUtils {
  // 一天的毫秒数
  static ONE_DAY_LONG = 24 * 60 * 60 * 1000;
  // 获取年月日时分秒
  static formatFullDate(time) {
    const Dates = new Date(time);
    const year = Dates.getFullYear();
    const month = (Dates.getMonth() + 1) < 10 ? '0' + (Dates.getMonth() + 1) : Dates.getMonth() + 1;
    const day = Dates.getDate() < 10 ? '0' + Dates.getDate() : Dates.getDate();
    const hour = Dates.getHours() < 10 ? '0' + Dates.getHours() : Dates.getHours();
    const minute = Dates.getMinutes() < 10 ? '0' + Dates.getMinutes() : Dates.getMinutes();
    const second = Dates.getSeconds() < 10 ? '0' + Dates.getSeconds() : Dates.getSeconds();
    return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
  }
  // 获取年月日
  static formatDay(time, needYear = true, split = '-') {
    const Dates = new Date(time);
    const year = Dates.getFullYear();
    const month = (Dates.getMonth() + 1) < 10 ? '0' + (Dates.getMonth() + 1) : Dates.getMonth() + 1;
    const day = Dates.getDate() < 10 ? '0' + Dates.getDate() : Dates.getDate();
    return needYear ? (year + split + month + split + day) : (month + split + day)
  }
  // 获取时分秒
  static formatDate(time, needSecond = true, split = ':') {
    const Dates = new Date(time);
    const hour = this.padZero(Dates.getHours());
    const minute = this.padZero(Dates.getMinutes());
    const second = this.padZero(Dates.getSeconds());
    return needSecond ? (hour + split + minute + split + second) : (hour + split + minute)
  }
  // 秒表计时 
  static formatDurationToTimer(millisec) {
    const duration = +millisec / 1000;
    const second = this.padZero(Math.floor(duration % 60));
    const minute = this.padZero(Math.floor(duration / 60) % 60);
    const hour = this.padZero(Math.floor(duration / 60 / 60) % 60);
    return `${hour}:${minute}:${second}`;
  }
  // 时间戳转化计算时间时间
  static formatDuration(millisec) {
    const duration = +millisec / 1000;
    let pref = '';
    let suff = '';
    if (duration <= 0) {
      suff = '未开始'
    } else if (duration <= 1) {
      suff = '1秒不够'
    } else if (duration < 60) {
      pref = parseInt(duration)
      suff = '秒'
    } else if (duration / 60 < 60) {
      pref = parseInt(duration / 60)
      suff = '分钟'
    } else if (duration / 3600 < 24) {
      pref = parseInt(duration / 3600)
      suff = '小时'
    } else {
      pref = parseInt(duration / 86400)
      suff = '天'
    }
    return {
      pref,
      suff
    }
  }
  // 时间戳转化为标准计时
  static formatDurationToStr(millisec) {
    const data = this.formatDuration(+millisec)
    return data.pref + data.suff
  }
  // 转换为时间戳
  static formatTimeStamp(date) {
    if (date == null) {
      return 0;
    }
    return date.getTime();
  }
  // 返回本周周一零点的时间戳
  static getFirstdayDateZeroTime(date) {
    const Dates = new Date(date);
    const millisec = Dates.getTime();
    const day = Dates.getDay() || 7;
    const time = millisec - (day - 1) * this.ONE_DAY_LONG;
    const result = this.getDateZeroTime(time)
    return result
  }
  // 返回当天零点的时间戳
  static getDateZeroTime(date) {
    return this.formatTimeStamp(new Date(new Date(date).toLocaleDateString()));
  }
  // 10以内的补0
  static padZero(number) {
    return +number < 10 ? '0' + number.toString() : number.toString()
  }
}