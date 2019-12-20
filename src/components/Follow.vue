<template>
    <div class="followingDiv" style="float:right;">
        <el-card shadow="hover" style="width: 100%; height: 400px;">
            <span>关注</span><br/>
            <div class="followingPart">
                <ul
                        class="infinite-list"
                        style="overflow:auto;list-style: none;padding: 0 0 0 0; max-height: 400px"
                >
                    <li
                            v-for="i in following"
                            class="infinite-list-item"
                            :key="i.username"
                    >
                        <FollowPart :part="i" @click-avatar="handleClickAvatar"/>
                    </li>
                </ul>
            </div>
        </el-card>
    </div>
</template>

<script>
    import FollowPart from "./FollowPart";

    export default {
        name: "Follow",
        components: {FollowPart},
        data() {
            return {
                following: [],
                followers: []
            };
        },
        created() {
            this.getFollowing();
        },
        mounted() {
            console.log(this.username);
        },
        computed: {
            user: {
                get() {
                    return this.$store.state.user;
                }
            }
        },
        methods: {
            handleClickAvatar(val) {
                this.$router.push(`/index/${val.username}`);
                this.$store.dispatch("setPrework",val.expertID);
                if(val.expertID!=null){
                    this.$router.push(`main/overview`);
                }
                if (this.username !== this.$store.state.user.username) {
                    window.location.reload();
                }
            },
            getFollowing() {
                this.$axios
                    .get("usercenter/allFollowing", {
                        params: {
                            username: this.username,
                            myUsername: this.$store.state.user.username
                        }
                    })
                    .then(res => {
                        if (res.data != null) {
                            this.following = res.data;
                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            }
        },
        props: {
            username: String
        }
    };
</script>

<style scoped>
    .followingDiv {

        width: 45%;
        margin-top: 20px;
    }

    .followingPart {
        /* height: 500px; */
        padding-top: 10px;
    }

    .hotpostDivider {
        height: 3px;
        margin-bottom: 10px;
        margin-top: 10px;
    }
</style>
