<template>
    <div>
        <van-tabs v-model="active">
            <van-tab
                v-for="item in categories"
                :key="item._id"
                :title="item.title"
            >
                <slot name="tabSlot"></slot>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
export default {
    props: {
        categories: {
            type: Array
        }
    },
    data() {
        return {
            active: 0
        }
    },
    methods: {},
    watch: {
        active() {
            this.$emit('activeChange', this.active)
        }
    }
}
</script>
<style></style>
