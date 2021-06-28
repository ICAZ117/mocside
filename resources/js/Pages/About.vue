<template>
  <textarea contenteditable="true"
    v-model="contents"
    @keyup.enter="enter"
    spellcheck="false"></textarea>
</template>

<script>
import * as API from "../services/API";

export default {
  data() {
    return {
      containerID: 0,
      contents: "",
      // oldContents: "",
    }
  },
  async mounted() {
    var payload = {
      lang: 'python',
    }
    const res = await API.apiClient.post(`/containers/test/23`, payload);
    this.containerID = res.data.message;
    const attach = await API.apiClient.get(`/containers/test/${this.containerID}`)
  },
  methods: {
    async enter() {
      this.newInput = this.contents.substring(this.oldContents.length);
      var payload = {
        input: this.newInput,
      };

      const res = await API.apiClient.post(
        `/containers/test-in/${this.containerID}`,
        payload
      );
    }
  }
};
</script>

<style></style>
