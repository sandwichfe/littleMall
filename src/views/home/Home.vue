<template>
    <div id="home">
        <nav-bar class="home-nav">
            <div slot="center">购物街</div>
        </nav-bar>
        <tab-control :titles="['流行','新款','精选']"
                     @tabClick="tabClick"
                     ref="tabControl1" class="tab-control"
                     v-show="tabIsFix"></tab-control>

        <!--给他标记一个ref 这样就能在此父组件拿到这个ref子组件对象-->

        <!-- 加:传过去的是 3 不然传过去的是字符 '3'-->             <!--响应子组件的事件scrollShow-->
        <scroll class="content" ref="scroll" :probeType="3" @scrollShow="controlShow"
                :pullUpLoad="true" @tPullingUp="loadMore">

            <home-swiper :banners="banners" class="home-swiper"
                         @swiperImageLoad="swiperImageLoaded"></home-swiper>   <!--将轮播图数据传给子组件-->

            <recommend-view :recommends="recommends"></recommend-view>

            <week-fashion></week-fashion>
            <!-- @tabClick此子组件发送的事件-->
            <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick"
                         ref="tabControl2"></tab-control>


            <goods-list :goods="goods[currentType].list"></goods-list>

        </scroll>

        <!-- 给组件添加事件记得要加.native后缀 才能添加成功-->
        <back-top v-show="isShowBackTop" @click.native="backClick"></back-top>

    </div>
</template>

<script>

    import NavBar from 'components/common/navbar/NavBar'
    import Scroll from 'components/common/scroll/Scroll'


    import HomeSwiper from './childComponents/HomeSwiper'
    import RecommendView from './childComponents/RecommendView'
    import WeekFashion from './childComponents/WeekFashion'


    import TabControl from 'components/context/tabControl/TabControl'
    import GoodsList from 'components/context/goods/GoodsList'
    import BackTop from 'components/context/backTop/BackTop'


    import {getHomeMultidata, getHomeGoods} from "../../network/home";       /*导入函数*/

    import {debounce} from "../../commons/utils";


    export default {
        name: "Home",
        data() {
            return {
                banners: [],             //请求得来的数据  轮播图数据
                recommends: [],                  //   今日推荐 数据
                goods: {                //商品数据
                    'pop': {page: 0, list: []},          //热门 商品
                    'new': {page: 0, list: []},         //新款 商品
                    'sell': {page: 0, list: []}           //精选 商品

                },
                currentType: 'pop',           //当前显示的商品类别,
                isShowBackTop: false,              //BackTop按钮是否显示,
                tabOffsetTop: 0,              //tabControl偏移量,
                tabIsFix: false,              //tabControl是否吸顶,
                saveY:0                       //用于记录用户离开组件时 浏览的滚动条高度
            }
        },
        components: {
            NavBar,
            Scroll,

            HomeSwiper,
            RecommendView,
            WeekFashion,

            GoodsList,
            TabControl,
            BackTop
        },
        destroyed(){   //组件被销毁时执行
        },
        activated(){  //用户点击进入时执行的方法
            //进入时跳到上次离开的滚动条高度  实现浏览状态的记录
            this.$refs.scroll.trefresh()    //进入时同时刷新 滚动条高度
            this.$refs.scroll.tScrollTo(0,this.saveY,0)

        },
        deactivated(){  //用户离开（点了别的组件）时执行的方法
            //离开时保存当前滚动条的长度
            this.saveY = this.$refs.scroll.getStrollY()
        },
        created() {             /*这个组件被创建出来时执行的函数*/
            //1.请求数据                                 res为返回的数据
            this.getHomeData();
            //2.请求商品数据
            this.getHomeGoodsData('pop')
            this.getHomeGoodsData('new')
            this.getHomeGoodsData('sell')


        },
        mounted() {
            //利用 事件总线  监听 ListItem中的事件


            /*  this.$bus.$on('itemImageLoad',()=>{
                  //每一张图片加载完就刷新轮播图高度
                  this.$refs.scroll.trefresh()
              })*/

            //图片加载太快刷新高度会很频繁，用debounce提高性能        相隔50ms之内的trefresh函数就只会执行一次
            const refresh = debounce(this.$refs.scroll.trefresh, 50)
            this.$bus.$on('itemImageLoad', () => {
                refresh();
            })


        },
        methods: {
            /*
            * 事件监听相关
            * */
            tabClick(index) {       /*根据子组件传过来的值来决定当前显示哪类商品*/

                this.$refs.scroll.tScrollTo(0,-(this.tabOffsetTop),0)   //切换后滚动条回到初始位置

                switch (index) {
                    case 0:
                        this.currentType = 'pop'
                        break
                    case 1:
                        this.currentType = 'new'
                        break
                    case 2:
                        this.currentType = 'sell'
                        break
                }
                //两个tabControl1同步
                this.$refs.tabControl1.currentIndex = index
                this.$refs.tabControl2.currentIndex = index

            },

            backClick() {
                // console.log(1);                             //500为到达目标坐标时花费的时间
                this.$refs.scroll.tScrollTo(0, 0, 500) //拿到scroll子组件对象并执行他的tScrollTo方法
            },

            controlShow(position) {
                //1.处理BackTop按钮 用户滑动超过1000  按钮才显示    小于1000自动隐藏
                //console.log(position);
                this.isShowBackTop = (-position.y) > 1000


                //2.处理tabControl是否吸顶
                //当滚动条超过当前tabControl时他就应该吸顶了
                this.tabIsFix = (-position.y) > this.tabOffsetTop + 40


            },
            //加载当前类型商品 加载下一页
            loadMore() {
                //console.log('加载更多....');
                this.getHomeGoodsData(this.currentType)

                this.$refs.scroll.tFinshPullUp();  //执行scroll组件对象的tFinshPullUp 表示本次下拉加载进行的操作已经完成
            },

            //home-swiper里面的轮播图加载完成后  开始计算tabControl的位置   才是准确的
            swiperImageLoaded() {
                //获取组件tabControl里面的元素的信息时 要加一个$el得到的才是组件里面的元素
                this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
            },


            /*
            * 网络请求相关
            * */
            getHomeData() {
                getHomeMultidata().then(res => {
                    if(res==null){     //为空就引用我暂时保存的数据
                        res=Multidata
                    }
                    //console.log(res);
                    this.banners = res.data.banner.list;
                    this.recommends = res.data.recommend.list;
                })
            },
            getHomeGoodsData(type) {         //请求类别和页数对应的商品 并保存下来
                const GoodPage = this.goods[type].page + 1;         //用户下拉加载时 就再次请求加载下一页的数据
                getHomeGoods(type, GoodPage).then(res => {          //每一页为30条数据
                    //console.log(res.data.list);
                    this.goods[type].list.push(...res.data.list)    //将新一页的数据添加到该类别商品总数中
                    this.goods[type].page += 1;    //当前商品页数加一
                })                                                //...数组 就是此数组中的每一项数据
            }
        }
    }
</script>

<style scoped>
    #home {
        position: relative;
        height: 100%; /*设置了这个  scroll定位才出来了.....*/
    }

    .home-nav {
        background-color: var(--color-tint); /* 使用assets/css/base.css里面定义的变量*/
        color: #fff;
        /* position: fixed;
         top: 0;
         left: 0;
         right: 0;
         z-index: 66; !*优先级*!*/
    }

    .content {
        overflow: hidden;
        position: absolute;
        top: 44px;
        bottom: 49px;
        left: 0;
        right: 0;

    }

    .tab-control {
        width: 100%;
        position: absolute;
        z-index: 999;
    }



</style>
