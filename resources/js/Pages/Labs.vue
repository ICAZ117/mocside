<template>
  <div>
    <!-- Main Page-->
    <div class="courses header">
      <h2>Labs</h2>
      <hr />
    </div>

    <div class="labdiv">
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
          <div v-for="lab in labs" :key="lab.id">
            <tr
              class="lab"
              :onclick="(location.href = `${lab.location}`)"
              style="cursor: pointer"
            >
              <td>
                <a>{{ lab.title }}</a>
              </td>
              <td>{{ lab.numProblems }}</td>
              <td>{{ lab.percentComplete }}</td>
              <td>{{ lab.dueDate }}</td>
              <td>{{ lab.lastActivity }}</td>
            </tr>
          </div>

          <tr
            class="lab"
            onclick="location.href='problems.php';"
            style="cursor: pointer"
          >
            <td><a>Lab 2: Printing & I/O</a></td>
            <td>5</td>
            <td>100%</td>
            <td>1/31/2021</td>
            <td>1/31/2021</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import * as API from "../services/API";
export default {
  data() {
    return {
      labs: [],
      courseID: null,
    };
  },
  methods: {
    async getLabs() {
      const labs = await API.apiClient.get(`/labs/${this.courseID}`);
      console.log(labs);
      // var i;
      // for (i = 0; i < this.enrolledCourses.length; i++) {
      //   var cur = this.enrolledCourses[i];
      //   const course = await API.apiClient.get(`/courses/${cur}`);
      //   this.courses.push(course.data);
      // }
    },
  },
  mounted() {
    // update course ID from URL - I will begin with hardcode
    this.courseID = 2280;
    this.getLabs();
  },
  beforeUnmount() {
    this.$emit("Unmounting");
  },
};
</script>
