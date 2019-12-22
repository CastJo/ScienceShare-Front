<template>
    <div class="favoriteDiv">
        <el-card style="height: 500px; width: inherit" shadow="always">
            <span>收藏夹</span>
            <div class="checkApply">
                    <li
                            style="list-style: none"
                            v-for="i in favorites"
                            class="infinite-list-item"
                            :key="i.id"
                    >
                        <FavoritePart :part="i"/>
                    </li>
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
                            console.log(this.favorites);
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
    .checkApply{
        width: 780px;
        margin-top: 30px;
        padding-right: 10px;
        padding-left: 10px;
        height: 500px;
    }
</style>
