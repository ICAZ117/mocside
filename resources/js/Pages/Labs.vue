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
              <th>Lab</th>
              <th># Problems</th>
              <th>% Complete</th>
              <th>Due Date</th>
              <th>Last Activity</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(problem, key) in problems" :key="problem.id">
              <tr class="problem pointer" @click="toggleExpansion(problem.id)">
                <td v-show="!isExpanded(problem.id)">
                  <i class="fas fa-chevron-right"></i>
                </td>
                <td v-show="isExpanded(problem.id)">
                  <i class="fas fa-chevron-down"></i>
                </td>
                <td>{{ problem.name }}</td>
                <td>{{ problem.test_cases }}</td>
                <td v-if="!isProf">{{ problem.percent }}</td>
                <td>
                  {{ problem.due_date.split(" ")[0] }}
                  {{ problem.due_date.split(" ")[1] }}
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
                          @click="deleteProblem(problem, key)"
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
