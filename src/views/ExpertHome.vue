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
            <h4>{{ expert.name }}</h4>
            <h6>Follows: {{ expert.follows }}</h6>
            <h6>Fans: {{ expert.fans }}</h6>
          </el-col>
        </el-row>
        <el-row>
          <el-menu
            router
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
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
import Navigator from "@/components/Navigator.vue";
import url from "@/assets/pic1.png";
export default {
  data () {
    return {
      expert: this.$store.state.expert,
      fullscreenLoading: false,
      formLabelWidth: "60px",
      circleUrl: url,
      activeIndex: "1",
      uploadDialog: false,

    };
  },
  mounted () {

  },
  methods: {
    uploadFile () {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });

      loading.close();
    }
  },
  components: {
    Navigator
  }
};
</script>

<style></style>
