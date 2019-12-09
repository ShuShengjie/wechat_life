const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

exports.main = (event, context) => {
  const wxContext = cloud.getWXContext()

  return {
    openid: wxContext.OPENID,
  }
}

