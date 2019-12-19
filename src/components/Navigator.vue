<template>
  <div>
    <el-row>
      <el-col :span="8" class="pt-2">
        <img src="@/assets/pic1.png" class="image" style="max-height:60px; " />
<!--        <el-button type="text" class="mx-4">Home </el-button>-->
<!--        <el-button type="text" class="mx-4">Questions </el-button>-->
<!--        <el-button type="text" class="mx-4">Jobs</el-button>-->
      </el-col>
      <el-col :span="8">
        <el-autocomplete
                v-if="isSearch"
                class="pt-3"
                v-model="input"
                :fetch-suggestions="querySearch"
                placeholder="Search Something?"
                :trigger-on-focus="false"
                @select="handleSelect"
        >
          <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
        </el-autocomplete>
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
  data() {
    return {
      isSearch:"true",
      input: "",
      isNotified: true,
      circleUrl: circle,
      activeIndex: "1",
      activeIndex2: "1",
      visible:false
    };
  },
  mounted(){
    if(this.$route.name === "searchresult"||this.$route.name==="mainresults"||this.$route.name==="expertresult"){
      this.isSearch = false;
    }
  },

  methods: {
    ToIndex() {
      this.$router.push("/home");
    },
    SignOut() {
      this.$store.dispatch("SignOut");
      window.location.reload();
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    logout: function() {},
    querySearch(queryString, cb){
      var results = queryString;
      cb(results);
    },
    search(){
      // var input = this.input;
      if(this.$route.name === 'searchresult'){
        this.$route.params.keyword = this.input;
        this.$router.go(0);
      }
      this.$router.replace({
        name:'searchresult',
        params:{
          keyword: this.input
        }
      })
    },

  }


};
</script>

<style>
el-col {
  padding-top: 20px;
}
</style>
