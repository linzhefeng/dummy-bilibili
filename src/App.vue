<template>
    <div id="app">
        <keep-alive v-if="this.$route.meta.keepalive">
            <router-view></router-view>
        </keep-alive>
        <router-view v-else></router-view>
    </div>
</template>

<style lang="scss">
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    body {
        background: #f4f4f4;
    }
}
</style>
