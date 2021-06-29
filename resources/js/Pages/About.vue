<!--<template>
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
      oldContents: "",
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

<style></style> -->

<template>
  <div>
    <button @click="showModal = true">Simple</button>

    <vue-final-modal
      v-model="showModal"
      classes="modal-container"
      content-class="modal-content"
    >
      <span># Simple modal</span>
      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
      <button class="modal-close" @click="showModal = false">x</button>
    </vue-final-modal>
  </div>
</template>

<script>
export default {
  data: () => ({
    showModal: false,
  }),
};
</script>

<style>

</style>
