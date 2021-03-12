// miniprogram/pages/test/test.js
const db = wx.cloud.database()
// console.log(db);
const users = db.collection('users')
const ss = db.collection('ss')
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

  navToPost(e) {
    console.log(e);
    wx.navigateTo({
      url: '/pages/post/post?id=' + e.currentTarget.dataset.id,
    })
  },

  getUsersCloud() {
    // console.log(123);
    wx.cloud.callFunction({
      name: 'getUsers',
      data: {
        name: 'nicholas'
      },
      success: function (res) {
        console.log(res);
      }
    })
  },

  chooseImage() {
    wx.chooseImage({
      count: 9,
      success: (res) => {
        console.log(res);
        this.setData({
          tempFilePaths: res.tempFilePaths
        })
      }
    })
  },


  // 封装上传文件 方法
  upload(tempPath) {
    return new Promise((resolve, reject) => {
      wx.cloud.uploadFile({
        cloudPath: Date.now() + '-' + tempPath.slice(11), // 上传至云端的路径
        filePath: tempPath, // 图片临时文件路径
        success: res => {
          resolve(res.fileID)
        }
      })
    })
  },


  uploadImage() {
    // console.log(this.upload);

    var p = []
    // this.data.tempFilePaths.forEach(item => {
    //   this.upload(item).then(fileID => {
    //     // console.log(fileID);
    //     ids.push(fileID)
    //   })
    // })

    this.data.tempFilePaths.forEach(item => {
      p.push(this.upload(item))
    })

    // console.log(p);
    Promise.all(p).then((fileIDs) => {
      console.log(fileIDs);




      wx.cloud.getTempFileURL({
        fileList: fileIDs,
        success: res => {
          console.log(res.fileList)
          this.setData({
            uploads: res.fileList
          })


          // 存入数据库
          ss.add({
            data: {
              imgs: res.fileList.map(item => item.tempFileURL)
            },
            success() {
              wx.showToast({
                title: '发布成功',
                icon: 'success',
                duration: 2000
              })
            }
          })
        }
      })
    })

    //     wx.cloud.getTempFileURL({
    //       fileList: [res.fileID],
    //       success: res => {
    //         console.log(res.fileList)
    //         this.setData({
    //           uploads: res.fileList
    //         })
    //       },



    // wx.cloud.uploadFile({
    //   cloudPath: 'example.png', // 上传至云端的路径
    //   filePath: this.data.tempFilePaths[0], // 小程序临时文件路径
    //   success: res => {
    //     // 返回文件 ID
    //     console.log(res.fileID)

    //     wx.cloud.getTempFileURL({
    //       fileList: [res.fileID],
    //       success: res => {
    //         console.log(res.fileList)
    //         this.setData({
    //           uploads: res.fileList
    //         })
    //       },
    //     })
    //   },
    //   fail: console.error
    // })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    // const posts = db.collection('posts')
    const dates = db.collection('dates')
    // dates.where({
    //   time: "20210311"
    // }).get().then(res => {
    //   console.log(res.data);
    //   this.setData({
    //     today: res.data[0]
    //   })
    // })


    // db.collection('lists').get().then(res=> {
    //   console.log(res);
    // })

    // db.collection('lists').aggregate()
    //   .lookup({
    //     from: 'posts',
    //     localField: 'postid',
    //     foreignField: '_id',
    //     as: 'bookList',
    //   })
    //   .end()
    //   .then(res => console.log(res))
    //   .catch(err => console.error(err))

    // db.collection('orders').aggregate()
    //   .lookup({
    //     from: 'books',
    //     localField: 'book',
    //     foreignField: 'title',
    //     as: 'bookList',
    //   })
    //   .end()
    //   .then(res => console.log(res))
    //   .catch(err => console.error(err))


    // 调用云函数
    console.log(Date.now());
    wx.cloud.callFunction({
      name: 'test',
      data: {
        a: 1,
        b: 20
      },
      success: function (res) {
        console.log('test', res.result);
      },
      fail: console.error
    })

    ss.get().then(res => {
      console.log(res.data);

      this.setData({
        ss: res.data
      })
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