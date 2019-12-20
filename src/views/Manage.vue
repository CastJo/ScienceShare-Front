<template>
  <el-main style="padding-top: 0;">
    <Navigator />
      <el-row :gutter="20">
          <div class="totalDiv">
              <el-col :span="15">
                  <div class="infoCardDiv">
                      <el-card shadow="hover" style="height: 400px;width: 700px">
                          <OthersCard :user="this.user" />
                      </el-card>
                  </div>
              </el-col>
              <el-col :span="9">
                  <div class="followDiv">
                      <CheckApply/>
                  </div>
              </el-col>
          </div>
      </el-row>
  </el-main>
</template>

<script>
import Navigator from "@/components/Navigator.vue";
import url from "@/assets/pic1.png";
import { dateFormat } from "../assets/js/time";
import OthersCard from "../components/OthersCard";
import CheckApply from "../components/CheckApply";
export default {
  name: "Manage",
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
      CheckApply,
      OthersCard,
    Navigator
  }
};
</script>
<style>
.totalDiv {
}
.infoCardDiv {
  float: left;
  margin-top: 50px;
}
.followDiv {
  float: left;
}
</style>
