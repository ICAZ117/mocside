<template>
  <h1>You have been invited to join {{ course.name }}</h1>
  <button @click="join()">Join</button>
  <button @click="cancel()" >Cancel</button>
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
    join() {
        console.log("join");
    },
    cancel() {
        console.log("cancel");
    },
    async mounted() {
        const res = await API.apiClient.get(`this is the backend route for each course invitation/${courseKey}`);
    }
}
</script>

<style>

</style>