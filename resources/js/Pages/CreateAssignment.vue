<template>
  <div class="container">
    <tabs v-model="selectedTab">
      <tab
        class="tab"
        v-for="(tab, i) in tabs"
        :key="`t${i}`"
        :val="tab"
        :label="tab"
        :indicator="true"
      />
    </tabs>
    <tab-panels v-model="selectedTab" :animate="true">
      <tab-panel :val="'Overview'"> 1 {{ this.test }} </tab-panel>
      <tab-panel :val="'Assign'"> 2 {{ this.test }} </tab-panel>
      <tab-panel :val="'Template'"> 3 {{ this.test }} </tab-panel>
      <tab-panel :val="'Test Bench'"> 4 {{ this.test }} </tab-panel>
      <tab-panel :val="'Model Solution'"> 5 {{ this.test }} </tab-panel>
      <tab-panel :val="'Grade Book'"> 6 {{ this.test }} </tab-panel>
    </tab-panels>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";

const tabs = [
  "Overview",
  "Assign",
  "Template",
  "Test Bench",
  "Model Solution",
  "Grade Book",
];

export default defineComponent({
  name: "Example",
  setup() {
    const state = reactive({
      selectedTab: tabs[0],
    });
    return {
      tabs,
      ...toRefs(state),
    };
  },
  data() {
    return {
      test: "test",
    };
  },
});
</script>

<style></style>
