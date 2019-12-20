// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const { userId, firstDay } = event;

  if (!userId) return

  try{
    return await db.collection('create_target')
      .where({
        userId,
        createDate: _.gte(firstDay), 
        createDate: _.lt(+firstDay + 24 * 60 * 60 * 1000 * 7)
      })
      .get()
  }catch(e) {
    console.log(e);
  }
}