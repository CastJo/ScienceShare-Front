<template>
  <el-main
    style="padding-top:0px; filter:alpha(opacity=92.5); -moz-opacity:0.925; opacity: 0.925;"
  >
    <Navigator />
    <el-row>
      <el-card shadow="hover" style="height: 200px">
        <el-row
          ><el-col :span="4" class="px-5">
            <el-avatar :size="100" :src="circleUrl"></el-avatar>
          </el-col>
          <el-col :span="10">
            <h4>{{ expertPage.expertName }}</h4>
            <h6>
              Follows: {{ expertPage.follows === "" ? 0 : expertPage.follows }}
            </h6>
            <h6>Fans: {{ expertPage.fans === "" ? 0 : expertPage.fans }}</h6>
          </el-col>
        </el-row>
        <el-row>
          <el-menu
            router
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
          >
            <el-menu-item index="/main/overview">Overview</el-menu-item>
            <el-menu-item index="/main/research">Research</el-menu-item>
            <el-menu-item index="/main/information">Info</el-menu-item>
          </el-menu>
        </el-row>
      </el-card>
    </el-row>
    <router-view />
  </el-main>
</template>

<script>
import Navigator from "@/components/Navigator.vue";
import url from "@/assets/pic1.png";
export default {
  data() {
    return {
      fullscreenLoading: false,
      formLabelWidth: "60px",
      circleUrl: url,
      activeIndex: "1"
    };
  },
  computed: {
    expertPage: {
      get() {
        return this.$store.state.expertPage;
      }
    }
  },
  mounted() {
    if (this.$store.state.user.isLogin === null) {
      this.$router.push("/");
      return;
    }
    console.log("before call");
    console.log(this.$store.state.expertID);
    this.$axios
      .get("/homepage/loadHomePage", {
        params: {
          id: this.$store.state.expertID
        }
      })
      .then(successResponse => {
        var responseResult = JSON.parse(
          JSON.stringify(successResponse.data.data)
        );
        console.log("responseResult ");
        console.log(responseResult);
        if (successResponse.data.code === 200) {
          this.$store.commit("setExpertPage", responseResult);
          this.$router.push("/main/overview");
        } else {
          this.$notify.error({
            title: "请求被拒绝",
            message: successResponse.data.message
          });
        }
      })
      .catch(failResponse => {
        console.log(failResponse);
      });
    console.log("44");
  },
  methods: {
    uploadFile() {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });

      loading.close();
    },

  },
  components: {
    Navigator
  }
};
</script>

<style></style>
