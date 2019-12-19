<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="16">
        <el-card class="my-2 ml-4" shadow="hover">
          <div slot="header" class="mb-3">
            <span style="float: left"><b>Introduction</b></span>
            <el-button
              v-if="hasPermission"
              style="float: right; padding: 3px 0"
              type="text"
              @click="dialogVisible = true"
              >Edit<i class="el-icon-edit"></i
            ></el-button>
            <br />
            <div v-if="expertPage.introduce === ''">
              <el-button
                v-if="hasPermission"
                @click="dialogVisible = true"
                round
                type="primary"
                class="mt-4"
              >
                INTRODUCE YOURSELF!
              </el-button>
              <p v-else class="mt-4">
                这个人很懒，什么也没留下
              </p>
            </div>
            <p v-else class="mt-4">
              {{ this.expertPage.introduce }}
            </p>
          </div>
          <el-dialog
            title="Edit your info"
            top="20px"
            :visible.sync="dialogVisible"
            :modal-append-to-body="false"
          >
            <el-input
              type="textarea"
              :autosize="{ minRows: 5, maxRows: 8 }"
              placeholder="介绍一下你自己吧。"
              v-model="newInfo.introduce"
              class="px-5"
            >
            </el-input>
            <el-autocomplete
              class="inline-input px-5"
              v-model="newTag"
              :fetch-suggestions="querySearch"
              placeholder="为自己加个标签吧。"
              :trigger-on-focus="false"
            ></el-autocomplete>
            <el-button round type="primary" class="ml-4 my-5" @click="addTag"
              >ADD</el-button
            >
            <div class="px-5" v-if="newInfo.skills != null">
              <el-tag
                v-for="tag in newInfo.skills"
                class="pt-1"
                closable
                :key="tag"
                :disable-transitions="false"
                @close="handleClose(tag)"
              >
                {{ tag }}
              </el-tag>
            </div>
            <div class="demo-drawer__footer mx-5" style="margin-top:15%">
              <el-button @click="dialogVisible = false" style="margin-left: 60%"
                >取 消</el-button
              >
              <el-button type="primary" @click="submit">提 交</el-button>
            </div>
          </el-dialog>
          <div>
            <p>
              <b>Skills and expertise({{ nTags }})</b>
            </p>
            <div v-if="expertPage.skills !== null">
              <el-tag
                size="large"
                class="mx-1"
                :type="anyType"
                v-for="skill in expertPage.skills"
                :key="skill"
                >{{ skill }}</el-tag
              >
            </div>
          </div>
        </el-card>
        <el-divider class="ml-2"></el-divider>
        <el-card class="my-2 ml-4" shadow="hover">
          <div slot="header">
            <span style="float: left"><b>Research</b></span>
            <el-button
              type="text"
              style="padding: 3px 0px; padding-left: 83%"
              @click="goResearch"
              >View All</el-button
            >
          </div>
          <el-col :span="6" v-for="item in nResearch" :key="item.name"
            ><el-card class="mb-4">
              <p>{{ item.name }}</p>
              <h2>{{ item.value }}</h2>
            </el-card>
          </el-col>
        </el-card>
      </el-col>
      <el-col class="pr-4" :span="8">
        <el-card class="my-2 mx-3" style="max-height:220px" shadow="hover">
          <div slot="header">
            <b>
              Current affiliation
            </b>
          </div>
          <div style="font-size: 90%">
            {{ this.expertPage.institution }}
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dialogVisible: false,
      newInfo: {
        introduce: "",
        skills: []
      },
      isChanged: false,
      newTag: "",
      constTags: [],
      nResearch: [
        {
          name: "Research items",
          value: "2"
        },
        {
          name: "Projects",
          value: "3"
        },
        {
          name: "Questions",
          value: "4"
        },
        {
          name: "Answers",
          value: "0"
        }
      ]
    };
  },
  mounted () {
    this.constTags = this.loadAll();
    // 判断 hasPermission
    if (this.expertPage.skills != null) {
      console.log(this.expertPage.skills)
      this.newInfo.skills = this.expertPage.skills;
    }
    console.log(this.newInfo)

  },
  computed: {
    anyType () {
      const type = ["", "success", "info", "danger", "warning"];
      return type[Math.ceil(Math.random() * 5) - 1];
    },
    nTags () {
      if (this.expertPage.skills === null) return 0;
      else return this.expertPage.skills.length;
    },
    expertPage: {
      get () {
        return this.$store.state.expertPage;
      }
    },
    hasPermission: {
      get () {
        return this.$store.state.user.username === this.$store.state.expertPage.expertName;
      }
    }
  },
  methods: {
    querySearch (queryString, cb) {
      var tags = this.constTags;
      var results = queryString
        ? tags.filter(this.createFilter(queryString))
        : tags;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter (queryString) {
      return tags => {
        return (
          tags.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    loadAll () {
      return [
        { value: "java" },
        { value: "c++" },
        { value: "html" },
        { value: "python" },
        { value: "c#" },
        { value: "buaa" }
      ];
    },
    handleClose (tag) {
      this.newInfo.skills.splice(this.newInfo.skills.indexOf(tag), 1);
    },
    throwNotice: function (title, content) {
      const h = this.$createElement;
      this.$notify({
        title: title,
        message: h("i", { style: "color: teal" }, content)
      });
    },
    addTag () {
      var tag = this.newTag;
      if (tag === "") {
        this.throwNotice("请求被拒绝", "请输入字符");
        return
      }
      if (
        this.expertPage.skills != null &&
        this.expertPage.skills.find(res => res === tag) !== undefined
      ) {
        this.throwNotice("请求被拒绝", "请已存在标签");
      } else if (

        this.constTags.find(res => res.value === tag) === undefined
      ) {
        this.throwNotice("请求被拒绝", "没有此标签");
      } else {
        this.newInfo.skills.push(tag);
      }
      this.newTag = "";
    },
    submit () {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      this.$axios
        .post("expert/info", {
          params: {
            introduction: this.newInfo.introduce,
            skills: this.newInfo.tags
          }
        })
        .then(successResponse => {
          if (successResponse.data.code === 200) {
            var value = this.newInfo;
            this.$store.commit("updateInfo", value);
            this.throwNotice("成功", "已更新");
          } else {
            this.throwNotice("错误", "某个错误");
          }
        })
        .catch(failResponse => {
          console.log(failResponse);
        });
      loading.close();
      this.dialogVisible = false;
    },
    goResearch () {
      this.$router.push("/main/research");
    }
  }
};
</script>
