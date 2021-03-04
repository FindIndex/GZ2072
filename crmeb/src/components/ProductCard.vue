<template>
  <div class="card">
    <img :src="item.image" alt="" />
    <h3>{{ item.store_name }}</h3>
    <p>{{ item.price }}</p>
  </div>
</template>

<script>
export default {
  props: ["item"],
};
</script>

<style lang="less">
.card {
  flex-basis: 33%;
  background: red;
  font-size: 12px;
  h3 {
  }
  p {
  }
  img {
    width: 100%;
  }
}
</style>