<template>
  <div v-if="!assignmentisOpen">
    <!-- Main Page-->

    <div class="courses header">
      <h2>Lab {{ this.labID }}: Problems</h2>
      <hr />
    </div>

    <div class="problemdiv">
      <table class="table problemtable">
        <thead class="problemtable">
          <tr>
            <th>Title</th>
            <th># Test Cases</th>
            <th>% Successful</th>
            <th>Due Date</th>
            <th>Last Activity</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="problem"
            style="cursor: pointer"
            v-for="problem in problems"
            :key="problem.id"
            @click="goToProblem(problem.id)"
          >
            <td>{{ problem.name }}</td>
            <td>{{ problem.test_cases }}</td>
            <td>69%</td>
            <td>{{ problem.due_date }}</td>
            <td>1/24/2021</td>
          </tr>

          <tr
            class="problem incomplete"
            @click="goToProblem(1)"
            style="cursor: pointer"
          >
            <td>Problem 1</td>
            <td>66%</td>
            <td>3</td>
            <td>1/24/2021</td>
            <td>1/24/2021</td>
          </tr>
          <tr
            class="problem complete"
            onclick="location.href='workspace.php';"
            style="cursor: \pointer"
          >
            <td>Problem 2</td>
            <td>100%</td>
            <td>5</td>
            <td>1/31/2021</td>
            <td>1/31/2021</td>
          </tr>
          <tr
            class="problem complete"
            onclick="location.href='workspace.php';"
            style="cursor: pointer"
          >
            <td>Problem 3</td>
            <td>6</td>
            <td>100%</td>
            <td>2/7/2021</td>
            <td>2/5/2021</td>
          </tr>
          <tr
            class="problem"
            onclick="location.href='workspace.php';"
            style="cursor: pointer"
          >
            <td>Problem 4</td>
            <td>5</td>
            <td>80%</td>
            <td>2/14/2021</td>
            <td>2/11/2021</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <router-view
    @assignment-unmounting="assignmentUnmounting()"
    v-if="assignmentisOpen"
    :problemID="problemID"
  ></router-view>
</template>

<script>
import * as API from "../services/API";
export default {
  props: ["labID"],
  emits: ["problems-unmounting"],
  data() {
    return {
      problems: [],
      assignmentisOpen: false,
      problemID: null,
    };
  },
  methods: {
    goToProblem(id) {
      this.assignmentisOpen = true;
      this.problemID = id;
      this.$router.push({ name: "Assignment", params: { problem_id: id } });
    },
    async getProblems() {
      const rawProblems = await API.apiClient.get(`/problems/${this.labID}`);
      this.problems = rawProblems.data.data;
      console.log(this.problems);
    },
    assignmentUnmounting() {
      this.assignmentisOpen = false;
      this.problemID = null;
    },
  },
  mounted() {
    this.assignmentisOpen = false;
    this.getProblems();
  },
  beforeUnmount() {
    this.$emit("problems-unmounting");
  },
};
</script>

<style>
</style>