<template>
<!--  <el-main style="padding-top: 0;">-->
<!--    <Navigator />-->
<!--    <el-row :gutter="20">-->
<!--      <div class="totalDiv">-->
<!--        <el-col :span="15">-->
<!--          <div class="infoCardDiv">-->
<!--            <el-card shadow="hover" style="height: 400px;width: 100%">-->
<!--              <OthersCard :user="this.user" />-->
<!--            </el-card>-->
<!--          </div>-->
<!--        </el-col>-->
<!--        <el-col :span="9">-->
<!--          <div class="followDiv">-->
<!--            <Follow :username="this.$route.params.username" />-->
<!--          </div>-->
<!--        </el-col>-->
<!--      </div>-->
<!--    </el-row>-->
<!--  </el-main>-->
  <el-main style="padding-top: 0;">
    <Navigator/>
    <div class="totalDiv">
      <div class="infoCardDiv">
        <el-card shadow="hover" style="height: 400px;width: 100%">
          <OthersCard :user="this.user" />
        </el-card>
      </div>
      <div class="favEnFollow">
        <div class="favDiv">
          <Favorite :username="this.$route.params.username"/>
        </div>
        <div class="followDiv">
          <Follow :username=" this.$route.params.username"/>
          <Follower :username=" this.$route.params.username"/>
        </div>
      </div>
    </div>
  </el-main>
</template>

<script>
import Navigator from "@/components/Navigator.vue";
import Follow from "../components/Follow";
import url from "@/assets/pic1.png";
import { dateFormat } from "../assets/js/time";
import OthersCard from "../components/OthersCard";
import Follower from "../components/Follower";
import Favorite from "../components/Favorite";

export default {
  name: "Index",
  data() {
    return {
      user: "",
      circleUrl: url,
      activeIndex: "1",
      isAuthor: false
    };
  },
  computed: {
    formattedDate() {
      return dateFormat(this.user.createdDate);
    }
  },
  created() {
    if (this.$route.params.username === this.$store.state.user.username)
      this.$router.push("/home");
    this.$axios
      .get(`usercenter/getUser`, {
        params: {
          username: this.$route.params.username
        }
      })
      .then(response => {
        this.user = response.data;
        console.log(this.user);
      });
  },
  mounted() {
    if (this.$store.state.user.username == null) {
      this.$router.push("/");
    }
    if (this.$store.state.user.username === this.$route.params.username) {
      this.$router.push("/home");
    }
  },
  methods: {

    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  components: {
    OthersCard,
    Follow,
    Follower,
    Navigator,
    Favorite
  }
};
</script>
<style>
  .favEnFollow {
    float: none;
    height: 600px;
    width: 100%;
  }

  .favDiv {
    width: 50%;
    margin-top: 20px;
  }

  .totalDiv {
    width: 100%;
    float: left;
  }
  .favEnFollow div{
    float: left;
  }

  .infoCardDiv {
    width: 100%;
    margin-top: 40px;
    height: 400px;
  }

  .followDiv {
    width: 50%;
    float: right;
    child-align: right;
  }
</style>
