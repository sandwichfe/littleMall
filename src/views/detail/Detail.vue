<template>
    <div id="detail">
        <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
        <scroll class="content" ref="scroll"  :probe-type="3" @scrollShow="contentScroll">
            <detail-swiper :top-images="topImages" ref="swiper"></detail-swiper>
            <detail-base-info :goods="goods"></detail-base-info>
            <detail-shop-info :shop="shop"></detail-shop-info>
            <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
            <detail-param-info ref="params" :param-info="paramInfo"/>
            <detail-comment-info ref="comment" :comment-info="commentInfo"/>
            <goods-list ref="recommend" :goods="recommends"/>
        </scroll>
        <detail-bottom-bar @addCart="addToCart"/>
        <back-top v-show="isShowBackTop" @click.native="backClick"></back-top>
    </div>

</template>

<script>
    import DetailNavBar from './childComponents/DetailNavBar'
    import DetailSwiper from './childComponents/DetailSwiper'
    import DetailBaseInfo from './childComponents/DetailBaseInfo'
    import DetailShopInfo from './childComponents/DetailShopInfo'
    import DetailGoodsInfo from './childComponents/DetailGoodsInfo'
    import DetailParamInfo from './childComponents/DetailParamInfo'
    import DetailCommentInfo from './childComponents/DetailCommentInfo'
    import DetailBottomBar from './childComponents/DetailBottomBar'

    import scroll from 'components/common/scroll/Scroll'
    import GoodsList from 'components/context/goods/GoodsList'
    import BackTop from 'components/context/backTop/BackTop'

    import {getDetail,Goods,Shop,GoodsParam,getRecommend} from '../../network/detail'
    import {debounce} from "../../commons/utils";

    export default {
        name: "Detail",
        data(){
            return{
                iid:null,       //当前商品的iid
                topImages: [],          //当前商品的轮播图数据,
                goods:{},     //商品信息,
                shop:{},
                detailInfo: {},   //详情信息,
                paramInfo: {},
                commentInfo: {},
                recommends: [],    //详情页推荐信息,
                themeTopYs:[],     //  商品 参数 评论 推荐 四个模块的 offsetTop值,
                currentIndex: 0,
                isShowBackTop: false,              //BackTop按钮是否显示,

            }
        },
        components:{
            DetailNavBar,
            DetailSwiper,
            DetailBaseInfo,
            DetailShopInfo,
            DetailGoodsInfo,
            DetailParamInfo,
            DetailCommentInfo,
            DetailBottomBar,

            GoodsList,
            scroll,
            BackTop
        },
        created(){
            //1.保存当前商品的iid
            this.iid=this.$route.params.iid                //得到当前路由路径的后缀 也就是商品的iid

            //2.根据iid请求详细信息（轮播图数据）
            getDetail(this.iid).then(res =>{
                //console.log(res);
                this.topImages=res.result.itemInfo.topImages

                const data=res.result
                //3.保存商品信息    new Goods是 detail.js里面的构造函数
                this.goods=new Goods(data.itemInfo,data.columns,data.shopInfo.services)

                //4.商家信息
                this.shop= new Shop(data.shopInfo)

                //5.保存商品的详情数据
                this.detailInfo = data.detailInfo;

                //6.获取参数信息
                this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);

                //7.取出评论的信息
                if(data.rate.cRate !== 0) {
                    this.commentInfo = data.rate.list[0];
                }
            })

            //3.请求推荐数据
            getRecommend().then(res => {
                this.recommends = res.data.list;
            })



        },
        methods:{
            //GoodList里面的所有图片加载完以后
            imageLoad() {
                this.$refs.scroll.trefresh()         // 刷新scroll的高度

                this.getThemeTopYs();     //调用  getThemeTopYs

                //图片加载完后轮播图也重新初始化一下
                this.$refs.swiper.init
            },


            titleClick(index){
                //console.log(index);
                this.$refs.scroll.tScrollTo(0,-this.themeTopYs[index],100)
            },

            contentScroll(position) {
                const positionY = -position.y;

                let length = this.themeTopYs.length;
                for(let i = 0; i < length; i++) {
                    if (this.currentIndex !== i && ((i < length - 1 && positionY >= this.themeTopYs[i]
                        && positionY < this.themeTopYs[i+1]) || (i === length - 1 && positionY >= this.themeTopYs[i]))){
                        this.currentIndex = i;
                        //console.log(this.currentIndex);
                        this.$refs.nav.currentIndex = this.currentIndex;
                    }
                }

                //是否显示回到顶部
                this.isShowBackTop = (-position.y) > 1000
            },
            backClick() {
                // console.log(1);                             //500为到达目标坐标时花费的时间
                this.$refs.scroll.tScrollTo(0, 0, 800) //拿到scroll子组件对象并执行他的tScrollTo方法
            },

            addToCart(){
                //1.获取购物车需要展示的信息
                const product = {};
                product.image = this.topImages[0];
                product.title = this.goods.title;
                product.desc = this.goods.desc;
                product.price = this.goods.realPrice;
                product.iid = this.iid;

               // console.log(this.goods);

                //将商品添加到购物车中  用vuex进行信息的存储
                this.$store.commit('addCart',product)           //调动vuex里面的方法addCart  并将product传过去
                this.$toast.show("添加成功！")
            }
        },

        mounted() {
            this.getThemeTopYs=debounce(()=>{this.themeTopYs=[];               //getThemeTopYs为  debounce之后返回的一个函数
                this.themeTopYs.push(0);
                this.themeTopYs.push(this.$refs.params.$el.offsetTop);
                this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
                this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
                //console.log(this.themeTopYs);
            },100)
        }

    }
</script>

<style scoped>
    #detail {
        position: relative;
        z-index: 9;                  /*盖住下面的tabbar*/
        background-color: #fff;
        height: 100vh;
    }

    .detail-nav {
        position: relative;
        z-index: 9;            /* 导航栏要在最上面*/
        background-color: #fff;
    }


    .content {        /*滚动条的高度*/
        height: calc(100% - 44px);
    }




</style>