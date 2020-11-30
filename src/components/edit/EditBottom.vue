<template>
    <div class="editBottom">
        <p @click="handleClick">{{ label }}</p>
    </div>
</template>

<script>
export default {
    data() {
        return {}
    },
    props: ['label', 'to'],
    methods: {
        handleClick() {
            this.$router.push(this.to)
        }
    }
}
</script>
<style lang="scss">
.editBottom {
    background: white;
    color: #f783a8;
    border: 1px solid #f783a8;
    padding: 0.6rem;
    margin: 0.8rem 0.3rem;
    text-align: center;
    font-size: 1.2rem;
    border-radius: 3%;
}
</style>
