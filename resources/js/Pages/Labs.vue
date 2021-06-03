<template>
  <div v-if="!childisOpen">
    <!-- Main Page-->
    <div class="courses header">
      <h2>Labs</h2>
      <hr />
    </div>
    <a class="pointer no-decor" @click="addLab">ADD</a>
    <table class="table labtable">
      <thead class="labtable">
        <tr>
          <th>Title</th>
          <th># Problems</th>
          <th>% Complete</th>
          <th>Due Date</th>
          <th>Last Activity</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(lab, key) in labs" :key="lab.id">
          <tr class="lab pointer" @click="goToProblems(lab.id)">
            <td>
              <a>{{ lab.name }}</a>
            </td>
            <td>{{ lab.num_problems }}</td>
            <!-- <td>{{ lab.percentComplete }}</td> -->
            <td>69%</td>
            <td>{{ lab.due_date.split(" ")[0] }}</td>
            <!-- <td>{{ lab.lastActivity }}</td> -->
            <td>4/20/0420</td>
          </tr>
          <a class="pointer no-decor" @click="editLab(lab.id)">•••</a>
          <a class="pointer no-decor" @click="removeLab(lab.id, key)">X</a>
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
  <router-view @unmounting="Unmounting()" v-if="childisOpen" :labID="labID"></router-view>
</template>

<script>
import * as API from "../services/API";
export default {
  props: ["courseID"],
  emits: ["lab-unmounting"],
  data() {
    return {
      labs: [],
      childisOpen: false,
      labID: null,
    };
  },
  methods: {
    goToProblems(id) {
      this.childisOpen = true;
      this.labID = id;
      this.$router.push({ name: "Problems", params: { lab_id: id } });
    },
    async getLabs() {
      const rawLabs = await API.apiClient.get(`/labs/${this.courseID}`);
      this.labs = rawLabs.data.data;
    },
    Unmounting() {
      this.childisOpen = false;
      this.labID = null;
    },
    async addLab() {
      console.log("add lab");
      var payload = {
        "name": "New Lab",
        "description": "New Lab",
        "course_id": this.courseID,
        "due_date": "2021-06-3 23:59:59",
      }
      const lab = await API.apiClient.post(`/labs/`, payload);
      this.labs.push(lab.data);
      this.labID  = lab.data.id;
      this.childisOpen = true;
      this.$router.push({ name: "EditLab", params: { lab_id: this.labID } });
    },
    editLab(id) {
      this.childisOpen = true;
      this.labID = id;
      this.$router.push({ name: "EditLab", params: { lab_id: this.labID } });
    },
    async removeLab(lab, key) {
      //remove from lab the current course..right now we only save one course....it will need to change to be multiple courses later
      var payload = {
        "course_id": null,
      }

      //update the  courses labs list
      const res = await API.apiClient.put(`/labs/${lab}`, payload);

      //filter from labs
      this.labs = this.labs.filter((l, i) => i  != key);
    },
  },
  mounted() {
    this.childisOpen = false;
    this.getLabs();
  },
  beforeUnmount() {
    this.$emit("lab-unmounting");
  },
};
</script>
