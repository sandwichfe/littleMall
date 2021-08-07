<template>
    <div class="cart">
<!--        导航-->
        <nav-bar class="nav-bar">
            <div slot="center">购物车({{storeNum}})</div>
        </nav-bar>
<!--        商品的列表-->
        <cart-list ></cart-list>
<!--        底部-->
        <cart-button-bar></cart-button-bar>
    </div>
</template>

<script>
    import NavBar from 'components/common/navbar/NavBar'
    import CartList from './childComponents/CartList'
    import CartButtonBar from './childComponents/CartButtonBar'

    export default {
        name: "Cart",
        components: {
          NavBar,
          CartList,
          CartButtonBar,
        },

        computed:{
            storeNum(){
                return this.$store.state.cartList.length
            }
        }
    }
</script>

<style scoped>
  .cart {
      height: 100vh;
  }

  .nav-bar {
      background-color: var(--color-tint);
      color: #fff;
      font-weight: 700;
  }
</style>