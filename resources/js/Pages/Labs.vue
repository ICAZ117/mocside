<template>
  <div>
    <!-- Main Page-->
    <vue-final-modal
      v-model="showDeleteModal"
      classes="modal-container"
      content-class="modal-content delete-modal"
      :esc-to-close="true"
    >
      <button class="modal-close" @click="closeDeleting()">x</button>
      <div class="delete Course">
        <p>
          Are you sure you would like to delete {{ deletingLab.lab.name }}
        </p>
        <div class="delete-buttons">
          <button class="btn btn-md btn-danger delete-button" @click="closeDeleting()">
            Cancel
          </button>
          <button class="btn btn-md btn-danger delete-button" @click="removeLab()">
            Delete
          </button>
        </div>
      </div>
    </vue-final-modal>
    <div class="courses header">
      <div class="heading">
        <h2>{{ courseName }}</h2>
        <hr />

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

    <small class="navigation"
      ><span>{{ username }}{{ currentDirectory }}</span>
      <br />
      <span class="pointer underline" @click="this.goToCourses()"
        >↩ Return to Courses</span
      >
    </small>
    <br />
    <br />
    <br />
    <label for="sort">Sort By: </label>
    <select id="sort" v-model="sort" @change="sortLabs">
      <option value="0">Due Date</option>
      <option value="1">Name</option>
      <option value="2">Unsorted</option>
    </select>

    <tab-panels v-model="selectedTab" :animate="true">
      <tab-panel :val="'Labs'">
        <div
          style="
            border: 1px solid #9e9e9e !important;
            padding: 0 !important;
            width: min-content !important;
            margin: 2rem 2rem 2rem 2rem !important;
          "
        >
          <table class="table labtable" style="margin: 0 !important">
            <thead class="labtable">
              <tr>
                <th>Title</th>
                <th># Problems</th>
                <th v-if="!isProf">% Complete</th>
                <th>Due Date</th>
                <th v-if="!isProf">Last Activity</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="lab in labs" :key="lab.id">
                <tr v-if="!isProf" class="lab pointer" :id="lab.id" @click="goToProblems(lab.id, lab.name)">
                  <td>
                    <a>{{ lab.name }}</a>
                  </td>
                  <td>{{ lab.num_problems }}</td>
                  <td v-if="!isProf">{{ lab.percent }}</td>
                  <!-- <td>69%</td> -->
                  <td>{{ lab.due_date }}</td>
                  <td v-if="!isProf">{{ lab.activity }}</td>
                  <!-- <td>4/20/0420</td> -->
                </tr>

                <tr v-if="isProf" class="lab pointer" @click.prevent="goToProblems(lab.id, lab.name)" @contextmenu.prevent="showMenu(lab.id)">
                  <td>
                    <a>{{ lab.name }}</a>
                  </td>
                  <td>{{ lab.num_problems }}</td>
                  <!-- <td>69%</td> -->
                  <td>{{ lab.due_date }}</td>
                  <!-- <td>4/20/0420</td> -->
                </tr>
              </template>

              <tr v-if="isProf" class="lab pointer" @click="addLab">
                <td colspan="5">Add Lab</td>
              </tr>
              <!-- <tr
            class="lab"
            style="cursor: pointer"
          >
            <td><a>Lab 2: Printing & I/O</a></td>
            <td>5</td>
            <td>100%</td>
            <td>1/31/2021</td>
            <td>1/31/2021</td>
          </tr> -->
            </tbody>
          </table>
        </div>
      </tab-panel>
      <tab-panel :val="'Grades'">
        <div
          style="
            border: 1px solid #9e9e9e !important;
            padding: 0 !important;
            width: min-content !important;
            margin: 2rem 2rem 2rem 2rem !important;
          "
        >
          <table class="table problemtable" style="margin: 0 !important">
            <thead class="problemtable" style="border: none !important">
              <tr>
                <th><i class="fas fa-grin-alt spacer"></i></th>
                <th>Lab Name</th>
                <th># Problems</th>
                <th>% Complete</th>
                <th>Due Date</th>
                <th>Points Earned</th>
                <th>Points Possible</th>
                <th>Grade Percentage</th>
              </tr>
            </thead>
            <tbody>
              <!-- Loop over all LABS -->
              <template v-for="(lab, index) in grades.labs" :key="index">
                <!-- Regular table row -->
                <tr class="problem pointer" :id="'gl' + lab.labID" @click="toggleExpansion(lab.labID)">
                  <td v-if="!isExpanded(lab.labID)">
                    <i class="fas fa-chevron-right"></i>
                  </td>
                  <td v-if="isExpanded(lab.labID)">
                    <i class="fas fa-chevron-down"></i>
                  </td>
                  <td>{{ lab.name }}</td>
                  <td>{{ lab.numProblems }}</td>
                  <td>{{ lab.percentComplete }}</td>
                  <td>{{ lab.dueDate }}</td>
                  <td>{{ lab.grade == undefined ? "--" : lab.grade }}</td>
                  <td>{{ lab.total_points }}</td>
                  <td>
                    {{
                      lab.total_points == 0
                        ? 0
                        : lab.grade == undefined
                        ? 0
                        : parseInt((lab.grade / lab.total_points) * 10000) *
                          0.01
                    }}%
                  </td>
                </tr>

                <!-- Dropdown table row -->
                <tr class="lab-tableDrop" v-show="isExpanded(lab.labID)">
                  <td class="description-data" colspan="8">
                    <div
                      style="
                        border: 1px solid #9e9e9e !important;
                        border-right: none !important;
                        padding: 0 !important;
                        margin: 0.5rem 1rem 0.5rem 1rem !important;
                      "
                    >
                      <table
                        class="table"
                        style="margin: 0; width: -webkit-fill-available"
                      >
                        <thead class="labtable">
                          <tr>
                            <th>Title</th>
                            <th># Test Cases</th>
                            <th># Test Cases Passed</th>
                            <th>Due Date</th>
                            <th>Points Earned</th>
                            <th>Points Possible</th>
                            <th>Grade Percentage</th>
                          </tr>
                        </thead>
                        <tbody style="border-bottom: 0 !important">
                          <tr v-for="(problem, key) in grades.labs[index].problems" :key="key" class="lab pointer" :id="'gp' + problem.problemID">
                            <td>{{ problems[problem.problemID].name }}</td>
                            <td>
                              {{ problems[problem.problemID].test_cases }}
                            </td>
                            <td>{{ problems[problem.problemID].passed }}</td>
                            <td>{{ problems[problem.problemID].due_date }}</td>
                            <td>{{ problem.grade }}</td>
                            <td>{{ problems[problem.problemID].worth }}</td>
                            <td>
                              {{
                                problems[problem.problemID].worth == 0
                                  ? 0
                                  : problem.grade == undefined
                                  ? 0
                                  : parseInt(
                                      (problem.grade /
                                        problems[problem.problemID].worth) *
                                        10000
                                    ) * 0.01
                              }}%
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </tab-panel>
    </tab-panels>
  </div>
  <div >
    <div v-for="(lab, key) in labs" :key="lab.id">
      <div :id="lab.id">
        <ul id="menu">
          <li class="menu-item">
            <a
              v-if="isProf"
              class="pointer no-decor"
              @click="editLab(lab.id, lab.name)"
              >Edit</a
            >
          </li>
          <li class="menu-item">
            <a
              v-if="isProf"
              class="pointer no-decor"
              @click="deleting(lab.id, lab, key)"
              >Delete</a
            >
          </li>
        </ul>
      </div>
    </div>
    <div id="out-click" @click="closeMenu"></div>
  </div>
