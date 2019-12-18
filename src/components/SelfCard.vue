<template>
    <div class="wrap">

        <el-row>
            <div class="self-avatar">
                <!--                <el-col :span="4">-->
                <el-tooltip class="item" effect="dark" content="点击修改头像" placement="top">
                    <el-upload class="avatar-uploader" action="http://114.116.176.3:8000/uploadFile"
                               :show-file-list="false" :on-success="handleAvatarSuccess"
                               :before-upload="beforeAvatarUpload">
                        <img v-if="this.user.avatarUrl" :src="this.user.avatarUrl" class="avatar">
                    </el-upload>
                </el-tooltip>
                <!--                </el-col>-->
            </div>
            <div class="self-info">
                <!--                <el-col :span="20">-->
                <h4>{{ user.username }}</h4>
                <h6>邮箱: {{ user.emailAddress}}</h6>
                <h6>注册时间: {{ formattedDate}}</h6>
                <!--                </el-col>-->
            </div>
            <div>
                <el-button @click="visible=true"><span>申请专家认证</span></el-button>
            </div>
            <certification :visible.sync="visible"/>
        </el-row>

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
    .wrap {
        text-align: center;
    }

</style>
