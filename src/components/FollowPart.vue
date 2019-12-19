<template>
    <div>
        <div>
        <el-avatar :src="this.part.avatarUrl" class="avatar" :size="50"/>
        </div>
        <div>
        <span>{{ this.part.username }}</span>
        <span>{{ this.part.college }}</span>
        </div>
        <div>
        <el-button @click="follow">关注</el-button>
            <el-button @click="unFollow">取关</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "FollowPart",
        data() {
            return {}
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

</style>
