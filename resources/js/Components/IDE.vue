<template>
  <div class="work-area">
    <div class="editor row">
      <VAceEditor
        class="editor"
        v-model:value="code"
        @input="updateContent"
        :lang="editorLangauge"
        :theme="theme"
        :key="forceReload"
      />
      <div class="row px-1 my-1">
        <button @click="toggleIO" id="buttonWidth" class="toggleIO col-1 btn btn-success">
          {{ IOmessage }}
        </button>
        <button
          @click="runCode()"
          type="run"
          name="run"
          class="run-code col-1 btn btn-success"
          :disabled="launchConsole"
        >
          Run
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
          <Accordion :accordions="accordions" />
          <button class="modal-close" @click="showModal = false">x</button>
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
    </div>

    <!-- CONSOLE HERE, V_IF !ShowInput -->
    <Console
      :launchConsole="launchConsole"
      :problemID="problemID"
      :lang="lang"
      @programFinished="launchConsole = false"
    />

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

{
  //////////////////////////////////////////////////////////////////////
  //                            EXTRAS                                //
  //////////////////////////////////////////////////////////////////////
  // import "ace-builds/src-noconflict/ext-beautify";
  // import "ace-builds/src-noconflict/ext-code_lens";
  // import "ace-builds/src-noconflict/ext-elastic_tabstops_lite";
  // import "ace-builds/src-noconflict/ext-emmet";
  // import "ace-builds/src-noconflict/ext-error_marker";
  // import "ace-builds/src-noconflict/ext-keybinding_menu";
  // import "ace-builds/src-noconflict/ext-language_tools";
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
}

import * as API from "../services/API";
import Console from "./Console.vue";
import Accordion from "../Components/Accordion.vue";

export default {
  name: "IDE",
  props: ["lang", "showSubmit", "saved_j", "saved_p", "problemID", "codeID"],
  emits: ["update"],
  data: () => ({
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
  }),
  components: {
    VAceEditor,
    Console,
    Accordion,
  },
  methods: {
    toggleIO() {
      this.showInput = !this.showInput;
      this.IOmessage = this.showInput ? "Show Output" : "Show Input";
    },
    getStyle() {
      // width: " + (this.showSubmit ? "67%" : "89%") + "!important
      var button = document.getElementById("buttonWidth");
      var numButtons = this.showSubmit ? 3 : 2;
      this.style =
        "width: calc((100% - " +
        numButtons +
        "%) - " +
        (numButtons * button.clientWidth + 2) +
        "px)!important;";
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
      console.log(res);

      payload = {
        lang: this.lang.toLowerCase(),
      };
      const res2 = await API.apiClient.post(`/code/submit/${this.problemID}`, payload);
      console.log(res2);

      this.launchConsole = true;
      // //code is saved....now need to run it
      // const res3 = await API.apiClient.post(`/containers/spin-up/${this.problemID}`, payload);
      // console.log("\nspin-up complete\n");
      // this.containerID = res3.data.message;
    },
    async submitCode() {
      this.showModal = true;

      var payload = {
        code: this.code,
      };
      const res = await API.apiClient.put(`/code/${this.codeID}`, payload);
      console.log(res);

      payload = {
        lang: this.lang.toLowerCase(),
      };
      const res2 = await API.apiClient.post(`/code/submit/${this.problemID}`, payload);
      console.log(res2);

      //code is saved now need to run and compare it
      const res3 = await API.apiClient.post(
        `/containers/grade/${this.problemID}`,
        payload
      );
      console.log(res3.data);

      console.log("\n\n\n------------ DATA DUMP:");
      const dump = res3.data.dump;

      console.log(dump);

      var currentTC = 0;

      for (let i = 0; i < res3.data.dump.length - 1; i += 4) {
        console.log("\n\n\t------------- Current TC:" + currentTC);

        var tc = {
          userOut: dump[i],
          profOut: dump[i + 1],
          compare: dump[i + 2],
          differences: dump[i + 3],
        };

        console.log("\n\nTC BEFORE:");
        console.log(tc);

        if (tc.compare == '"compilationError') {
          this.accordions = [
            {
              title: "Compilation Error",
              text: JSON.parse(tc.userOut)[0][0],
              input: this.testCases.data[i].input,
              userOut: "",
              profOut: "",
              differences: "",
              isSuccessful: false,
              hasError: true,
            },
          ];
          break;
        }
        // IF the code has an error, handle it
        else if (tc.compare == '"runtimeError"') {
          console.log("\n\tCODE ERROR");
          this.accordions[currentTC].isSuccessful = false;
          this.accordions[currentTC].hasError = true;
          this.accordions[currentTC].text = JSON.parse(tc.userOut)[0][0];
        }
        // ELSE, the code ran successfully. Now check if it was successful or not.
        else {
          console.log("\n\tCODE RAN SUCCESSFULLY");
          tc.compare = JSON.parse(tc.compare);
          tc.differences = JSON.parse(tc.differences);

          this.accordions[currentTC].differences = tc.differences;

          // IF code passed test case
          if (tc.compare[0] == "100.0") {
            console.log("\n\tTEST CASE PASSED");
            this.accordions[currentTC].isSuccessful = true;
            this.accordions[currentTC].text = "Test Case Passed :)";
          }
          // ELSE, code failed test case
          else {
            console.log("\n\tTEST CASE FAILED");
            this.accordions[currentTC].isSuccessful = false;
            this.accordions[currentTC].text = "Test Case Failed :(";
            this.accordions[currentTC].userOut = JSON.parse(tc.userOut)[0];
            this.accordions[currentTC].profOut = JSON.parse(tc.profOut)[0];
          }
        }

        console.log("\n\nTC AFTER:");
        console.log(tc);

        console.log("\n\n\tACCORDIONS:");
        console.log(this.accordions);
        console.log("\n\n");

        currentTC++;
      }

      //student Output
      //correct Output
      //line with text that says a percentage
      //followed n lines of a[0] b[0] for 6 elements
      //a[last elem] b[last elem] for 0 elements
      //starts next case
    },
    initAccordion() {
      this.accordions = [];

      for (let i = 0; i < this.testCases.data.length; i++) {
        var accordion = {
          title: this.testCases.data[i].title,
          text: "Running against test case...",
          input: this.testCases.data[i].input,
          userOut: "",
          profOut: "",
          differences: "",
          isSuccessful: "running",
          hasError: false,
        };
        this.accordions.push(accordion);
      }
    },
  },
  watch: {
    showModal: function () {
      if (!this.showModal) {
        this.initAccordion();
      }
    },
  },
  async mounted() {
    // console.log("BEFORE MOUNT");
    try {
      if (this.lang == "Java") {
        this.editorLangauge = "java";
        this.code = this.saved_j;
      } else {
        this.editorLangauge = "python";
        this.code = this.saved_p;
      }
      // console.log("Try");
    } catch (e) {
      // console.log("Catch");
    }
    this.getStyle();
    this.forceReload++;
    this.testCases = await API.apiClient.get(`/test-cases/${this.problemID}`);

    this.initAccordion();

    console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n");
    console.log(this.accordions);
    console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n");
  },
  beforeCreate() {
    // console.log(this.saved_p);
    // console.log(this.saved_j);
  },
  created() {
    // console.log(this.saved_p);
    // console.log(this.saved_j);
  },
  beforeMount() {
    // console.log(this.saved_p);
    // console.log(this.saved_j);
  },
};
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
