<template>
  <div class="create-assignment">
    <table class="table gradebook">
      <thead class="gradebook">
        <tr>
          <th>Name</th>
          <th>ID</th>
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
          <td>{{ student.grade }}%</td>
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
import * as API from "../services/API";
export default {
  data() {
    return {
      authUser: {},
      gradebook: {},
      students: [],
      // students: [{
      //   name: "Darth Vader",
      //   ID: "6666666",
      //   grade: "83%",
      //   letterGrade: "B",
      //   email: "UnicornKitty22@gmail.com"
      // },
      // {
      //   name: "Bruh",
      //   ID: "0000000",
      //   grade: "100%",
      //   letterGrade: "A",
      //   email: "bruh@gmail.com"
      // }]
    }
  },
  methods: {
    async getStudents(){
      if(authUser.isProf() == true) {
        const res = await API.apiClient.get(`/problems/full/${assignmentID}`);
        this.gradebook = res.data.data.gradebook;


        // this logic is populating front-end gradebook
        var student_ids = this.gradebook.students; // list of ids in gradebook 
        var curr;
        for (let i = 0; i < student_ids.length; i++) {
          curr = student_ids[i];
          const res2 = await API.apiClient.get(`/students/${curr}`) // this will return USER objects that contain student
          var student = res2.data.data;
          var points = this.gradebook.grades[curr];
          var calcGrades = this.calcGrade(res.data.data, points)
          this.students.push({
            name: student.name,
            ID: student.id,
            grade: calcGrades[1],
            letterGrade: calcGrades[0],
            email: student.email,
          });
        }
      }
    },
    calcGrade(assignment, points) {
      // calc numbers
      var worth = assignment.worth;
      var grade = int((points*100) / (worth*100)) / 100;

      // calc letters
      var letterGrade;
      if (grade > 90) {
        letterGrade = 'A';
      } else if (grade > 80) {
        letterGrade = 'B';
      } else if (grade > 70) {
        letterGrade = 'C';
      } else if (grade > 60) {
        letterGrade = 'D';
      } else {
        letterGrade = "F";
      }

      return [letterGrade, grade];
    }
  },
  mounted() {
    this.authUser = store.getters["auth/authUser"];
    this.getStudents();
  }
};
</script>

<style></style>
