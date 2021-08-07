<template>
  <div id="app" >
    <keep-alive exclude="Detail">   <!--被keep-alive包裹后 里面的组件在用户离开时不会销毁-->
      <router-view></router-view>           <!--不包含detail 因为detail组件每次进去是新的商品-->
    </keep-alive>
    <main-tab-bar></main-tab-bar>

    <icon></icon>               <!--使用svg图标   在profile.vue里面会用到-->
    <svg-icon></svg-icon>
  </div>
</template>

<script>
import MainTabBar from 'components/context/mainTabbar/MainTabBar'


import Icon from 'components/context/Icon/Icon.vue'
import SvgIcon from 'components/context/Icon/svg.vue'

  export default {
    name: 'App',
    components: {
      MainTabBar,       /*tabBar整体*/


      Icon,                  //svg图标
      SvgIcon

    }
  }
</script>

<style>
  @import "assets/css/base.css"; /*引用css文件*/

  #app {
    width: 100vw;
    height: 100vh;
  }

</style>
