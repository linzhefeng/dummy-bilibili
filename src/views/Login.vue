<template>
    <div>
        <login-top middleTop="登陆 Bilibili">
            <div slot="right">
                <router-link to="/register" tag="div" style=" font-size:4vw"
                    >注册</router-link
                >
            </div>
        </login-top>
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
        <login-btn btnText="登陆" @registerSubmit="registerSubmit"></login-btn>
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
                // 再次对输入进行校验
                rule.test(this.model.username) &&
                rule.test(this.model.password)
            ) {
                const res = await this.$http.post('/login', this.model)
                // 200状态码则为登陆成功
                if (res.data.code === 200) {
                    this.$msg.success(res.data.msg)
                    // 将res中取到的id和token放在localStorage中
                    localStorage.setItem('id', res.data.id)
                    localStorage.setItem('token', res.data.token)
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
<style></style>
