<template>
    <div v-if="model">
        <!-- 顶部 -->
        <div class="navbar">
            <nav-bar />
        </div>

        <!-- 详细信息框 -->
        <div class="editDetail">
            <div class="uploadfile">
                <van-uploader
                    class="uploadimg"
                    preview-size="100vw"
                    :after-read="afterRead"
                />
                <edit-item left="头像">
                    <img :src="model.user_img" alt="" v-if="model.user_img" />
                    <van-icon
                        v-else
                        name="https://b.yzcdn.cn/vant/icon-demo-1126.png"
                    />
                </edit-item>
            </div>
            <edit-item left="昵称" @itemClick="itemClickHandle">
                <p>{{ model.name }}</p>
            </edit-item>
            <edit-item left="UID">
                <p>{{ model.id }}</p>
            </edit-item>
            <edit-item left="性别" @itemClick="genderClickHandle">
                <p>
                    {{ model.gender == '1' ? '男' : '女' }}
                </p>
            </edit-item>
            <edit-item left="个性签名" @itemClick="itemClickHandle">
                <p>
                    {{ model.user_desc }}
                </p>
            </edit-item>

            <!-- 弹出框 -->
            <van-dialog
                use-slot
                :title="title"
                @confirm="comfirmClick"
                @cancel="cancleClick"
                v-model="show"
                show-cancel-button
            >
                <van-field type="text" ref="dialogText" v-model="content" />
            </van-dialog>

            <!-- 性别选择 -->
            <van-action-sheet
                v-model="genderShow"
                cancel-text="取消"
                :actions="actions"
                @select="onSelect"
            >
            </van-action-sheet>
        </div>
        <div class="bottom">
            <edit-bottom label="返回个人中心" :clickHandle="back"></edit-bottom>
            <edit-bottom label="退出登录" :clickHandle="exit"></edit-bottom>
        </div>
    </div>
</template>
<script>
import NavBar from '../components/common/NavBar'
import EditItem from '../components/edit/EditItem'
import EditBottom from '../components/edit/EditBottom'
export default {
    components: {
        NavBar,
        EditItem,
        EditBottom
    },
    data() {
        return {
            model: {},
            show: false,
            title: '',
            content: '',
            genderShow: false,
            actions: [
                {
                    name: '女',
                    val: 0
                },
                {
                    name: '男',
                    val: 1
                }
            ]
        }
    },
    methods: {
        // 拉取当前用户的信息
        async fetch() {
            const res = await this.$http.get(
                '/user/' + localStorage.getItem('id')
            )
            this.model = res.data[0]
        },
        // 上传头像后
        async afterRead(file) {
            const formdata = new FormData()
            formdata.append('file', file.file)
            const res = await this.$http.post('/upload', formdata)
            this.$set(this.model, 'user_img', res.data.url)
            this.userUpadate()
        },
        // 把model的数据更新给后端
        async userUpadate() {
            const res = await this.$http.post(
                '/update/' + localStorage.getItem('id'),
                this.model
            )
        },
        // 元素被点击后显示弹出框,res是子组件通过emit传过来的标题
        itemClickHandle(res) {
            this.show = true
            this.title = res
            // 元素点击后自动获取输入框焦点
            this.autofocus()
        },
        // 弹出框点击确定后的回调
        comfirmClick() {
            let type = this.title
            switch (type) {
                case '昵称':
                    this.model.name = this.content
                    break
                case '个性签名':
                    this.model.user_desc = this.content
            }
            this.userUpadate()
            this.content = ''
        },
        // 弹出框点击取消后的回调
        cancleClick() {
            this.content = ''
        },
        // 性别弹出的处理
        genderClickHandle() {
            this.genderShow = true
        },
        onSelect(data) {
            this.model.gender = data.val
            this.userUpadate()
            this.genderShow = false
        },
        // vant的autofocus出现只能在首次加载时生效,通过nextTick可以很好的解决这个问题
        autofocus() {
            this.$nextTick(() => {
                this.$refs.dialogText.focus()
            })
        },
        // 返回个人中心
        back() {
            this.$router.push('/userinfo')
        },
        // 退出登录
        exit() {
            localStorage.removeItem('id')
            localStorage.removeItem('token')
            this.$router.push('/')
        }
    },
    created() {
        this.fetch()
    }
}
</script>
<style lang="scss">
.navbar {
    margin-bottom: 0.7rem;
}
.editDetail {
    img {
        width: 15vw;
        height: 15vw;
        border-radius: 50%;
    }
}
.uploadfile {
    position: relative;
    overflow: hidden;
    .uploadimg {
        position: absolute;
        opacity: 0;
    }
}
</style>
