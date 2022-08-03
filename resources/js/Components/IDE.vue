<template>
  <div class="work-area">
    <Vue3DraggableResizable
      :initW="width"
      :initH="consoleHeight + 1"
      v-model:x="x1"
      v-model:y="y1"
      v-model:w="dynamicWidth"
      v-model:h="h1"
      v-model:active="active"
      :draggable="false"
      :resizable="true"
      :disabledW="false"
      :disabledX="true"
      :handles="['bm']"
      id="resizableEditor"
      style="z-index: 3 !important"
    >
      <div class="editor row">
        <VAceEditor
          class="editor"
          v-model:value="code"
          @input="updateContent"
          :lang="editorLangauge"
          :theme="theme"
          :key="forceReload"
          :style="'width: ' + width + '!important;'"
          :options="{enableBasicAutocompletion: true, enableSnippets: true, enableLiveAutocompletion: true}"
        />
      </div>
    </Vue3DraggableResizable>

    <Vue3DraggableResizable
      :initW="width"
      :initH="consoleHeight - 1"
      v-model:x="x2"
      v-model:y="y2"
      v-model:w="evenDynamicerWidth"
      v-model:h="h2"
      v-model:active="active"
      :minH="100"
      :draggable="false"
      :resizable="true"
      :disabledW="false"
      :disabledX="true"
      :handles="['tm']"
      @resize-end="adjustEditorHeight"
      id="resizableConsole"
      style="z-index: 4 !important; bottom: 0 !important"
    >
      <div>
        <div id="editorConfig" class="row p-2" style="background-color: black !important">
          <button
            @click="toggleIO"
            id="buttonWidth"
            class="toggleIO col-1 btn btn-success"
          >
            {{ IOmessage }}
          </button>
          <button
            @click="runCode()"
            v-if="!launchConsole"
            type="run"
            name="run"
            class="run-code col-1 btn btn-success"
            :disabled="launchConsole"
            
          >
            Run
          </button>
          <button
            @click="terminate = true"
            v-if="launchConsole"
            type="run"
            name="run"
            class="run-code col-1 btn btn-danger"
            :disabled="!launchConsole"
          >
            Stop
          </button>
          <button
            v-show="showSubmit"
            @click="submitCode()"
            type="submit"
            name="submit"
            class="submit-code col-1 btn btn-success"
          >
            Submit
          </button>
          <vue-final-modal
            v-model="showModal"
            classes="modal-container"
            content-class="modal-content"
            :esc-to-close="true"
          >
            <Accordion :accordions="accordions" :key="reloadModal" />
            <button class="modal-close" @click="showModal = false">x</button>
            <div class="row">
              <button @click="closeModal" class="col-4 btn btn-lg btn-secondary mx-1">
                Keep trying
              </button>
              <button
                @click="submitForGrade"
                class="col-4 btn btn-lg btn-success mx-1"
                :disabled="!canSubmit"
              >
                Submit
              </button>
            </div>
          </vue-final-modal>
          <div :style="style">
            <div style="float: right !important">
              <div class="configure-editor">
                <label for="theme" class="workspace-label">Theme: </label>
                <select v-model="theme" id="theme" class="console-select form-select">
                  <optgroup label="Dark">
                    <option value="ambiance">Ambiance</option>
                    <option value="chaos">Chaos</option>
                    <option value="clouds_midnight">Clouds Midnight</option>
                    <option value="dracula">Dracula</option>
                    <option value="cobalt">Cobalt</option>
                    <option value="gruvbox">Gruvbox</option>
                    <option value="gob" selected>Green on Black</option>
                    <option value="idle_fingers">idle Fingers</option>
                    <option value="kr_theme">krTheme</option>
                    <option value="merbivore">Merbivore</option>
                    <option value="merbivore_soft">Merbivore Soft</option>
                    <option value="mono_industrial">Mono Industrial</option>
                    <option value="monokai">Monokai</option>
                    <option value="nord_dark">Nord Dark</option>
                    <option value="pastel_on_dark">Pastel on dark</option>
                    <option value="solarized_dark">Solarized Dark</option>
                    <option value="terminal">Terminal</option>
                    <option value="tomorrow_night">Tomorrow Night</option>
                    <option value="tomorrow_night_blue">Tomorrow Night Blue</option>
                    <option value="tomorrow_night_bright">Tomorrow Night Bright</option>
                    <option value="tomorrow_night_eighties">Tomorrow Night 80s</option>
                    <option value="twilight">Twilight</option>
                    <option value="vibrant_ink">Vibrant Ink</option>
                  </optgroup>
                  <optgroup label="Light">
                    <option value="chrome">Chrome</option>
                    <option value="clouds">Clouds</option>
                    <option value="crimson_editor">Crimson Editor</option>
                    <option value="dawn">Dawn</option>
                    <option value="dreamweaver">Dreamweaver</option>
                    <option value="eclipse">Eclipse</option>
                    <option value="github">GitHub</option>
                    <option value="iplastic">IPlastic</option>
                    <option value="solarized_light">Solarized Light</option>
                    <option value="textmate">TextMate</option>
                    <option value="tomorrow">Tomorrow</option>
                    <option value="xcode">Xcode</option>
                    <option value="kuroir">Kuroir</option>
                    <option value="katzenmilch">KatzenMilch</option>
                    <option value="sqlserver">SQL Server</option>
                  </optgroup>
                </select>
              </div>
            </div>
          </div>
        </div>

        <!-- CONSOLE HERE, V_IF !ShowInput -->
        <Console
          :launchConsole="launchConsole"
          :problemID="problemID"
          :terminate="terminate"
          :lang="lang"
          @programFinished="launchConsole = false"
          @terminated="terminate = false"
          :style="
            'width: ' +
            width +
            'px !important; height: ' +
            consoleComponentHeight +
            'px !important;'
          "
        />
      </div>
    </Vue3DraggableResizable>

    <div v-if="showInput" class="inputHeight row">
      <VAceEditor :theme="'chaos'" v-model:value="input" @input="updateContent" />
    </div>
  </div>
