<template>
  <div class="create-assignment">
    <table class="table gradebook">
      <thead class="gradebook">
        <tr>
          <th>Name</th>
          <th>FSC ID</th>
          <th>Percent</th>
          <th>Grade</th>
          <th>Letter Grade</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="student in students"
          :key="student.id"
          class="student"
          style="cursor: pointer"
        >
          <td>{{ student.name }}</td>
          <td>{{ student.ID }}</td>
          <td>{{ student.percent }}%</td>
          <td>{{ student.grade }} / {{ worth }}</td>
          <td>{{ student.letterGrade }}</td>
          <td>
            <a :href="'mailto:' + student.email">{{ student.email }}</a>
          </td>
        </tr>
        <tr v-if="students.length == 0">
          <td colspan="6">
            <h2>No student submissions currently</h2>
          </td>
         
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import * as API from "../../services/API";
import store from "../../Store/index";
export default {
  props: ["problemID"],
  data() {
    return {
      gradebook: {},
      students: [],
      worth: 0,
    }
  },
  methods: {
    //GETTERS
    async fetchGradebook() {
      const res = await API.apiClient.get(`/problems/full/${this.problemID}`);
      this.gradebook = JSON.parse(res.data.data.gradebook);
      this.worth = res.data.data.worth;

      if(this.gradebook != null) {
        this.fetchStudents(res.data.data);
      }
    },
    async fetchStudents(assignment) {
      var studentIDs = this.gradebook.students;
      
      studentIDs.forEach(async (studentID) => {
        const res = await API.apiClient.get(`/students/${studentID}`);
        let student = res.data.data;
        let points = this.gradebook.grades[studentID];
        let calcGrades = this.calcGrade(assignment, points);

        this.students.push({
          name: student.name,
          ID: studentID,
          grade: calcGrades[1],
          percent: calcGrades[2],
          letterGrade: calcGrades[0],
          email: student.email,
        });
      });

    },

    //helper functions
    calcGrade(assignment, points) {
      // calculate numbers
      var worth = assignment.worth;
      var percent = Math.floor((points*100) / worth * 100) / 100;

      //calculate letter grade
      let letterGrade = percent > 90 ? 'A' : percent > 80 ? 'B' : percent > 70 ? 'C' : percent > 60 ? 'D' : 'F';

      return [letterGrade, points, percent];
    },
  },
  computed: {
    authUser: function() {
      return store.getters["auth/authUser"];
    },
    isProf: function() {
      if(store.getters["auth/isProf"] == null) {
        return false;
      } else {
        return store.getters["auth/isProf"];
      }
    }
  },
  mounted() {
    if(this.isProf == true) {
      this.fetchGradebook();
    }
  },
}
</script>

<style>

</style>