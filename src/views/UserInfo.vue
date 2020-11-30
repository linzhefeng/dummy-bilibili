<template>
    <div>
        <nav-bar avatarTo="/edit"></nav-bar>
        <banner></banner>
        <user-detail :userInfo="model"></user-detail>
    </div>
</template>

<script>
import NavBar from '../components/common/NavBar'
import Banner from '../components/userCommon/Banner'
import UserDetail from '../components/userCommon/UserDetail'
export default {
    data() {
        return {
            model: {}
        }
    },
    methods: {
        async fetch() {
            const res = await this.$http.get(
                '/user/' + localStorage.getItem('id')
            )
            this.model = res.data[0]
        }
    },
    components: {
        NavBar,
        Banner,
        UserDetail
    },
    created() {
        this.fetch()
    }
}
</script>
<style></style>
