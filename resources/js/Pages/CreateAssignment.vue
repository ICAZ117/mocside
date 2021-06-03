<template>
  <h3>Basic Example</h3>
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
    <tab-panel>
      1
    </tab-panel>
    <tab-panel>
      2
    </tab-panel>
    <tab-panel>
      3
    </tab-panel>
    <tab-panel>
      4
    </tab-panel>
    <tab-panel>
      5
    </tab-panel>
    <tab-panel>
      6
    </tab-panel>
  </tab-panels>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";

const tabs = ["Overview", "Assign", "Template", "Test Bench", "Model Solution", "Grade Book"];

export default defineComponent({
  name: "Example",
  setup() {
    const state = reactive({
      selectedTab: tabs[1],
    });
    return {
      tabs,
      ...toRefs(state),
    };
  },
});
</script>

<style></style>