</template>

<script>
import { VAceEditor } from "vue3-ace-editor";

//////////////////////////////////////////////////////////////////////
//                            THEMES                                //
//////////////////////////////////////////////////////////////////////
import "ace-builds/src-noconflict/ext-themelist";
import "ace-builds/src-noconflict/theme-ambiance";
import "ace-builds/src-noconflict/theme-chaos";
import "ace-builds/src-noconflict/theme-chrome";
import "ace-builds/src-noconflict/theme-clouds";
import "ace-builds/src-noconflict/theme-clouds_midnight";
import "ace-builds/src-noconflict/theme-cobalt";
import "ace-builds/src-noconflict/theme-crimson_editor";
import "ace-builds/src-noconflict/theme-dawn";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/theme-dreamweaver";
import "ace-builds/src-noconflict/theme-eclipse";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-gob";
import "ace-builds/src-noconflict/theme-gruvbox";
import "ace-builds/src-noconflict/theme-idle_fingers";
import "ace-builds/src-noconflict/theme-iplastic";
import "ace-builds/src-noconflict/theme-katzenmilch";
import "ace-builds/src-noconflict/theme-kr_theme";
import "ace-builds/src-noconflict/theme-kuroir";
import "ace-builds/src-noconflict/theme-merbivore";
import "ace-builds/src-noconflict/theme-merbivore_soft";
import "ace-builds/src-noconflict/theme-mono_industrial";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-nord_dark";
import "ace-builds/src-noconflict/theme-pastel_on_dark";
import "ace-builds/src-noconflict/theme-solarized_dark";
import "ace-builds/src-noconflict/theme-solarized_light";
import "ace-builds/src-noconflict/theme-sqlserver";
import "ace-builds/src-noconflict/theme-terminal";
import "ace-builds/src-noconflict/theme-textmate";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/theme-tomorrow_night";
import "ace-builds/src-noconflict/theme-tomorrow_night_blue";
import "ace-builds/src-noconflict/theme-tomorrow_night_bright";
import "ace-builds/src-noconflict/theme-tomorrow_night_eighties";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/theme-vibrant_ink";
import "ace-builds/src-noconflict/theme-xcode";

