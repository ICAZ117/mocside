<template>
  <h1>You have been invited to join {{ course.name }}</h1>
  <button @click="joinCourse()" type="submit">Join</button>
  <button @click="cancelCourse()" type="submit">Cancel</button>
  <p>yah</p>
</template>

<script>
import * as API from "../services/API";
export default {
  data() {
    return {
      key: "",
      course: {},
      courseID: "",
    };
  },
  methods: {
    async joinCourse() {
      //join class
      const res = await API.apiClient.post(`/invite/enroll/${this.key}`);

      //move to course page
      this.$router.push({ name: "Labs", params: { course_id: this.courseID } });
    },
    cancelCourse() {
      //move to home since not joining page
      this.$router.push({ name: "Courses" });
    },
    async getCourse() {
      //if valid key
      if (this.key == "") {
        console.log("404");
      }
      const res = await API.apiClient.get(`/invite/${this.key}`);
      this.courseID = res.data.data.course_id;

      //grab course using key
      const resp = await API.apiClient.get(`/courses/${this.courseID}`);
      this.course = resp.data.data;
    },
    getKey() {
        // /key/enroll
      var r = window.location.pathname;
      r = r.split("/");
      this.key = r[1];
    },
  },
  async mounted() {
    this.getKey();
    await this.getCourse();
    console.log(this.course);
  },
};
</script>

<style>
</style>