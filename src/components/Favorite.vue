<template>
    <div class="favoriteDiv">
        <el-card style="height: 500px; width: 100%">
            <span>收藏夹</span>
            <div class="checkApply">
                <ul
                        class="infinite-list"
                        style="overflow:auto;list-style: none;padding: 0 0 0 0; max-height: 400px"
                >
                    <li
                            v-for="i in favorites"
                            class="infinite-list-item"
                            :key="i.id"
                    >
                        <FavoritePart :part="i"/>
                    </li>
                </ul>
            </div>
        </el-card>
    </div>
</template>

<script>
    import FavoritePart from "./FavoritePart";
    export default {
        name: "Favorite",
        components: {FavoritePart},
        data() {
            return {
                favorites: [],
            };
        },
        created() {
            this.getFavorites();
        },
        methods: {
            getFavorites() {
                this.$axios
                    .get("usercenter/getFavorites", {
                        params: {
                            username: this.username,
                        }
                    })
                    .then(res => {
                        if (res.data != null) {
                            this.favorites = res.data;
                        }
                    })
                    .catch(function(err) {
                        console.log(err);
                    });
            },
        },
        props: {
            username: String
        }
    };
</script>

<style scoped>
    .favoriteDiv{
        width: 100%;
        height: 400px;
    }
</style>
