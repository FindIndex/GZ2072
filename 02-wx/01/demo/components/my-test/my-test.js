// components/my-test/my-test.js
Component({

  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {
    propA: String,
    friends: Array,
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
    changeProp() {
      // console.log(123);
      console.log(this.data.propA);
      this.setData({
        propA: 'hello wx'
      })

      // this.setData({
      //   friends: ['123']
      // })
    },

    tapEvent() {
      console.log(456);
      this.triggerEvent('customEvent', {name: 'nick'})
    }
  }
})
