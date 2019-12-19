<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="16">
        <el-card class="my-2 ml-4" shadow="hover">
          <div slot="header" class="mb-4">
            <span style="float: left"><b>Information</b></span>
            <el-button
              v-if="hasPermission"
              style="float: right; padding: 3px 0"
              type="text"
              @click="dialogVisible = true"
              >Edit<i class="el-icon-edit"></i
            ></el-button>
            <el-dialog
              title="Edit Your Information"
              :visible.sync="dialogVisible"
              :modal-append-to-body="false"
            >
            </el-dialog>
          </div>
          <div>Institution: {{ this.expertPage.institution }}</div>
          <div>Degree: {{ this.expertPage.degree }}</div>
          <div>WebsiteUrl: {{ this.expertPage.webSiteUrl }}</div>
          <div>Phome: {{ this.expertPage.phone }}</div>
          <div>Email: {{ this.expertPage.email }}</div>
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
      newInfo: "",
    };
  },
  mounted () {
    console.log(this.$store.state.expertPage)
  },
  computed: {
    expertPage: {
      get () {
        return this.$store.state.expertPage
      }
    },
    hasPermission: {
      get () {
        return this.$store.state.expertPage.expertName === this.$store.state.user.username
      }
    }
  }
};
</script>
