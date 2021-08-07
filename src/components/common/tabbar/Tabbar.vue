<template>
  <div id="tab-bar">
  <slot></slot>      <!--定义插槽用来自定义插放组件-->
  </div>
</template>
<script>
    export default {
        name: "TabBar"
    }
</script>

<style scoped>

  #tab-bar {
    display: flex;     /*使用flex自适应布局*/
    background: #f6f6f6;
    position: fixed;
    left: 0;
    right: 0;     /*使用flex布局时，left 和right都要写为0才是占满*/
    bottom: 0;
    box-shadow: 0px -3px 1px rgba(100,100,100,.1);     /*盒子阴影*/
  }



</style>
