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
  <button @click="isOpen = true">Open without activator slot</button>

  <Modal
    v-model="isOpen"
    :fullscreen="isFullscreen"
    :modal-transition="modalTransition"
    :click-out="isClickOut"
    :disable-motion="isMotionDisabled"
    :max-width="!isFullscreen ? maxWidth : undefined"
    :remove-backdrop="isBackdropRemoved"
  >
    <!-- Optional  -->
    <template #activator="props">
      <button v-bind="props">Open</button>
    </template>

    <div class="card">
      <h1>Hey nice to see ya ;)</h1>

      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nesciunt non dicta
        architecto suscipit exercitationem amet iste quae cumque accusantium? Praesentium
        qui dolor harum quod delectus dolorum, illo ipsum in magnam.
      </p>

      <button @click="isOpen = false">Close</button>
    </div>
  </Modal>

  <div style="margin-top: 24px">
    <div style="margin-bottom: 12px">
      <div>Max Width</div>
      <input v-model="maxWidth" />
    </div>

    <div style="margin-bottom: 12px">
      <label for="clickout">Click Out</label>
      <input id="clickout" type="checkbox" v-model="isClickOut" />
    </div>

    <div style="margin-bottom: 12px">
      <label for="fullscreen">Fullscreen</label>
      <input id="fullscreen" type="checkbox" v-model="isFullscreen" />
    </div>

    <div style="margin-bottom: 12px">
      <label for="disableMotion">Disable Motion</label>
      <input id="disableMotion" type="checkbox" v-model="isMotionDisabled" />
    </div>

    <div style="margin-bottom: 12px">
      <label for="removeBackdrop">Remove Backdrop</label>
      <input id="removeBackdrop" type="checkbox" v-model="isBackdropRemoved" />
    </div>

    <div style="margin-bottom: 12px">
      <div>Modal Transition</div>
      <select v-model="modalTransition">
        <option value="scale">Scale</option>
        <option value="slide-down">Slide Down</option>
        <option value="slide-up">Slide Up</option>
        <option value="move-up">Move Up</option>
        <option value="move-down">Move Down</option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    isOpen: false,
    isFullscreen: false,
    modalTransition: "scale",
    isClickOut: true,
    isMotionDisabled: false,
    isBackdropRemoved: false,
    maxWidth: "500px",
  }),
};
</script>
