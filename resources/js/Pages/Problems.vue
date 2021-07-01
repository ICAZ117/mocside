<template>
  <div v-if="!childIsOpen">
    <!-- Main Page-->
    <button @click="this.$emit('unmounting')" class="btn btn-danger btn-block">Return to Labs</button>
    <div class="courses header">
      <h2>{{ this.labName }}</h2>
      <hr />
    </div>
    <a v-if="isProf" class="pointer no-decor" @click="addProblem">ADD</a>
    <table class="table problemtable">
      <thead class="problemtable">
        <tr>
          <th><i class="fas fa-chevron-down spacer"></i></th>
          <th>Title</th>
          <th># Test Cases</th>
          <th v-if="!isProf">% Successful</th>
          <th>Due Date</th>
          <th v-if="!isProf">Last Activity</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(problem, key) in problems" :key="problem.id">
          <tr
            class="problem pointer"
            @click="toggleExpansion(problem.id)"
          >
            <td v-show="!isExpanded(problem.id)"><i class="fas fa-chevron-right"></i></td>
            <td v-show="isExpanded(problem.id)"><i class="fas fa-chevron-down"></i></td>
            <td>{{ problem.name }}</td>
            <td>{{ problem.test_cases }}</td>
            <td v-if="!isProf">{{ problem.percent }}</td>
            <td>{{ problem.due_date.split(" ")[0] }}</td>
            <td v-if="!isProf">{{ problem.activity }}</td>
          </tr>
          <tr v-show="isExpanded(problem.id)" class="description-data">
            <td colspan="5" class="description-data">
              <div class="problem-description">
                <h4>
                  <b>{{ problem.name }}</b>
                </h4>
                <!-- get text from .description object -->
                <p>
                  <!-- {{ problem.description }} -->
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
          <a v-if="isProf" @click="editProblem(problem.id)" class="courselaunch text-danger mx-2 my-1 no-decor pointer">•••</a>
          <a v-if="isProf" @click="deleteProblem(problem, key)" class="courselaunch text-danger mx-2 my-1 no-decor pointer">X</a>
        </template>
      </tbody>
    </table>
  </div>
  <router-view
    @unmounting="Unmounting()"
    @problemEdited="problemEdited()"
    @deleteMe="deleteMe()"
    v-if="childIsOpen"
    :problemID="problemID"
    :lang="lang"
  ></router-view>
</template>

<script>
import * as API from "../services/API";
import store from "../Store/index";
export default {
  props: ["labID", "labName"],
  emits: ["unmounting", "labEdited"],
  data() {
    return {
      problems: [],
      childIsOpen: false,
      problemID: null,
      expandedProblem: null,
      lang: "",
      progress: [],
      authUser: null,
      fscID: null,
    };
  },
  methods: {
    async addProblem() {
      var payload = {
        "name": "New Problem",
        "description": JSON.stringify({"ops": [{"insert": "New Problem"}]}),
        "lab_id": this.labID,
        "due_date": "2021-05-29 13:04:03",
        "copy_id": this.labID,
        "java_starter": "public class Main{\n\tpublic static void main(String[] args){\n\t\t\n\t}\n}",
        "python_starter": "def main():\n\n\n\nif __name__ == \"__main__\":\n\tmain()",
      }
      const problem = await API.apiClient.post(`/problems`, payload);
      this.problemID = problem.data.data.id;
      this.problems.push(problem.data.data);
      this.childIsOpen = true;
      this.$router.push({ name: "EditAssignment", params: { problem_id: this.problemID } });
    },
    editProblem(id) {
      this.childIsOpen = true;
      this.problemID = id;
      this.$router.push({ name: "EditAssignment", params: { problem_id: this.problemID } });
    },
    async deleteProblem(problem, key) {
      var flag = confirm("Are you Sure you want to remove " + problem.name + " from this Lab?");
      if(flag) {
        // remove this problem from the current lab
        const res = await API.apiClient.delete(`/problems/${problem.id}`);

        //filter the problems list
        this.problems = this.problems.filter((p, i) => i  != key);
      }
    },
    async deleteMe() {
      // remove this problem from the current lab
      const res = await API.apiClient.delete(`/problems/${this.problemID}`);

      //filter the problems list
      this.problems = this.problems.filter((p, i) => i  != p.id);

      //call unmounting of children
      this.Unmounting();
    },
    goToProblem(id) {
      this.childIsOpen = true;
      this.problemID = id;
      this.$router.push({ name: "Assignment", params: { problem_id: id } });
    },
    async getProblems() {
      const rawProblems = await API.apiClient.get(`/problems/${this.labID}`);
      this.problems = rawProblems.data.data;
      const prog = await this.getStudent();
      if(!this.isProf) {
        for (let i = 0; i < this.problems.length; i++) {
          this.problems[i]['percent'] = await this.getPercent(this.problems[i]);
          this.problems[i]['activity'] = await this.getActivity(this.problems[i]);
        }
      }
    },
    async getStudent() {
      this.authUser = store.getters["auth/authUser"];
      this.fscID = this.authUser.fsc_user.fsc_id;
      const res = await API.apiClient.get(`/progress/${this.fscID}`);
      this.progress = res.data;
      return this.progress;
    },
    async getPercent(problem) {
      console.log(this.progress);
      var d = JSON.parse(this.progress.assignments);
      var c;
      for (let i = 0; i<=d.length; i++) {
        if (d[i].assignment_id == problem.id) {
          c = d[i];
          break;
        }
      }
      if(problem.test_cases == 0) {
        return "0%";
      }
      else {
        return (parseInt(c.cases_passed / problem.test_cases) * 100 )+ "%";
      }

    },
    async getActivity(problem) {
      var d = JSON.parse(this.progress.assignments);
      for (let i = 0; i<=d.length; i++) {
        if (d[i].assignment_id == problem.id) {
          return d[i].last_progress;
        }
      }
    },
    async problemEdited() {
      ///update the list of courses
      this.problems = this.problems.filter((p) => p.id  != this.problemID);
      const problem = await API.apiClient.get(`/problems/full/${this.problemID}`);
      this.problems.push(problem.data.data);
      console.log(problem.data.data);
      await this.Unmounting();
    },
    async Unmounting() {
      this.childIsOpen = false;
      this.problemID = null;
      this.$router.push({ name: "Problems", params: { lab_id: this.labID } });
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
  computed: {
    isProf: function() {
      if (store.getters["auth/isProf"] == null) {
        return false;
      }
      else {
        return store.getters["auth/isProf"];
      }
    }
  },
  beforeMount() {
    this.childIsOpen = false;
    this.getProblems();
  },
  beforeUnmount() {
    this.$emit("unmounting");
  },
};
</script>

<style></style>
