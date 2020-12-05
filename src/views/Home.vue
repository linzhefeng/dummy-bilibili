<template>
    <div>
        <nav-bar></nav-bar>
        <home-tabs @activeChange="activeChangeHandle" :categories="categories">
            <article-item
                slot="tabSlot"
                :info="categories[curIndex]"
                @dataOnload="onloadHandle"
                ref="article"
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
        /*-----------------------------数据获取函数start --------------------------------*/
        async fetchCategories() {
            // 获取首页分类数据
            const res = await this.$http.get('/category')
            // 接下来把数据处理一下
            this.categoryHandle(res.data)
        },
        async fetchArticle() {
            // 获取文章数据,
            let item = this.curCatItem()
            const res = await this.$http.get('/detail/' + item._id, {
                params: {
                    page: item.page,
                    pagesize: item.pagesize
                }
            })
            return res
        },
        /* ----------------------------数据获取函数end----------------------------- */

        /* -------------------------------handle start----------------------------------- */
        categoryHandle(data) {
            // 在分类的每个对象中新增list属性
            let newCat = data.map(item => {
                item.list = []
                item.page = 0
                item.pagesize = 10
                return item
            })
            this.categories = newCat
        },
        async onloadHandle(limit) {
            // 数据到底了继续加载
            let arr = this.curCatItem().list
            let page = this.curCatItem().page++
            const { data } = await this.fetchArticle()
            arr.push(...data)
            if (page < limit) {
                setTimeout(() => {
                    this.curCatItem().list = arr
                    this.$refs.article.loading = false
                }, 1500)
            } else {
                this.$refs.article.finished = true
            }
        },

        async activeChangeHandle(index) {
            // 子组件active改变后出发的处理事件,接收tab的当前下标
            // 当前下标存入data中
            this.curIndex = index
            const res = await this.fetchArticle()
            this.categories[index].list = res.data
        },
        /* -------------------------------handle end----------------------------------- */

        /* ---------------------------------other----------------------------------------- */
        async articleInit() {
            // 第一次加载页面 自动加载文章
            const res = await this.fetchArticle()
            const item = this.curCatItem()
            item.list = res.data
        },
        curCatItem() {
            // 获取当前的categories的item
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
