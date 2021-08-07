<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
<!--      <li v-for="item in cartList">{{item}}</li>-->
      <cart-list-item v-for="(item, index) in $store.state.cartList" :key="index" :item-info="item"></cart-list-item>
    </scroll>
  </div>
</template>

<script>
  import Scroll from 'components/common/scroll/Scroll'
  import CartListItem from './CartListItem'
  import {mapGetters} from 'vuex'

  export default {
    name: "CartList",
    components: {
      Scroll,
      CartListItem,
    },
    activated() {               //添加完商品进入购物车页面时  刷新滚动条高度
      this.$refs.scroll.trefresh();
    },
  }
</script>

<style scoped>
  .cart-list {
    height: calc(100% - 44px - 49px - 40px);
  }

  .content {
    height: 100%;
    overflow: hidden;
  }
</style>