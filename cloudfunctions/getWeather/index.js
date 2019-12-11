// 云函数入口文件
const cloud = require('wx-server-sdk')
const axios = require('axios');
cloud.init()

// 获取地理位置
async function getCity(latitude, longitude) {
  let url = "https://api.map.baidu.com/reverse_geocoding/v3/";
  let params = {
    ak: "lL1PUa4x1xZSvfqT1j5fIvaQs9UtUbAp",
    output: "json",
    location: latitude + "," + longitude
  }
  console.log(url, params)
  let res = await axios.post(url, params);
  console.log(res)
}
let demo = getCity(121.200253, 31.353068);
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}