<template>
    <div class="goods-item" @click="itemClick">           <!--v-lazy  vue的图片懒加载插件-->
            <img v-lazy="showImage"  @load="imageLoad">  <!--每次图片加载完就会调用这个函数-->
        <div class="goods-info">
            <p>{{goodsItem.title}}</p>
            <span class="price">{{goodsItem.price}}</span>
            <span class="collect">{{goodsItem.cfav}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "GoodsListItem",
        props:{
            goodsItem:{
                type:Object,
                default(){
                    return {}
                }
            }
        },
        methods:{
            imageLoad(){     //每一次图片加载完成就会执行此事件  发送一次事件
                //用事件总线发送事件 （与子传父有区别）
                this.$bus.$emit('itemImageLoad')
            },
            itemClick(){
                //console.log('llll');
                this.$router.push('/detail/'+this.goodsItem.iid)     //跳转到 detail路径 ，并传递参数
            }
        },
        computed:{
            showImage(){
                return this.goodsItem.image || this.goodsItem.show.img    //如果前面的值为空就返回后面的值
            }
        }
    }
</script>

<style scoped>

    .goods-item {
        padding-bottom: 40px;
        position: relative;
        width: 48%;
    }

    .goods-item img {
        width: 100%;
        border-radius: 5px;
    }

    .goods-info {
        font-size: 12px;
        position: absolute;
        bottom: 5px;
        left: 0;
        right: 0;
        overflow: hidden;
        text-align: center;
    }

    .goods-info p {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-bottom: 3px;
    }

    .goods-info .price {
        color: var(--color-high-text);
        margin-right: 20px;
    }

    .goods-info .collect {
        position: relative;
    }

    .goods-info .collect::before {
        content: '';
        position: absolute;
        left: -15px;
        top: -1px;
        width: 14px;
        height: 14px;
        background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
    }

</style>