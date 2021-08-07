<template>
    <div class="tab-control">
        <div v-for="(item,index) in titles" class="tab-control-item"
             :class="{active:currentIndex==index}" @click="itemClick(index)">
            <span>{{item}}</span>
        </div>


    </div>
</template>

<script>
    export default {
        name: "TabControl",
        props: {
            titles: {           /* 内容*/
                type: Array,
                default: function () {
                    return []
                }
            }
        },
        data() {
            return {
                currentIndex: 0
            }
        },
        methods: {
            itemClick(index) {              //实现点击变换样式
                this.currentIndex = index;
                this.$emit('tabClick',index)      //$emit向父组件发送事件
            }
        }
    }
</script>

<style scoped>

    .tab-control {
        display: flex;
        text-align: center;
        font-size: 15px;
        height: 40px;
        line-height: 40px;
        background-color: #fff;
    }

    .tab-control-item {
        flex: 1;
    }

    .tab-control-item span {
        padding: 5px;
    }

    .active { /*被点击后生效的样式*/
        color: var(--color-high-text);
    }

    .active span {
        border-bottom: 3px solid var(--color-high-text);
    }

</style>