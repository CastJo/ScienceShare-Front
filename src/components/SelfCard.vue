<template>
    <div class="wrap">

            <div>
                <!--                <el-col :span="4">-->
                <el-tooltip class="item" effect="dark" content="点击修改头像" placement="top">
                    <el-upload class="avatar-uploader" action="http://111.230.166.179:8888/usercenter/uploadFile"
                               :show-file-list="false" :on-success="handleAvatarSuccess"
                               :before-upload="beforeAvatarUpload">
                        <img v-if="this.user.avatarUrl" :src="this.user.avatarUrl" class="avatar">
                    </el-upload>
                </el-tooltip>
                <!--                </el-col>-->
            </div>
            <div class="self-info">
                <!--                <el-col :span="20">-->
                <div >
                    <span><h1>{{ user.username }}</h1></span>
                    <span><h5>北京航空航天大学</h5></span>
                    <a @click="visible=true">申请专家认证</a>
<!--                    <el-button @click="visible=true"><span>申请专家认证</span></el-button>-->
                </div>
                <!--                </el-col>-->
                <div class="emailEnTime">
                    <span><h6>邮箱: {{ user.emailAddress}}</h6></span>
                    <span><h6>注册时间: {{ formattedDate}}</h6></span>
                </div>
            </div>

            <div>

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
                expert: this.$store.state.expert,
                user: this.$store.state.user,
                circleUrl: url,
                activeIndex: "1",
                visible: false,
            };
        },
        computed: {
            formattedDate() {
                return dateFormat(this.user.createdDate);
            }
        },
        methods: {
            handleAvatarSuccess(res, file) {
                if (res.code === 200) {
                    this.url = res.message;
                    this.user.avatarUrl = this.url;
                    this.$store.dispatch('changeAvatar');
                    this.$axios.post('/uploadAvatar', {
                        username: this.name,
                        avatarUrl: this.url,
                    }).then((response) => {
                        console.log(response)
                    })
                } else if (res.code === 300) {
                    console.log("not exist")
                } else if (res.code === 400) {
                    console.log("fail")
                }
                location.reload();
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isPNG = file.type === 'image/png';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG && !isPNG) {
                    this.$message.error('上传头像图片只能是 JPG或PNG格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return (isPNG || isJPG) && isLt2M;
            },
        },
    };
</script>

<style scoped>
    .avatar{
        height: 220px;
        width: 220px;
    }
    .wrap {
        text-align: center;
        padding: 50px 40px 40px 40px;
    }
    .self-info{
        text-align: left;
        margin-left: 30px;
        margin-top: 0px;
    }
    .wrap div{
        float: left;;
    }
    .emailEnTime{
        margin-top: 65px;
    }
    .self-info div{
        float: none;
    }

    .self-info a{
        margin-top: -5px;
        color: #2c3e50;
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
    .self-info a:hover{
        color: #409EFF;;
        cursor: pointer;
    }
    .self-info a:hover{
        padding-left: 10px;
        background: rgba(0, 0, 0, 0.1);
    }
    .self-info a:hover::after{
        right: 79.68%
    }
    .self-info a::after{
        content: '>';
        position: absolute;
        right: 74%;
        -webkit-transition: all 0.5s;
        transition: all 0.5s;
    }

</style>
