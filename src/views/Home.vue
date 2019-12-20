<template>
  <el-main style="padding-top: 0;">
    <Navigator />
    <div class="totalDiv">
          <div class="infoCardDiv">
            <el-card shadow="hover" style="height: 400px;width: 700px">
              <el-menu
                router
                :default-active="activeIndex"
                class="el-menu-demo"
                mode="horizontal"
                @select="handleSelect"
              >
                <el-menu-item index="/home">信息</el-menu-item>
                <el-menu-item index="/home/changeName">修改用户名</el-menu-item>
                <el-menu-item index="/home/changeMail">修改邮箱</el-menu-item>
                <el-menu-item index="/home/password">修改密码</el-menu-item>
                <el-menu-item index="/main" v-if="isAuthor"
                  >我的专家主页</el-menu-item
                >
              </el-menu>
              <router-view />
            </el-card>
          </div>
          <Favorite />
          <Follow :username="user.username" />
    </div>
  </el-main>
</template>

<script>
import Navigator from "@/components/Navigator.vue";
import Follow from "../components/Follow";
import url from "@/assets/pic1.png";
import { dateFormat } from "../assets/js/time";
import Favorite from "../components/Favorite";

export default {
  name: "Home",
  data() {
    return {
      circleUrl: url,
      activeIndex: "1",
      isAuthor: false
    };
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
  created() {
    this.$axios
      .get(`usercenter/getUser`, {
        params: {
          username: this.$store.state.user.username
        }
      })
      .then(response => {
        this.$store.dispatch("setUser", response.data);
      });
  },
  mounted() {
    if (this.$store.state.user.isLogin === null) {
      this.$router.push("/");
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  components: {
    Favorite,
    Follow,
    Navigator
  }
};
</script>
<style>
.totalDiv {
}
.infoCardDiv {
  float: left;
  margin-top: 40px;
}
.followDiv {
  float: left;
  margin-left: 100px;
  margin-top: 40px;
}
</style>
