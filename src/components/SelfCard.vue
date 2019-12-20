<template>
    <div class="wrap">
        <div>
            <!--                <el-col :span="4">-->
            <el-tooltip
                    class="item"
                    effect="dark"
                    content="点击修改头像"
                    placement="top"
            >
                <el-upload
                        class="avatar-uploader"
                        action="http://111.230.166.179:8888/homepage/uploadFile"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload"
                >
                    <img
                            v-if="this.user.avatarUrl"
                            :src="this.user.avatarUrl"
                            class="avatar"
                    />
                </el-upload>
            </el-tooltip>
            <!--                </el-col>-->
        </div>
        <div class="self-info">
            <!--                <el-col :span="20">-->
            <div class="nameDiv">
        <span
        ><h1>{{ user.username }}</h1></span
        >
                <span><h5>北京航空航天大学</h5></span>
                <a v-if="user.identity === 1" @click="visible = true">申请专家认证></a>
                <a v-else @click="goExpertPage">我的专家主页></a>
                <!--                    <el-button @click="visible=true"><span>申请专家认证</span></el-button>-->
            </div>
            <!--                </el-col>-->
            <div class="emailEnTime">
        <span
        ><h6>邮箱: {{ user.emailAddress }}</h6></span
        >
                <span
                ><h6>注册时间: {{ formattedDate }}</h6></span
                >
            </div>
        </div>

        <certification :visible.sync="visible"/>
    </div>
</template>

<script>
    import url from "@/assets/pic1.png";
    import {dateFormat} from "../assets/js/time";
    import Certification from "./Certification";

    export default {
        name: "SelfCard",
        components: {Certification},
        data() {
            return {
                circleUrl: url,
                activeIndex: "1",
                visible: false
            };
        },
        mounted() {
            console.log(this.user);
        },
        computed: {
            formattedDate() {
                return dateFormat(this.user.createdDate);
            },
            user: {
                get() {
                    return this.$store.state.user;
                }
            }
        },
        methods: {
            handleAvatarSuccess(res) {
                if (res.code === 200) {
                    this.url = res.data;
                    this.user.avatarUrl = this.url;
                    console.log(this.url);
                    this.$axios
                        .get("usercenter/uploadAvatar", {
                            params: {
                                username: this.user.username,
                                avatarUrl: this.url[0]
                            }
                        })
                        .then(response => {
                            console.log(response);
                        });
                } else if (res.code === 300) {
                    console.log("not exist");
                } else if (res.code === 400) {
                    console.log("fail");
                }
                //location.reload();
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === "image/jpeg";
                const isPNG = file.type === "image/png";
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG && !isPNG) {
                    this.$message.error("上传头像图片只能是 JPG或PNG格式!");
                }
                if (!isLt2M) {
                    this.$message.error("上传头像图片大小不能超过 2MB!");
                }
                return (isPNG || isJPG) && isLt2M;
            },
            goExpertPage() {
                var value = {
                    hasPermission: true,
                    name: this.user.username
                };
                this.$store.commit("setPrework", value);
                this.$router.push("/main/overview");
            }
        }
    };
</script>

<style scoped>

    .avatar {
        height: 220px;
        width: 220px;
        object-fit: cover;
    }

    .wrap {
        text-align: center;
        padding: 45px 40px 40px 40px;
    }

    .self-info {
        text-align: left;
        margin-left: 30px;
        margin-top: 0px;
    }

    .wrap div {
        float: left;
    }

    .emailEnTime {
        width: 230px;
        height: 45px;
    }

    .self-info div {
        float: none;
    }

    .nameDiv {
        height: 175px;
        width: 230px;
    }

    .self-info a {
        margin-top: -5px;
        color: #8c939d;
        background: #ffffff;
        text-decoration: none;
        font-family: sans-serif;
        font-size: 15px;
        display: block;
        width: 105px;
        height: 30px;
        line-height: 30px;
        border-radius: 8px;
        -webkit-transition: color 0.5s linear, background 0.5s ease-in-out 1s;
        transition: color 0.5s linear, background 0.5s ease-in-out 1s;
    }

    .self-info a:hover {
        color: #409eff;
        cursor: pointer;
    }

    .self-info a:hover {
        background: rgba(0, 0, 0, 0);
    }
</style>
