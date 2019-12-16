<template>
  <el-main style="padding-top: 0px">
    <Navigator />
    <el-row>
      <el-card shadow="hover" style="height: 200px">
        <el-row
        ><el-col :span="4" class="px-5">
          <el-avatar :size="100" :src="circleUrl"></el-avatar>
        </el-col>
          <el-col :span="16">
            <h4>{{ user.username }}</h4>
            <h6>邮箱: {{ user.emailAddress}}</h6>
            <h6>注册时间: {{ formattedDate}}</h6>
          </el-col>
        </el-row>
        <el-row>
          <el-menu
                  router
                  :default-active="activeIndex"
                  class="el-menu-demo"
                  mode="horizontal"
                  @select="handleSelect"
          >
            <el-menu-item index="/main/">Home</el-menu-item>
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
  import Navigator from "@/components/Navigator.vue"
  import url from "@/assets/pic1.png";
  import {dateFormat} from "../assets/js/time";
  export default {
    data () {
      return {
        expert: this.$store.state.expert,
        user:this.$store.state.user,
        circleUrl: url,
        activeIndex: "1"
      };
    },
    computed: {
      formattedDate() {
        return dateFormat(this.user.createdDate);
      }
    },
    mounted() {
      if (this.$store.state.user.username==null){
        this.$router.push("/");
      }
    },
    methods: {
      handleSelect (key, keyPath) {
        console.log(key, keyPath);
      }
    },
    components: {
      Navigator,
    }
  };
</script>
