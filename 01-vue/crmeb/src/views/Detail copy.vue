<template>
  <div class="detail" v-if="detail">
    <!-- <div class="banner">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item
          v-for="(item, index) in detail.storeInfo.slider_image"
          :key="index"
        >
          <van-image width="100%" fit="contain" :src="item" />
        </van-swipe-item>
      </van-swipe>
    </div> -->

    <!-- sku -->
    <!-- <van-sku
        v-model="show"
        :sku="sku"
        :goods="goods"
        :goods-id="goodsId"
        :hide-stock="true"
        @buy-clicked="onBuyClicked"
        @add-cart="onAddCartClicked"
      /> -->

      <button @click="show = true">show sku</button>
    <van-sku v-model="show" :hide-stock="true" :sku="sku" :goods="goods">

<!-- 自定义 sku-header-price -->
  <template #sku-header-price="props">
    <div class="van-sku__goods-price">
      <p>xxxxxxxxx</p>
      <span class="van-sku__price-symbol">￥</span
      ><span class="van-sku__price-num">{{ props.price }}</span>
      <span>yyy</span>
    </div>
  </template>

    </van-sku>

    <!-- <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" />
      <van-goods-action-icon icon="cart-o" text="购物车" />
      <van-goods-action-icon icon="shop-o" text="店铺" />
      <van-goods-action-button type="warning" text="加入购物车" />
      <van-goods-action-button type="danger" text="立即购买" />
    </van-goods-action> -->
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      detail: null,
      show: true,
      sku: {
        // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
        // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
        tree: [
          {
            k: "颜色", // skuKeyName：规格类目名称
            k_s: "s1", // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
            v: [
              {
                id: "1", // skuValueId：规格值 id
                name: "红色", // skuValueName：规格值名称
              },
              {
                id: "2",
                name: "蓝色",
              },
            ],
            largeImageMode: false, //  是否展示大图模式
          },
        ],
        // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
        list: [
          {
            id: 2259, // skuId
            s1: "1", // 规格类目 k_s 为 s1 的对应规格值 id
            s2: "1", // 规格类目 k_s 为 s2 的对应规格值 id
            price: 100, // 价格（单位分）
            stock_num: 110, // 当前 sku 组合对应的库存
          },
        ],
        price: "1.00", // 默认价格（单位元）
        stock_num: 227, // 商品总库存
        collection_id: 2261, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
        none_sku: false, // 是否无规格商品
        
        hide_stock: false, // 是否隐藏剩余库存
      },
      goods: {
        // 默认商品 sku 缩略图
        picture: "https://img01.yzcdn.cn/2.jpg",
      },
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
