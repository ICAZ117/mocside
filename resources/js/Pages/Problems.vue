<template>
  <div>
    <!-- Main Page-->

    <div class="courses header">
      <h2>Lab X: Problems</h2>
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
            class="problem incomplete"
            onclick="location.href='workspace.php';"
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
          <tr
            class="problem"
            onclick="location.href='workspace.php';"
            style="cursor: pointer"
          >
            <td>Problem 5</td>
            <td>8</td>
            <td>0%</td>
            <td>2/21/2021</td>
            <td></td>
          </tr>
          <tr
            class="problem"
            onclick="location.href='workspace.php';"
            style="cursor: pointer"
          >
            <td>Problem 6</td>
            <td>4</td>
            <td>0%</td>
            <td>3/1/2021</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import * as API from "../services/API";
export default {
  props: ["labID"],
  data() {
    return {
      problems: [],
    };
  },
  methods: {
    async getProblems() {
      const rawProblems = await API.apiClient.get(`/problems/${this.labID}`);
      this.problems = rawProblems.data;
    },
  },
  mounted() {
    // this.getProblems();
    console.log("getProblems");
  },
  beforeUnmount() {
    this.$emit("Unmounting");
  },
};
</script>

<style>
</style>