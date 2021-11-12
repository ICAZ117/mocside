<template>
  <textarea
    class="console"
    id="scrollToBottom"
    contenteditable="true"
    v-model="contents"
    @keyup.enter="enter"
    spellcheck="false"
    :readonly="!isRunning"
  ></textarea>
</template>

<script>
import * as API from "../services/API";
import store from "../Store/index";

export default {
  props: ["launchConsole", "problemID", "lang"],

  data() {
    return {
      isRunning: false,
      authUser: "",
      containerID: 0,
      oldContents: "",
      contents: "",
      oldTermContent: "",
      termContent: "",
      newTermContent: "",
      new: [],
      hasNewLine: false,
      newInput: "",
      containers: {},
      username: "",
      currLog: "",
      isPolling: false,
      enteredInput = false;
    };
  },
  watch: {
    launchConsole: function () {
      if (this.launchConsole && this.problemID != "" && this.problemID != null) {
        console.log("WE STARTIN BOIS")
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
      else if (this.isRunning) {
        this.newInput = this.contents.substring(this.oldContents.length);
      }
    },
    newTermContent: function (newVal, oldVal) {
      this.oldContents += this.newTermContent.substring(
        this.oldTermContent.length,
        this.newTermContent.length
      );
      this.oldTermContent = this.newTermContent;
      this.contents = this.oldContents;
    },
  },
  methods: {
    async startDocker() {
      // When the user clicks "Run"
      // If the selected language is Java, add some text to the terminal content
      if (this.lang == "Java") {
        this.contents += "javac Main.java\n";
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

      console.log("Started docker");

      this.isRunning = true;

      // Get the docker container ID
      this.containerID = res.data.message;

      // Automatically shut down the docker after 2 mins
      setTimeout(async () => {
        const shutdown = await API.apiClient.delete(`/containers/${this.containerID}`);
      }, 120000); // shutdown container in 2 minutes

      console.log("Test timer");
    

      // Check the language and add the appropriate content to the console
      if (this.lang == "Python") {
        this.contents += "python3 submission.py\n";
      } else if (this.lang == "Java") {
        this.contents += this.username + "@mocside:/usr/src$ java Main\n";
      } else {
        this.contents += "\n" + this.username + "@mocside:/usr/src$ ";
      }

      this.oldContents = this.contents;
    },
    async enter() {
      this.enteredInput = true;
      // Get ALL containers (ignore the request syntax... it's dumb)
      this.containers = await API.apiClient.get(`/containers/${this.containerID}`);

      // Check if the current container is running
      for (let i = 0; i < this.containers.data.data.length && !this.isWaiting; i++) {
        this.isWaiting = this.containers.data.data[i] == this.containerID;
      }

      this.oldContents = this.contents;

        var payload = {
          input: this.newInput,
        };

        const res = await API.apiClient.post(
          `/containers/send-in/${this.containerID}`,
          payload
        );

        this.oldContents = this.contents;
    },
    async programFinished() {
      this.$emit("programFinished");
      this.newInput = "";
      this.isRunning = false;
      this.oldContents += "\n" + this.username + "@mocside:/usr/src$ ";
      this.contents = this.oldContents;
    },
  },
  async beforeUnmount() {
    //console
    if (this.isWaiting || this.isPolling) {
      this.isWaiting = false;
      const res = API.apiClient.delete(`/containers/${this.containerID}`);
      console.log(res.data);
    }
    this.$emit("unmount");
  },
  async mounted() {
    this.authUser = await store.getters["auth/authUser"];
    this.username = this.authUser.username;
    this.oldContents = this.username + "@mocside:/usr/src$ ";
    this.contents = this.username + "@mocside:/usr/src$ ";

    // console.log(this.authUser);
    // console.log("color: " + this.authUser.settings.consoleOptions.foreground + "!important; background-color: " + this.authUser.settings.consoleOptions.background + "!important;");
    // var el = document.getElementById("scrollToBottom");
    document.getElementById("scrollToBottom").style = "color: " + this.authUser.settings.consoleOptions.foreground + "!important; background-color: " + this.authUser.settings.consoleOptions.background + "!important;"


    Echo.channel(`term.${this.authUser.fsc_user.fsc_id}`)
      .listen(".console_out", (e) => {
        console.log(e);
        if(this.enteredInput) {
          this.enteredInput = false;
        }
        else {
          this.newTermContent = e.log;
        }
      })
      .listen(".end", (e) => {
        this.programFinished();
      });
  },
};
</script>

<style></style>
