<template>
    <swiper class="sw" >
        <swiper-item v-for="item in banners">
            <a :href="item.link"><img :src="item.image" @load="imageLoad"></a>
        </swiper-item>
    </swiper>

</template>

<script>

    import {Swiper, SwiperItem} from  'components/common/swiper'


    export default {
        name: "HomeSwiper",
        data(){
            return{
                isLoad:false      //
            }
        },
        components:{
         Swiper,
         SwiperItem
        },
        props:{
            banners:{            //接受父组件传过来的轮播图数据
                type:Array,
                default:function () {      //默认为一个函数
                    return []              //返回数组的函数
                }
            }
        },
        methods:{
            imageLoad(){    //轮播图片加载完成时
                if(this.isLoad==false){    //因为有多张图片 只需要发送一次事件就可以了
                    this.$emit('swiperImageLoad')
                    this.isLoad=true
                }

            }
        }
    }
</script>

<style scoped>

</style>