</template>

<script>
import * as API from "../services/API";
import store from "../Store/index";
import { useRoute } from "vue-router";
import { defineComponent, reactive, toRefs, computed } from "vue";
import {sort} from "../services/Sort";

const tabs = ["Labs", "Grades"];

export default defineComponent({
  props: ["courseID", "courseName"],
  name: "Course",
  data() {
    return {
      labs: [],
      unfilteredLabs: [],
      labID: null,
      labName: null,
      authUser: null,
      fscID: null,
      progress: [],
      username: "",
      rightClickID: "",
      student: {},
      grades: {},
      problems: {},
      expandedProblem: null,
      sort: "1",
      showDeleteModal: false,
      reloadDeleteModal: 0,
      deletingLab: {
        id: "",
        lab: {},
        key: "",
      },
    };
  },
  setup() {
    const route = useRoute();

    const currentDirectory = computed(() => route.path);

    const state = reactive({
      selectedTab: tabs[0],
    });

    return {
      currentDirectory,
      tabs,
      ...toRefs(state),
    };
  },
  methods: {
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
    async getStudentObject() {
      console.log(this.authUser);
      const res = await API.apiClient.get(
        `/students/${this.authUser.fsc_user.fsc_id}`
      );
      this.student = res.data;
      console.log(res.data);
    },
    async getGrades() {
      // Initiallize local student gradebook
      var grades = {
        grade: 0,
        labs: [],
      };

      // Create logging lists for payload later in method
      var labIDs = [],
        problemIDs = [];

      // Get total grade for course
      grades.grade = JSON.parse(this.student.gradebook_courses).grades[
        this.courseID
      ];

      // Get all labs the student is in
      var studentLabs = JSON.parse(this.student.gradebook_labs);

      console.log("BEFORE FOR LOOP");
      console.log(this.labs.length);

      // Loop over all of the labs in the current course
      for (let i = 0; i < this.labs.length; i++) {
        // Get all of the problems for current lab
        const problemsInLab = await API.apiClient.get(
          `/gradebook/${this.labs[i].id}`
        );
        problemsInLab = problemsInLab.data.data;

        // Log labID for later usage
        labIDs.push(this.labs[i].id);

        // Initialize problems list
        var problems = [];

        // Loop over all problems within current lab
        for (let j = 0; j < problemsInLab.problems.length; j++) {
          // Fill problems list with objects containing problemID's and grades
          problems.push({
            problemID: problemsInLab.problems[j],
            grade: problemsInLab.grades[problemsInLab.problems[j]],
          });

          // Log problemID for later usage
          problemIDs.push(problemsInLab.problems[j]);
        }

        // Add the current lab to the local student gradebook
        grades.labs.push({
          grade: studentLabs.grades[this.labs[i].id],
          labID: this.labs[i].id,
          name: this.labs[i].name,
          numProblems: this.labs[i].num_problems,
          percentComplete: this.labs[i].percent,
          dueDate: this.labs[i].due_date,
          total_points: this.labs[i].total_points,
          problems: problems,
        });
      }

      // Set data value to local gradebook
      this.grades = grades;

      // Create payload to get total lab/problem values
      var payload = {
        problems: problemIDs,
        labs: labIDs,
      };

      // Make API call and send payload to get said values
      const res = await API.apiClient.post(`/gradebook/worth`, payload);

      // Save total point values into data object
      this.problems = res.data.data.problems;
    },
    showMenu(course_id) {
      if (this.isProf) {
        this.rightClickID = String(course_id);
        const menu = document.getElementById(this.rightClickID).childNodes[0];
        const outClick = document.getElementById("out-click");
        menu.style.top = `${window.event.clientY + document.body.scrollTop}px`;
        menu.style.left = `${window.event.clientX}px`;
        menu.classList.add("show");

        outClick.style.display = "block";
      }
    },
    closeMenu() {
      try {
        document
          .getElementById(this.rightClickID)
          .childNodes[0].classList.remove("show");
      } catch (e) {}
      document.getElementById("out-click").style.display = "none";
      this.rightClickID = "";
    },
    goToProblems(id, name) {
      this.labID = id;
      this.labName = name;
      this.$router.push({ name: "Problems", params: { courseID: courseID, labID: id } });
    },
    async getLabs() {
      const rawLabs = await API.apiClient.get(`/labs/${this.courseID}`);
      // this.labs = rawLabs.data.data;
      this.unfilteredLabs = rawLabs.data.data;
      const prog = await this.getStudent();
      if (!this.isProf) {
        for (let i = 0; i < this.unfilteredLabs.length; i++) {
          this.unfilteredLabs[i]["percent"] = await this.getPercent(
            this.unfilteredLabs[i]
          );
          this.unfilteredLabs[i]["activity"] = await this.getActivity(
            this.unfilteredLabs[i]
          );
        }
      }
      console.log("get labs");
      await this.sortLabs();
      await this.getColors();
    },
    async getColors() {

      for(let i = 0; i < this.unfilteredLabs.length; i++) {
        console.log(this.unfilteredLabs[i].id + " " + this.unfilteredLabs[i]["percent"]);
        if(this.unfilteredLabs[i]["percent"] == "100%") {
          //green background
          console.log("green background");
          var element = document.getElementById(this.unfilteredLabs[i].id);
          element.classList.add("complete");
        }
        else if(this.unfilteredLabs[i]["percent"] != "0%") {
          //red background
          console.log("red background");
          var element = document.getElementById(this.unfilteredLabs[i].id);
          element.classList.add("incomplete");
        }
        else {
          //standard background
          console.log("blank color background");
        }
      }
    },
    async getGradeColors() {
      for(let i = 0; i < this.grades.labs.length; i++) {
        console.log(this.grades.labs[i].labID + " " + this.grades.labs[i].percentComplete);
        if(this.grades.labs[i].percentComplete == "100%") {
          //green background
          console.log("green background");
          let tmp = "gl" + this.grades.labs[i].labID;
          var element = document.getElementById(tmp);
          element.classList.add("complete");
        }
        else if (this.grades.labs[i].percentComplete != "0%") {
          //red background
          console.log("red background");
          let tmp = "gl" + this.grades.labs[i].labID;
          var element = document.getElementById(tmp);
          element.classList.add("incomplete");
        }
        else {
          //standard background
          console.log("blank color background");
        }

        console.log("About to get Problem Colors");
        for(let j = 0; j < this.grades.labs[i].problems.length; j++) {
          console.log("problem: " + j + " in lab: " + i);
          console.log(this.grades.labs[i].problems[j].problemID + " " + this.grades.labs[i].problems[j].grade);
          if(this.grades.labs[i].problems[j].grade == 100) {
            //green background
            console.log("green background");
            var elementp = document.getElementById("gp" + this.grades.labs[i].problems[j].problemID);
            console.log(elementp);
            elementp.classList.add("complete");
          }
          else if (this.grades.labs[i].problems[j].grade != 0) {
            //red background
            console.log("red background");
            var elementp = document.getElementById("gp" + this.grades.labs[i].problems[j].problemID);
            console.log(elementp);
            elementp.classList.add("incomplete");
          }
          else {
            //standard background
            console.log("Standard Background");
          }
        }
      }
    },
    goToCourses() {
      this.$router.push({
          name: "Courses",
        });
    },
    async addLab() {
      var payload = {
        name: "New Lab",
        description: "New Lab",
        course_id: this.courseID,
        due_date: "2021-06-03",
      };
      const lab = await API.apiClient.post(`/labs`, payload);
      this.labs.push(lab.data.data);
      this.unfilteredLabs.push(lab.data.data);
      this.sortLabs();
      console.log(lab.data.data);
      this.labID = lab.data.data.id;
      this.labName = lab.data.data.name;
      console.log(this.labID);
      this.$router.push({ name: "EditLab", params: { courseID: this.courseID, lab_id: this.labID } });
    },
    editLab(id, name) {
      this.labID = id;
      this.labName = name;
      this.$router.push({ name: "EditLab", params: { courseID: this.courseID, labID: this.labID } });
    },
    closeDeleting() {
      this.showDeleteModal = false;
    },
    deleting(id, lab, key) {
      document.getElementById("out-click").style.display = "none";
      this.showDeleteModal = true;
      this.deletingLab.id = id;
      this.deletingLab.lab = lab;
      this.deletingLab.key = key;
    },
    async removeLab() {
      var id = this.deletingLab.id;
      var lab = this.deletingLab.lab;
      var key = this.deletingLab.key;
      //remove from lab the current course
      const res = await API.apiClient.delete(`/labs/${lab.id}`);

      //filter from labs
      this.labs = this.labs.filter((l, i) => i != key);

      //filter from unfiltered labs
      this.unfilteredLabs = this.unfilteredLabs.filter((l) => l.id != lab.id);
      this.closeDeleting();
    },
    async getStudent() {
      this.authUser = store.getters["auth/authUser"];
      this.fscID = this.authUser.fsc_user.fsc_id;
      if (!this.isProf) {
        const res = await API.apiClient.get(`/progress/${this.fscID}`);
        this.progress = res.data.data;
        return this.progress;
      }
      return {};
    },
    async getPercent(lab) {
      var d = JSON.parse(this.progress.labs);
      var c;
      for (let i = 0; i < d.length; i++) {
        if (d[i].lab_id == lab.id) {
          c = d[i];
          break;
        }
      }
      if (lab.numProblems == 0) {
        return "0%";
      } else if (!c) {
        return "0%";
      } else {
        return parseInt((c.num_completed / lab.num_problems) * 100) + "%";
      }
    },
    async getActivity(lab) {
      var d = JSON.parse(this.progress.labs);
      for (let i = 0; i < d.length; i++) {
        if (d[i].lab_id == lab.id) {
          return d[i].last_progress;
        }
      }
    },
    async filterByPublish() {
      console.log("filter by publish");
      //grabs only the courses that are currently in session
      //empty the courses list just in case
      this.labs = [];

      if (!this.isProf) {
        console.log("student");
        //is student don't show unpublished
        for (let i = 0; i < this.unfilteredLabs.length; i++) {
          console.log("\n\n\n\n" + i);
          if (this.published(this.unfilteredLabs[i])) {
            console.log("Lab is published. Checking if it has problems...");
            if (this.unfilteredLabs[i].num_problems > 0) {
              console.log("Lab does have problems");
              //if within date && at least 1 problem
              this.labs.push(this.unfilteredLabs[i]);
            }
          }
        }
      } else {
        console.log("professor");
        //grab all labs including unpublished
        for (let i = 0; i < this.unfilteredLabs.length; i++) {
          this.labs.push(this.unfilteredLabs[i]);
        }
      }

      return "Hi";
    },
    published(lab) {
      //return true if the lab is published
      //false otherwise
      var now = new Date(Date.now());
      if (lab.publish_date == "" || lab.publish_date == null) {
        return false;
      }
      var pd = lab.publish_date.split("-")[2];
      var pm = lab.publish_date.split("-")[1] - 1;
      var py = lab.publish_date.split("-")[0];

      var published = new Date(py, pm, pd, 0, 0, 0, 0);

      if (published < now) {
        return true;
      }
      return false;
    },
    async sortLabs() {
      //get sort method and call it
      if (this.sort == 0) {
        //dueDate
		this.unfilteredLabs = sort(4, this.unfilteredLabs);
      } else if (this.sort == 1) {
        //name
        //default
		this.unfilteredLabs = sort(3, this.unfilteredLabs);
      } else {
        //course ID
		this.unfilteredLabs = sort(5, this.unfilteredLabs);
      }
      console.log(this.unfilteredLabs);
      //call the filter after sorting
      await this.filterByPublish();
      return "";
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
  async mounted() {
    console.log("Mounted");
  },
  async beforeMount() {
    console.log("Before Mount");
    await this.getLabs();
    this.authUser = await store.getters["auth/authUser"];
    this.username = this.authUser.username;
    if (!this.isProf) {
      await this.getStudentObject();
      await this.getGrades();
    }
    await this.getGradeColors();
    console.log("HELLO");
  },
});
</script>
