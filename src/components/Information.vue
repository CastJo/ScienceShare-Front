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
              <div>
                <h5 class="px-2">
                  Institution:
                  <el-input
                    placeholder="Edit Your institution"
                    style="width: 450px"
                    v-model="newInfo.institution"
                    class="py-2"
                  />
                </h5>
              </div>
              <div>
                <h5 class="px-2">
                  Degree:
                  <el-input
                    placeholder="Edit Your Degree"
                    style="width: 450px"
                    v-model="newInfo.degree"
                    class="pr-2 py-2"
                  />
                </h5>
              </div>
              <div>
                <h5 class="px-2">
                  Website:
                  <el-input
                    placeholder="Edit Your Website"
                    style="width: 450px"
                    v-model="newInfo.webSiteUrl"
                    class="pr-2 py-2"
                  />
                </h5>
              </div>
              <div>
                <h5 class="px-2">
                  Phone:
                  <el-input
                    placeholder="Edit Your phone"
                    style="width: 450px"
                    v-model="newInfo.phone"
                    class="pr-2 py-2"
                  />
                </h5>
              </div>
              <div>
                <h5 class="px-2">
                  Email:
                  <el-input
                    placeholder="Edit Your Email"
                    style="width: 450px"
                    v-model="newInfo.email"
                    class="pr-2 py-2"
                  />
                </h5>
              </div>
              <div class="demo-drawer__footer mx-5" style="margin-top:15%">
                <el-button
                  @click="dialogVisible = false"
                  style="margin-left: 60%"
                  >取 消</el-button
                >
                <el-button type="primary" @click="submit">提 交</el-button>
              </div>
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
      newInfo: {
        institution: "",
        degree: "",
        webSiteUrl: "",
        phone: "",
        email: "",
      },
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
