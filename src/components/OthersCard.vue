<template>
    <div class="wrap">
        <div>
            <img
                    v-if="this.user.avatarUrl"
                    :src="this.user.avatarUrl"
                    class="avatar"
            />
        </div>
        <div class="self-info">
            <div>
        <span
        ><h1>{{ this.user.username }}</h1></span
        >
                <span><h5>北京航空航天大学</h5></span>
            </div>
            <div class="emailEnTime">
        <span
        ><h6>邮箱: {{ this.user.emailAddress }}</h6></span
        >
                <span
                ><h6>注册时间: {{ formattedDate }}</h6></span
                >
            </div>
        </div>

        <div></div>
        <div style="width: 65%;height: 200px">
            <el-button v-if="this.isFollowing === 0" class="followButtom" type="primary" @click="follow">+Follow</el-button>
            <el-button v-else class="followButtom" plain @click="unFollow">Following</el-button>
        </div>
        <certification :visible.sync="visible"/>
    </div>
</template>

<script>
    import url from "@/assets/pic1.png";
    import {dateFormat} from "../assets/js/time";
    import Certification from "./Certification";


    export default {
      name: "OthersCard",
      components: {Certification},
      data() {
        return {
          circleUrl: url,
          activeIndex: "1",
          visible: false,
          isFollowing: ""
        };
      },
      computed: {
        formattedDate() {
          return dateFormat(this.user.createdDate);
        }
      },
      mounted() {
        this.$axios.get("usercenter/isFollowing", {
          params: {
            followUserName: this.$route.params.username,
            myUserName: this.$store.state.user.username,
          }
        }).then((res) => {
          if (res.status === 200) {
            this.isFollowing = res.data;
            console.log(this.isFollowing)
          }


        })
      },
      methods: {
        handleAvatarSuccess(res) {
          if (res.code === 200) {
            this.url = res.message;
            this.user.avatarUrl = this.url;
            this.$store.dispatch("changeAvatar");
            this.$axios
                    .post("/uploadAvatar", {
                      username: this.name,
                      avatarUrl: this.url
                    })
                    .then(response => {
                      console.log(response);
                    });
          } else if (res.code === 300) {
            console.log("not exist");
          } else if (res.code === 400) {
            console.log("fail");
          }
          location.reload();
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
        follow() {
          this.$axios
                  .get(`usercenter/follow`, {
                    params: {
                      followUserName: this.$route.params.username,
                      myUserName: this.$store.state.user.username,
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
                        this.isFollowing = 1;
                        break;
                    }
                  });
        },
        unFollow() {
          this.$axios
                  .get(`usercenter/unFollow`, {
                    params: {
                      followUserName: this.$route.params.username,
                      myUserName: this.$store.state.user.username,
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
                        this.isFollowing = 0;
                        break;
                    }
                  });
        },

      },
      props: ["user"]
    }

</script>

<style scoped>
    .followButtom {
        margin-top: 80px;
        width: 30%;
        margin-left: 50%;
    }

    .avatar {
        height: 220px;
        width: 220px;
    }

    .wrap {
        text-align: center;
        padding: 50px 40px 40px 40px;
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
        margin-top: 70px;
    }

    .self-info div {
        float: none;
    }

    .application {
        margin-top: -10px;
        color: #e7cfcf;
        background: #ffffff;
        text-decoration: none;
        font-family: sans-serif;
        font-size: 15px;
        display: block;
        width: 90px;
        height: 30px;
        line-height: 30px;
        border-radius: 8px;
        text-align: center;
        -webkit-transition: color 5.5s linear, background 0.5s ease-in-out;
        transition: color 5.5s linear, background 0.5s ease-in-out;
    }

    .application:hover {
        color: #409eff;
    }
</style>
