<template>
    <div>
        <div class="LoginTop">
            <div></div>
            <div class="center">{{ middleTop }}</div>
            <div class="right">
                <slot name="right" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {}
    },
    props: {
        middleTop: {
            type: String
        }
    },
    methods: {}
}
</script>
<style lang="scss">
.LoginTop {
    height: 3rem;
    background: white;
    display: flex;
    div {
        display: flex;
        flex: 1;
        align-items: center;
        justify-content: center;
        font-size: 5vw;
        color: black;
        &.center {
            font-weight: bold;
        }
    }
}
</style>
