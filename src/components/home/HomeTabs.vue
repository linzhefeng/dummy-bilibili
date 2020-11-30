<template>
    <div>
        <van-tabs v-model="active">
            <van-tab
                v-for="item in categories"
                :key="item._id"
                :title="item.title"
            ></van-tab>
        </van-tabs>
    </div>
</template>

<script>
export default {
    data() {
        return {
            categories: [],
            active: 0
        }
    },
    methods: {
        async fetch() {
            const res = await this.$http.get('/category')
            this.categories = res.data
        }
    },
    created() {
        this.fetch()
    }
}
</script>
<style></style>
