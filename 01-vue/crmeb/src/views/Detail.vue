<template>
  <div class="detail" v-if="detail">
    <div class="banner">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item
          v-for="(item, index) in detail.storeInfo.slider_image"
          :key="index"
        >
          <van-image width="100%" height="100vw" fit="cover" :src="item" />
        </van-swipe-item>
      </van-swipe>
    </div>

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

    <button @click="show = true">{{sku.join()}}</button>
    <van-popup
      v-model="show"
      position="bottom"
      round
      closeable
      close-icon-position="top-right"
    >
      <van-card
        :title="detail.storeInfo.store_name"
        :thumb="
          currentDetail && currentDetail.image
            ? currentDetail.image
            : detail.storeInfo.image
        "
      >
        <template #price>
          <span>价格 {{ detail.storeInfo.price }}</span>
          <span>库存 {{ detail.storeInfo.stock }}</span>
        </template>
      </van-card>

      <!-- 属性 -->

      <div
        class="attr"
        v-for="(attrGroup, index) in detail.productAttr"
        :key="index"
      >
        <div class="attr-title">{{ attrGroup.attr_name }}</div>
        <ul class="attr-list">
          <!-- <li class="attr-item">{{attr}}</li> -->
          <label v-for="(attr, idx) in attrGroup.attr_values" :key="idx">
            <input
              type="radio"
              :value="attr"
              :name="attrGroup.attr_name"
              v-model="sku[index]"
            />
            <span>{{ attr }}</span>
          </label>
        </ul>
      </div>
    </van-popup>

    <section class="tuijian">
      <van-swipe class="my-swipe" indicator-color="white">
        <van-swipe-item v-for="n in detail.good_list.length / 6" :key="n">
          <ul class="list">
            <!-- <ProductCard /> -->
            <ProductCard
              @click.native="$router.push('/detail?id=' + item.id)"
              v-for="(item, index) in detail.good_list.slice(
                6 * (n - 1),
                6 * n
              )"
              :key="index"
              :item="item"
            />
          </ul>
        </van-swipe-item>
      </van-swipe>
    </section>

    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" />
      <van-goods-action-icon icon="cart-o" text="购物车" />
      <van-goods-action-icon icon="shop-o" text="店铺" />
      <van-goods-action-button
        type="warning"
        @click="addCart"
        text="加入购物车"
      />
      <van-goods-action-button type="danger" text="立即购买" />
    </van-goods-action>
  </div>
</template>

<script>
import ProductCard from "@/components/ProductCard.vue";
export default {
  components: {
    ProductCard,
  },
  data: function () {
    return {
      detail: null,
      show: false,
      sku: [],
      // currentDetail: null,
    };
  },
  created() {
    console.log("created");
    // Vue.axios()
    // window.axios
    // this.axios
    //   .get("/product/detail/" + this.$route.query.id)
    //   .then((response) => {
    //     // console.log(response.data.data);
    //     this.detail = response.data.data;
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });

    this.getDetail(this.$route.query.id);
  },
  mounted() {
    console.log("mounted");
  },
  updated() {
    console.log("updated");
  },
  methods: {
    getDetail: function (id) {
      this.axios
        .get("/product/detail/" + id)
        .then((response) => {
          // console.log(response.data.data);
          this.detail = response.data.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    addCart() {
      // console.log({ productId: "68", cartNum: 1, new: 0, uniqueId: "" });

      // this.axios
      //   .post("/cart/add", {
      //     productId: this.currentDetail.product_id,
      //     cartNum: 2,
      //     new: 0,
      //     uniqueId: this.currentDetail.unique,
      //   })
      //   .then((response) => {
      //     console.log(response);
      //   })
      //   .catch(function (error) {
      //     console.log(error);
      //   });

      this.axios({
        method: "post",
        url: "/cart/add",
        headers: {
          "Authori-zation":
            "Bearer " +
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI0Ny4xMTUuNTEuMTg1IiwiYXVkIjoiNDcuMTE1LjUxLjE4NSIsImlhdCI6MTYxNDc1Njk4NywibmJmIjoxNjE0NzU2OTg3LCJleHAiOjE2MTQ3Njc3ODcsImp0aSI6eyJpZCI6MiwidHlwZSI6InVzZXIifX0.guoNnYqxzZwi2FzF7vS1ViAa4hn6MchjoGyw9fw0MZA",
        },
        data: {
          productId: this.currentDetail.product_id,
          cartNum: 2,
          new: 0,
          uniqueId: this.currentDetail.unique,
        },
      })
        .then((response) => {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  computed: {
    currentDetail: function () {
      return this.detail.productValue[this.sku.join()];
    }
  },

  watch: {
    detail: function (n) {
      // console.log(n,o);
      this.sku = n.productAttr.map((item) => item.attr_values[0]);
    },
    // sku: function (n) {
    //   // console.log(n.join());
    //   // console.log(this.detail.productValue[n.join()]);
    //   this.currentDetail = this.detail.productValue[n.join()];
    // },
    // $route(to) {
    //   // 对路由变化作出响应...
    //   console.log(to.query.id);
    //   this.getDetail()
    // }
  },

  beforeRouteUpdate(to, from, next) {
    console.log("beforeRouteUpdate", to.query.id);
    next();
    this.getDetail(to.query.id)
  },
};
</script>

<style lang="less">
.list {
  display: flex;
  flex-wrap: wrap;
}
</style>
