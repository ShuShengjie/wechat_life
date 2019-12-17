// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const { targetId } = event;

  if (!targetId) return;
   
  try{
    await db.collection('create_target')
    .where({_id: targetId})
    .remove();
  } catch(err) {
    console.log(err);
  }
}