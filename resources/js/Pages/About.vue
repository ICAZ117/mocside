<template>
  <div class="console">
    <textarea contenteditable="true" v-model="contents"></textarea>
  </div>
</template>

<script>
import * as API from "../services/API";

export default {
  data() {
    return {
      containerID: 0,
      contents: "",
      new: [],
      isWaiting: false,
    }
  },
  mounted() {
    var payload = {
      lang: "python",
    };
    const res = API.apiClient.post(`/containers/spin-test/23`, payload);

    // Get the docker container ID
    this.containerID = res.data.message;

    // Get the new input/output
    this.new = res.data.dump;

    // Check if the program is still running/waiting on input
    this.isWaiting = this.new[this.new.length - 1] === "";

    for (let i = 0; i < this.new.length; i++) {
      this.contents += this.new[i] + "\n";
    }
  },
}
</script>

<style>

</style>