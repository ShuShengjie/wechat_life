// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  const { targetTitle, userId } = event;

  if (!targetTitle || !userId) return;

  try{
    await db.collection('create_target').add({
      data: {
        userId,
        title: targetTitle,
        createDate: new Date(),
        lastUpdate: null,
        time: 0
      }
    })
  } catch(e) {
    console.log(e);
  }
}