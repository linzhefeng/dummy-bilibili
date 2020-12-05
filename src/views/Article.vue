<template>
    <div>
        <nav-bar></nav-bar>
        <div class="articleDetail">
            <div class="video">
                <video controls :src="article.content"></video>
            </div>
        </div>
    </div>
</template>

<script>
import NavBar from '../components/common/NavBar'

export default {
    data() {
        return {
            article: {}
        }
    },
    components: {
        NavBar
    },
    methods: {
        async fetchArticle() {
            const id = this.$route.params.id
            const { data } = await this.$http.get('/article/' + id)
            this.article = data[0]
        }
    },
    created() {
        this.fetchArticle()
    }
}
</script>
<style lang="scss">
.articleDetail {
    .video {
        width: 100%;
        video {
            width: 100%;
        }
    }
}
</style>
