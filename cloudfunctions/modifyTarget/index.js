// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const { targetId, modifyTitle } = event;

  if (!targetId || !modifyTitle) return;

  try{
    await db.collection('create_target')
      .where({ _id: targetId })
      .update({
        data: {
          title: modifyTitle
        }
      });
    return modifyTitle
  }catch(err) {
    console.log(err)
    return err
  }

}