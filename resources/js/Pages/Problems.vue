<template>
  <div v-if="!childisOpen">
    <!-- Main Page-->

    <div class="courses header">
      <h2>Lab {{ this.labID }}: Problems</h2>
      <hr />
    </div>

    <table class="table problemtable">
      <thead class="problemtable">
        <tr>
          <th><i class="fas fa-chevron-down spacer"></i></th>
          <th>Title</th>
          <th># Test Cases</th>
          <th>% Successful</th>
          <th>Due Date</th>
          <th>Last Activity</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="problem in problems" :key="problem.id">
          <tr
            class="problem pointer"
            @click="toggleExpansion(problem.id)"
          >
            <td v-show="!isExpanded(problem.id)"><i class="fas fa-chevron-right"></i></td>
            <td v-show="isExpanded(problem.id)"><i class="fas fa-chevron-down"></i></td>
            <td>{{ problem.name }}</td>
            <td>{{ problem.test_cases }}</td>
            <td>69%</td>
            <td>{{ problem.due_date.split(" ")[0] }}</td>
            <td>1/24/2021</td>
          </tr>
          <tr v-show="isExpanded(problem.id)" class="description-data">
            <td colspan="5" class="description-data">
              <div class="problem-description">
                <h4>
                  <b>{{ problem.name }}</b>
                </h4>
                <p>
                  {{ problem.description }}
                  <br />
                  Due Date: {{ problem.due_date.split(" ")[0] }}
                  <br />
                  Test Cases: {{ problem.test_cases }}
                  <br />
                </p>
                <div style="width: 50% !important">
                  <div class="row">
                    <div class="col-9">
                      <select v-model="lang" id="lang" class="form-select">
                        <option value="" selected disabled hidden>
                          Select a language...
                        </option>
                        <option value="Java">Java</option>
                        <option value="Python">Python</option>
                      </select>
                    </div>
                    <div class="col-3 ml-1">
                      <button
                        type="launch"
                        name="launch"
                        class="launch-workspace btn btn-success"
                        :disabled="!lang.length"
                        @click="goToProblem(problem.id)"
                      >
                        Launch in {{ lang }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
  <router-view
    @unmounting="Unmounting()"
    v-if="childisOpen"
    :problemID="problemID"
    :lang="lang"
  ></router-view>
</template>

<script>
import * as API from "../services/API";
export default {
  props: ["labID"],
  emits: ["unmounting"],
  data() {
    return {
      problems: [],
      childisOpen: false,
      problemID: null,
      expandedProblem: null,
      lang: "",
    };
  },
  methods: {
    async addProblem() {

    },
    editProblems(id) {
      this.chidlIsOpen = true;
      this.problemID = id;
      this.$router.push({ name: "EditAssignment", params: { problem_id: this.problemID } });
    },
    async deleteProblem() {

    },
    goToProblem(id) {
      this.childisOpen = true;
      this.problemID = id;
      this.$router.push({ name: "Assignment", params: { problem_id: id } });
    },
    async getProblems() {
      const rawProblems = await API.apiClient.get(`/problems/${this.labID}`);
      this.problems = rawProblems.data.data;
    },
    Unmounting() {
      this.childisOpen = false;
      this.problemID = null;
    },
    isExpanded(key) {
      // return this.expandedProblem.indexOf(key) !== -1;
      return this.expandedProblem == key;
    },
    toggleExpansion(key) {
      // Close
      if (this.isExpanded(key)) {
        // this.expandedProblem.splice(this.expandedProblem.indexOf(key), 1);
        this.lang = "";
        this.expandedProblem = null;
      }
      // Open
      else {
        // this.expandedProblem.push(key);
        this.expandedProblem = key;
      }
    },
  },
  mounted() {
    this.childisOpen = false;
    this.getProblems();
  },
  beforeUnmount() {
    this.$emit("unmounting");
  },
};
</script>

<style></style>
