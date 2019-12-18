<template>
  <div>
    <el-row>
      <el-col :span="8" class="pt-2">
        <img src="@/assets/pic1.png" class="image" style="max-height:60px; " />
        <el-link :underline="false" type="primary" class="ml-3">
          {{ this.currentTimeGreetings }}, {{ this.$store.state.user.username }}
        </el-link>
      </el-col>
      <el-col :span="8">
        <el-input placeholder="Search Something?" v-model="input" class="pt-3">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="8">
        <div class="pt-3" style="padding-left: 40%">
          <el-button
            icon="el-icon-user-solid"
            circle
            @click="ToIndex"
          ></el-button>
          <el-badge :is-dot="isNotified" class="item">
            <el-button icon="el-icon-chat-dot-round" circle></el-button>
          </el-badge>
          <el-button class="ml-5" @click="SignOut">Logout</el-button>
        </div>
      </el-col>
    </el-row>
    <el-divider class="my-2"></el-divider>
  </div>
</template>

<script>
import circle from "@/assets/logo.png";

export default {
  name: "Navigator",
  data () {
    return {
      input: "",
      isNotified: true,
      circleUrl: circle,
      activeIndex: "1",
      activeIndex2: "1"
    };
  },
  methods: {
    ToIndex () {
      this.$router.push("/home");
    },
    SignOut () {
      this.$store.dispatch("SignOut");
      window.location.reload();
    },
  },
  computed: {
    currentTimeGreetings: () => {
      const h = new Date().getHours();
      if (h < 5) return "夜深了";
      if (h < 11) return "上午好";
      if (h < 13) return "中午好";
      if (h < 18) return "下午好";
      return "晚上好";
    }
  }
};
</script>

<style>
el-col {
  padding-top: 20px;
}
</style>
