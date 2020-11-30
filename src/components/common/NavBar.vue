<template>
    <div class="navBar">
        <div class="logo" @click="logoClickHandle">
            <img src="../../assets/images/logo.svg" alt="" />
        </div>
        <div class="center">
            <p>
                <van-icon name="search" />
            </p>
        </div>
        <div>
            <div class="avatar" @click="avatarClickHandle">
                <img v-if="avatarImg" :src="avatarImg" alt="" />
                <van-icon
                    class="dummyAvatar"
                    v-else
                    name="https://b.yzcdn.cn/vant/icon-demo-1126.png"
                />
            </div>
            <p>下载app</p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            avatarImg: ''
        }
    },
    props: {
        avatarTo: {
            required: false,
            default: '/userinfo'
        }
    },
    methods: {
        async fetch() {
            const res = await this.$http.get(
                '/user/' + localStorage.getItem('id')
            )
            this.avatarImg = res.data[0].user_img
        },
        avatarClickHandle() {
            this.$router.push(this.avatarTo)
        },
        logoClickHandle() {
            if (this.$route.path !== '/') {
                this.$router.push('/')
            }
        }
    },
    created() {
        this.fetch()
    }
}
</script>
<style lang="scss">
.navBar {
    height: 15vw;
    min-height: 3rem;
    max-height: 7rem;
    background: white;
    display: flex;
    align-items: center;
    .logo {
        width: 20vw;
        max-width: 10rem;
        padding: 0.5rem;
        img {
            width: 100%;
            height: auto;
        }
    }
    .center {
        flex: 1;
        min-width: 3rem;
        p {
            background: #f4f4f4;
            height: 2.7rem;
            border-radius: 1.3rem;
            margin: 0.5rem;
            display: flex;
            align-items: center;
            padding: 1rem;
            font-size: 1.5rem;
        }
    }
    div:nth-child(3) {
        display: flex;
        align-items: center;
        margin-right: 0.2rem;
        p {
            height: 8vw;
            max-height: 4.3rem;
            padding: 1vw 2vw;
            margin: 0 2vw;
            background: #3396db;
            font-size: 3vw;
            color: white;
            border-radius: 10%;
            display: flex;
            align-items: center;
        }
    }
    .avatar {
        height: 10vw;
        width: 10vw;
        max-width: 5rem;
        max-height: 5rem;
        border-radius: 50%;
        margin: 0.1rem;
        overflow: hidden;
        img,
        .dummyAvatar {
            width: 100%;
            height: 100%;
        }
    }
}
</style>
