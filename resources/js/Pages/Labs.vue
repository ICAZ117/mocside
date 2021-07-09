<template>
  <div v-if="!childisOpen">
    <!-- Main Page-->
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
      <span class="pointer underline" @click="this.$emit('unmounting')"
        >↩ Return to Courses</span
      >
    </small>

    <tab-panels v-model="selectedTab" :animate="true">
      <tab-panel :val="'Labs'">
        <table class="table labtable">
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
              <tr
                v-if="!isProf"
                class="lab pointer"
                @click="goToProblems(lab.id, lab.name)"
              >
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

              <tr
                v-if="isProf"
                class="lab pointer"
                @click.prevent="goToProblems(lab.id, lab.name)"
                @contextmenu.prevent="showMenu(lab.id)"
              >
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
      </tab-panel>
      <tab-panel :val="'Grades'">
        <table class="table problemtable">
          <thead class="problemtable">
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
            <template v-for="lab in grades.labs" :key="lab.id">
              <!-- Regular table row -->
              <tr class="problem pointer" @click="toggleExpansion(lab.id)">
                <td v-show="!isExpanded(lab.id)">
                  <i class="fas fa-chevron-right"></i>
                </td>
                <td v-show="isExpanded(lab.id)">
                  <i class="fas fa-chevron-down"></i>
                </td>
                <td>{{ lab.name }}</td>
                <td>{{ lab.numProblems }}</td>
                <td>{{ lab.percentComplete }}</td>
                <td>{{ lab.dueDate }}</td>
                <td>{{ lab.grade }}</td>
                <td>{{ lab.totalPoints }}</td>
                <td>{{ parseInt((lab.grade / lab.totalPoints) * 10000) * 0.01 }}%</td>
              </tr>

              <!-- Dropdown table row -->
              <tr v-show="isExpanded(lab.id)" class="description-data"></tr>
            </template>
          </tbody>
        </table>
      </tab-panel>
    </tab-panels>
  </div>
  <router-view
    @unmounting="Unmounting()"
    @labEdited="labEdited()"
    v-if="childisOpen"
    :labID="labID"
    :labName="labName"
  ></router-view>
  <div v-for="(lab, key) in labs" :key="lab.id">
    <div :id="lab.id">
      <ul id="menu">
        <li class="menu-item">
          <a v-if="isProf" class="pointer no-decor" @click="editLab(lab.id, lab.name)"
            >Edit</a
          >
        </li>
        <li class="menu-item">
          <a v-if="isProf" class="pointer no-decor" @click="removeLab(lab.id, key)"
            >Delete</a
          >
        </li>
      </ul>
    </div>
  </div>
  <div id="out-click" @click="closeMenu"></div>
</template>

<script>
import * as API from "../services/API";
import store from "../Store/index";
import { useRoute } from "vue-router";
import { defineComponent, reactive, toRefs, computed } from "vue";

const tabs = ["Labs", "Grades"];

