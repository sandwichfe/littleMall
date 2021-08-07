<template>
    <nav-bar>
        <div slot="left"><img src="~assets/img/common/back.svg"
           class="back" @click="backClick"></div>
        <div slot="center" class="title">
            <div v-for="(item,index) in titles" class="title-item"
            :class="{active:index===currentIndex}"
            @click="itemClick(index)">{{item}}</div>
        </div>
    </nav-bar>
</template>

<script>
    import NavBar from 'components/common/navbar/NavBar'
    export default {
        name: "DetailNavBar",
        components:{
            NavBar,
        },
        data(){
            return {
                titles:['商品','参数','评论','推荐'],
                currentIndex:0
            }
        },
        methods:{
            itemClick(index){
                this.currentIndex=index;
                this.$emit('titleClick',index)    //点击时发送事件
            },
            backClick(){
                this.$router.back()   //回退
            }
        }
    }
</script>

<style scoped>

    .title {
        display: flex;
    }

    .title-item {
        flex: 1;
        text-align: center;
    }

    .back {
        margin-top: 10px;
    }

    .active {
        color: var(--color-high-text);
    }




</style>