<template>
    <div class = "userInfoDiv">
        <div>
            <el-avatar :src="this.part.avatarUrl" class="avatar" :size="50"/>
        </div>
        <div class="nameEnCollege">
            <div><h5>{{ this.part.username }}</h5></div>

            <div><span>{{ this.part.college }}</span></div>
        </div>
        <div class="followBotton">
            <el-checkbox v-if=!checked v-model="checked" @change="follow">关注</el-checkbox>
            <el-checkbox v-if=checked v-model="checked" @change="unFollow">已关注</el-checkbox>
        </div>
    </div>
</template>

<script>
    export default {
        name: "FollowPart",
        data() {
            return {
                checked:"",
            }
        },
        created() {
            if(this.part.isFollowing === 0)
                this.checked = false;
            else if(this.part.isFollowing === 1)
                this.checked = true;
        },
        methods:{
          follow(){
              this.$axios.get(`usercenter/follow`, {
                  params: {
                      followUserName: this.part.username,
                      myUserName:this.$store.state.user.username,
                  }
              }).then((response) => {
                  switch (response.data.code) {
                    case 404:
                        this.$notify.error({
                            title: "错误",
                            message: response.data.message,
                        });
                        break;
                    case 201:
                        this.$notify.error({
                            title: "错误",
                            message: response.data.message,
                        });
                        break;
                        case 200:
                            this.$notify({
                                title: "成功",
                                message: response.data.message,
                                type: "success"
                            });
                            break;
                  }
              });
          },
            unFollow(){
                this.$axios.get(`usercenter/unFollow`, {
                    params: {
                        followUserName: this.part.username,
                        myUserName:this.$store.state.user.username,
                    }
                }).then((response) => {
                    switch (response.data.code) {
                        case 404:
                            this.$notify.error({
                                title: "错误",
                                message: response.data.message,
                            });
                            break;
                        case 300:
                            this.$notify.error({
                                title: "错误",
                                message: response.data.message,
                            });
                            break;
                        case 200:
                            this.$notify({
                                title: "成功",
                                message: response.data.message,
                                type: "success"
                            });
                            break;
                    }
                });
            },
        },
        props: ['part',
        ]
    }
</script>

<style scoped>
    .userInfoDiv{
        width: 315px;
    }
    .userInfoDiv div{
        float: left;
    }
    .nameEnCollege{
        margin-left: 10px;
        width: 185px;
    }

    .nameEnCollege div{
        float: none;
    }

    .followBotton{
        padding-top: 15px;
    }

</style>
