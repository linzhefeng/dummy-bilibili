<template>
    <div>
        <nav-bar></nav-bar>
        <home-tabs @activeChange="aChangeHandle" :categories="categories">
            <article-item
                slot="tabSlot"
                :data="categories[curIndex]"
            ></article-item>
        </home-tabs>
    </div>
</template>

<script>
import NavBar from '../components/common/NavBar'
import HomeTabs from '../components/home/HomeTabs'
import ArticleItem from '../components/home/ArticleItem'
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
        HomeTabs,
        ArticleItem
    },
    methods: {
        // 获取首页分类
        async fetchCategories() {
            const res = await this.$http.get('/category')
            // 接下来把数据处理一下
            this.handleCategory(res.data)
        },
        // 在分类的每个对象中新增list属性
        handleCategory(data) {
            let newCat = data.map(item => {
                item.list = []
                item.page = 0
                item.pagesize = 10
                return item
            })
            this.categories = newCat
        },
        // 获取文章数据
        async fetchArticle() {
            let item = this.curCatItem()
            const res = await this.$http.get('/detail/' + item._id, {
                params: {
                    page: item.page,
                    pagesize: item.pagesize
                }
            })
            return res
        },
        // 子组件active改变后出发的处理事件,接收tab的当前下标
        async aChangeHandle(index) {
            // 当前下标存入data中
            this.curIndex = index
            const res = await this.fetchArticle()
            this.categories[index].list = res.data
        },
        // 第一次加载页面 自动加载文章
        async articleInit() {
            const res = await this.fetchArticle()
            const item = this.curCatItem()
            item.list = res.data
        },
        // 获取当前的categories的item
        curCatItem() {
            return this.categories[this.curIndex]
        }
    },
    async created() {
        await this.fetchCategories()
        this.articleInit()
    }
}
</script>
<style></style>
