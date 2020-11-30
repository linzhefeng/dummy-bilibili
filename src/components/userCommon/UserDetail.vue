<template>
    <div class="userDetail">
        <div class="infoTop">
            <!-- 头像 -->
            <div class="avatar">
                <img :src="userInfo.user_img" v-if="userInfo.user_img" />
                <van-icon
                    v-else
                    name="https://b.yzcdn.cn/vant/icon-demo-1126.png"
                />
            </div>

            <!-- 头像右边的内容 -->
            <div class="right">
                <!-- 信息:粉丝 关注 点赞 -->
                <div class="userData">
                    <div class="fans">
                        <div class="num">1</div>
                        <div class="text">粉丝</div>
                    </div>
                    <div class="flowers">
                        <div class="num">1</div>
                        <div class="text">关注</div>
                    </div>
                    <div class="likes">
                        <div class="num">1</div>
                        <div class="text">点赞</div>
                    </div>
                </div>
                <div class="edit" @click="$router.push('/edit')">
                    编辑资料
                </div>
            </div>
        </div>
        <div class="infoBottom">
            <div class="top">
                <p>{{ userInfo.name }}</p>
            </div>
            <div class="center">
                <p v-if="userInfo.user_desc">{{ userInfo.user_desc }}</p>
                <p v-else>这个人很懒</p>
                <p class="open">展开</p>
            </div>
            <div class="line"></div>

            <van-tabs class="bottom" v-model="active">
                <van-tab title="动态">内容 1</van-tab>
                <van-tab title="视频">内容 2</van-tab>
            </van-tabs>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            active: 0
        }
    },
    props: ['userInfo'],
    methods: {}
}
</script>
<style lang="scss">
.userDetail {
    background: white;
    padding: 0.5rem;
    div {
        margin-top: 0.3rem;
    }
    .infoTop {
        display: flex;
        justify-content: space-between;
        .avatar {
            width: 25vw;
            height: 25vw;
            border-radius: 50%;
            overflow: hidden;
            margin-right: 1.5rem;
            img {
                width: 100%;
                height: 100%;
            }
        }
        .right {
            display: flex;
            flex: 1;
            flex-flow: column;
            justify-content: space-around;
            align-items: center;
            .userData {
                width: 55vw;
                display: flex;
                justify-content: space-between;
                div {
                    text-align: center;
                    div:nth-child(2) {
                        color: gray;
                    }
                }
            }
            .edit {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 60vw;
                border: 1px solid pink;
                padding: 0.3rem 0;
                color: pink;
                border-radius: 5%;
            }
        }
    }
    .infoBottom {
        display: flex;
        flex-flow: column;
        padding: 0.5rem;
        div {
            margin: 0.3rem 0;
        }
        .top {
            p {
                font-size: 1.4rem;
            }
        }
        .center {
            display: flex;
            justify-content: space-between;
            p:nth-child(1) {
                color: #9a9a9a;
            }
            p:nth-child(2) {
                color: #258dc2;
                font-size: 0.8rem;
            }
        }
        .line {
            border-bottom: 0.1rem solid gray;
        }
        .bottom {
            margin: 0;
            .van-tab--active {
                color: pink;
            }
        }
    }
}
</style>
