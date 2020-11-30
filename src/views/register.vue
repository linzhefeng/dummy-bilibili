<template>
    <div>
        <login-top middleTop="注册 Bilibili">
            <div slot="right">
                <router-link to="/login" tag="div" style=" font-size:4vw"
                    >登陆</router-link
                >
            </div>
        </login-top>
        <login-text
            label="姓名"
            placeholder="请输入姓名"
            type="text"
            :rule="rule"
            @inputChange="
                res => {
                    model.name = res
                }
            "
        ></login-text>
        <login-text
            label="账号"
            placeholder="请输入账号"
            type="text"
            :rule="rule"
            @inputChange="
                res => {
                    model.username = res
                }
            "
        ></login-text>
        <login-text
            label="密码"
            placeholder="请输入密码"
            type="password"
            :rule="rule"
            @inputChange="
                res => {
                    model.password = res
                }
            "
        ></login-text>
        <login-btn btnText="注册" @registerSubmit="registerSubmit"></login-btn>
    </div>
</template>

<script>
import LoginTop from '../components/common/LoginTop'
import LoginText from '../components/common/LoginText'
import LoginBtn from '../components/common/LoginBtn'
export default {
    data() {
        return {
            rule: '^.{6,16}$',
            model: {
                name: '',
                username: '',
                password: ''
            }
        }
    },
    components: {
        LoginTop,
        LoginText,
        LoginBtn
    },
    methods: {
        async registerSubmit() {
            // 对子组件传值进行验证,如果参数符合要求才能进行接口请求
            const rule = new RegExp(this.rule)
            if (
                rule.test(this.model.name) &&
                rule.test(this.model.username) &&
                rule.test(this.model.password)
            ) {
                const res = await this.$http.post('/register', this.model)
                console.log(res)
                if (res.data.code === 200) {
                    this.$msg.success(res.data.msg)
                    localStorage.setItem('id', res.data.id)
                    localStorage.setItem('token', res.data.objtoken)
                    this.$router.push('/userinfo')
                } else {
                    this.$msg.fail(res.data.msg)
                }
            } else {
                this.$msg.fail('格式错误,请重新输入')
            }
        }
    }
}
</script>
