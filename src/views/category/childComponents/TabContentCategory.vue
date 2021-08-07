<template>
  <div>
    <grid-view :cols="3" :lineSpace="15" :v-margin="20" v-if="subcategories.list">
      <div class="item" v-for="(item, index) in subcategories.list" :key="index">
        <a :href="item.link">
          <img class="item-img" :src="item.image" alt="">
          <div class="item-text">{{item.title}}</div>
        </a>
      </div>
    </grid-view>
  </div>
</template>

<script>
  import GridView from 'components/common/gridView/GridView'

  export default {
    name: "TabContentCategory",
    components: {
      GridView
    },
    props: {
      subcategories: {
        type: Object,
        default() {
          return {}
        }
      }
    },

    data(){
      return{
        infoData:{}
      }
    },

    computed:{
      listData(){
        if(this.subcategories==null){
          return this.infoData
        }
        return this.subcategories
      }

    },
    methods:{
      init(value){
        this.infoData= value
        console.log(this.infoData);
        console.log(this.infoData);
      }

    },

    watch:{                                   //监听某个数据的变化
      subcategories(newValue){
    }
    }
  }
</script>

<style scoped>
  .panel img {
    width: 100%;
  }

  .item {
    text-align: center;
    font-size: 12px;
  }

  .item-img {
    width: 80%;
  }

  .item-text {
    margin-top: 15px;
  }
</style>
