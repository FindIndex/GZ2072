// components/find/find.js
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
    index: null
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
  lifetimes: {
    created(){
      // console.log(123);
      wx.request({
        url: 'https://app.vmovier.com/apiv3/index/index',
        success:(res)=> {
          // console.log(this,'+++++++++++', res);
          this.setData({
            index: res.data.data
          })
        }
      })
    }
  }
})
