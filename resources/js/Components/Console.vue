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
      currLog: "",
      isPolling: false,
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

      setTimeout(async () => {
        const shutdown = await API.apiClient.delete(`/containers/${this.containerID}`)
      }, 120000); // shutdown container in 2 minutes

      // Get the new input/output
      this.new = res.data.dump;
      this.currLog = "";

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
        this.currLog += this.new[i] + "\n";
      }

      if (!this.hasNewLine) {
        this.contents += this.new[this.new.length - 1];
        this.currLog += this.new[this.new.length - 1];
      }

      if (!this.isWaiting) {
        if (this.isPolling) {
          // if were polling this is first to catch, otherwise this has already been printed
          self.contents += "\n" + self.username + "@mocside:/usr/src$ ";
        }
        this.isPolling = false;
        this.$emit("programFinished");
      } else if (!this.isPolling){
        this.checkLogs();
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
        if (this.isPolling) {
          // if were polling this is first to catch, otherwise this has already been printed
          self.contents += "\n" + self.username + "@mocside:/usr/src$ ";
        }
        this.isPolling = false;
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
        
        // send input to currlog
        this.currLog += this.newInput;

        // Check if the program is still running/waiting on input
        this.isWaiting = !(this.new[this.new.length - 1] === "\u0003è");
        this.hasNewLine = this.new[this.new.length - 1] === "" || !this.isWaiting;

        for (let i = 0; i < this.new.length - 1; i++) {
          this.new[i].replace('\u0003è', '');
          this.contents += this.new[i] + "\n";
          this.currLog += this.new[i] + "\n";
        }

        if (!this.hasNewLine) {
          this.contents += this.new[this.new.length - 1];
          this.currLog += this.new[this.new.length - 1];
        }

        // we will handle this in our listener function
        // if (!this.isWaiting) {
        //   this.contents += this.username + "@mocside:/usr/src$ ";
        //   this.$emit("programFinished");
        // }

        this.oldContents = this.contents;
      }
    },
    async checkLogs() {
      var self = this;
      this.isPolling = true;
      setTimeout(async function() {
        const res = await API.apiClient.get(`/containers/logs/${self.containerID}`);

        // Get the new output
        self.new = res.data.dump;

        // check is waiting
        self.isWaiting = res.data.isRunning;

        // if new == currLog, nothing new to write
        var tempNew = self.new.join("\n");
        if (!(self.currLog == tempNew)) {
          // find new output
          var newText = tempNew.substring(self.currLog.length);
          newText.replace('\u0003è', ''); // Can we filter this character?
          self.new = newText.split("\n");

          // display output
          self.hasNewLine = self.new[self.new.length - 1] === "";

          for (let i = 0; i < self.new.length - 1; i++) {
            self.contents += self.new[i] + "\n";
            self.currLog += self.new[i] + "\n";
          }

          if (!self.hasNewLine) {
            self.contents += self.new[self.new.length - 1];
            self.currLog += self.new[self.new.length - 1];
          }

          // recurse if still active
          if (!self.isWaiting) {
            if (self.isPolling) {
              // if were polling this is first to catch, otherwise this has already been printed
              self.contents += "\n" + self.username + "@mocside:/usr/src$ ";
            }
            self.oldContents = self.contents;
            self.isPolling = false;
            self.$emit("programFinished");
          } else {
            self.oldContents = self.contents;
            self.checkLogs();
          } 
        } else if (self.isWaiting) {
          self.checkLogs();
        } else {
          if (self.isPolling) {
            // if were polling this is first to catch, otherwise this has already been printed
            self.contents += "\n" + self.username + "@mocside:/usr/src$ ";
          }
          self.oldContents = self.contents;
          self.isPolling = false;
          self.$emit("programFinished");
        }
      }, 1000);
    }
  },
  async beforeMount() {
    const authUser = await this.$store.dispatch("auth/getAuthUser");
    this.username = authUser.username;
    this.oldContents = this.username + "@mocside:/usr/src$ ";
    this.contents = this.username + "@mocside:/usr/src$ ";
  },
  async beforeUnmount() {
    //console
    if (this.isWaiting || this.isPolling) {
      this.isWaiting = false;
      const res = API.apiClient.delete(`/containers/${this.containerID}`);
      console.log(res.data);
    }
    this.$emit('unmount');
  }
};
</script>

<style></style>
