<template>
    <div class="userInfoDiv">
        <div class="nameEnCollege">
            <div>
                <h5>{{ this.part.applyUserName }}</h5>
                <span>{{ this.part.affiliation }}</span>
            </div>
        </div>
        <div class="CheckButton">
            <el-button type="success" @click="">通过</el-button>
            <el-button type="danger">拒绝</el-button>
        </div>
        <el-divider style="margin: 12px" />
    </div>
</template>

<script>
    export default {
        name: "ApplyPart",
        data() {
        },
        created() {
        },
        methods: {
            follow() {
                this.$axios
                    .get(`usercenter/follow`, {
                        params: {
                            followUserName: this.part.username,
                            myUserName: this.$store.state.user.username
                        }
                    })
                    .then(response => {
                        switch (response.data.code) {
                            case 404:
                                this.$notify.error({
                                    title: "错误",
                                    message: response.data.message
                                });
                                break;
                            case 201:
                                this.$notify.error({
                                    title: "错误",
                                    message: response.data.message
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
            unFollow() {
                this.$axios
                    .get(`usercenter/unFollow`, {
                        params: {
                            followUserName: this.part.username,
                            myUserName: this.$store.state.user.username
                        }
                    })
                    .then(response => {
                        switch (response.data.code) {
                            case 404:
                                this.$notify.error({
                                    title: "错误",
                                    message: response.data.message
                                });
                                break;
                            case 300:
                                this.$notify.error({
                                    title: "错误",
                                    message: response.data.message
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
            }
        },
        props: ["part"]
    };
</script>

<style scoped>
    .userInfoDiv {
        height: 60px;
    }

    .userInfoDiv div {
        float: left;
    }

    .nameEnCollege {
        margin-left: 10px;
        width: 170px;
        height: 60px;
    }

    .nameEnCollege div {
        float: none;
    }

    .CheckButton {
        padding-top: 15px;
        height: 60px;
    }
</style>
