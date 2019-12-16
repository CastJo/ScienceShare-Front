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
            <div v-if="info.introduce == ''">
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
              {{ info.introduce }}
            </p>
          </div>
          <el-drawer
            :visible.sync="dialogVisible"
            direction="ltr"
            size="50%"
            :modal-append-to-body="false"
          >
            <el-input
              type="textarea"
              :autosize="{ minRows: 5, maxRows: 8 }"
              placeholder="介绍一下你自己吧。"
              v-model="info.introduce"
              class="px-5"
            >
            </el-input>
            <el-autocomplete
              class="inline-input px-5"
              v-model="tagText"
              :fetch-suggestions="querySearch"
              placeholder="为自己加个标签吧。"
              :trigger-on-focus="false"
            ></el-autocomplete>
            <el-button round type="primary" class="ml-4 my-5" @click="addTag"
              >ADD</el-button
            >
            <div class="px-5">
              <el-tag
                v-for="tag in info.tags"
                :key="tag.label"
                closable
                :disable-transitions="false"
                @close="handleClose(tag)"
              >
                {{ tag.label }}
              </el-tag>
            </div>
            <div class="demo-drawer__footer mx-5" style="margin-top:20%">
              <el-button @click="dialogVisible = false" style="margin-left: 70%"
                >取 消</el-button
              >
              <el-button type="primary" @click="dialogVisible = false"
                >提 交</el-button
              >
            </div>
          </el-drawer>
          <div>
            <p>
              <b>Skills and expertise({{ nTags }})</b>
            </p>
            <div class="bottom clearfix">
              <el-tag
                size="large"
                class="mx-1"
                :type="anyType"
                v-for="tag in info.tags"
                :key="tag.label"
                >{{ tag.label }}</el-tag
              >
            </div>
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
      hasPermission: true,
      inputVisible: false,
      info: this.$store.state.expert.info,
      tagText: "",
      textarea: "",
      msg: "overview",
      constTags: [],
    };
  },
  mounted () {
    this.constTags = this.loadAll();
  },
  computed: {
    anyType () {
      const type = ["", "success", "info", "danger", "warning"]
      return type[Math.ceil(Math.random() * 5) - 1];
    },
    nTags () {
      return this.info.tags.length;
    }
  },
  methods: {
    querySearch (queryString, cb) {
      var tags = this.constTags;
      var results = queryString ? tags.filter(this.createFilter(queryString)) : tags;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter (queryString) {
      return (tags) => {
        return (tags.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    loadAll () {
      return [
        { "value": "java", },
        { "value": "c++", },
        { "value": "html", },
        { "value": "python", },
        { "value": "c#", },
        { "value": "buaa", },
      ];
    },
    handleClose (tag) {
      this.info.tags.splice(this.info.tags.indexOf(tag), 1);
    },

    throwNotice: function (title, content) {
      const h = this.$createElement;
      this.$notify({
        title: title,
        message: h('i', { style: 'color: teal' }, content)
      });
    },

    addTag () {
      var tag = {
        label: this.tagText
      }
      if (this.tagText === '')
        this.throwNotice('请求被拒绝', '请输入字符')
      if (this.info.tags.find(res => res.label === this.tagText) !== undefined) {
        this.throwNotice('请求被拒绝', '请已存在标签')
      } else if (this.constTags.find(res => res.value === this.tagText) === undefined) {
        this.throwNotice('请求被拒绝', '没有此标签')
      } else {
        this.info.tags.push(tag)
      }
      this.tagText = ""
    }
  },

};
</script>
