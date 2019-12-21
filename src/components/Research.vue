<template>
  <div style="padding: 10px 30px">
    <ResearchItem
      v-for="item in trueList"
      :key="item.id[0]"
      :title="item.title[1]"
      :date="item.year[0]"
      :venue="item.venue[0]"
      :authors="item.authors[0]"
    />
  </div>
</template>

<script>
import ResearchItem from "@/components/ResearchItem.vue";
export default {
  data() {
    return {
      trueList: [],
    };
  },
  mounted() {


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
