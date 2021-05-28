<template>
  <!-- Main Page-->
  <div class="row">
    <div class="instructions col-4">
      <h4>Problem X: Title</h4>
      <hr class="instructions-hr" />
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio cupiditate
        praesentium similique vel quasi tempore. Facilis, voluptatum accusamus possimus
        eaque, expedita voluptate modi aspernatur at distinctio dignissimos sapiente?
        Eligendi, ratione incidunt odio consequatur voluptatem modi natus, qui, quidem
        nesciunt iusto provident fugit rerum fugiat ipsum!
        <br /><br />
        <b>Input:</b><br />
        <br /><br />
        <b>Output:</b><br />
        World!
      </p>
    </div>
    <div class="work-area col-8">
      <div
        class="editor row"
        style="padding: 0 !important; background-color: rgb(58, 58, 58)"
      >
        <!-- 
                <p>
                    class Main {<br /><br />
                    &nbsp;&nbsp;&nbsp;&nbsp;public static void main(String[] args) {<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// Put your code here<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;}<br /><br />
                    }</p>-->
        <!-- <textarea id="editor" cols="30" rows="10"></textarea> -->

        <form class="editorform" method="POST">
          <textarea
            name="editor"
            id="editor"
            cols="150"
            rows="1"
            placeholder="class Main {&NewLine;&Tab;public static void main(String[] args) {&NewLine;&Tab;&Tab;// Put your code here&NewLine;&Tab;}&NewLine;}"
          ></textarea>
          <input type="submit" name="submit" class="btn btn-success" />
        </form>

        <!--Editor-->
        <div style="margin-left: 21vw; display: flex">
          <p>
            Select a Theme:
            <select onchange="selectTheme()" id="themeSelect">
              <option>default</option>
              <option>3024-night</option>
              <option>ayu-dark</option>
              <option>base16-dark</option>
              <option>blackboard</option>
              <option>cobalt</option>
              <option>colorforth</option>
              <option selected>darcula</option>
              <option>eclipse</option>
              <option>elegant</option>
              <option>gruvbox-dark</option>
              <option>icecoder</option>
              <option>idea</option>
              <option>isotope</option>
              <option>lucario</option>
              <option>midnight</option>
              <option>monokai</option>
              <option>neat</option>
              <option>neo</option>
              <option>railscasts</option>
              <option>rubyblue</option>
              <option>seti</option>
              <option>solarized dark</option>
              <option>the-matrix</option>
              <option>tomorrow-night-bright</option>
              <option>ttcn</option>
              <option>xq-dark</option>
              <option>xq-light</option>
              <option>yonce</option>
            </select>
          </p>
          <p style="margin-left: 50px">
            Select a Language:
            <select onchange=" selectMode()" id="modeSelect">
              <option>python</option>
              <option selected>text/x-java</option>
            </select>
          </p>
        </div>
      </div>

      <div class="console row"></div>
    </div>
  </div>
</template>

<script>
import CodeMirror from "../../assets/codemirror/lib/codemirror";

// the css stylesheet for the text editor object

import "../../assets/codemirror/lib/codemirror.css";

// theme links
// Dark Themes
// how to call
import "../../assets/codemirror/theme/3024-night.css";
// 3024-night
import "../../assets/codemirror/theme/ayu-dark.css";
// ayu-dark
import "../../assets/codemirror/theme/base16-dark.css";
// base16-dark
import "../../assets/codemirror/theme/blackboard.css";
// blackboard
import "../../assets/codemirror/theme/cobalt.css";
// cobalt
import "../../assets/codemirror/theme/colorforth.css";
// colorforth
import "../../assets/codemirror/theme/darcula.css";
// darcula
import "../../assets/codemirror/theme/gruvbox-dark.css";
// gruvbox-dark
import "../../assets/codemirror/theme/icecoder.css";
// icecoder
import "../../assets/codemirror/theme/isotope.css";
// isotope
import "../../assets/codemirror/theme/lucario.css";
// lucario
import "../../assets/codemirror/theme/midnight.css";
// midnight
import "../../assets/codemirror/theme/monokai.css";
// monokai
import "../../assets/codemirror/theme/railscasts.css";
// railscasts
import "../../assets/codemirror/theme/rubyblue.css";
// rubyblue
import "../../assets/codemirror/theme/seti.css";
// seti
import "../../assets/codemirror/theme/solarized.css";
// solarized dark
import "../../assets/codemirror/theme/the-matrix.css";
// the-matrix
import "../../assets/codemirror/theme/tomorrow-night-bright.css";
// tomorrow-night-bright
import "../../assets/codemirror/theme/xq-dark.css";
// xq-dark
import "../../assets/codemirror/theme/yonce.css";
// yonce

// Light Themes
import "../../assets/codemirror/theme/eclipse.css";
// eclispe
import "../../assets/codemirror/theme/elegant.css";
// elegant
import "../../assets/codemirror/theme/idea.css";
// idea
import "../../assets/codemirror/theme/neat.css";
// neat
import "../../assets/codemirror/theme/neo.css";
// neo
import "../../assets/codemirror/theme/ttcn.css";
// ttcn
import "../../assets/codemirror/theme/xq-light.css";
// xq-light

// Extra Styling
import "../../assets/codemirror/addon/scroll/simplescrollbars.css";

// Add-ons
// General Addons
import "../../assets/codemirror/addon/scroll/simplescrollbars.js";
import "../../assets/codemirror/addon/edit/matchbrackets.js";
import "../../assets/codemirror//addon/edit/closebrackets.js";
// Code Folding
import "../../assets/codemirror/addon/fold/foldcode.js";
import "../../assets/codemirror/addon/fold/foldgutter.js";
import "../../assets/codemirror/addon/fold/foldgutter.css";
// HTML Addons
import "../../assets/codemirror/addon/edit/closetag.js";
// Python Addons
// Python folding
import "../../assets/codemirror/addon/fold/indent-fold.js";
// Java addons
// Java folding
import "../../assets/codemirror/addon/fold/brace-fold.js";
import "../../assets/codemirror/addon/fold/comment-fold.js";
// Hinting
import "../../assets/codemirror/addon/hint/show-hint.js";
import "../../assets/codemirror/addon/hint/show-hint.css";
import "../../assets/codemirror/addon/hint/anyword-hint.js";
// not working, but java hints work

// Language Modes
// HMTL
import "../../assets/codemirror/mode/xml/xml.js";
// xml
// Python
import "../../assets/codemirror/mode/python/python.js";
// python
// Java
import "../../assets/codemirror/mode/clike/clike.js";
// text/x-java

import * as API from "../services/API";

console.log(1);

var editor = CodeMirror.fromTextArea(document.getElementById("editor"), {
  //the following are settings for the editor area, given through an object
  mode: "text/x-java", //works
  theme: "darcula", //works
  lineNumbers: true, //works
  matchBrackets: true, //works
  autoCloseBrackets: true, //works
  scrollbarStyle: "overlay", //works
  foldGutter: {
    rangefinder: new CodeMirror.fold.combine(
      console.log(1.1),
      CodeMirror.fold.indent,
      CodeMirror.fold.comment,
      CodeMirror.fold.brace,
      console.log(1.2),
    ),
  },
  gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
  extraKeys: {
    "Ctrl-Space": "autocomplete",
  },
},
console.log(1.3),
);

console.log(2);

//the following are also settings for the editor area
editor.setSize("calc(2 * (100vw / 3))", "500px");

console.log(3);

var ExcludedTriggerValues = {
  Enter: "13",
  Tab: "9",
  Backspace: "8",
  Shift: "16",
  Control: "17",
  Alt: "18",
  " ": "32",
  "[": "219",
  "]": "221",
  "{": "219",
  "}": "221",
  "(": "57",
  ")": "48",
  "/": "191",
  "?": "191",
  ";": "59",
  ":": "59",
  CapsLock: "20",
  "'": "222",
  '"': "222",
  "\\": "220",
  "|": "220",
  "=": "61",
  "+": "61",
  "-": "173",
  _: "173",
  "`": "192",
  "~": "192",
  ",": "188",
  "<": "188",
  ">": "190",
  F1: "112",
  F2: "113",
  F3: "114",
  F4: "115",
  F6: "117",
  F7: "118",
  F8: "119",
  F9: "120",
  F10: "121",
  F11: "122",
  F12: "123",
  NumLock: "144",
  PageUp: "33",
  PageDown: "34",
  Home: "36",
  End: "35",
  Insert: "45",
  Delete: "46",
  ArrowLeft: "37",
  ArrowUp: "38",
  ArrowRight: "39",
  ArrowDown: "40",
  ScrollLock: "145",
  Pause: "19",
  PrintScreen: "44",
  "!": "49",
  "@": "50",
  "#": "51",
  $: "52",
  "%": "53",
  "^": "54",
  "&": "55",
  "*": "56",
  OS: "91",
  ContextMenu: "93",
};

console.log(4);

editor.on("keydown", function (editor, event) {
  var __Cursor = editor.getDoc().getCursor();
  var __Token = editor.getTokenAt(__Cursor);

  if (
    !editor.state.completionActive &&
    !ExcludedTriggerValues[(event.key || event.which).toString()] &&
    !(
      __Token.type == "tag" ||
      __Token.string == " " ||
      __Token.string == "<" ||
      __Token.string == "/"
    )
  ) {
    editor.showHint({
      completeSingle: false,
    });
  }
});

console.log(5);

//changing the Theme
var input = document.getElementById("themeSelect");

console.log(6);

function selectTheme() {
  var theme = input.options[input.selectedIndex].textContent;
  editor.setOption("theme", theme);
  location.hash = "#" + location.hash.slice(1).split("+")[0] + "+" + theme;

  console.log(editor.getValue()); //this is to show how to get the editor value out of it
}

console.log(7);

//changing the Mode
var input2 = document.getElementById("modeSelect");

console.log(8);

function selectMode() {
  var mode = input2.options[input2.selectedIndex].textContent;
  editor.setOption("mode", mode);
  location.hash = "#" + mode + "+" + location.hash.slice(1).split("+")[1];
}

console.log(9);

//the following is for if the url is changed instead of using the selection box
var choice =
  (location.hash && location.hash.slice(1)) ||
  (document.location.search && decodeURIComponent(document.location.search.slice(1)));
//location.hash returns a part of the url...example: http://127.0.0.1:5500/index.html#eclipse   will return #eclipse    slice method removes the #

console.log(10);

var mode = choice.split("+")[0];

console.log(11);

var theme = choice.split("+")[1];

console.log(12);

if (theme) {
  input.value = theme; //this is where the blank is happening i think
  editor.setOption("theme", theme);
}

console.log(13);

if (mode) {
  input2.value = mode;
  editor.setOption("mode", mode);
}

console.log(14);

//this is called when the hashvalue in the url is changed
CodeMirror.on(window, "hashchange", function () {
  var strin = location.hash.slice(1).split("+");
  var mode = strin[0];
  var theme = strin[1];
  if (mode) {
    input2.value = mode;
    selectMode();
  }
  if (theme) {
    input.value = theme;
    selectTheme();
  }
});

console.log(15);

export default {
  props: ["problemID"],
  emits: ["assignment-unmounting"],
  data() {
    return {
      assignment: {},
    };
  },
  methods: {
    async getAssignment() {
      //this route needs to be worked on and adjusted
      const rawAssignment = await API.apiClient.get(`/problems/${this.labID}`);
      this.assignment = rawAssignment.data;
    },
  },
  mounted() {
    // this.getAssignment();
    console.log("getAssignment");
  },
  beforeUnmount() {
    this.$emit("assignment-unmounting");
  },
};
</script>
