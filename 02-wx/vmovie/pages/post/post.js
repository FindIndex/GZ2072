const db = wx.cloud.database()
// console.log(db);
const favs = db.collection('favs')

// pages/post/post.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    post: null
  },
  addFav() {
    var {
      title,
      image,
      postid
    } = this.data.post


    favs.add({
      data: {
        _id: postid,
        title,
        image,
      },
      success: function () {
        wx.showToast({
          title: '收藏成功'
        })
      }
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.postid);
    wx.request({
      url: 'https://api.kele8.cn/agent/https://app.vmovier.com/apiv3/post/view?postid=' + options.postid,
      success: (res) => {
        this.setData({
          post: res.data.data
        })
      }
    })

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