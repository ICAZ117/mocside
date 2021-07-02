<template>
  <div v-if="!childisOpen">
    <!-- Main Page-->
    <button @click="this.$emit('unmounting')" class="btn btn-danger btn-block">
      Return to Courses
    </button>
    <div class="courses header">
      <small
        ><span class="navigation">{{ username }}{{ currentDirectory }}</span></small
      >
      <div class="heading">
        <h2>Labs</h2>
        <hr />
      </div>
    </div>
    <a v-if="isProf" class="pointer no-decor" @click="addLab">ADD</a>
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
        <template v-for="(lab, key) in labs" :key="lab.id">
          <tr class="lab pointer" @click="goToProblems(lab.id, lab.name)">
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
          <a v-if="isProf" class="pointer no-decor" @click="editLab(lab.id, lab.name)"
            >•••</a
          >
          <a v-if="isProf" class="pointer no-decor" @click="removeLab(lab.id, key)">X</a>
        </template>

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
  <router-view
    @unmounting="Unmounting()"
    @labEdited="labEdited()"
    v-if="childisOpen"
    :labID="labID"
    :labName="labName"
  ></router-view>
</template>

<script>
import * as API from "../services/API";
import store from "../Store/index";
import { useRoute } from "vue-router";
import { computed } from "vue";

export default {
  props: ["courseID"],
  emits: ["unmounting", "courseEdited"],
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
      this.progress = res.data;
      return this.progress;
    },
    async getPercent(lab) {
      var d = JSON.parse(this.progress.labs);
      var c;
      for (let i = 0; i <= d.length; i++) {
        if (d[i].lab_id == lab.id) {
          c = d[i];
          break;
        }
      }
      if (lab.numProblems == 0) {
        return "0%";
      } else {
        return parseInt(c.num_completed / lab.num_problems) * 100 + "%";
      }
    },
    async getActivity(lab) {
      var d = JSON.parse(this.progress.labs);
      for (let i = 0; i <= d.length; i++) {
        if (d[i].lab_id == lab.id) {
          return d[i].last_progress;
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
};
</script>
