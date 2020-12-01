<template>
    <div>
        <nav-bar></nav-bar>
        <home-tabs
            @activeChange="aChangeHandle"
            :categories="categories"
        ></home-tabs>
    </div>
</template>

<script>
import NavBar from '../components/common/NavBar'
import HomeTabs from '../components/home/HomeTabs'
export default {
    data() {
        return {
            categories: [],
            // 保存当前分类对应下的id
            curIndex: 0
        }
    },
    components: {
        NavBar,
        HomeTabs
    },
    methods: {
        // 获取首页分类
        async fetchCategories() {
            const res = await this.$http.get('/category')
            this.categories = res.data
            this.handleCategory()
        },
        // 在分类的每个对象中新增list属性
        handleCategory() {
            this.categories.map(item => {
                item.list = []
                item.page = 0
                item.pagesize = 10
            })
        },
        // 获取文章数据
        // 只获取数据
        async fetchArticle() {
            let item = this.categories[this.curIndex]
            const res = await this.$http.get('/detail/' + item._id, {
                params: {
                    page: item.page,
                    pagesize: item.pagesize
                }
            })
            return res
        },
        // 子组件active改变后出发的处理事件,接收tab的当前下标
        // 处理事件
        async aChangeHandle(index) {
            // 通过这个下标来获取_id
            this.curIndex = index
            const res = await this.fetchArticle()
            this.categories[index].list = res.data
        },
        // 第一次加载页面 自动加载文章
        async articleInit() {
            const res = await this.fetchArticle()
            this.categories[this.curIndex].list = res.data
        }
    },
    async created() {
        await this.fetchCategories()
        this.articleInit()
    }
}
</script>
<style></style>
