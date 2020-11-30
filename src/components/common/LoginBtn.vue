<template>
    <div class="loginBtn" @click="registerClick">
        {{ btnText }}
    </div>
</template>

<script>
export default {
    data() {
        return {}
    },
    methods: {
        registerClick() {
            this.$emit('registerSubmit')
        }
    },
    props: ['btnText']
}
</script>
<style lang="scss">
.loginBtn {
    height: 3rem;
    background: pink;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 1.5rem;
    font-size: 1rem;
    margin: 1rem;
}
</style>
