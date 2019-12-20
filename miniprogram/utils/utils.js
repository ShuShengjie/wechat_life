export default class Utils {
  // 判断数据类型
  static type(obj) {
    let toString = Object.prototype.toString;
    let map = {
      '[object Boolean]': 'boolean',
      '[object Number]': 'number',
      '[object String]': 'string',
      '[object Function]': 'function',
      '[object Array]': 'array',
      '[object Boolean]': 'boolean',
      '[object Date]': 'date',
      '[object RegExp]': 'regExp',
      '[object Undefined]': 'undefined',
      '[object Null]': 'null',
      '[object Object]': 'object',
    }
    return map[toString.call(obj)]
  }
  // 深拷贝
  static deepClone(data) {
    let t = this.type(data),
      o, i, ni;
    if (t === 'array') {
      o = [];
    } else if (t === 'object') {
      o = {};
    } else {
      return data;
    }
    if (t === 'array') {
      for (i = 0, ni = data.length; i < ni; i++) {
        o.push(this.deepClone(data[i]))
      }
      return o;
    } else if (t === 'object') {
      for (i in data) {
        o[i] = this.deepClone(data[i]);
      }
      return o;
    }
  }
}