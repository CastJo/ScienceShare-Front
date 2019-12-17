<template>
  <el-main style="padding-top: 0;">
    <Navigator />
    <div class="mt-3">
      <el-col span="16" class="px-4">
        <el-card shadow="hover" style="height: 400px;">
          <el-row>
            <el-menu
              router
              :default-active="activeIndex"
              class="el-menu-demo"
              mode="horizontal"
            >
              <el-menu-item index="/home">信息</el-menu-item>
              <el-menu-item index="/home/password">修改密码</el-menu-item>
              <el-menu-item index="/main">我的专家主页</el-menu-item>
            </el-menu>
          </el-row>
          <router-view />
        </el-card>
      </el-col>
      <el-col span="8" class="px-4">
        <Follow />
      </el-col>
    </div>
  </el-main>
</template>

<script>
import Navigator from "@/components/Navigator.vue";
import Follow from "../components/Follow";
import url from "@/assets/pic1.png";
import { dateFormat } from "../assets/js/time";

export default {
  data () {
    return {
      expert: this.$store.state.expert,
      user: this.$store.state.user,
      circleUrl: url,
      activeIndex: "1"
    };
  },
  computed: {
    formattedDate () {
      return dateFormat(this.user.createdDate);
    }
  },
  mounted () {
    /*
    if (this.$store.state.user.username == null) {
      this.$router.push("/");
    }
    */
  },
  methods: {
  },
  components: {
    Follow,
    Navigator,
  }
};
</script>
<style>
</style>
