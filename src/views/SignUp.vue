<template>
  <div class="wrap" style="padding-top:10%;padding-left: 35%">
    <center>
      <el-card class="register-card">
        <div slot="header" class="register-card-header">
          <div>
            <el-button type="info" plain id="back" v-on:click="ToLogin"
              ><span>返回</span></el-button
            >
          </div>
          <div id="name">
            <span>用户注册</span>
          </div>
        </div>
        <div class="register-card-input">
          <el-input
            placeholder="请输入用户名"
            type="text"
            v-model="loginInfoVo.username"
          />

          <el-input
            placeholder="请输入6~20位密码"
            type="password"
            v-model="loginInfoVo.password"
          />

          <el-input
            :disabled="inputed"
            placeholder="请输入邮箱"
            type="text"
            v-model="loginInfoVo.emailAddress"
          />

          <el-row align="top" type="flex">
            <el-input
              placeholder="请输入验证码"
              type="text"
              v-model="loginInfoVo.code"
            />

            <el-button
              :disabled="inputed"
              @click="sendPin"
              class="bottomControl"
              name="codeButton"
              type="primary"
              plain
              ><span v-if="inputed">{{ this.auth_time }}</span>
              <span v-else>获取验证码</span></el-button
            >
          </el-row>
        </div>
        <el-button v-on:click="register" class="register-bottomcontrol"
          >注册</el-button
        >
      </el-card>
    </center>
  </div>
</template>

<script>

export default {
  data() {
    return {
      loginInfoVo: {
        username: "",
        password: "",
        emailAddress: "",
        code: ""
      },
      responseResult: [],
      code: "",
      emailAddress: "",
      inputed: false,
      auth_time: ""
    };
  },
  mounted() {
    if (this.$store.state.user.username!=null){
      this.$router.replace("home");
    }
  },
  methods: {
    ToMain() {
      this.$router.push("/main");
    },
    ToLogin() {
      this.$router.replace({
        path: "/signIn"
      });
    },
    sendPin() {
      this.$axios
        .get("usercenter/sendPin", {
          params: {
            emailAddress: this.loginInfoVo.emailAddress
          }
        })
        .then(response => {
          if (response.data.code == 305) {
            this.$notify.error({
              title: "错误",
              message: "邮箱不合法"
            });
          } else if (response.data.code == 306) {
            this.$notify.error({
              title: "错误",
              message: "邮箱已被注册"
            });
          } else if (response.data.code == 200) {
            this.code = response.data.message;
            this.emailAddress = this.loginInfoVo.emailAddress;
            this.inputed = true;
            this.$notify({
              title: "成功",
              message: "验证码已发送",
              type: "success"
            });
            this.auth_time = 60;
            var auth_timetimer = setInterval(() => {
              this.auth_time--;
              if (this.auth_time <= 0) {
                this.inputed = false;
                clearInterval(auth_timetimer);
              }
            }, 1000);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    register() {
      if (this.code != this.loginInfoVo.code) {
        this.$notify.error({
          title: "错误",
          message: "验证码有误或已过期"
        });
      } else if (this.loginInfoVo.emailAddress == "") {
        this.$notify.error({
          title: "错误",
          message: "请输入邮箱"
        });
      } else if (this.inputed == false) {
        this.$notify.error({
          title: "提示",
          message: "请重新获取验证码"
        });
      } else {
        this.$axios
          .get("usercenter/register", {
            params: {
              username: this.loginInfoVo.username,
              password: this.loginInfoVo.password,
              emailAddress: this.emailAddress
            }
          })
          .then(successResponse => {
            this.responseResult = JSON.stringify(successResponse.data);
            if (successResponse.data.code === 200) {
              //setCookie("username", this.loginInfoVo.username, 1000 * 60);
              this.$axios.get(`usercenter/getUser`, {
                params: {
                  username: this.loginInfoVo.username,
                }
              }).then((response) => {
                this.$store.dispatch("setUser",response.data);
                this.$router.push("home");
              });
              this.$notify({
                title: "成功",
                message: "注册成功！",
                type: "success"
              });
            } else if (successResponse.data.code === 201) {
              this.$notify.error({
                title: "错误",
                message: "该用户已存在"
              });
            } else if (successResponse.data.code === 400) {
              this.$notify.error({
                title: "错误",
                message: "输入不合法"
              });
            } else if (successResponse.data.code === 402) {
              this.$notify.error({
                title: "错误",
                message: "输入不合法"
              });
            }
          })
          .catch(failResponse => {
            console.log(failResponse);
          });
      }
    }
  }
};
</script>

<style>
.register-card-header div {
  float: left;
}
.register-card-header {
  height: 40px;
}
.register-card-header #back {
  width: 50px;
  padding: 12px 0;
}
.register-card-header #name {
  margin-left: 73px;
  font-size: 28px;
  font-family: "微软雅黑";
}
.wrap {
  text-align: center;
}
.register-card-bottom {
  margin-top: 10px;
}
.register-card {
  width: 400px;
}
.register-card input {
  display: block;
  height: 40px;
  line-height: 40px;
  margin-bottom: 10px;
  outline: none;
  border: 1px solid #888;
  padding: 10px;
  box-sizing: border-box;
}
/*input {*/
/*    display: block;*/
/*    width: 250px;*/
/*    height: 40px;*/
/*    line-height: 40px;*/
/*    margin-bottom: 10px;*/
/*    outline: none;*/
/*    border: 1px solid #888;*/
/*    padding: 10px;*/
/*    box-sizing: border-box;*/
/*}*/
.bottomControl {
  height: 40px;
  margin-left: 10px;
}
.register-bottomcontrol {
  background-color: #409eff;
  color: #ffffff;
  height: 45px;
  font-weight: bold;
  width: 360px;
}
</style>
