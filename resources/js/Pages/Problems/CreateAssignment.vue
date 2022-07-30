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
        <Overview v-if="overview != null && overview != ''" @delete="deleteProblem" :overview="overview" :problemID="problemID"/>
      </tab-panel>
      <tab-panel :val="'Assign'">
        <Assign @delete="deleteProblem" :problemID="problemID"  />
      </tab-panel>
      <tab-panel :val="'Template'">
        <Template :problemID="problemID" :tab="selectedTab" />
      </tab-panel>
      <tab-panel :val="'Test Bench'">
        <TestBench :problemID="problemID" />
      </tab-panel>
      <tab-panel :val="'Model Solution'">
        <ModelSolution :problemID="problemID" :tab="selectedTab"/>
      </tab-panel>
      <tab-panel :val="'Grade Book'">
        <GradeBook :problemID="problemID" />
      </tab-panel>
      <tab-panel :val="'Save & Exit'"></tab-panel>
    </tab-panels>
  </div>
</template>

<script>
//imports for tab functionality
import { reactive, toRefs } from "vue";

//asignment components
import Overview from "../../Components/CreateAssignment/Overview.vue";
import Assign from "../../Components/CreateAssignment/Assign.vue";
import Template from "../../Components/CreateAssignment/Template.vue";
import TestBench from "../../Components/CreateAssignment/TestBench.vue";
import ModelSolution from "../../Components/CreateAssignment/ModelSolution.vue";
import GradeBook from "../../Components/CreateAssignment/GradeBook.vue";

import * as API from "../../services/API";
import _ from "lodash";

const tabs = [
  "Overview",
  "Assign",
  "Template",
  "Test Bench",
  "Model Solution",
  "Grade Book",
  "Save & Exit"
];
export default {
  props: ["courseID", "labID", "problemID", "labName"],
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
      assignmentTitle: "",
      overview: null,
      problem: {},
    }
  },
  methods: {
    //get problem details
    async fetchProblem() {
      const rawProblem = await API.apiClient.get(`/problems/full/${this.problemID}`);
      this.problem = rawProblem.data.data;
      this.assignmentTitle = this.problem.name;
      this.overview = this.problem.description;
    },

    //delete problem
    async deleteProblem() {
      const res = await API.apiClient.delete(`/problems/${this.problemID}`);
      this.goToProblems();
    },

    //return to list of problems
    goToProblems() {
      this.$router.push({ name: "Problems", params: { courseID: this.courseID, labID: this.labID,  labName: this.labName } });
    },

    //switch tabs
    async pressTab() {
      if(this.selectedTab == "Save & Exit") {
        this.$router.go(-1);
      }
    },

    //changing title of the problem
    timeout: _.debounce(async function(assingmentID) {
      var payload = {
        name: this.assignmentTitle,
      };
      const res = await API.apiClient.put(`/problems/unique/${assingmentID}`, payload);
    }, 500),
  },
  watch: {
    assignmentTitle: function (val) {
      if (this.assignmentTitle != "") {
        this.timeout(this.problemID);
      }
    },
  },
  mounted() {
    this.fetchProblem();
  },
}
</script>

<style>

</style>