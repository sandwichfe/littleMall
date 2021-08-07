import Vue from 'vue'
import Vuex from 'vuex'

//1.安装插件
Vue.use(Vuex)

//创建Store对象
const store = new Vuex.Store({
    state:{
    cartList:[]                     //存放购物车的商品
    },

    mutations:{

        addCart(state,payload){
            //如果添加的商品已经存在于购物车中 那么此商品的购买数量加一
            let isNewProduct=false;
            for (let item of state.cartList){
                if(item.iid===payload.iid){
                    payload.count+=1;
                    isNewProduct=true
                    break;
                }

            }
            if(isNewProduct==false){    //之前购物车不存在此商品
                payload.count=1        //购物车中此商品的数量                       //js还能这样添加属性。。。。。
                payload.checked=true       //结算时 是否此商品被勾选 根据此变量标志

                state.cartList.push(payload)            //将传过来的商品添加进数组

            }


        }

    }
})

//3.导出store  在Vue实例上挂载此对象

export default store
