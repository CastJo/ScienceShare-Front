<template>
  <div style="padding: 0px 30px">
    <ResearchItem
      v-for="item in researchList"
      :key="item.title"
      :title="item.title"
      :date="item.date"
      :venue="item.venue"
      :expertsName="item.expertsName"
    />
  </div>
</template>

<script>
import ResearchItem from "@/components/ResearchItem.vue"
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
  },
  components: {
    ResearchItem,
  }
}
  </script>
