<template>
  <div class="assignment header">
    <input
      id="assignment-title"
      type="text"
      class="assignment-title form-control"
      name="assignment-title"
      placeholder="Assignment Title"
      v-model="assignment.title"
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
    <tab-panel :val="'Overview'"> <Overview @update="updateOverview" :overview="overview" :assignmentID="problemID"/> </tab-panel>
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
import _ from 'lodash';

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
      assignmentID: this.problemID,
      assignment: {
        title: "",
      },
      overview: {},
    };
  },
  methods: {
    async handleSubmit(){
      //perhaps later replace this with a debounce method for autosaving
      //save information before returning to the problems page
      var payload = {
        "name": this.title,
        // "description": this.overview,

      }
      const res = await API.apiClient.put(`/problems/${this.problemID}`, payload);

      this.$emit("problemEdited");
    },
    updateOverview(e) {
      //will be removing this in place of using debounce on each specific tab and then saving only that tab at a time
      console.log(e);
      this.overview = e;
      console.log("event complete did the value change?");


      var test = _.debounce(function () {
        console.log("change finished");
      }, 1);

    }
  },
  computed: {
    title: function() {
      return this.assignment.title;
    },
  },
  beforeUnmount() {
    this.$emit("unmounting");
  },
});
</script>

<style></style>
