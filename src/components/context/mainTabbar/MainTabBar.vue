<template>
  <div>
      <tab-bar>      <!-- path为子组件中props中的变量，用于接收在此父组件的值，在子组件中使用此值-->
          <tab-bar-item  path="/home">  <!-- 路径使用 ~ .. 是因为给路径取了别名才能这样写-->
              <img slot="item-icon" src="~assets/img/tabbar/home.svg">    <!--使用插槽-->
              <img slot="item-icon-active" src="~assets/img/tabbar/home_active.svg">    <!--处于活跃状态时显示的图片-->
              <div slot="item-text">首页</div>
          </tab-bar-item>
          <tab-bar-item path="/category" active-color="hotpink">   <!-- 自定义子组件的字体颜色 父传给子颜色值-->
              <img slot="item-icon" src="~assets/img/tabbar/category.svg">
              <img slot="item-icon-active" src="~assets/img/tabbar/category_active.svg">
              <div slot="item-text">分类</div>
          </tab-bar-item>
          <tab-bar-item path="/cart">
              <img slot="item-icon" src="~assets/img/tabbar/shopcart.svg">
              <img slot="item-icon-active" src="~assets/img/tabbar/shopcart_active.svg">
              <div slot="item-text">购物车</div>
          </tab-bar-item>
          <tab-bar-item path="/profile" active-color="hotpink">
              <img slot="item-icon" src="~assets/img/tabbar/profile.svg">
              <img slot="item-icon-active" src="~assets/img/tabbar/profile_active.svg">
              <div slot="item-text">我的</div>
          </tab-bar-item>
      </tab-bar>
  </div>
</template>

<script>
    import TabBar from 'components/common/tabbar/Tabbar'
    import TabBarItem from 'components/common/tabbar/TabBarItem'
    export default {
        name: "MainTabBar",
        components:{
            TabBar,         /*注册组件*/
            TabBarItem
        }
    }
</script>

<style scoped>

</style>