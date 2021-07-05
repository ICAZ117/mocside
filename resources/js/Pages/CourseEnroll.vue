<template>
  <h1>You have been invited to join {{ course.name }}</h1>
  <button @click="joinCourse()">Join</button>
  <button @click="cancelCourse()" >Cancel</button>
  <p>yah</p>
</template>

<script>
import * as API from "../services/API";
export default {
    data() {
        return {
            course: {},
        }
    },
    joinCourse() {
        console.log("join");
    },
    cancelCourse() {
        console.log("cancel");
    },
    async mounted() {
        // const res = await API.apiClient.get(`this is the backend route for each course invitation/${courseKey}`);
    }
}
</script>

<style>

</style>