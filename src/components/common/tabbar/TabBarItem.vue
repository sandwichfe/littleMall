<template>
  <div class="tab-bar-item" @click="itemClick">
    <!-- 定义插槽用于自定义插入图片和文字-->
   <!-- 由于插槽可能会被元素直接替换所以给插槽加属性是不安全的，因此在外面包裹一层div来为它设置样式-->
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>    <!-- 在活跃时应显示这张图片-->
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
  export default {
    name: "TabBarItem",
    props:{                   /* 子组件变量  用于接收父组件传来的值*/
      path:String              /*传来的变量类型要为String类型*/,
      activeColor:{     /*可用于父组件灵活的设置活跃时的字体颜色， 父组件设置的值传到此真正的进行设置 */
        type:String ,
        default:'red'      /*默认为红色*/
      }
    },
    data(){
      return{
       /* isActive:false            /!*记录当前状态是否活跃*!/*/
      }
    },
    methods:{
      itemClick(){
        this.$router.replace(this.path)        /*跳转路由(浏览器)  路径*/   /*使用props里面的变量直接this.变量名即可*/
      }
    },
    computed:{   /*计算属性*/
      isActive(){
       /* this.$route.path 为当前活跃的路由
        this.path就是此组件对应的路径
        如果当前的路由与此组件对应的路由一致 说明此item就处于活跃状态*/
        return this.$route.path.indexOf(this.path)!==-1
      },
      activeStyle(){     /*三目表达式，如果是活跃的，就设置为此样式 不是就为空   */   /*activeColor为props中的变量*/
        return this.isActive ? {color:this.activeColor}: {}
      }
    }
  }
</script>

<style scoped>

  .tab-bar-item {
    flex: 1; /* 每项的比例为1*/
    text-align: center; /*水平居中*/
    height: 49px;
    font-size: 14px;
  }

  .tab-bar-item img {
    margin-top: 2px;
    width: 24px;
    height: 24px;
    vertical-align: middle; /*消除图片下面的自带间距*/
  }


</style>
