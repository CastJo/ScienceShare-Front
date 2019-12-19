<template>
  <el-card>
    <b>{{ title }}</b> <br />
    <h6>Paper</h6>
    <h6>{{ date }} · {{ venue }}</h6>
  </el-card>
</template>

<script>
export default {
  name: "ResearchItem",
  props: {
    title: String,
    venue: String,
    date: String,
    expertsName: Array,
  },
}
</script>

<style>
</style>