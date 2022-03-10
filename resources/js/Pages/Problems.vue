<template>
  <div v-show="!childIsOpen">
    <!-- Problems Page-->
    <vue-final-modal
      v-model="showDeleteModal"
      classes="modal-container"
      content-class="modal-content delete-modal"
      :esc-to-close="true"
    >
      <button class="modal-close" @click="closeDeleting()">x</button>
      <div class="delete Course">
        <p>
          Are you sure you would like to delete {{ deletingProblem.problem.name }} from this Lab
        </p>
        <div class="delete-buttons">
          <button class="btn btn-md btn-danger delete-button" @click="closeDeleting()">
            Cancel
          </button>
          <button class="btn btn-md btn-danger delete-button" @click="deleteProblem()">
            Delete
          </button>
        </div>
      </div>
    </vue-final-modal>
    <div class="courses header">
      <div class="heading">
        <h2>{{ this.labName }}</h2>
        <hr />
      </div>
    </div>

    <small class="navigation"
      ><span>{{ username }}{{ currentDirectory }}</span>
      <br />
      <span class="pointer underline" @click="this.$emit('unmounting')"
        >↩ Return to Labs</span
      >
    </small>
    <br />
    <br />
    <br />
    <label for="sort">Sort By: </label>
    <select id="sort" v-model="sort" @change="sortProblems">
      <option value="0">Due Date</option>
      <option value="1">Name</option>
      <option value="2">Unsorted</option>
    </select>
    <div
      style="
        border: 1px solid #9e9e9e !important;
        padding: 0 !important;
        width: min-content !important;
        margin: 4rem 2rem 2rem 2rem !important;
      "
    >
      <table class="table problemtable" style="margin: 0 !important">
        <thead class="problemtable">
          <tr>
            <th><i class="fas fa-grin-alt spacer"></i></th>
            <th>Title</th>
            <th># Test Cases</th>
            <th v-if="!isProf">% Successful</th>
            <th>Due Date</th>
            <th v-if="!isProf">Last Activity</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(problem, key) in problems" :key="problem.id">
            <tr class="problem pointer" :id="'p' + problem.id" @click="toggleExpansion(problem.id)">
              <td v-show="!isExpanded(problem.id)">
                <i class="fas fa-chevron-right"></i>
              </td>
              <td v-show="isExpanded(problem.id)"><i class="fas fa-chevron-down"></i></td>
              <td>{{ problem.name }}</td>
              <td>{{ problem.test_cases }}</td>
              <td v-if="!isProf">{{ problem.percent }}</td>
              <td>
                {{ problem.due_date.split(" ")[0] }} {{ problem.due_date.split(" ")[1] }}
              </td>
              <td v-if="!isProf">{{ problem.activity }}</td>
            </tr>
            <tr v-show="isExpanded(problem.id)" class="description-data">
              <td colspan="5" class="description-data">
                <div class="problem-description">
                  <div class="row">
                    <h4 class="col-11">
                      <b>{{ problem.name }}</b>
                    </h4>
                    <div class="right col-1">
                      <a
                        v-if="isProf"
                        @click="editProblem(problem.id)"
                        class="courselaunch text-danger mx-2 my-1 no-decor pointer"
                        ><i class="fas fa-edit"></i
                      ></a>
                      <!-- <h5>•••</h5> -->
                      <a
                        v-if="isProf"
                        @click="deleting(problem.id, problem, key)"
                        class="courselaunch text-danger mx-2 my-1 no-decor pointer"
                        ><i class="fas fa-trash-alt"></i
                      ></a>
                      <!-- <h5>×</h5> -->
                    </div>
                  </div>
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
          </template>
          <tr v-if="isProf" class="lab pointer" @click="addProblem">
            <td colspan="5">Add Problem</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <router-view
    @unmounting="Unmounting()"
    @problemEdited="problemEdited()"
    @deleteMe="deleteMe()"
    v-if="childIsOpen"
    :problemID="problemID"
    :lang="lang"
    :labID="labID"
  ></router-view>
