// miniprogram/pages/test/test.js
const db = wx.cloud.database()
// console.log(db);
const users = db.collection('users')
// console.log(users);

// 获取文档引用 doc
var u = users.doc('b00064a760497f280963f40c1c465f59').get({
  success: function (res) {
    console.log(res);
  }
})
// console.log(u);


Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    gender: 0
  },

  getAllUser() {
    // 小程序端在获取集合数据时服务器一次默认并且最多返回 20 条记录，云函数端这个数字则是 100
    // users.where({}).get().then(res=> {

    // users.get().then(res => {

    // users.where({
    //   name: 'nicholas'
    // }).get().then(res => {



    // 查询指令
    const _ = db.command
    // 查找年龄小于18 
    users.where({
      age: _.lt(18)
    }).get().then(res => {

      console.log(res.data);
      this.setData({
        users: res.data
      })
    })
  },
  addUser() {
    users.add({
      data: {
        name: this.data.name,
        age: this.data.age,
        gender: this.data.gender
      },
      success: function (res) {
        console.log(res);
      }
    })
  },

  nameInput(e) {
    console.log(e.detail.value);
    this.setData({
      name: e.detail.value
    })
  },
  radioChange(e) {
    console.log(e);
    this.setData({
      gender: Number(e.detail.value)
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})