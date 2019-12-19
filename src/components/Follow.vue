<template>
    <div>
        <el-card shadow="hover" style="height: 900px;width: 360px">

            <h4>关注者</h4>
            <div class="followingPart">
                <ul class=""  style="overflow:auto;list-style: none;padding: 0 0 0 0; max-height: 400px">
                    <li v-for="i in following" class="infinite-list-item" :key="i.username" >
                        <FollowPart :part="i" @click-avatar="handleClickAvatar"/></li>
                </ul>
            </div>
            <el-divider class = "hotpostDivider"/>
            <h4>粉丝</h4>
            <div class="followingPart">
                <ul class=""  style="overflow:auto;list-style: none;padding: 0 0 0 0; max-height: 400px">
                    <li v-for="i in followers" class="infinite-list-item" :key="i.username">
                        <FollowPart :part="i" @click-avatar="handleClickAvatar"/></li>
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
                following:[],
                followers:[],
            }
        },
        created() {
            console.log(this.username);
            this.getFollowing();
            this.getFollowers();
        },
        methods: {
            handleClickAvatar(val) {
                this.$router.push(`/index/${val}`)
            },
            getFollowing(){
                this.$axios
                    .get('usercenter/allFollowing', {
                        params: {
                            username: this.username,
                            myUsername: this.username,
                        }
                    })
                    .then(res => {
                        if (res.data!=null){
                            this.following = res.data
                        }
                    })
                    .catch(function(err) {
                        console.log(err)
                    })
            },
            getFollowers(){
                this.$axios
                    .get('usercenter/allFollowers', {
                        params: {
                            username: this.username,
                            myUsername: this.username,
                        }
                    })
                    .then(res => {
                        if (res.data!==""){
                            this.followers  = res.data
                        }

                    })
                    .catch(function(err) {
                        console.log(err)
                    })
            },
        },
        props:['username',],
    }
</script>

<style scoped>
    .followingPart{
        height: 400px;
        padding-top: 10px;
    }


    .hotpostDivider{
        height: 3px;
        margin-bottom: 10px;
        margin-top: 10px
    }

</style>
