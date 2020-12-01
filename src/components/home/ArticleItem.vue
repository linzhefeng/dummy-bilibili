<template>
    <div>
        <p v-for="item in data.list" :key="item.id">
            {{ item.name }}
        </p>
    </div>
</template>

<script>
export default {
    data() {
        return {}
    },
    props: ['data'],
    methods: {}
}
</script>
<style></style>
