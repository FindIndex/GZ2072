// pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg: "hello world",
    show: true,
    longitude: 112,
    latitude: 23,
    friends: ['小红','小翠','小花']
  },

  tapHandler: function () {
    console.log('clicked');
  },

  toggleShow() {
    console.log(this, this.data);
    this.setData({
      show: !this.data.show
    })
  },

  getlocal() {
    wx.getLocation({
      type: 'wgs84',
      success: (res) => {
        // console.log(res, this);
        this.setData({
          longitude: res.longitude,
          latitude: res.latitude
        })
      }
    })
  },

  scanHandle() {
    wx.scanCode({
      success(res) {
        console.log(res);
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(this, 'test load');
    // this 当前页面实例

    // setInterval(() => {
    //   this.setData({
    //     msg: Date.now()
    //   })
    // }, 1000)



  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log(this, 'test onReady');


    // 
    // wx.getLocation({
    //   type: 'wgs84',
    //   success: (res) => {
    //     // console.log(res, this);
    //     this.setData({
    //       longitude: res.longitude,
    //       latitude: res.latitude
    //     })
    //   }
    // })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log(this, 'test onShow');

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