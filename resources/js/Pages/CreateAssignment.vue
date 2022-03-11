<template>
  <div>
    <div class="assignment header">
      <input
        id="assignment-title"
        type="text"
        class="assignment-title form-control"
        name="assignment-title"
        placeholder="Assignment Title"
        v-model="assignmentTitle"
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
            @click="pressTab"
          />
        </tabs>
      </div>
    </div>

    <tab-panels v-model="selectedTab" :animate="true">
      <tab-panel :val="'Overview'">
        <Overview
          @update="updateOverview"
          @delete-problem="deleteProblem"
          :overview="overview"
          :problemID="assignmentID"
        />
      </tab-panel>
      <tab-panel :val="'Assign'">
        <Assign :problemID="problemID" @delete-problem="deleteProblem" />
      </tab-panel>
      <tab-panel :val="'Template'">
        <Template :problemID="problemID" :tab="selectedTab" />
      </tab-panel>
      <tab-panel :val="'Test Bench'"> <TestBench :problemID="problemID" /> </tab-panel>
      <tab-panel :val="'Model Solution'"
        ><ModelSolution :problemID="problemID" :tab="selectedTab"
      /></tab-panel>
      <tab-panel :val="'Grade Book'"> <GradeBook :problemID="problemID" /> </tab-panel>
      <tab-panel :val="'Save & Exit'"></tab-panel>
    </tab-panels>
  </div>
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
import _ from "lodash";

const tabs = [
  "Overview",
  "Assign",
  "Template",
  "Test Bench",
  "Model Solution",
  "Grade Book",
  "Save & Exit",
];

export default defineComponent({
  props: ["problemID"],
  emits: ["unmounting", "problemEdited", "deleteMe"],
  components: { Overview, Assign, Template, TestBench, ModelSolution, GradeBook },
  name: "Create Assignment",
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
      assignmentTitle: "",
      overview: {},
      problem: {},
    };
  },
  watch: {
    assignmentTitle: function (val) {
      if (this.assignmentTitle != "") {
        this.timeout(this.problemID);
      }
    },
  },
  methods: {
    async pressTab() {
      console.log("pressed a tab");
      console.log(this.selectedTab);
      if(this.selectedTab == "Save & Exit") {
		  this.$router.push(-1);
      }
    },
    async handleSubmit() {
      //perhaps later replace this with a debounce method for autosaving
      //save information before returning to the problems page
      // var payload = {
      //   name: this.title,
      //   // "description": this.overview,
      // };
      // const res = await API.apiClient.put(`/problems/${this.problemID}`, payload);
    },
    updateOverview(e) {
      console.log("EEEEEEEEEEEEEEEEEEEEEEEEEEE");

      //will be removing this in place of using debounce on each specific tab and then saving only that tab at a time
      this.overview = e;
    },
    async getInfo() {
      console.log("get info");
      const rawproblem = await API.apiClient.get(`/problems/full/${this.problemID}`);
      this.problem = rawproblem.data.data;
      this.assignmentTitle = this.problem.name;
      this.overview = this.problem.description;
    },
    timeout: _.debounce(async function (assignmentID) {
      var payload = {
        name: this.assignmentTitle,
      };
      const res = await API.apiClient.put(`/problems/unique/${assignmentID}`, payload);
    }, 500),
  },
  beforeMount() {
    this.getInfo();
  },
});
</script>

<style></style>