export default defineComponent({
  props: ["courseID", "courseName"],
  emits: ["unmounting", "courseEdited"],
  name: "Course",
  data() {
    return {
      labs: [],
      childisOpen: false,
      labID: null,
      labName: null,
      authUser: null,
      fscID: null,
      progress: [],
      username: "",
      rightClickID: "",
      student: {},
      grades: {},
      pointValues: {},
      expandedProblem: null,
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
      const res = await API.apiClient.get(`/students/${this.authUser.fsc_user.fsc_ID}`);
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
      grades.grade = JSON.parse(this.student.gradebook_courses).grades[this.courseID];

      // Get all labs the student is in
      var studentLabs = JSON.parse(this.student.gradebook_labs);

      // Loop over all of the labs in the current course
      for (let i = 0; i < this.labs.length; i++) {
        // Get all of the problems for current lab
        const problemsInLab = await API.apiClient.get(`/gradebook/${this.labs[i].id}`);
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
      const res = await API.apiClient.get(`/gradebook/worth/`, payload);

      // Save total point values into data object
      this.pointValues = res.data.data;
    },
    showMenu(course_id) {
      if (this.isProf) {
        this.rightClickID = String(course_id);
        const menu = document.getElementById(this.rightClickID).childNodes[0];
        const outClick = document.getElementById("out-click");

        menu.style.top = `${window.event.clientY}px`;
        menu.style.left = `${window.event.clientX}px`;
        menu.classList.add("show");

        outClick.style.display = "block";
      }
    },
    closeMenu() {
      try {
        document.getElementById(this.rightClickID).childNodes[0].classList.remove("show");
      } catch (e) {}
      document.getElementById("out-click").style.display = "none";
      this.rightClickID = "";
    },
    goToProblems(id, name) {
      this.childisOpen = true;
      this.labID = id;
      this.labName = name;
      this.$router.push({ name: "Problems", params: { lab_id: id } });
    },
    async getLabs() {
      const rawLabs = await API.apiClient.get(`/labs/${this.courseID}`);
      this.labs = rawLabs.data.data;
      const prog = await this.getStudent();
      if (!this.isProf) {
        for (let i = 0; i < this.labs.length; i++) {
          this.labs[i]["percent"] = await this.getPercent(this.labs[i]);
          this.labs[i]["activity"] = await this.getActivity(this.labs[i]);
        }
      }
    },
    async sortLabs() {
      const sortedLabs = this.labs.sort(function (a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(a.due_date) - new Date(b.due_date);
      });
      // redundant, .sort() is in place, but also returns.
      return sortedLabs;
    },
    Unmounting() {
      this.childisOpen = false;
      this.labID = null;
      this.labName = null;
      this.$router.push({ name: "Labs", params: { course_id: this.courseID } });
    },
    async labEdited() {
      ///update the list of courses
      this.labs = this.labs.filter((l) => l.id != this.labID);
      const lab = await API.apiClient.get(`/labs/full/${this.labID}`);
      this.labs.push(lab.data.data);
      this.Unmounting();
    },
    async addLab() {
      var payload = {
        name: "New Lab",
        description: "New Lab",
        course_id: this.courseID,
        due_date: "2021-06-03",
      };
      const lab = await API.apiClient.post(`/labs/`, payload);
      this.labs.push(lab.data.data);
      console.log(lab.data.data);
      this.labID = lab.data.data.id;
      this.labName = lab.data.data.name;
      console.log(this.labID);
      this.childisOpen = true;
      this.$router.push({ name: "EditLab", params: { lab_id: this.labID } });
    },
    editLab(id, name) {
      this.childisOpen = true;
      this.labID = id;
      this.labName = name;
      this.$router.push({ name: "EditLab", params: { lab_id: this.labID } });
    },
    async removeLab(lab, key) {
      var flag = confirm(
        "Are you Sure you want to remove " + labName + " from this Course?"
      );
      if (flag) {
        //remove from lab the current course
        const res = await API.apiClient.delete(`/labs/${lab}`);

        //filter from labs
        this.labs = this.labs.filter((l, i) => i != key);
      }
    },
    async getStudent() {
      this.authUser = store.getters["auth/authUser"];
      this.fscID = this.authUser.fsc_user.fsc_id;
      const res = await API.apiClient.get(`/progress/${this.fscID}`);
      this.progress = res.data.data;
      return this.progress;
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
    routeToChild() {
      var r = window.location.pathname;
      var sub = "/courses/" + this.courseID + "/labs";
      var c = r.substring(sub.length);
      if (c == "") {
        console.log("just on the labs page");
      } else {
        console.log("on this page: " + c);
        var c = c.split("/");
        var lID = c[1];
        var path = c[2]; //labs, or edit, and maybe something else
        var name = "";
        for (let i = 0; i < this.labs.length; i++) {
          if (this.labs[i].id == lID) {
            name = this.labs[i].name;
            break;
          }
        }

        if (path == "problems") {
          this.goToProblems(lID, name);
        } else if (path == "edit") {
          this.editLab(lID, name);
        } else {
          console.log(path);
        }
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
  async mounted() {
    this.authUser = await store.getters["auth/authUser"];
    this.username = this.authUser.username;
    this.routeToChild();
    await this.getStudentObject();
    await this.getGrades();
  },
  async beforeMount() {
    this.childisOpen = false;
    await this.getLabs();
    const sorted = await this.sortLabs();
    console.log(sorted);
  },
  beforeUnmount() {
    this.$emit("unmounting");
  },
});
</script>
