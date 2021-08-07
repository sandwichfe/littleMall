<template>
    <div class="wrapper" ref="wrapper">    <!--设置一个唯一的ref-->
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'

    export default {
        name: "Scroll",
        props: {
            probeType: {          //可以通过此决定使用此组件时是否监听滚动
                type: Number,
                default: 0
            },
            pullUpLoad:{
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                scroll: null         //滚动条对象,

            }
        },
        mounted() {
            this.scroll = new BScroll(this.$refs.wrapper, {


                click: true,               //开始之后 此组件内的内容才能被点击触发事件

                //为 1或 0 不会监听滚动的位置 为2监听手指滚动终点位置 为3监听滚动惯性完成后的位置
                probeType: this.probeType,
                pullUpLoad:this.pullUpLoad        //为true就会监听 滚动到底时 触发的操作  也就是到底部加载更多

            })

            //监听每一次滚动的位置，只有probeType为2或3时此监听才生效
            this.scroll.on('scroll', position => {
                //console.log(position);
                //监听到之后就向外发送事件
                this.$emit('scrollShow',position)  //将此时滑到的位置传过去
            })


            //监听滚动到底 时    进行的操作    pullUpLoad为true此监听才生效
            this.scroll.on('pullingUp',()=>{
                //console.log('滑到底了，加载更多中........');
                this.$emit('tPullingUp')    //发送事件出去
            })
        },


        methods: {
            tScrollTo(x, y, time = 300) {
                this.scroll.scrollTo(x, y, time)        //滚动条对象的 方法  能设置当前滚动到哪儿
            },

            tFinshPullUp(){
                this.scroll.finishPullUp()     //执行finishPullUp表示本次pullingUp下拉事件执行完成
            },

            trefresh(){   //重新刷新滚动条的长度
                //console.log('1');
                this.scroll.refresh()
            },
            getStrollY(){     //得到当前滚动的高度
                return this.scroll.y
            }
        }
    }
</script>

<style scoped>

</style>