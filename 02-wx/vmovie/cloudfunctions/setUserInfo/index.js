// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: "development-6gom020dcbcdbb28"
})
const db = cloud.database()
const users = db.collection('users')

// 云函数入口函数
exports.main = async (event, context) => {
  return await users.add({
    data: event.userInfo
  })
}