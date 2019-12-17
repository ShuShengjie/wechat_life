export default class TimeUtils {
  // 获取年月日时分秒
  static formatDate(time) {
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
  static formatDay(time, split = '-') {
    const Dates = new Date(time);
    const year = Dates.getFullYear();
    const month = (Dates.getMonth() + 1) < 10 ? '0' + (Dates.getMonth() + 1) : Dates.getMonth() + 1;
    const day = Dates.getDate() < 10 ? '0' + Dates.getDate() : Dates.getDate();
    return year + split + month + split + day
  }
}