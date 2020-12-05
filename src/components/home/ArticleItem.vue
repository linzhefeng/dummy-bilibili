<template>
    <div>
        <van-list
            v-model="loading"
            finished-text="没有更多了"
            @load="onload"
            :immediate-check="false"
            :finished="finished"
        >
            <div class="articles">
                <div
                    class="aricleItem"
                    v-for="(item, index) in info.list"
                    :key="index"
                    @click="itemClickHandle(item.id)"
                >
                    <div class="picture">
                        <img
                            v-if="
                                item.img
                                    .toString()
                                    .startsWith(
                                        'https://node.12380ch.com/upload/file-'
                                    )
                            "
                            src="../../assets/images/replacer.jpg"
                            alt=""
                        />
                        <img v-else :src="item.img" alt="" :key="index" />
                        <div class="detail">
                            <span
                                class="volume iconfont icon-iconset0481
"
                                >1233</span
                            >
                            <span
                                class="comment iconfont icon-pinglun-copy-copy
"
                                >199</span
                            >
                        </div>
                    </div>
                    <div class="describe">
                        <p>{{ item.name }}</p>
                    </div>
                </div>
            </div>
        </van-list>
    </div>
</template>

<script>
export default {
    data() {
        return {
            finished: false,
            loading: false
        }
    },
    props: ['info'],
    methods: {
        itemClickHandle(id) {
            this.$router.push('/article/' + id)
        },
        onload() {
            // sencond param is limit
            this.$emit('dataOnload', 50)
        }
    }
}
</script>
<style lang="scss">
.articles {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-evenly;
    padding: 0.6rem;
    .aricleItem {
        display: flex;
        flex-flow: column;
        width: 45vw;
        height: 30vw;
        margin-bottom: 0.2rem;
        padding: 0.1rem;

        .picture {
            width: 100%;
            height: 25vw;
            background: lightblue;
            overflow: hidden;
            position: relative;
            img {
                width: 100%;
            }
            .detail {
                position: absolute;
                left: 0;
                bottom: 0;
                padding: 0.5rem;
                display: flex;
                width: 100%;
                justify-content: space-between;
                span {
                    color: white;
                    font-size: 0.8rem;
                    font-weight: bold;
                }
            }
        }
        .describe {
            padding: 0.1rem;
            p {
                font-size: 0.7rem;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
            }
        }
    }
}
</style>