//////////////////////////////////////////////////////////////////////
//                             MODES                                //
//////////////////////////////////////////////////////////////////////
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python";


  //////////////////////////////////////////////////////////////////////
  //                            EXTRAS                                //
  //////////////////////////////////////////////////////////////////////
  import "ace-builds/src-noconflict/ext-beautify";
  // import "ace-builds/src-noconflict/ext-code_lens";
  // import "ace-builds/src-noconflict/ext-elastic_tabstops_lite";
  // import "ace-builds/src-noconflict/ext-emmet";
  // import "ace-builds/src-noconflict/ext-error_marker";
  // import "ace-builds/src-noconflict/ext-keybinding_menu";
  import "ace-builds/src-noconflict/ext-language_tools";
  // import "ace-builds/src-noconflict/ext-linking";
  // import "ace-builds/src-noconflict/ext-modelist";
  // import "ace-builds/src-noconflict/ext-options";
  // import "ace-builds/src-noconflict/ext-prompt";
  // import "ace-builds/src-noconflict/ext-rtl";
  // import "ace-builds/src-noconflict/ext-searchbox";
  // import "ace-builds/src-noconflict/ext-settings_menu";
  // import "ace-builds/src-noconflict/ext-spellcheck";
  // import "ace-builds/src-noconflict/ext-split";
  // import "ace-builds/src-noconflict/ext-static_highlight";
  // import "ace-builds/src-noconflict/ext-statusbar";
  // import "ace-builds/src-noconflict/ext-textarea";
  // import "ace-builds/src-noconflict/ext-themelist";
  // import "ace-builds/src-noconflict/ext-whitespace";
  // //////////////////////////////////////////////////////////////////////
  // //                           KEYBINDINGS                            //
  // //////////////////////////////////////////////////////////////////////
  // import "ace-builds/src-noconflict/keybinding-emacs.";
  // import "ace-builds/src-noconflict/keybinding-sublime.";
  // import "ace-builds/src-noconflict/keybinding-vim.";
  // import "ace-builds/src-noconflict/keybinding-vscode.";
  // //////////////////////////////////////////////////////////////////////
  // //                             WORKERS                              //
  // //////////////////////////////////////////////////////////////////////
  // import "ace-builds/src-noconflict/worker-base";
  // import "ace-builds/src-noconflict/worker-coffee";
  // import "ace-builds/src-noconflict/worker-css";
  // import "ace-builds/src-noconflict/worker-html";
  // import "ace-builds/src-noconflict/worker-javascript";
  // import "ace-builds/src-noconflict/worker-json";
  // import "ace-builds/src-noconflict/worker-lua";
  // import "ace-builds/src-noconflict/worker-php";
  // import "ace-builds/src-noconflict/worker-xml";
  // import "ace-builds/src-noconflict/worker-xquery";


import * as API from "../services/API";
import { defineComponent } from "vue";
import Console from "./Console.vue";
import Accordion from "../Components/Accordion.vue";
import Vue3DraggableResizable from "vue3-draggable-resizable";
//default styles
import "vue3-draggable-resizable/dist/Vue3DraggableResizable.css";
import store from "../Store/index";

