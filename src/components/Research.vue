<template>
  <div style="padding: 0px 30px">
    <el-table :data="tableData">
      <el-table-column prop="date" label="日期" width="180"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  computed: {
    researchList: {
      get () {
        return this.$store.state.expertPage.researchList
      }
    }
  }
}
  </script>
