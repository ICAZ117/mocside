<template>
  <textarea
    class="console"
    contenteditable="true"
    v-model="contents"
    @keyup.enter="enter"
    spellcheck="false"
    v-if="isWaiting"
  ></textarea>
  <textarea
    class="console"
    contenteditable="true"
    v-model="contents"
    @keyup.enter="enter"
    spellcheck="false"
    v-else
    readonly
  ></textarea>
</template>

<script>
import * as API from "../services/API";

export default {
  props: ["launchConsole", "problemID", "lang"],

  data() {
    return {
      containerID: 0,
      oldContents: "",
      contents: "student@server:/usr/src$ ",
      new: [],
      isWaiting: false,
      hasNewLine: false,
      newInput: "",
    };
  },
  watch: {
    launchConsole: function () {
      if (this.launchConsole && this.problemID != "" && this.problemID != null) {
        this.startDocker();
      }
    },
  },
  methods: {
    async startDocker() {
      var payload = {
        lang: this.lang,
      };
      const res = await API.apiClient.post(
        `/containers/spin-up/${this.problemID}`,
        payload
      );

      // Get the docker container ID
      this.containerID = res.data.message;

      // Get the new input/output
      this.new = res.data.dump;

      // Check if the program is still running/waiting on input
      this.isWaiting = !(this.new[this.new.length - 1] === "\u0003è");
      this.hasNewLine = this.new[this.new.length - 1] === "" || !this.isWaiting;

      if (this.lang == "python") {
        this.contents += "python3 submission.py\n";
      } else if (this.lang == "java") {
        this.contents +=
          "javac Main.java\nstudent@server:/usr/src$ java Main\n";
      } else {
        this.contents += "\nstudent@server:/usr/src$ ";
      }

      // (this.hasNewLine ? this.new.length - 1 : this.new.length)
      for (let i = 0; i < this.new.length - 1; i++) {
        this.contents += this.new[i] + "\n";
      }

      if (!this.hasNewLine) {
        this.contents += this.new[this.new.length - 1];
      }

      if (!this.isWaiting) {
        this.contents += "student@server:/usr/src$ ";
        this.$emit("programFinished");
      }

      this.oldContents = this.contents;
    },

    async enter() {
      this.newInput = this.contents.substring(this.oldContents.length);

      if (this.isWaiting) {
        var payload = {
          input: this.newInput,
        };

        const res = await API.apiClient.post(
          `/containers/send-in/${this.containerID}`,
          payload
        );

        // Get the new output
        this.new = res.data.dump;

        // Check if the program is still running/waiting on input
        this.isWaiting = !(this.new[this.new.length - 1] === "\u0003è");
        this.hasNewLine = this.new[this.new.length - 1] === "" || !this.isWaiting;

        for (let i = 0; i < this.new.length - 1; i++) {
          this.contents += this.new[i] + "\n";
        }

        if (!this.hasNewLine) {
          this.contents += this.new[this.new.length - 1];
        }

        if (!this.isWaiting) {
          this.contents += "student@server:/usr/src$ ";
          this.$emit("programFinished");
        }

        this.oldContents = this.contents;
      }
    },
  },
  mounted() {},
};
</script>

<style></style>
