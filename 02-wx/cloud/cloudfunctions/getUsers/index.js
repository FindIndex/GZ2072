// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: "development-6gom020dcbcdbb28"
})
const db = cloud.database()

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {

  return await db.collection('users').where({name: event.name}).get()


  // 联表
  // return await db.collection('orders').aggregate()
  //   .lookup({
  //     from: 'books',
  //     localField: 'book',
  //     foreignField: 'title',
  //     as: 'bookList',
  //   })
  //   .end()

}