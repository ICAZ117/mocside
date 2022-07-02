<template>
  <form name="consoleForm">
    <textarea
      name="console"
      class="console"
      id="scrollToBottom"
      contenteditable="true"
      v-model="content"
      @keyup.enter="enter"
      spellcheck="false"
      :readonly="!isRunning"
    ></textarea>
  </form>
</template>

<script>
import * as API from "../services/API";
import store from "../Store/index";


export default {
  props: ["launchConsole", "problemID", "lang", "terminate"],

  data() {
    return {
      isRunning: false,
      // canEdit: false,
      authUser: "",
      containerID: 0,
      new: [],
      hasNewLine: false,
      newInput: "",
      containers: {},
      username: "",
      currLog: "",
      content: "",
      recentLog: "",
      newLog: "",
      oldContent: "",
    };
  },
  watch: {
    terminate: async function () {
      if (this.terminate && this.isRunning) {
        while (this.containerID == 0) {
          continue;
        }

        const shutdown = await API.apiClient.delete(`/containers/${this.containerID}`);
        await this.programFinished();
        this.$emit("terminated");
      }
    },
    launchConsole: function () {
      if (this.launchConsole && this.problemID != "" && this.problemID != null) {
        this.startDocker();
      }
    },
    newLog: async function () {
      if (this.newLog.replace(/^\n|\n$/g, "") == this.recentLog.replace(/^\n|\n$/g, "")) {
      } else {

        this.content += this.newLog.substring(this.recentLog.length);
        this.oldContent = this.content;
        this.recentLog = this.newLog;
        
      }

      // this.canEdit = true;
    },
  },
  methods: {
    async startDocker() {
      // When the user clicks "Run"
      // If the selected language is Java, add some text to the terminal content
      if (this.lang == "Java") {
        this.content += "javac Main.java\n";
      }

      // Create payload
      var payload = {
        lang: this.lang,
      };

      // Start the actual docker
      const res = await API.apiClient.post(
        `/containers/spin-up/${this.problemID}`,
        payload
      );

      document.consoleForm.console.focus();

      this.isRunning = true;
      // this.canEdit = true;

      // Get the docker container ID
      this.containerID = res.data.message;

      // Automatically shut down the docker after 2 mins
      setTimeout(async () => {
        if (isRunning) {
          const shutdown = await API.apiClient.delete(`/containers/${this.containerID}`);
        }
      }, 120000); // shutdown container in 2 minutes

      // Check the language and add the appropriate content to the console
      if (this.lang == "Python") {
        this.content += "python3 submission.py\n";
      } else if (this.lang == "Java") {
        this.content += this.username + "@mocside:/usr/src$ java Main\n";
      } else {
        this.content += "\n" + this.username + "@mocside:/usr/src$ ";
      }

      this.oldContent = this.content;
    },
    async enter() {
      // this.canEdit = false;
      // Get last \n index
      var idx = this.content.lastIndexOf("\n") + 1;

      // Get new input
      this.newInput = this.content.substring(this.oldContent.length, idx);

      // Add to recent log
      this.recentLog += this.newInput;

      // Get ALL containers (ignore the request syntax... it's dumb)
      this.containers = await API.apiClient.get(`/containers/${this.containerID}`);

      // Check if the current container is running
      for (let i = 0; i < this.containers.data.data.length && !this.isWaiting; i++) {
        this.isWaiting = this.containers.data.data[i] == this.containerID;
      }

      this.oldContent = this.content.substring(0, idx);

      var payload = {
        input: this.newInput,
      };

      const res = API.apiClient.post(`/containers/send-in/${this.containerID}`, payload);
    },
    async programFinished() {
      this.$emit("programFinished");
      this.newInput = "";
      this.isRunning = false;
      // this.canEdit = false;
      this.oldContent += "\n" + this.username + "@mocside:/usr/src$ ";
      this.content = this.oldContent;
      this.newLog = "";
      this.recentLog = "";
      this.containerID = 0;
    },
  },
  async beforeUnmount() {
    //console
    if (this.isWaiting || this.isPolling) {
      this.isWaiting = false;
      const res = API.apiClient.delete(`/containers/${this.containerID}`);
    }
    this.$emit("unmount");
  },
  async mounted() {
    this.authUser = await store.getters["auth/authUser"];
    this.username = this.authUser.username;
    this.content = this.username + "@mocside:/usr/src$ ";
    this.oldContent = this.content;

    // var el = document.getElementById("scrollToBottom");
    document.getElementById("scrollToBottom").style =
      "color: " +
      this.authUser.settings.consoleOptions.foreground +
      "!important; background-color: " +
      this.authUser.settings.consoleOptions.background +
      "!important;";

    Echo.channel(`term.${this.authUser.fsc_user.fsc_id}`)
      .listen(".console_out", (e) => {
        this.newLog = e.log;

        // this.newTermContent = e.log;

        // if(this.enteredInput) {
        //   this.oldTermContent = e.log;
        // }
        // else {
        //   this.newTermContent = e.log;
        // }
      })
      .listen(".end", (e) => {
        this.newLog = e.log;
        setTimeout(() => {
          this.programFinished();
        }, 100);
      });
  },
};
</script>

<style></style>
