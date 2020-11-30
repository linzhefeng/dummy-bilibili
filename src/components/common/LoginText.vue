<template>
    <div>
        <div class="LoginText">
            <van-field
                v-model="content"
                :type="type"
                :label="label"
                :placeholder="placeholder"
                :rule="rule"
                :error-message="inputCorrect ? '' : '请输入6-16的任意字符'"
            />
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            content: '',
            inputCorrect: true
        }
    },
    props: {
        label: {
            type: String
        },
        type: {
            type: String
        },
        placeholder: {
            type: String
        },
        rule: {}
    },
    methods: {
        handleInput() {
            // 给父组件传值,如果符合规则传递原值,如果不符合则传递一个空值
            const rule = new RegExp(this.rule)
            if (rule.test(this.content)) {
                // 将主要的逻辑处理放在父组件中,通过emit触发父组件事件
                this.$emit('inputChange', this.content)
                this.inputCorrect = true
            } else {
                // 如果不符合规则就传递一个空字符串,这样在父组件的第二次验证就不会用过
                this.$emit('inputChange', '')
                this.inputCorrect = false
            }
        }
    },
    watch: {
        content() {
            this.handleInput()
        }
    }
}
</script>
<style lang="scss">
.LoginText {
    margin-top: 3vw;
}
</style>
