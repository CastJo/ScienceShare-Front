<template>
  <el-main
    style="padding-top:0px; filter:alpha(opacity=92.5); -moz-opacity:0.925; opacity: 0.925;"
  >
    <Navigator />
    <el-row>
      <el-card shadow="hover" style="height: 200px">
        <el-row
          ><el-col :span="4" class="px-5">
          <el-button type="text"  @click="GoBack">
            <el-avatar :size="100" >{{expertPage.realName}}</el-avatar>
          </el-button>
<!--          <avatar username="expertPage.realName" :size="100"/>-->
          </el-col>
          <el-col :span="10">
            <h4>{{ expertPage.realName }}</h4>
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
    var list = this.$store.state.expertPage.researchList;
    var trueList =[];
    var cnt = 0;
    for(let i = 0 ; i < list.length; i++) {
      if(list[i] !== null) {
        trueList[cnt ++] = list[i];
      }
    }
    this.$store.commit("setResearchList", trueList);
  },
  methods: {
    GoBack(){
      console.log("back")
      window.history.back();
    },
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
    Navigator,
  }
};
</script>

<style></style>
