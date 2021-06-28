<template>
  <textarea
    class="console"
    id="scrollToBottom"
    contenteditable="true"
    v-model="contents"
    @keyup.enter="enter"
    spellcheck="false"
    :readonly="!isWaiting"
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
      contents: "",
      new: [],
      isWaiting: false,
      hasNewLine: false,
      newInput: "",
      containers: {},
      username: "",
    };
  },
  watch: {
    launchConsole: function () {
      if (this.launchConsole && this.problemID != "" && this.problemID != null) {
        this.startDocker();
      }
    },
    contents: function () {
      var text = document.getElementById("scrollToBottom");
      text.scrollTop = text.scrollHeight;

      const uneditable = this.contents.substring(0, this.oldContents.length);
      if (uneditable != this.oldContents) {
        this.contents = this.oldContents;
      }
    },
  },
  methods: {
    async startDocker() {
      if (this.lang == "Java") {
        this.contents += "javac Main.java\n";
      }
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

      if (this.lang == "Python") {
        this.contents += "python3 submission.py\n";
      } else if (this.lang == "Java") {
        this.contents += this.username + "@mocside:/usr/src$ java Main\n";
      } else {
        this.contents += "\n" + this.username + "@mocside:/usr/src$ ";
      }

      // (this.hasNewLine ? this.new.length - 1 : this.new.length)
      for (let i = 0; i < this.new.length - 1; i++) {
        this.contents += this.new[i] + "\n";
      }

      if (!this.hasNewLine) {
        this.contents += this.new[this.new.length - 1];
      }

      if (!this.isWaiting) {
        this.contents += this.username + "@mocside:/usr/src$ ";
        this.$emit("programFinished");
      }

      this.oldContents = this.contents;
    },

    async enter() {
      this.newInput = this.contents.substring(this.oldContents.length);

      this.containers = await API.apiClient.get(`/containers/${this.containerID}`);

      this.isWaiting = false;

      for (let i = 0; i < this.containers.data.data.length && !this.isWaiting; i++) {
        this.isWaiting = this.containers.data.data[i] == this.containerID;
      }

      if (!this.isWaiting) {
        this.contents += this.username + "@mocside:/usr/src$ ";
        this.$emit("programFinished");
      }

      this.oldContents = this.contents;

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
          this.contents += this.username + "@mocside:/usr/src$ ";
          this.$emit("programFinished");
        }

        this.oldContents = this.contents;

        this.containers = await API.apiClient.get(`/containers/${this.containerID}`);

        this.isWaiting = false;

        for (let i = 0; i < this.containers.data.data.length && !this.isWaiting; i++) {
          this.isWaiting = this.containers.data.data[i] == this.containerID;
        }

        if (!this.isWaiting) {
          this.contents += this.username + "@mocside:/usr/src$ ";
          this.$emit("programFinished");
        }
      }
    },
  },
  async beforeMount() {
    const authUser = await this.$store.dispatch("auth/getAuthUser");
    this.username = authUser.username;
    this.oldContents = this.username + "@mocside:/usr/src$ ";
    this.contents = this.username + "@mocside:/usr/src$ ";
  },
};
</script>

<style></style>
