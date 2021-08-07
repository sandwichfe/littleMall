<template>
    <swiper class="detail-swiper">     <!--使用时最好以swiper为根元素，不然轮播图会出错-->
        <swiper-item v-for="item in topImages">
            <img :src="item" >
        </swiper-item>
    </swiper>
</template>

<script>
    import {Swiper,SwiperItem} from 'components/common/swiper'
    export default {
        name: "DetailSwiper",
        props:{
            topImages:{
                type:Array,
                default(){
                    return []
                }
            }
        },
        components:{
            Swiper,
            SwiperItem
        }
    }
</script>

<style scoped>

    .detail-swiper {
        height: 300px;
        overflow: hidden;
    }


</style>