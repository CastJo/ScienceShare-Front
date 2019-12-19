<template>
  <div>
    <el-dialog
      :before-close="handleClose"
      :visible.sync="this.dialogVisible"
      title="专家认证"
    >
      专家：<el-select
        v-model="value1"
        clearable
        filterable
        placeholder="请选择"
      >
        <el-option
          v-for="item in options1"
          :key="item.username"
          :label="item.username"
          :value="item.username"
        >
        </el-option>
      </el-select>
      &nbsp;学校：<el-select
        v-model="value2"
        clearable
        filterable
        placeholder="请选择"
        @change="getSchool"
      >
        <el-option
          v-for="item in options2"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        >
        </el-option>
      </el-select>
      <mavon-editor
        :boxShadow="false"
        defaultOpen="edit"
        placeholder="请添加申请材料"
        v-model="content"
      >
      </mavon-editor>
      <div class="dialog-footer" slot="footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button @click="addReply" type="primary">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Certification",
  data() {
    return {
      // expert:{
      //     loading: false,
      //     value: [],
      //     options: [],
      //     states: [],
      //     list: [],
      // },
      // school:{
      //     loading: false,
      //     value: [],
      //     options: [],
      //
      //     states: [],
      //     list: [],
      // },
      options1: [],
      options2: [],
      value1: "",
      value2: "",
      content: "",
      dialogVisible: this.visible
    };
  },
  created() {
    this.getSchool();
  },
  watch: {
    dialogVisible(val) {
      this.$emit("update:visible", val);
    },
    visible(val) {
      this.dialogVisible = val;
    }
    /*
    value2(val) {
      console.log(this.value2);
    }
    */
  },
  methods: {
    getSchool() {
      this.$axios
        .get("usercenter/getCollegeByKeyword", {
          params: {
            keyword: this.value2
          }
        })
        .then(res => {
          this.options2 = res.data;
        });
    },
    handleClose() {
      this.$confirm("确认关闭？")
        .then(() => {
          this.closeDialog();
        })
        .catch(() => {});
    },
    closeDialog() {
      this.dialogVisible = false;
    },
    addReply() {
      if (this.form.content == "") this.$alert("内容不能为空");
      else {
        this.$confirm("是否发布回复?", "", {
          confirmButtonText: "确定",
          cancelButtonText: "取消"
        })
          .then(() => {
            this.postToBackEnd();
          })
          .catch(() => {});
      }
    },
    remoteMethodE(query) {
      if (query !== "") {
        this.expert.loading = true;
        setTimeout(() => {
          this.expert.loading = false;
          this.expert.options = this.expert.list.filter(item => {
            return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.expert.options = [];
      }
    },
    remoteMethodS(query) {
      if (query !== "") {
        this.school.loading = true;
        setTimeout(() => {
          this.school.loading = false;
          this.school.options = this.school.list.filter(item => {
            return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.school.options = [];
      }
    }
  },
  props: ["visible"]
};
</script>
<style scoped></style>
