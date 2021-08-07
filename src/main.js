import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from 'components/common/toast'

import VueLazyLoad from 'vue-lazyload'

//定义一个事件总线 变量     与此 GoodsListItem与Home进行事件通信
Vue.prototype.$bus=new Vue()
Vue.config.productionTip = false




//安装自定义的toast插件
Vue.use(toast);

//安装图片懒加载插件
Vue.use(VueLazyLoad,{
  loading:  require('./assets/img/common/placeholder_lww.jpg')         //加载中显示的状态图片
})


new Vue({
  render: h => h(App),
  router,                               /*挂载路由*/
  store
}).$mount('#app')
