<template>
  <el-card class="py-2">
    <b>Title: {{ title }}</b> <br /><br />
    <h6>{{ date }} · {{ venue.raw }}</h6>
    <el-button
      v-if="showStar"
      class="mt-2"
      icon="el-icon-star-off"
      circle
    ></el-button>
  </el-card>
</template>

<script>
export default {
  name: "ResearchItem",
  props: {
    title: String,
    venue: String,
    date: String,
    authors: Array
  },
  computed: {
    showStar: {
      get() {
        return (
          this.$store.state.user.username ===
          this.$store.state.expertPage.realName
        );
      }
    }
  }
};
</script>

<style></style>
