// components/card/card.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
item: Object
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    navToPost(e){
      // console.log(e.currentTarget.dataset.xxx);
      wx.navigateTo({
        url: '/pages/post/post?postid=' + e.currentTarget.dataset.xxx,
      })
    }
  }
})
