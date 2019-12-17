<template>
  <div class="wrap" style="padding-top:10%;padding-left: 35%">
    <center>
      <el-card class="login-card">
        <div slot="header" id="title">
          <span>用户登录</span>
        </div>
        <div class="login-card-input">
          <el-input
            placeholder="请输入用户名或密码"
            type="text"
            v-model="loginInfoVo.username"
          />
          <el-input
            placeholder="请输入密码"
            type="password"
            v-model="loginInfoVo.password"
          />
        </div>
        <div class="rememberMeLabel">
          <div><input type="checkbox" /><span>记住我</span></div>
          <div>
            <el-button type="text" id="forgetPaswd">忘记密码?</el-button>
          </div>
        </div>
        <div class="login-card-bottom">
          <div>
            <el-button id="loginBottom" type="primary" v-on:click="SignIn"
              >登录</el-button
            >
          </div>
          <div>
            <el-button type="info" v-on:click="ToRegister" plain
              >没有账号?去注册</el-button
            >
          </div>
        </div>
      </el-card>
    </center>
  </div>
</template>

<script>


export default {
  data () {
    return {
      loginInfoVo: {
        username: "",
        password: ""
      },
      responseResult: []
    };
  },
  mounted () {
    if (this.$store.state.user.username != null) {
      this.$router.replace("home");
    }
  },
  methods: {
    ToMain () {
      this.$router.push("/main");
    },
    ToRegister () {
      this.$router.push("/signUp");
    },
    SignIn () {
      this.$axios
        .get("usercenter/login", {
          params: {
            username: this.loginInfoVo.username,
            password: this.loginInfoVo.password
          }
        })
        .then(successResponse => {
          this.responseResult = JSON.stringify(successResponse.data);
          if (successResponse.data.code === 200) {
            this.$axios.get(`usercenter/getUser`, {
              params: {
                username: this.loginInfoVo.username,
              }
            }).then((response) => {
              this.$store.dispatch("setUser", response.data);
              this.$router.push("home");
            });
            this.$notify({
              title: "成功",
              message: "登录成功！",
              type: "success"
            });
          } else if (successResponse.data.code === 300) {
            this.$notify.error({
              title: "错误",
              message: "该用户不存在"
            });
          } else if (successResponse.data.code === 402) {
            this.$notify.error({
              title: "错误",
              message: "密码输入错误"
            });
          }
        })
        .catch(failResponse => {
          console.log(failResponse);
        });
    }
  }
};
</script>

<style>
.wrap {
  text-align: center;
}

.login-card {
  width: 360px;
  padding-bottom: 10px;
}
.login-card #title {
  font-size: 28px;
  font-family: "微软雅黑";
}

.login-card-bottom div {
  float: left;
}

.login-card-bottom #loginBottom {
  width: 160px;
  margin-right: 10px;
}

.rememberMeLabel div {
  float: left;
  height: 30px;
}

.rememberMeLabel #forgetPaswd {
  width: 60px;
  font-size: 15px;
  height: 10px;
  padding: 0;
  margin-left: 188px;
}

.login-card-input input {
  display: block;
  height: 40px;
  line-height: 40px;
  margin-bottom: 10px;
  width: 320px;
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
/*    margin-top: 10px;*/
/*    outline: none;*/
/*    border: 1px solid #888;*/
/*    padding: 10px;*/
/*    box-sizing: border-box;*/
/*}*/

.bottomControl {
  height: 40px;
  margin-left: 20px;
}
</style>
