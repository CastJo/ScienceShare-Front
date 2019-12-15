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
            <h4>{{ expert.name }}</h4>
            <h6>recent: {{ expert.years }}</h6>
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
export default {
  data () {
    return {
      expert: this.$store.state.expert,
      circleUrl: url,
      activeIndex: "1"
    };
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

<style></style>
