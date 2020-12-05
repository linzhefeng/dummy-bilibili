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
        /*-----------------------------fetch start --------------------------------*/
        async fetchCategories() {
            // 获取首页分类数据,并返回
            return await this.$http.get('/category')

            // 接下来把数据处理一下
            // this.categoryHandle(res.data)
        },
        async fetchArticle() {
            // 获取文章数据,
            let item = this.curCategory()
            const res = await this.$http.get('/detail/' + item._id, {
                params: {
                    page: item.page,
                    pagesize: item.pagesize
                }
            })
            return res
        },
        /* ----------------------------fetch end----------------------------- */

        /* -------------------------------handle start----------------------------------- */
        categoryHandle(res, page, pagesize) {
            // 在分类的每个对象中新增list属性
            let tempCategories = res.data.map(item => {
                item.list = []
                item.page = page
                item.pagesize = pagesize
                return item
            })
            this.categories = tempCategories
        },
        async onloadHandle(limit) {
            // 数据到底了继续加载
            let length = this.curCategory().list.length
            if (length < limit) {
                const { data } = await this.fetchArticle()
                setTimeout(() => {
                    this.curCategory().list.push(...data)
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
            // 应当先判断当前是否分类的list是否已经有内容了
            if (!this.curCategory().list.length) {
                const res = await this.fetchArticle()
                this.categories[index].list = res.data
            }
        },
        /* -------------------------------handle end----------------------------------- */

        /* ---------------------------------other----------------------------------------- */
        async articleInit() {
            // 第一次加载页面 自动加载文章
            const res = await this.fetchArticle()
            const item = this.curCategory()
            item.list = res.data
        },
        curCategory() {
            // 获取当前分类
            return this.categories[this.curIndex]
        }
    },

    async created() {
        const res = await this.fetchCategories()
        this.categoryHandle(res, 0, 10)
        this.articleInit()
    }
}
</script>
<style></style>
