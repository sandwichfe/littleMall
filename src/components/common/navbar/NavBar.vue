<template>
    <div class="nav-bar">
        <div class="left">
            <slot name="left"></slot>
        </div>
        <div class="center">
            <slot name="center"></slot>
        </div>
        <div class="right">
            <slot name="right"></slot>
        </div>


    </div>
</template>

<script>
    export default {
        name: "NavBar"
    }
</script>

<style scoped>
    .nav-bar {
        display: flex;          /* flex布局*/
        height: 44px;
        line-height: 44px;
        text-align: center;
        box-shadow: 0 1px 1px rgba(100,100,100,.1);
    }

    .left,                                    /* 左部分  右部分 都占60px的固定宽*/
    .right {
        width: 60px;
       /* background-color:navajowhite ;*/
    }

    .center {                                   /* 剩余的就是中间的宽  要写flex=1*/
        flex: 1;
      /*  background-color:#ff8198 ;*/
    }




</style>