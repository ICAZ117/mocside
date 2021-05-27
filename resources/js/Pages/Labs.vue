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
          <tr
            class="lab"
            style="cursor: pointer"
            v-for="lab in labs"
            :key="lab.id"
          >
          <!-- :onclick="(location.href = `${lab.location}`)" -->
            <td>
              <a>{{ lab.name }}</a>
            </td>
            <!-- <td>{{ lab.numProblems }}</td> -->
            <td>6</td>
            <!-- <td>{{ lab.percentComplete }}</td> -->
            <td>69%</td>
            <!-- <td>{{ lab.due_date }}</td> -->
            <td>4/20/0420</td>
            <!-- <td>{{ lab.lastActivity }}</td> -->
            <td>4/20/0420</td>
          </tr>

          <tr
            class="lab"
            style="cursor: pointer"
          >
          <!-- onclick="location.href='problems.php';" -->
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
  props: ['courseID'],
  data() {
    return {
      labs: [],
    };
  },
  methods: {
    async getLabs() {
      const rawLabs = await API.apiClient.get(`/labs/${this.courseID}`);
      this.labs = rawLabs.data;
      console.log(this.labs);
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
    // this.courseID = 2280;
    this.getLabs();
  },
  beforeUnmount() {
    this.$emit("Unmounting");
  },
};
</script>
