<template>
    <div>
        <el-card shadow="hover" class="hotPostCard">
            <el-row>关注者</el-row>
            <el-row>
                <ul class="infinite-list"  style="overflow:auto;list-style: none;padding: 0 0 0 0">
                    <li v-for="i in following" class="infinite-list-item" :key="i.username">
                        <el-avatar :src="i.avatarUrl" class="avatar" :size="50"/>{{ i.username }}</li>
                </ul>
            </el-row>
            <el-divider/>
            <el-row>粉丝</el-row>
            <el-row>
                <ul class="infinite-list"  style="overflow:auto;list-style: none;padding: 0 0 0 0">
                    <li v-for="i in followers" class="infinite-list-item" :key="i.username">
                        <el-avatar :src="i.avatarUrl" class="avatar" :size="50"/>{{ i.username }}</li>
                </ul>
            </el-row>
        </el-card>
    </div>

</template>


<script>
    export default {
        name: "Follow",
        data() {
            return {
                following:[],
                followers:[],
            }
        },
        created() {
            this.getFollowing();
            this.getFollowers();
        },
        methods: {
            getFollowing(){
                this.$axios
                    .get('usercenter/allFollowing', {
                        params: {
                            username: this.$store.state.user.username,
                        }
                    })
                    .then(res => {
                        if (res.data!=null){
                            this.following = res.data
                        }

                        console.log(this.following);
                    })
                    .catch(function(err) {
                        console.log(err)
                    })
            },
            getFollowers(){
                this.$axios
                    .get('usercenter/allFollowers', {
                        params: {
                            username: this.$store.state.user.username,
                        }
                    })
                    .then(res => {
                        if (res.data!=""){
                            this.followers  = res.data
                        }

                    })
                    .catch(function(err) {
                        console.log(err)
                    })
            },
            handleRowClick(row) {
                console.log(row.id);
                this.$router.push(`content/${row.id}`)
            }
        }
    }
</script>

<style scoped>

    .el-row {
        margin-bottom: 20px;
        &:last-child {
            margin-bottom: 0;
        }
    }
    .hotPostDiv{
        margin-top: 13px;
        height: 400px;
        width: 300px;
    }
    .hotPostCard{
        height: 400px;
        width: 300px;
    }

    .hotpostDivider{
        height: 3px;
        margin-bottom: 10px;
        margin-top: 10px
    }

</style>
