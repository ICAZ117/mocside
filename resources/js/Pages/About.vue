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
  <VueFaqAccordion :items="myItems" />
</template>

<script>
import VueFaqAccordion from "vue-faq-accordion";

export default {
  components: {
    VueFaqAccordion,
  },
  data() {
    return {
      myItems: [
        {
          title: "How many time zones are there in all?",
          value: "Given a 24-hour day and 360 degrees of longitude around the Earth",
          category: "Tab-1",
        },
        {
          title: "How long is a day and year on Venus?",
          value: "Venus takes 224.7 Earth days to complete one orbit around the Sun.",
          category: "Tab-2",
        },
        {
          title: "What animal smells like popcorn?",
          value: "Binturongs smell like popcorn.",
          category: "Tab-2",
        },
      ],
    };
  },
};
</script>

<style>
* {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
}
</style>
