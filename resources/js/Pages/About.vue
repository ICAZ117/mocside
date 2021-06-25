<template>
  <textarea
    class="console"
    contenteditable="true"
    v-model="contents"
    @keyup.enter="enter"
  ></textarea>
</template>

<script>
import * as API from "../services/API";

export default {
  data() {
    return {
      containerID: 0,
      oldContents: "",
      contents: "",
      new: [],
      isWaiting: false,
      newInput: "",
    };
  },
  methods: {
    async enter() {
      if (this.isWaiting) {
        var payload = {
          input: this.newInput,
        };

        const res = await API.apiClient.post(`/containers/test/${this.containerID}`, payload);
        console.log(res.data.message);
      }
    },
  },
  computed: {
    getNewInput: function () {
      this.newInput = this.contents.substring(this.oldContents.length);
    },
  },
  async mounted() {
    var payload = {
      lang: "python",
    };
    const res = await API.apiClient.post(`/containers/spin-test/23`, payload);

    // Get the docker container ID
    this.containerID = res.data.message;

    // Get the new input/output
    this.new = res.data.dump;

    // Check if the program is still running/waiting on input
    this.isWaiting = this.new[this.new.length - 1] === "";

    for (let i = 0; i < this.new.length; i++) {
      this.contents += this.new[i] + "\n";
    }

    this.oldContents = this.contents;
  },
};
</script>

<style></style>
