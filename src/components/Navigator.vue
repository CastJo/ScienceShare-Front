<template>
  <div>
    <el-row>
      <el-col :span="8" class="pt-3">
        <img src="@/assets/pic1.png" class="image" style="max-height:60px; cursor: pointer" @click="ToFeed"/>
        <el-link :underline="false" type="primary" class="ml-3">
          {{ this.currentTimeGreetings }}, {{ this.$store.state.user.username }}
        </el-link>
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
          <span style="color: white">Search Something?</span>
      </el-col>
      <el-col :span="8">
        <div class="pt-3" style="padding-left: 40%">
          <!--          <el-button-->
          <!--            icon="el-icon-user-solid"-->
          <!--            circle-->
          <!--            @click="ToIndex"-->
          <!--          ></el-button>-->
          <el-button type="text" @click="ToIndex" title="前往个人主页">
            <el-badge
              :value="notiNum"
              class="Badge"
              :max="99"
              :hidden="hidBadge"
            >
              <el-avatar
                :src="this.$store.state.user.avatarUrl"
                :size="40"
              ></el-avatar>
            </el-badge>
          </el-button>
          <el-button class="ml-3" @click="SignOut">Logout</el-button>
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
        searchRecom:[],
      isSearch:"true",
      input: "",
      isNotified: true,
      circleUrl: circle,
      activeIndex: "1",
      activeIndex2: "1",
      notiNum: 0,
      hidBadge: true
    };
  },
  mounted(){
    if(this.$route.name === "searchresult"||this.$route.name==="mainresults"||this.$route.name==="expertresult"){
      this.isSearch = false;
    }
  },
  methods: {
    ToFeed(){
      this.$router.push("/feed");
    },
    ToIndex() {
      this.$router.push("/home");
    },
    SignOut() {
      this.$store.dispatch("SignOut");
      window.location.reload();
    },
      handleSelect(item){
          console.log(item);
      },
    querySearch(queryString, cb){
        var list = [{}];
        this.$axios
            .get("litcenter/getBoth", {
                params: {
                    params: queryString
                }
            })
            .then(successResponse => {
                // console.log(successResponse.data);
                this.searchRecom = successResponse.data;
                var results = this.searchRecom.authors;
                for(let i=0;i<this.searchRecom.authorLen;i++){
                    results[i].value = results[i].name;
                }
                var results2 = this.searchRecom.literature;
                for(let i=0;i<this.searchRecom.litlen;i++){
                    results2[i].value = results2[i].title;
                }
                list = results.concat(results2);
                cb(list);
            })
            .catch(failResponse => {
                console.log(failResponse);
            });
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
