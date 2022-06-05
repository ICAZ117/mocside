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
      </tbody>
    </table>
  </div>
</template>

<script>
import * as API from "../../services/API";
import store from "../../Store/index";
export default {
  props: ['problemID'],
  data() {
    return {
      authUser: {},
      gradebook: {},
      students: [],
      worth: 0,
    }
  },
  methods: {
    async getStudents(){
      if(this.isProf == true) {
        const res = await API.apiClient.get(`/problems/full/${this.problemID}`);
        this.gradebook = JSON.parse(res.data.data.gradebook);
        this.worth = res.data.data.worth;

        // this logic is populating front-end gradebook
        var student_ids = this.gradebook.students; // list of ids in gradebook 
        var curr;
        for (let i = 0; i < student_ids.length; i++) {
          curr = student_ids[i];
          const res2 = await API.apiClient.get(`/students/${curr}`) // this will return USER objects that contain student
          var student = res2.data.data;
          console.log(student.fsc_id);
          var points = this.gradebook.grades[curr];
          var calcGrades = this.calcGrade(res.data.data, points)
          this.students.push({
            name: student.name,
            ID: curr,
            grade: calcGrades[1],
            percent: calcGrades[2],
            letterGrade: calcGrades[0],
            email: student.email,
          });
        }
      }
    },
    calcGrade(assignment, points) {
      // calc numbers
      var worth = assignment.worth;
      var percent;
      percent = points*100;
      percent = percent / worth * 100;
      percent = Math.floor(percent);
      percent = percent / 100;


      // calc letters
      var letterGrade;
      if (percent > 90) {
        letterGrade = 'A';
      } else if (percent > 80) {
        letterGrade = 'B';
      } else if (percent > 70) {
        letterGrade = 'C';
      } else if (percent > 60) {
        letterGrade = 'D';
      } else {
        letterGrade = "F";
      }

      return [letterGrade, points, percent];
    }
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
  mounted() {
    this.authUser = store.getters["auth/authUser"];
    this.getStudents();
  }
};
</script>

<style></style>
