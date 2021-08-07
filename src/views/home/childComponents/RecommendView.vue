<template>
    <div class="recommendView">
        <div v-for="item in recommends" class="recommendView-item">
            <a :href="item.link">
                <img :src="item.image">
                <div>{{item.title}}</div>
            </a>
        </div>

    </div>
</template>

<script>


    export default {
        name: "RecommendView",
        props: {
            recommends: {
                type: Array,
                default: function () {
                    return []
                }
            }
        },


    }
</script>

<style scoped>
    .recommendView {
        display: flex;
        text-align: center;
        padding: 10px 0;
        border-bottom: 10px solid #eee;        /*这个下边框 有意思*/
        font-size: 14px;
    }
    .recommendView-item {
        flex: 1;
    }

    .recommendView-item img {
        width: 68px;
        height: 68px;
        padding-bottom: 2px;

    }


</style>