<template>
    <div class="editItem" @click="itemClick">
        <span class="left">{{ left }}</span>
        <span class="right"><slot></slot></span>
    </div>
</template>

<script>
export default {
    data() {
        return {}
    },
    methods: {
        // click触发的回调
        itemClick() {
            // 把具体的业务逻辑放到父组件中,传递标题
            this.$emit('itemClick', this.left)
        }
    },
    props: ['left']
}
</script>
<style lang="scss">
.editItem {
    background: white;
    padding: 1rem 1rem;
    color: #333;
    margin-bottom: 0.1rem;
    border-bottom: 1px solid #fafafa;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>
