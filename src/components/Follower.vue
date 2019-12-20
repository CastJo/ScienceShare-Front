<template>
    <div class="followerDiv" style="float: right">
        <el-card shadow="hover" style="width: 90%;height: 400px;">
            <span>粉丝</span>
            <div class="followingPart">
                <ul
                        class="infinite-list"
                        style="overflow:auto;list-style: none;padding: 0 0 0 0; max-height: 400px"
                >
                    <li
                            v-for="i in followers"
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
        name: "Follower",
        components: {FollowPart},
        data() {
            return {
                followers: []
            };
        },

        created() {
            this.getFollowers();
        },
        methods: {
            handleClickAvatar(val) {
                this.$router.push(`/index/${val}`);
                if (this.username !== this.$store.state.user.username) {
                    window.location.reload();
                }
            },
            getFollowers() {
                this.$axios
                    .get("usercenter/allFollowers", {
                        params: {
                            username: this.username,
                            myUsername: this.username
                        }
                    })
                    .then(res => {
                        if (res.data !== "") {
                            this.followers = res.data;
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
    }

</script>

<style scoped>
    .followerDiv {
        width: 50%;
        margin-top: 20px;
    }
    .followingPart {
        /* height: 500px; */
        padding-top: 10px;
    }
</style>