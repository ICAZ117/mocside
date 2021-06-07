<template>
  <div class="assignment header">
    <input
      id="assignment-title"
      type="text"
      class="assignment-title form-control"
      name="assignment-title"
      placeholder="Assignment Title"
    />
    <hr />

    <div class="assignment navbar-nav">
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
    </div>
  </div>

  <tab-panels v-model="selectedTab" :animate="true">
    <tab-panel :val="'Overview'"> <Overview /> </tab-panel>
    <tab-panel :val="'Assign'"> <Assign /> </tab-panel>
    <tab-panel :val="'Template'"> <Template /> </tab-panel>
    <tab-panel :val="'Test Bench'"> <TestBench /> </tab-panel>
    <tab-panel :val="'Model Solution'"> <ModelSolution /> </tab-panel>
    <tab-panel :val="'Grade Book'"> <GradeBook /> </tab-panel>
  </tab-panels>
</template>

<script lang="ts">
// Imports for tab functionality. Note: VScode is wrong, there's no error here smh
import { defineComponent, reactive, toRefs } from "vue";

// Assignment components
import Overview from "../Components/Overview.vue";
import Assign from "../Components/Assign.vue";
import Template from "../Components/Template.vue";
import TestBench from "../Components/TestBench.vue";
import ModelSolution from "../Components/ModelSolution.vue";
import GradeBook from "../Components/GradeBook.vue";

import * as API from "../services/API";

const tabs = [
  "Overview",
  "Assign",
  "Template",
  "Test Bench",
  "Model Solution",
  "Grade Book",
  "Save & Exit"
];

export default defineComponent({
  props: ['problemID'],
  emits: ['unmounting', "problemEdited"],
  components: { Overview, Assign, Template, TestBench, ModelSolution, GradeBook },
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
      assignment: {
        title: "",
      },
    };
  },
  methods: {
    async handleSubmit(){
      //perhaps later replace this with a debounce method for autosaving
      //save information before returning to the problems page
      var payload = {

      }
      const res = await API.apiClient.put(`/problems/${this.problemID}`, payload);

      this.$emit("problemEdited");
    },
  },
  beforeUnmount() {
    this.$emit("unmounting");
  },
});
</script>

<style></style>