export default defineComponent({
  name: "IDE",
  props: [
    "lang",
    "showSubmit",
    "saved_j",
    "saved_p",
    "problemID",
    "codeID",
    "labID",
    "width",
    "offsetTop",
  ],
  emits: ["update"],
  components: {
    VAceEditor,
    Console,
    Accordion,
    Vue3DraggableResizable,
  },
  data: () => ({
    authUser: "",
    terminate: false,
    theme: "gob",
    editorLangauge: "",
    style: "",
    IOmessage: "Show Input",
    showInput: false,
    code: "",
    input: "",
    forceReload: 0,
    containerID: "",
    launchConsole: false,
    showModal: false,
    accordions: [],
    testCases: [],
    reloadModal: 0,
    tcGrades: [],
    canSubmit: true,

    consoleHeight: (window.innerHeight - 60) / 2,
    consoleWidth: window.innerWidth * 0.67,
    x1: 0,
    y1: 0,
    h1: 0,
    w1: 0,
    x2: 0,
    y2: (window.innerHeight - 60) / 2,
    h2: 0,
    w2: 0,
    active: true,
    reloadConsoleVDR: 0,
    dynamicWidth: 0,
    evenDynamicerWidth: 0,
  }),
  watch: {
    showModal: function () {
      if (!this.showModal) {
        this.initAccordion();
        this.reloadModal++;
      }
    },
    width: function (newVal, oldVal) {
      // watch it
      this.w1 = this.width;
      this.w2 = this.width;
      this.dynamicWidth = this.width;
      this.evenDynamicerWidth = this.width;
      this.getStyle();
    },
    dynamicWidth: function () {
      setTimeout(() => {
        if (this.dynamicWidth != this.width) {
          this.dynamicWidth = this.width;
        }
      }, 10);
    },
    evenDynamicerWidth: function () {
      setTimeout(() => {
        if (this.evenDynamicerWidth != this.width) {
          this.evenDynamicerWidth = this.width;
        }
      }, 10);
    },
    h1: function () {
      setTimeout(() => {
        this.y2 = this.offsetTop + this.h1;
        setTimeout(() => {
          this.h2 = this.h2 - 60;
          // this.h2 = this.consoleComponentHeight + 47;
        }, 10);
        this.h2 = this.h2 + 60;
      }, 10);
    },
  },
  computed: {
    consoleComponentHeight() {
      if (this.offsetTop == 0) {
        return window.innerHeight - 60 - this.h1 - 47;
      } else {
        return window.innerHeight - this.offsetTop - this.h1 - 47;
      }
    },
    // getStyle() {
    //   // width: " + (this.showSubmit ? "67%" : "89%") + "!important
    //   var button = document.getElementById("buttonWidth");

    //   if (button != null) {
    //     var numButtons = this.showSubmit ? 3 : 2;
    //     this.style =
    //       "width: calc((100% - " +
    //       numButtons +
    //       "%) - " +
    //       numButtons * button.clientWidth +
    //       "px)!important;";
    //     return this.style;
    //   }
    //   return "";
    // },
  },
  methods: {
    getStyle() {
      // width: " + (this.showSubmit ? "67%" : "89%") + "!important
      var button = document.getElementById("buttonWidth");

      if (button != null) {
        var numButtons = this.showSubmit ? 3 : 2;
        this.style =
          "width: " +
          (this.evenDynamicerWidth - 16 - numButtons * 143 - 10) +
          "px !important;";
      }
    },
    adjustEditorHeight() {
      setTimeout(() => {
        this.h1 = window.innerHeight - this.offsetTop - this.h2;
        this.dynamicWidth++;
        this.evenDynamicerWidth++;
      }, 100);
    },
    toggleIO() {
      this.showInput = !this.showInput;
      this.IOmessage = this.showInput ? "Show Output" : "Show Input";
    },
    updateContent() {
      var data = {
        code: this.code,
        input: this.input,
      };
      this.$emit("update", data);
    },
    async runCode() {
      var payload = {
        code: this.code,
      };
      const res = await API.apiClient.put(`/code/${this.codeID}`, payload);

      payload = {
        lang: this.lang.toLowerCase(),
      };
      const res2 = await API.apiClient.post(`/code/submit/${this.problemID}`, payload);

      this.launchConsole = true;
      // //code is saved....now need to run it
      // const res3 = await API.apiClient.post(`/containers/spin-up/${this.problemID}`, payload);
      // this.containerID = res3.data.message;
    },
    async submitCode() {
      this.canSubmit = !(await this.pastDue());
      this.showModal = true;
      this.tcGrades = [];

      var payload = {
        code: this.code,
      };
      const res = await API.apiClient.put(`/code/${this.codeID}`, payload);

      payload = {
        lang: this.lang.toLowerCase(),
      };
      const res2 = await API.apiClient.post(`/code/submit/${this.problemID}`, payload);

      //code is saved now need to run and compare it
      const res3 = await API.apiClient.post(
        `/containers/grade/${this.problemID}`,
        payload
      );

      const dump = res3.data.dump;


      var currentTC = 0;

      for (let i = 0; i < res3.data.dump.length - 1; i += 4) {

        var tc = {
          tcID: JSON.parse(dump[i]),
          userOut: JSON.parse(dump[i + 1]),
          profOut: JSON.parse(dump[i + 2]),
          compare: JSON.parse(dump[i + 3]),
        };


        var self = this;

        // IF the code has a compile error, handle it
        if (tc.compare == "compilationError") {
          this.accordions = [
            {
              title: "Compilation Error",
              text: tc.userOut[0],
              input: "",
              userOut: "",
              profOut: "",
              differences: "",
              isSuccessful: false,
              hasError: true,
            },
          ];

          for (let j = 0; j < this.testCases.data.data.length; j++) {
            this.tcGrades.push({
              ID: this.testCases.data[j].id,
              passed: false,
            });
          }

          break;
        }
        // ELSE IF the code has a runtime error, handle it
        else if (tc.compare[0] == "runtimeError" || tc.compare[0] == '"runtimeError"') {
          this.accordions[currentTC].isSuccessful = false;
          this.accordions[currentTC].hasError = true;
          this.accordions[currentTC].text = JSON.parse(tc.userOut);
          this.tcGrades.push({
            ID: JSON.parse(tc.tcID),
            passed: false,
          });
        }
        // ELSE, the code ran successfully. Now check if it passed the test case or not.
        else {
          tc.compare = JSON.parse(tc.compare);

          // IF code passed test case
          if (tc.compare[0] == "100.0") {
            this.accordions[currentTC].isSuccessful = true;
            this.accordions[currentTC].text = "Test Case Passed :)";
            this.tcGrades.push({
              ID: JSON.parse(tc.tcID),
              passed: true,
            });
          }
          // ELSE, code failed test case
          else {
            this.tcGrades.push({
              ID: JSON.parse(tc.tcID),
              passed: false,
            });
            this.accordions[currentTC].isSuccessful = false;
            this.accordions[currentTC].text = "Test Case Failed :(";

            // tc.userOut = JSON.parse(tc.userOut)[0];
            // tc.profOut = JSON.parse(tc.profOut)[0];

            this.accordions[currentTC].profOut = tc.profOut.replace(
              /\n/g,
              '<br /><span class="unselectable"><br /></span>'
            );
            this.accordions[currentTC].userOut = tc.userOut.replace(
              /\n/g,
              '<br /><span class="unselectable"><br /></span>'
            );

            // Loop over all test cases for the current problem and find the test case that has a
            // matching tcID with the current tcID provided in the supervisor dump. Once we find
            // the correct test case, set the current accordion's input to the correct test case's
            // input.
            for (let j = 0; j < this.testCases.data.data.length; j++) {
              // if ('"' + self.testCases.data.data[j].id + '"' == tc.tcID) {
              if (self.testCases.data.data[j].id == Number(tc.tcID)) {
                self.accordions[currentTC].input = self.testCases.data.data[j].input;
              }
            }

            var diff = '<p class="no-margin">';
            var currentUser = 0;
            var currentProf = 0;
            var matchLength = 0;
            var lastUser = 0;
            var lastProf = 0;
            var mismatch = "";
            var mismatchVariation = 0;
            var match = "";

            // Loop over ALL comparison strings
            for (let j = 1; j < tc.compare.length; j++) {
              // Each comparison string contains three numbers, seperated by commas
              // So, we first split the string on a comma...
              var arr = tc.compare[j].split(",");

              // and then cast the strings to numbers, and save them into the appropriate variables
              currentUser = Number(arr[0]);
              currentProf = Number(arr[1]);
              matchLength = Number(arr[2]);

              // Now that we have those values saved, we need to get a substring of the user output.
              // The substring should be from the lastUser pointer to the currentUser pointer, and
              // it should be saved in mismatch. Furthermore, we should also append HTML strikethrough
              // tags to display to the user that this output should be removed.
              mismatch =
                "<strike>" +
                tc.userOut
                  .substring(lastUser, currentUser)
                  .replace(
                    /\n/g,
                    '<span class="unselectable">&nbsp;<br /><br /></span>'
                  ) +
                "</strike>";

              // We must also check to see if the professor's output has any mismatches. If it does, we
              // must save the number of characters by which the length of the mismatch in the professor's
              // output exceeds that of the student's.
              mismatchVariation =
                tc.profOut.substring(lastProf, currentProf).length -
                (mismatch.length - 17);

              // In the event that the mismatchVariation is a positive number, we must append
              // mismatchVariation number of spaces to mismatch. To acomplish this, we do a for-loop that
              // iterates mismatchVariation number of times, and append a single space to mismatch each
              // iteration of said for-loop. Prior to doing so, we must append an opening HTML underline
              // tag to diff. We must also append a closing underline tag upon completion of the for-loop.
              // This is to display to the user that they are missing something here.
              for (let k = 0; k < mismatchVariation; k++) {
                mismatch += "<u>&nbsp;</u>";
              }

              // IF the mismatch string is NOT empty, concatenate it to diff
              if (mismatch != "<strike></strike>") {
                diff += mismatch;
              }

              // Next, we must obtain the "match" substring from the user output. This substring should
              // be from the currentUser pointer to index currentUser + matchLength, and should be saved
              // in match
              match = tc.userOut.substring(currentUser, currentUser + matchLength);

              // We can now append the match string to diff
              diff += match;

              // Finally, we adjust lastUser to be the currentUser + matchLength, and lastProf to be the
              // currentProf + matchLength
              lastUser = currentUser + matchLength;
              lastProf = currentProf + matchLength;

              // 0,0,2
              // 3,5,5

              // 012 3
              // 889\n
              // 888

              // Desired output:
              // bob  Hello
              // -----
            }

            diff += "</p>";

            this.accordions[currentTC].differences = diff;
          }
        }

        currentTC++;
      }

      //student Output
      //correct Output
      //line with text that says a percentage
      //followed n lines of a[0] b[0] for 6 elements
      //a[last elem] b[last elem] for 0 elements
      //starts next case
    },
    async submitForGrade() {
      if (!(await this.pastDue())) {
        var gradebook = {};

        for (let i = 0; i < this.tcGrades.length; i++) {
          gradebook[this.tcGrades[i].ID] = this.tcGrades[i].passed;
        }

        var payload = {
          gradebook: JSON.stringify(gradebook),
        };

        const res = await API.apiClient.post(
          `/gradebook/submit/${this.problemID}`,
          payload
        );
        payload["lang"] = this.lang.toLowerCase();
        const res2 = await API.apiClient.post(
          `/progress/submit/${this.problemID}`,
          payload
        );
        // router push to labs, we are done here
        this.$router.push({ name: "Problems", params: { lab_id: this.labID } });
      }
    },
    async pastDue() {
      //get user time in UTC
      var c = new Date();
      var current_time = Date.UTC(
        c.getFullYear(),
        c.getMonth(),
        c.getDate(),
        c.getHours(),
        c.getMinutes(),
        c.getSeconds(),
        c.getMilliseconds()
      );

      //get problem time returned as UTC
      const res = await API.apiClient.get(`/problems/full/${this.problemID}`);
      var assignment = res.data.data;
      var due_date = assignment.due_date_utc;
      //assume this is UTC

      // var backDate = this.getBackDate(due_date);

      // assuming both times are using the same time zone the following works, or both are utc
      if (due_date == null || due_date == 0) { // (Max) I am adding this catch case because imported courses
        return false;         // Don't have a properly saved due_date_utc, but they do in future
      }                       // versions of the migrate software (9/18/21)
      else if (due_date > current_time) {
        // alert("current: " + current_time + "\nback: " + backdDate);
        return false;
      } else {
        // alert("current: " + current_time + "\nback: " + backDate);
        return true;
      }
    },
    async initAccordion() {
      this.accordions = [];

      for (let i = 0; i < this.testCases.data.data.length; i++) {
        var accordion = {
          tcID: "",
          title: this.testCases.data.data[i].title,
          text: "Running against test case...",
          input: "",
          userOut: "",
          profOut: "",
          differences: "",
          isSuccessful: "running",
          hasError: false,
        };
        await this.accordions.push(accordion);
      }
    },
    closeModal() {
      this.showModal = false;
    },
    reloadConsole() {
      setTimeout(() => {
        this.y2++;
        this.y2--;
      }, 100);
    },
  },
  async mounted() {
    this.authUser = await store.getters["auth/authUser"];
    this.theme = this.authUser.settings.ideOptions.theme;
    try {
      if (this.lang == "Java") {
        this.editorLangauge = "java";
        this.code = this.saved_j;
      } else {
        this.editorLangauge = "python";
        this.code = this.saved_p;
      }
    } catch (e) {}
    this.forceReload++;
    this.testCases = await API.apiClient.get(`/test-cases/${this.problemID}`);
    await this.initAccordion();
    this.h1++;
    this.h1--;
    this.getStyle();
    this.consoleHeight = (window.innerHeight - this.offsetTop) / 2;
    this.y2 = this.offsetTop + this.consoleHeight -30;
    this.y1 = this.offsetTop;
    this.reloadConsole();
  },
});
</script>

<style scoped>
::v-deep(.modal-container) {
  display: flex;
  justify-content: center;
  align-items: center;
}
::v-deep(.modal-content) {
  position: relative;
  display: flex;
  flex-direction: column;
  max-height: 90%;
  margin: auto;
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
  background: #fff;
  width: 30% !important;
}
.modal__title {
  margin: 0 2rem 0 0;
  font-size: 1.5rem;
  font-weight: 700;
}
.modal__content {
  flex-grow: 1;
  overflow-y: auto;
}
.modal__action {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  padding: 1rem 0 0;
}
.modal__close {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
}
</style>

<style scoped>
.dark-mode div ::v-deep(.modal-content) {
  border-color: #2d3748;
  background-color: #1a202c;
}
</style>
