const db = wx.cloud.database()
// console.log(db);
const users = db.collection('users')

// components/me/me.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  lifetimes: {
    created: function () {
      // 再次进入
      wx.cloud.callFunction({
        name: 'getOpenId',
        data: {},
        success: (res) => {
          console.log(res.result);

          users.doc(res.result).get().then(res => {
            console.log('res.result', res.data);
            this.setData({
              userInfo: res.data
            })
          })
        }
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 初次注册 获取用户信息
    getUserInfo(e) {
      // console.log(e);
      this.setData({
        userInfo: e.detail.userInfo
      })

      // 获取用户 openid
      wx.cloud.callFunction({
        name: 'getOpenId',
        data: {},
        success: (res) => {
          console.log(res.result);

          // 存储用户
          wx.cloud.callFunction({
            name: 'setUserInfo',
            data: {
              userInfo: {
                ...e.detail.userInfo,
                _id: res.result,
                _openid: res.result

              }
            },
            success: function (res) {
              console.log('插入成功', res);
            }
          })
        }
      })
    },

    navToFav() {
      wx.navigateTo({
        url: '/pages/fav/fav',
      })
    }
  }
})