// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {

  const { targetId, beginDate, endDate, duration, conclusion  } = event;

  if (!targetId) return;

  try{
    await db.collection('create_target')
    .doc(targetId)
    .update({
      data: {
        time: _.inc(parseInt(duration)),
        lastUpdate: endDate
      }
    })

    await db.collection('target_records')
    .where({targetId})
    .update({
      data: {
        records: _.push([
          {
            duration,
            beginDate,
            endDate,
            conclusion
          }
        ])
      }
    })
  } catch(err) {
    console.log(err)
  }
}