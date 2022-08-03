<template>
  <div>
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
        <h2>{{ this.labName  + (this.studentView ? ' - Student View' : '') }}</h2>
        <hr />
      </div>
    </div>

    <small class="navigation"
      ><span>{{ username }}{{ currentDirectory }}</span>
      <br />
      <span class="pointer underline" @click="this.goToLabs()"
        >↩ Return to Labs</span
      >
    </small>
    <div class="exit-student-view" style="text-align:end;margin-top:1rem;margin-right:1rem;">
      <button type="button" v-if="this.studentView" @click="exitStudentView()" class="btn btn-danger">Exit Student View</button>
    </div>
    <br />
    <br v-if="!this.studentView">
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
        margin: 2rem 2rem 2rem 2rem !important;
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
</template>

<script>
import * as API from "../../services/API";
import store from "../../Store/index";
import { useRoute } from "vue-router";
import { computed } from "vue";
import { sort } from "../../services/Sort";

export default {
  props: ["courseID", "labID", "labName", "studentView"],
  data() {
    return {
      allProblems: [],
      problems: [],
      progress: {},
      username: "",
      sort: "1",
      expandedProblem: null,
      lang: "",
      problemID: null,
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
    //problem list work
    async fetchProblems() {
      const rawProblems = await API.apiClient.get(`/problems/${this.labID}`);
      this.allProblems = rawProblems.data.data;

      //get's progress if student, returns {} if not
      this.progress = await this.getProgress();

      //loop through and get percent complete and recent activity
      this.allProblems.forEach((problem) => {
        if(!this.isProf) {
          problem["percent"] = this.getPercent(problem);
          problem["activity"] = this.getActivity(problem);
        }
        problem.due_date = this.convertDate(problem.due_date);
      });

      //sort Problems
      await this.sortProblems();

      await this.getColors();
    },
    async sortProblems() {
      //get sort method and call it
      if(this.sort == "0") {
        //due date
        this.allProblems = sort(4, this.allProblems);
      } else if(this.sort == "1") {
        //name
        //default
        this.allProblems = sort(3, this.allProblems);
      } else {
        //unsorted
        this.allProblems = sort(5, this.allProblems);
      }
      
        //call the filter after sorting
        await this.filterByPublish();

        return;
    },
    async filterByPublish() {
      this.problems = [];

      if(this.isProf) {
        this.problems = this.allProblems;
      } else {
        this.problems = this.allProblems.filter(problem => {
          if(problem.isPublished) {
            //check that problem has at least 1 test case
            if(problem.test_cases > 0) {
              return true;
            } else {
              return false;
            }
          } else {
            return false;
          }
        });
      }

      return;

    },
    async getColors() {
      this.allProblems.forEach((problem) => {
        var element = document.getElementById(problem.id);
        if(problem["percent"] == "100%") {
          //green background
          element?.classList.add("complete");
        } else if (problem["percent"] != "0%") {
          //red background
          element?.classList.add("incomplete");
        } else {
          //white background do nothing
          element?.classList.remove("complete");
          element?.classList.remove("incomplete");
        }
      });
    },

    //individual problem work
    //getting problem information to display
    getPercent(problem){
      if(problem.test_cases == 0) {
        return "0%";
      }

      var d = JSON.parse(this.progress.assignments);
      d.forEach(p => {
        if(p.assignment_id == problem.id) {
          if(!p) {
            return "0%";
          } else {
            return parseInt((p.cases_passed / problem.test_cases) * 100) + "%";
          }
        }
      });

      return "0%";

    },
    getActivity(problem) {
      var d = JSON.parse(this.progress.assignments);
      d.forEach(p => {
        if(p.assignment_id == problem.id) {
          if(!p) {
            return "No recent activity";
          } else {
            return p.last_progress;
          }
        }
      });
      return "No recent activity";
    },
    convertDate(numericalDate) {
      var tmpD = new Date(numericalDate);
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

      return `${months[tmpD.getMonth()]} ${tmpD.getDate()}`;
    },
    //Expanding and Collapsing a problem
    toggleExpansion(key) {
      if(this.isExpanded(key)) {
        this.lang = "";
        this.expandedProblem = null;
      } else {
        this.expandedProblem = key;
      }
    },
    isExpanded(key) {
      return this.expandedProblem == key;
    },
    //Deleting a Problem
    closeDeleting() {
      this.showDelteModal = false;
    },
    async deleteProblem() {
      var id = this.deletingProblem.id;
      var problem = this.deletingProblem.problem;
      var key = this.deletingProblem.key;

      const res = await API.apiClient.delete(`/problems/${problem.id}`);

      //filter from list of problems
      this.allProblems = this.allProblems.filter(p => p.id != id);
      this.problems = this.problems.filter(p => p.id != id);

      this.closeDeleting();
    },
    deleting(id, problem, key) {
      this.showDelteModal = true;
      this.deletingProblem.id = id;
      this.deletingProblem.problem = problem;
      this.deletingProblem.key = key;
    },
    //add Problem
    async addProblem() {
      //set date to 1 week from current
      var date = new Date();
      date.setDate(date.getDate() + 7);
      var month = '' + (date.getMonth() + 1), day = '' + date.getDate(), year = '' + date.getFullYear();
      
      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;

      var ymd = [year, month, day].join('-');

      var payload = {
        name: "New Problem",
        description: JSON.stringify({ ops: [{insert: "New Problem"}]}),
        lab_id: this.labID,
        due_date: ymd + " 23:59:59",
        copy_id: this.labID,
        java_starter: "public class Main{\n\tpublic static void main(String[] args){\n\t\t\n\t}\n}",
        python_starter: 'def main():\n\t// Your code here\n\n\nif __name__ == "__main__":\n\tmain()',
      };

      const problem = await API.apiClient.post(`/problems`, payload);
      this.allProblems.push(problem.data.data);
      this.problems.push(problem.data.data);

      this.editProblem(problem.data.data.id);
    },


    //user related functions
    async getProgress() {
      //check if student
      if(!this.isProf) {
        const res = await API.apiClient.get(`/progress/${this.authUser.fsc_user.fsc_id}`);
        return res.data.data;
      } else {
        //could eventually replace this with a total progress of all students
        return {};
      }
    },


    //routing functions
    //edit a problem
    editProblem(id) {
      this.problemID = id;
      this.$router.push({
        name: "EditAssignment",
        params: {courseID: this.courseID, labID: this.labID, problemID: id, labName: this.labName },
      })
    },
    goToProblem(id) {
      this.problemId = id;
      this.$router.push({ name: "Assignment", params: {courseID: this.courseID, labID: this.labID, problemID: id, lang: this.lang }});
    },
    goToLabs() {
      this.studentView ? 
        this.$router.push({name: 'Labs', params: {courseID: this.courseID, studentView: this.studentView }})
        : this.$router.push({name: 'Labs', params: {courseID: this.courseID }});
    },
    exitStudentView() {
      this.$router.push({name: 'Problems', params: {courseID: this.courseID, labID: this.labID, labName: this.labName }});
    }

  },
  computed: {
    authUser: function() {
      return store.getters["auth/authUser"];
    },
    isProf: function() {
      if (store.getters["auth/isProf"] == null) {
          return false;
      } else {
          return store.getters["auth/isProf"] && !this.studentView;
      }
    },
  },
  watch: {
    showDeleteModal: function() {
      if(!this.showDeleteModal) {
        this.reloadDeleteModal++;
      }
    }
  },
  async mounted() {
    this.username = this.authUser.username;
    await this.fetchProblems();
  },

}
</script>

<style>

</style>