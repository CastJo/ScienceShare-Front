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
          <el-col :span="10">
            <!--
            <el-dropdown>
              <el-button type="primary">
                Let's Do Something!
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click="console.log(heh)"
                  >黄金糕</el-dropdown-item
                >
                <el-dropdown-item>狮子头</el-dropdown-item>
                <el-dropdown-item>螺蛳粉</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            -->
            <el-button
              type="primary"
              class="mt-3 ml-5"
              @click="uploadDialog = true"
              >Upload Somethings.</el-button
            >
            <el-dialog
              title="上传文献"
              :visible.sync="uploadDialog"
              :modal-append-to-body="false"
              top="1%"
            >
              <el-form :model="form">
                <el-form-item label="Title" :label-width="formLabelWidth">
                  <el-input v-model="form.title" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="Author" :label-width="formLabelWidth">
                  <el-input v-model="form.author" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="Url" :label-width="formLabelWidth">
                  <el-upload
                    class="upload-demo"
                    drag
                    accept="pdf"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    multiple
                  >
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">
                      将文件拖到此处，或<em>点击上传</em>
                    </div>
                    <div class="el-upload__tip" slot="tip">
                      只能上传pdf/md文件
                    </div>
                  </el-upload>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="uploadDialog = false">取 消</el-button>
                <el-button type="primary" @click="uploadDialog = false"
                  >确 定</el-button
                >
              </div>
            </el-dialog>
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
import Navigator from "@/components/Navigator.vue";
import url from "@/assets/pic1.png";
export default {
  data() {
    return {
      expert: this.$store.state.expert,
      formLabelWidth: "60px",
      circleUrl: url,
      activeIndex: "1",
      uploadDialog: false,
      form: {
        title: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      }
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  components: {
    Navigator
  }
};
</script>

<style></style>
