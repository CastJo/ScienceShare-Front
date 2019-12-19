<template>
  <div style="padding: 0px 30px">
    <ResearchItem
      v-for="item in researchList"
      :key="item.id"
      :title="item.title"
      :date="item.date"
      :venue="item.venue"
      :authors="item.authors"
    />
  </div>
</template>

<script>
import ResearchItem from "@/components/ResearchItem.vue";
export default {
  data() {
    return {};
  },
  mounted() {
    console.log(this.$store.state.expertPage);
  },
  computed: {
    researchList: {
      get() {
        return this.$store.state.expertPage.researchList;
      }
    }
  },
  components: {
    ResearchItem
  }
};
</script>
