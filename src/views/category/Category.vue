<template>
    <div id="category" >
        <nav-bar class="nav-bar">
            <div slot="center">商品分类</div>
        </nav-bar>
        <div class="content" >
            <tab-menu :categories="categories" @selectItem="selectItem" ></tab-menu>      <!--左边菜单-->

        <scroll id="tab-content" >    <!--右边内容-->
            <div>
                <tab-content-category :subcategories="showSubData" v-if="sonRefresh" ></tab-content-category>
            </div>
        </scroll>

        </div>

    </div>


</template>


<script>

    import NavBar from 'components/common/navbar/NavBar'
    import Scroll from 'components/common/scroll/Scroll'

    import TabMenu from '../category/childComponents/TabMenu'
    import TabContentCategory from '../category/childComponents/TabContentCategory'


    import {getCategory, getSubcategory} from "network/category";

    import Vue from 'vue'



    export default {
        name: "Category",
        components: {
            NavBar,
            Scroll,


            TabMenu,
            TabContentCategory

        },
        computed:{
           showSubData(){
               if (this.currentIndex==-1){
                   this.currentIndex=0
               }
               return this.subcategories[this.currentIndex]
           }


        },
        data() {
            return {
                categories: [],        //分类标题数据
                subcategories:[],          //子菜单数据
                currentIndex: -1,         //当前分类菜单被点击状态,
                sonRefresh: true            //子组件是否刷新


            }
        },
        created() {
            this._getCategory()          //请求数据
        },
        mounted(){
        },

        methods: {
            _getCategory() {
                getCategory().then(res => {
                    //1.请求分类数据
                    this.categories=res.data.category.list

                    // 2.初始化每个类别的子数据
                    for (let i = 0; i < this.categories.length; i++) {
                        this.subcategories[i] = {}                  //根据 数据  把数组长度初始化出来

                        this._getSubcategories(i)               //存储 子商品数据
                        }

                    this.sonRefresh= false;
                    this.$nextTick(() => {
                        this.sonRefresh= true;
                        this.currentIndex = 0;
                    });
                })

            },

            //根据序号获取对应子商品数据
            _getSubcategories(index) {
                this.currentIndex = index;
                const mailKey = this.categories[index].maitKey;      //序号转化为mailKey
                getSubcategory(mailKey).then(res => {              //通过对应mailKey发送请求
                    Vue.set(this.subcategories,index,res.data)    //分类商品保存起来

                    /*通过Vue.set方法修改数组 的数据    数据才会是响应式的。。。。*/
                })
            },


            /**
             * 事件响应相关的方法
             */

            selectItem(index) {                   //点击分类项时  在右边显示对应的子商品
            this.currentIndex=index
            },

        }

    }
</script>

<style scoped>

    .nav-bar {
        background-color: var(--color-tint); /* 使用assets/css/base.css里面定义的变量*/
        color: #fff;
    }


    #category {
        height: 100vh;
    }

    .content {
        position: absolute;
        left: 0;
        right: 0;
        top: 44px;
        bottom: 49px;

        display: flex;

        overflow: hidden;
    }

    #tab-content {
        height: 100%;
        flex: 1;
    }


</style>
