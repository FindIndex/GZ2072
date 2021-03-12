// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  // return {
  //   event,
  //   // 小程序端 传入的参数
  //   openid: wxContext.OPENID,
  //   // 当前微信用户的id
  //   appid: wxContext.APPID,
  //   // 当前小程序的id
  //   unionid: wxContext.UNIONID,
  // }

  // 同步返回
  // return {
  //   sum: event.a + event.b
  // }

  // setTimeout(() => {
  //   return {
  //     sum: event.a + event.b
  //   }
  // }, 3000)

  // var d
  // setTimeout(() => {
  //   d = Date.now()
  // }, 10000);

  var d = await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(Date.now())
    }, 10000);
  })

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        sum: event.a + event.b + ' ' + d
      })
    }, 3000)
  })


}