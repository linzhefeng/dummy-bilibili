<template>
    <div>
        <van-tabs v-model="active">
            <van-tab
                v-for="item in categories"
                :key="item._id"
                :title="item.title"
            >
                <van-cell is-link @click="showPopup">编辑分类</van-cell>
                <van-popup
                    v-model="show"
                    position="bottom"
                    closeable
                    round
                    @click-close-icon="clickCloseIcon"
                    :style="{ height: '60%' }"
                >
                    <van-cell-group>
                        <van-cell
                            v-for="(item, index) in categories"
                            :key="item._id"
                            icon="cross"
                            :title="item.title"
                            @click="removeItem(index)"
                        />
                    </van-cell-group>
                    <van-divider />
                    <van-cell-group>
                        <van-cell
                            v-for="(item, index) in deleteCats"
                            :key="item._id"
                            icon="plus"
                            :title="item.title"
                            @click="addItem(index)"
                        />
                    </van-cell-group>
                </van-popup>
                <slot name="tabSlot"></slot>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
export default {
    props: {
        categories: {
            type: Array
        }
    },
    data() {
        return {
            active: 0,
            show: false,
            deleteCats: []
        }
    },
    methods: {
        showPopup() {
            this.show = true
        },
        removeItem(index) {
            if (this.categories.length > 3) {
                const item = this.categories.splice(index, 1)
                this.deleteCats.push(...item)
                console.log(this.deleteCats)
            } else {
                this.$msg.fail('必须保留起码三个分类')
            }
        },
        addItem(index) {
            const item = this.deleteCats.splice(index, 1)
            this.categories.push(...item)
        },
        clickCloseIcon() {
            location.reload()
        }
    },
    watch: {
        active() {
            this.$emit('activeChange', this.active)
        }
    }
}
</script>
<style></style>
