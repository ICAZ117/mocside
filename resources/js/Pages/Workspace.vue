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

        <div class="codemirror">
          <div v-if="code != null">
            <codemirror
              style="text-align: left; height: 100%"
              v-model="code"
              :options="cmOption"
            ></codemirror>
          </div>
        </div>
      </div>

      <div class="console row"></div>
    </div>
  </div>
</template>

<script>
// language

// theme css
//import 'codemirror/theme/base16-dark.css'
//import 'codemirror/theme/solarized.css'
import "codemirror/theme/monokai.css";
import "codemirror/mode/python/python.js";
import "codemirror/mode/yaml/yaml.js";

// active-line.js
import "codemirror/addon/selection/active-line.js";

// styleSelectedText
import "codemirror/addon/selection/mark-selection.js";
import "codemirror/addon/search/searchcursor.js";

// highlightSelectionMatches
import "codemirror/addon/scroll/annotatescrollbar.js";
import "codemirror/addon/search/matchesonscrollbar.js";
import "codemirror/addon/search/searchcursor.js";
import "codemirror/addon/search/match-highlighter.js";

// keyMap
import "codemirror/mode/clike/clike.js";
import "codemirror/addon/edit/matchbrackets.js";
import "codemirror/addon/comment/comment.js";
import "codemirror/addon/dialog/dialog.js";
import "codemirror/addon/dialog/dialog.css";
import "codemirror/addon/search/searchcursor.js";
import "codemirror/addon/search/search.js";
import "codemirror/keymap/sublime.js";
import "codemirror/keymap/vim.js";

// foldGutter
import "codemirror/addon/fold/foldgutter.css";
import "codemirror/addon/fold/brace-fold.js";
import "codemirror/addon/fold/comment-fold.js";
import "codemirror/addon/fold/foldcode.js";
import "codemirror/addon/fold/foldgutter.js";
import "codemirror/addon/fold/indent-fold.js";
import "codemirror/addon/fold/markdown-fold.js";
import "codemirror/addon/fold/xml-fold.js";

import _ from 'lodash'

function betterTab(cm) {
  if (cm.somethingSelected()) {
    cm.indentSelection("add");
  } else {
    cm.replaceSelection(
      cm.getOption("indentWithTabs")
        ? "\t"
        : Array(cm.getOption("indentUnit") + 1).join(" "),
      "end",
      "+input"
    );
  }
}

export default {
  props: ["problemID"],
  emits: ["assignment-unmounting"],
  data() {
    return {
      assignment: {},
      code: null,
      firstLoad: true,
      cmOption: {
        tabSize: 4,
        foldGutter: true,
        autoCloseBrackets: true,
        styleActiveLine: true,
        lineNumbers: true,
        line: true,
        keyMap: "vim",
        //mode: 'text/x-vue',
        //mode: 'text/x-csrc',
        mode: "text/x-python",
        //theme: 'base16-dark',
        //theme: 'solarized light',
        theme: "monokai",
        extraKeys: {
          F11(cm) {
            cm.setOption("fullScreen", !cm.getOption("fullScreen"));
          },
          Tab: betterTab,
          //'Esc'(cm) {
          //  if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false)
          //}
        },
      },
    };
  },
  methods: {
    onCmCursorActivity(codemirror) {
      //console.log('onCmCursorActivity', codemirror)
    },
    onCmReady(codemirror) {
      //console.log('onCmReady', codemirror)
    },
    onCmFocus(codemirror) {
      //console.log('onCmFocus', codemirror)
    },
    onCmBlur(codemirror) {
      //console.log('onCmBlur', codemirror)
    },
    saveCode: _.debounce((obj) => {
      //console.log('saving code', code)
      if (obj.firstLoad) {
        obj.firstLoad = false;
        return;
      }
      if (obj.code == null) return;
      let doc = {
        path: obj.$route.path,
        doc: obj.code,
      };
      obj.axios.put("http://docker:7777", doc);
    }, 2000),
    loadData(path = null) {
      if (this.$route.path == "/") return;

      let doc = {
        path: path == null ? this.$route.path : path,
      };
      this.code = null;
      this.axios.post("http://docker:7777", doc).then((rs) => {
        //console.log('load data', rs.data)
        this.firstLoad = true;
        this.code = rs.data.body;
      });
    },
    async getAssignment() {
      //this route needs to be worked on and adjusted
      const rawAssignment = await API.apiClient.get(`/problems/${this.labID}`);
      this.assignment = rawAssignment.data;
    },
  },
  mounted() {
    this.loadData();
    // this.getAssignment();
    console.log("getAssignment");
  },
  beforeUnmount() {
    this.$emit("assignment-unmounting");
  },
  watch: {
    $route(to, from) {
      this.loadData(to.path);
    },
    code: function () {
      //console.log('changed')
      this.saveCode(this);
    },
  },
};
</script>
