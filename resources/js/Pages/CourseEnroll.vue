<template>
  <h1>You have been invited to join {{ course.name }}</h1>
  <button @click="joinCourse()" type="submit" >Join</button>
  <button @click="cancelCourse()" type="submit" >Cancel</button>
  <p>yah</p>
</template>

<script>
import * as API from "../services/API";
export default {
    data() {
        return {
            course: {},
            courseID: 2280,
        }
    },
    methods: {
        joinCourse() {
            console.log("join");
            //join class

            //move to course page
            this.$router.push({ name: "Labs", params: { course_id: this.courseID } }); //routing issue
        },
        cancelCourse() {
            console.log("cancel");
            //move to home since not joining page
            this.$router.push({ name: "Courses" });
        },
    },
    async mounted() {
        // const res = await API.apiClient.get(`this is the backend route for each course invitation/${courseKey}`);
    }
}
</script>

<style>

</style>