</template>

<script>
import * as API from "../services/API";
import store from "../Store/index";
import { useRoute } from "vue-router";
import { computed } from "vue";
import {sort} from "../services/Sort";

export default {
  props: ["labID", "labName"],
  emits: ["unmounting", "labEdited"],
  data() {
    return {
      problems: [],
      unfilteredProblems: [],
      childIsOpen: false,
      problemID: null,
      expandedProblem: null,
      lang: "",
      progress: [],
      authUser: null,
      fscID: null,
      deletedMe: false,
      username: "",
      sort: "1",
      showDeleteModal: false,
      reloadDeleteModal: 0,
      deletingProblem: {
        id: "",
        problem: {},
        key: "",
      },
    };
  },
  setup() {
    const route = useRoute();

    const currentDirectory = computed(() => route.path);

    return {
      currentDirectory,
    };
  },
  methods: {
    convertDate(numericalDate) {
      // Input: 2021-06-04
      // Output: Jun 4
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      var dateList = numericalDate.split("-");
      console.log("\n\n\n");
      console.log(dateList);
      var month = months[Number(dateList[1]) - 1];
      var day = Number(dateList[2].split(" ")[0]);

      console.log(day);

      return month + " " + day;
    },
    async addProblem() {
      var date = new Date();
      date.setDate(date.getDate() + 7);
      var month = '' + (date.getMonth() + 1),
        day = '' + date.getDate(),
        year = date.getFullYear();

      if (month.length < 2) 
          month = '0' + month;
      if (day.length < 2) 
          day = '0' + day;

      var ymd = [year, month, day].join('-');
      var payload = {
        name: "New Problem",
        description: JSON.stringify({ ops: [{ insert: "New Problem" }] }),
        lab_id: this.labID,
        due_date: ymd + " 23:59:59",
        copy_id: this.labID,
        java_starter:
          "public class Main{\n\tpublic static void main(String[] args){\n\t\t\n\t}\n}",
        python_starter: 'def main():\n\t// Your code here\n\n\nif __name__ == "__main__":\n\tmain()',
      };
      const problem = await API.apiClient.post(`/problems`, payload);
      this.problemID = problem.data.data.id;
      this.problems.push(problem.data.data);
      this.childIsOpen = true;
      this.$router.push({
        name: "EditAssignment",
        params: { problem_id: this.problemID },
      });
    },
    editProblem(id) {
      this.childIsOpen = true;
      this.problemID = id;
      this.$router.push({
        name: "EditAssignment",
        params: { problem_id: this.problemID },
      });
    },
    closeDeleting() {
      this.showDeleteModal = false;
    },
    deleting(id, problem, key) {
      this.showDeleteModal = true;
      this.deletingProblem.id = id;
      this.deletingProblem.problem = problem;
      this.deletingProblem.key = key;
    },
    async deleteProblem() {
      console.log("deleting problem");
      var id = this.deletingProblem.id;
      var problem = this.deletingProblem.problem;
      var key = this.deletingProblem.key;
      // remove this problem from the current lab
      const res = await API.apiClient.delete(`/problems/${problem.id}`);

      //filter the problems list
      this.problems = this.problems.filter((p, i) => i != key);
      //remove from the unfiltered list
      this.unfilteredProblems = this.unfilteredProblems.filter((p, i) => i != key);
      this.closeDeleting();
    },
    async deleteMe(id) {
      console.log("deleteMe " + id);

      //set variable to be used when problemEdited event is called
      this.deletedMe = true;

      this.$router.push({ name: "Problems", params: { lab_id: this.labID } });
    },
    goToProblem(id) {
      console.log("go to problem");
      this.childIsOpen = true;
      this.problemID = id;
      this.$router.push({ name: "Assignment", params: { problem_id: id } });
    },
    async getProblems() {
      try {
        console.log("gotToProblem");
        const rawProblems = await API.apiClient.get(`/problems/${this.labID}`);
        // this.problems = rawProblems.data.data;
        this.unfilteredProblems = rawProblems.data.data;
        const prog = await this.getStudent();
      } catch (e) {
        // this.$router.go(-1);
      }
      if (!this.isProf) {
        for (let i = 0; i < this.unfilteredProblems.length; i++) {
          this.unfilteredProblems[i]["percent"] = await this.getPercent(this.unfilteredProblems[i]);
          this.unfilteredProblems[i]["activity"] = await this.getActivity(this.unfilteredProblems[i]);
        }
      }
      await this.sortProblems();
      await this.getColors();
    },
    async getStudent() {
      this.authUser = store.getters["auth/authUser"];
      this.fscID = this.authUser.fsc_user.fsc_id;
      const res = await API.apiClient.get(`/progress/${this.fscID}`);
      this.progress = res.data.data;
      return this.progress;
    },
    async getPercent(problem) {
      console.log("in percent");
      var d = JSON.parse(this.progress.assignments);
      var c;
      console.log(d);
      for (let i = 0; i < d.length; i++) {
        if (d[i].assignment_id == problem.id) {
          c = d[i];
          break;
        }
      }
      console.log(c);
      if (problem.test_cases == 0) {
        return "0%";
      } else if (!c) {
        return "0%";
      } else {
        console.log(parseInt((c.cases_passed / problem.test_cases) * 100) + "%");
        return parseInt((c.cases_passed / problem.test_cases) * 100) + "%";
      }
    },
    async getActivity(problem) {
      var d = JSON.parse(this.progress.assignments);
      for (let i = 0; i < d.length; i++) {
        if (d[i].assignment_id == problem.id) {
          return d[i].last_progress;
        }
      }
    },
    async getColors() {

      for(let i = 0; i < this.unfilteredProblems.length; i++) {
        console.log(this.unfilteredProblems[i].id + " " + this.unfilteredProblems[i]["percent"]);
        if(this.unfilteredProblems[i]["percent"] == "100%") {
          //green background
          console.log("green background");
          var element = document.getElementById("p" + this.unfilteredProblems[i].id);
          console.log("element: ");
          console.log(element);
          (element != null) ? element.classList.add("complete") : console.log("element is null");
        }
        else if(this.unfilteredProblems[i]["percent"] != "0%") {
          //red background
          console.log("red background");
          var element = document.getElementById("p" + this.unfilteredProblems[i].id);
          (element != null) ? element.classList.add("incomplete") : console.log("element is null");
        }
        else {
          //standard background
          console.log("blank color background");
        }
      }
    },
    async problemEdited() {
      var tempID = this.problemID;

      //check if the problem was deleted from child
      if (this.deletedMe) {
        console.log("inside the problem edited deletedMe");
        //child deleted button was pressed
        // remove this problem from the current lab
        const res = await API.apiClient.delete(`/problems/${tempID}`);

        //filter the problems list
        this.problems = this.problems.filter((p) => p.id != tempID);
      }
      await this.getColors();
      await this.Unmounting();
    },

    async Unmounting() {
      this.unfilteredProblems = this.unfilteredProblems.filter((p) => p.id != this.problemID);
      // check if problem is deleted if not then add back in
      if(!this.deletedMe) {
        const problem = await API.apiClient.get(`/problems/full/${this.problemID}`); 
        problem.data.data["percent"] = await this.getPercent(problem.data.data);
        problem.data.data["activity"] = await this.getActivity(problem.data.data);
        this.unfilteredProblems.push(problem.data.data);
      }
      const res = await API.apiClient.get(`/progress/${this.fscID}`);
      this.progress = res.data.data;
      //set expanded problem to null
      this.expandedProblem = null;
      //recall sort method
      await this.sortProblems();
      this.childIsOpen = false;
      this.problemID = null;
      var flag = this.refreshPage();
      console.log("unmounting workspace page");
      console.log(flag);
      if (flag) {
        this.$router.push({ name: "Problems", params: { lab_id: this.labID } });
      }
      await this.getColors();
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
    async filterByPublish() {
      console.log("filter by publish");
      //grabs only the courses that are currently in session
      //empty the courses list just in case
      this.problems = [];

      if (!this.isProf) {
        console.log("student");
        //is student don't show unpublished
        for (let i = 0; i < this.unfilteredProblems.length; i++) {
          if (this.unfilteredProblems[i].isPublished) {
            if (this.unfilteredProblems[i].test_cases> 0) {
              //if within date && at least 1 test case
              this.problems.push(this.unfilteredProblems[i]);
            }
          }
        }
      } else {
        console.log("professor");
        //grab all labs including unpublished
        for (let i = 0; i < this.unfilteredProblems.length; i++) {
          this.problems.push(this.unfilteredProblems[i]);
        }
      }

      return "Hi";
    },
    async sortProblems() {
      //get sort method and call it
      if (this.sort == 0) {
        //dueDate
        await this.sortByDueDate();
      } else if (this.sort == 1) {
        //name
        //default
        await this.sortByName();
      } else {
        //course ID
        await this.sortByID();
      }
      //call the filter after sorting
      await this.filterByPublish();
      return "";
    },
    async sortByDueDate() {
      //sorts the unfiltered results by start date
      this.unfilteredProblems.sort((a, b) => {
        //if a should be first return -1, 0 for tie, -1 if b first
        let la = a.due_date.split("-");
        let lb = b.due_date.split("-");
        let fa = Date.UTC(la[0], la[1] - 1, la[2], 0, 0, 0, 0);
        let fb = Date.UTC(lb[0], lb[1] - 1, lb[2], 0, 0, 0, 0);
        if (fa < fb) {
          return -1;
        }
        if (fa > fb) {
          return 1;
        }
        return 0;
      });
    },
    async sortByName() {
      //sorts the unfiltered results by the problem name
      this.unfilteredProblems.sort((a, b) => {
        let fa = a.name.toLowerCase();
        let fb = b.name.toLowerCase();
        if (fa < fb) {
          return -1;
        }
        if (fa > fb) {
          return 1;
        }
        return 0;
      });
    },
    async sortByID() {
      //sorts the unfiltered results by id of the problem
      this.unfilteredProblems.sort((a, b) => {
        return a.id - b.id;
      });
    },
    refreshPage() {
      var r = window.location.pathname;
      var sub = "/courses";
      var c = r.substring(sub.length);
      if (c == "") {
        console.log("just on the courses page");
        return false;
        //don't allow the page to refresh to stop it from overriding the courses nav button push
      } else {
        console.log("on this page: " + c);
        var c = c.split("/");
        var cID = c[1];
        var path = c[2]; //labs, or edit, and maybe something else
        return true;
      }
    },
  },
  computed: {
    isProf: function () {
      if (store.getters["auth/isProf"] == null) {
        return false;
      } else {
        return store.getters["auth/isProf"];
      }
    },
  },
  watch: {
    showDeleteModal: function () {
      if (!this.showDeleteModal) {
        this.reloadDeleteModal++;
      }
    },
  },
  async beforeMount() {
    console.log("BeforeMount");
    this.childIsOpen = false;
    await this.getProblems().then(this.getColors());

    console.log("\n\nBefore date convert");
    console.log(this.problems);

    for (let i = 0; i < this.problems.length; i++) {
      this.problems[i].due_date = await this.convertDate(this.problems[i].due_date);
    }

    console.log("\n\nAfter date convert");
    console.log(this.problems);
  },
  beforeUnmount() {
    console.log("BeforeUnmount");
    //problems
    this.$emit("unmounting");
  },
  async mounted() {
    console.log("Mounted");
    this.authUser = await store.getters["auth/authUser"];
    this.username = this.authUser.username;
    await this.getColors();
  },
};
</script>

<style></style>
