<template>
  <div class="detail" v-if="detail">
    xxx
    <div class="banner">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item
          v-for="(item, index) in detail.storeInfo.slider_image"
          :key="index"
        >
          <van-image
            width="100%"
            fit="contain"
            src="https://img01.yzcdn.cn/vant/cat.jpeg"
          />
        </van-swipe-item>
      </van-swipe>





      <van-goods-action>
        <van-goods-action-icon icon="chat-o" text="客服" @click="onClickIcon" />
        <van-goods-action-icon
          icon="cart-o"
          text="购物车"
          @click="onClickIcon"
        />
        <van-goods-action-icon icon="shop-o" text="店铺" @click="onClickIcon" />
        <van-goods-action-button type="warning" text="加入购物车" />
        <van-goods-action-button
          type="danger"
          text="立即购买"
          @click="onClickButton"
        />
      </van-goods-action>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      detail: null,
    };
  },
  created() {
    // Vue.axios()
    // window.axios
    this.axios
      .get("/product/detail/" + this.$route.query.id)
      .then((response) => {
        // console.log(response.data.data);
        this.detail = response.data.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  },
};
</script>

<style>
</style>
