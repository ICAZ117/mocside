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
        <v-ace-editor
          class="editor"
          v-model:value="content"
          @init="editorInit"
          :lang="lang"
          :theme="theme"
        />
        <div class="row px-1">
          <button type="run" name="run" class="run-code col-1 btn btn-success">
            Run
          </button>
          <button type="submit" name="submit" class="submit-code col-1 btn btn-success">
            Submit
          </button>
          <div class="col-10">
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
            <label for="lang" class="workspace-label">Language: </label>
            <select v-model="lang" id="lang" class="console-select form-select">
              <option value="java" selected>Java</option>
              <option value="python">Python</option>
            </select>
          </div>
        </div>
      </div>
      <div class="console row"></div>
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
  // import "ace-builds/src-noconflict/mode-abap";
  // import "ace-builds/src-noconflict/mode-abc";
  // import "ace-builds/src-noconflict/mode-actionscript";
  // import "ace-builds/src-noconflict/mode-ada";
  // import "ace-builds/src-noconflict/mode-alda";
  // import "ace-builds/src-noconflict/mode-apache_conf";
  // import "ace-builds/src-noconflict/mode-apex";
  // import "ace-builds/src-noconflict/mode-applescript";
  // import "ace-builds/src-noconflict/mode-aql";
  // import "ace-builds/src-noconflict/mode-asciidoc";
  // import "ace-builds/src-noconflict/mode-asl";
  // import "ace-builds/src-noconflict/mode-assembly_x86";
  // import "ace-builds/src-noconflict/mode-autohotkey";
  // import "ace-builds/src-noconflict/mode-batchfile";
  // import "ace-builds/src-noconflict/mode-c9search";
  // import "ace-builds/src-noconflict/mode-c_cpp";
  // import "ace-builds/src-noconflict/mode-cirru";
  // import "ace-builds/src-noconflict/mode-clojure";
  // import "ace-builds/src-noconflict/mode-cobol";
  // import "ace-builds/src-noconflict/mode-coffee";
  // import "ace-builds/src-noconflict/mode-coldfusion";
  // import "ace-builds/src-noconflict/mode-crystal";
  // import "ace-builds/src-noconflict/mode-csharp";
  // import "ace-builds/src-noconflict/mode-csound_document";
  // import "ace-builds/src-noconflict/mode-csound_orchestra";
  // import "ace-builds/src-noconflict/mode-csound_score";
  // import "ace-builds/src-noconflict/mode-csp";
  // import "ace-builds/src-noconflict/mode-css";
  // import "ace-builds/src-noconflict/mode-curly";
  // import "ace-builds/src-noconflict/mode-d";
  // import "ace-builds/src-noconflict/mode-dart";
  // import "ace-builds/src-noconflict/mode-diff";
  // import "ace-builds/src-noconflict/mode-django";
  // import "ace-builds/src-noconflict/mode-dockerfile";
  // import "ace-builds/src-noconflict/mode-dot";
  // import "ace-builds/src-noconflict/mode-drools";
  // import "ace-builds/src-noconflict/mode-edifact";
  // import "ace-builds/src-noconflict/mode-eiffel";
  // import "ace-builds/src-noconflict/mode-ejs";
  // import "ace-builds/src-noconflict/mode-elixir";
  // import "ace-builds/src-noconflict/mode-elm";
  // import "ace-builds/src-noconflict/mode-erlang";
  // import "ace-builds/src-noconflict/mode-forth";
  // import "ace-builds/src-noconflict/mode-fortran";
  // import "ace-builds/src-noconflict/mode-fsharp";
  // import "ace-builds/src-noconflict/mode-fsl";
  // import "ace-builds/src-noconflict/mode-ftl";
  // import "ace-builds/src-noconflict/mode-gcode";
  // import "ace-builds/src-noconflict/mode-gherkin";
  // import "ace-builds/src-noconflict/mode-gitignore";
  // import "ace-builds/src-noconflict/mode-glsl";
  // import "ace-builds/src-noconflict/mode-gobstones";
  // import "ace-builds/src-noconflict/mode-golang";
  // import "ace-builds/src-noconflict/mode-graphqlschema";
  // import "ace-builds/src-noconflict/mode-groovy";
  // import "ace-builds/src-noconflict/mode-haml";
  // import "ace-builds/src-noconflict/mode-handlebars";
  // import "ace-builds/src-noconflict/mode-haskell";
  // import "ace-builds/src-noconflict/mode-haskell_cabal";
  // import "ace-builds/src-noconflict/mode-haxe";
  // import "ace-builds/src-noconflict/mode-hjson";
  // import "ace-builds/src-noconflict/mode-html";
  // import "ace-builds/src-noconflict/mode-html_elixir";
  // import "ace-builds/src-noconflict/mode-html_ruby";
  // import "ace-builds/src-noconflict/mode-ini";
  // import "ace-builds/src-noconflict/mode-io";
  // import "ace-builds/src-noconflict/mode-jack";
  // import "ace-builds/src-noconflict/mode-jade";
  // import "ace-builds/src-noconflict/mode-javascript";
  // import "ace-builds/src-noconflict/mode-json";
  // import "ace-builds/src-noconflict/mode-json5";
  // import "ace-builds/src-noconflict/mode-jsoniq";
  // import "ace-builds/src-noconflict/mode-jsp";
  // import "ace-builds/src-noconflict/mode-jssm";
  // import "ace-builds/src-noconflict/mode-jsx";
  // import "ace-builds/src-noconflict/mode-julia";
  // import "ace-builds/src-noconflict/mode-kotlin";
  // import "ace-builds/src-noconflict/mode-latex";
  // import "ace-builds/src-noconflict/mode-less";
  // import "ace-builds/src-noconflict/mode-liquid";
  // import "ace-builds/src-noconflict/mode-lisp";
  // import "ace-builds/src-noconflict/mode-livescript";
  // import "ace-builds/src-noconflict/mode-logiql";
  // import "ace-builds/src-noconflict/mode-logtalk";
  // import "ace-builds/src-noconflict/mode-lsl";
  // import "ace-builds/src-noconflict/mode-lua";
  // import "ace-builds/src-noconflict/mode-luapage";
  // import "ace-builds/src-noconflict/mode-lucene";
  // import "ace-builds/src-noconflict/mode-makefile";
  // import "ace-builds/src-noconflict/mode-markdown";
  // import "ace-builds/src-noconflict/mode-mask";
  // import "ace-builds/src-noconflict/mode-matlab";
  // import "ace-builds/src-noconflict/mode-maze";
  // import "ace-builds/src-noconflict/mode-mediawiki";
  // import "ace-builds/src-noconflict/mode-mel";
  // import "ace-builds/src-noconflict/mode-mixal";
  // import "ace-builds/src-noconflict/mode-mushcode";
  // import "ace-builds/src-noconflict/mode-mysql";
  // import "ace-builds/src-noconflict/mode-nginx";
  // import "ace-builds/src-noconflict/mode-nim";
  // import "ace-builds/src-noconflict/mode-nix";
  // import "ace-builds/src-noconflict/mode-nsis";
  // import "ace-builds/src-noconflict/mode-nunjucks";
  // import "ace-builds/src-noconflict/mode-objectivec";
  // import "ace-builds/src-noconflict/mode-ocaml";
  // import "ace-builds/src-noconflict/mode-pascal";
  // import "ace-builds/src-noconflict/mode-perl";
  // import "ace-builds/src-noconflict/mode-perl6";
  // import "ace-builds/src-noconflict/mode-pgsql";
  // import "ace-builds/src-noconflict/mode-php";
  // import "ace-builds/src-noconflict/mode-php_laravel_blade";
  // import "ace-builds/src-noconflict/mode-pig";
  // import "ace-builds/src-noconflict/mode-plain_text";
  // import "ace-builds/src-noconflict/mode-powershell";
  // import "ace-builds/src-noconflict/mode-praat";
  // import "ace-builds/src-noconflict/mode-prisma";
  // import "ace-builds/src-noconflict/mode-prolog";
  // import "ace-builds/src-noconflict/mode-properties";
  // import "ace-builds/src-noconflict/mode-protobuf";
  // import "ace-builds/src-noconflict/mode-puppet";
  // import "ace-builds/src-noconflict/mode-qml";
  // import "ace-builds/src-noconflict/mode-r";
  // import "ace-builds/src-noconflict/mode-razor";
  // import "ace-builds/src-noconflict/mode-rdoc";
  // import "ace-builds/src-noconflict/mode-red";
  // import "ace-builds/src-noconflict/mode-redshift";
  // import "ace-builds/src-noconflict/mode-rhtml";
  // import "ace-builds/src-noconflict/mode-rst";
  // import "ace-builds/src-noconflict/mode-ruby";
  // import "ace-builds/src-noconflict/mode-rust";
  // import "ace-builds/src-noconflict/mode-sass";
  // import "ace-builds/src-noconflict/mode-scad";
  // import "ace-builds/src-noconflict/mode-scala";
  // import "ace-builds/src-noconflict/mode-scheme";
  // import "ace-builds/src-noconflict/mode-scss";
  // import "ace-builds/src-noconflict/mode-sh";
  // import "ace-builds/src-noconflict/mode-sjs";
  // import "ace-builds/src-noconflict/mode-slim";
  // import "ace-builds/src-noconflict/mode-smarty";
  // import "ace-builds/src-noconflict/mode-snippets";
  // import "ace-builds/src-noconflict/mode-soy_template";
  // import "ace-builds/src-noconflict/mode-space";
  // import "ace-builds/src-noconflict/mode-sparql";
  // import "ace-builds/src-noconflict/mode-sql";
  // import "ace-builds/src-noconflict/mode-sqlserver";
  // import "ace-builds/src-noconflict/mode-stylus";
  // import "ace-builds/src-noconflict/mode-svg";
  // import "ace-builds/src-noconflict/mode-swift";
  // import "ace-builds/src-noconflict/mode-tcl";
  // import "ace-builds/src-noconflict/mode-terraform";
  // import "ace-builds/src-noconflict/mode-tex";
  // import "ace-builds/src-noconflict/mode-text";
  // import "ace-builds/src-noconflict/mode-textile";
  // import "ace-builds/src-noconflict/mode-toml";
  // import "ace-builds/src-noconflict/mode-tsx";
  // import "ace-builds/src-noconflict/mode-turtle";
  // import "ace-builds/src-noconflict/mode-twig";
  // import "ace-builds/src-noconflict/mode-typescript";
  // import "ace-builds/src-noconflict/mode-vala";
  // import "ace-builds/src-noconflict/mode-vbscript";
  // import "ace-builds/src-noconflict/mode-velocity";
  // import "ace-builds/src-noconflict/mode-verilog";
  // import "ace-builds/src-noconflict/mode-vhdl";
  // import "ace-builds/src-noconflict/mode-visualforce";
  // import "ace-builds/src-noconflict/mode-wollok";
  // import "ace-builds/src-noconflict/mode-xml";
  // import "ace-builds/src-noconflict/mode-xquery";
  // import "ace-builds/src-noconflict/mode-yaml";
  // import "ace-builds/src-noconflict/mode-zeek";
}
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

export default {
  props: ["problemID"],
  emits: ["assignment-unmounting"],
  data() {
    return {
      assignment: {},
      theme: "gob",
      lang: "java",
      content: "",
    };
  },
  methods: {
    async getAssignment() {
      //this route needs to be worked on and adjusted
      const rawAssignment = await API.apiClient.get(`/problems/${this.labID}`);
      this.assignment = rawAssignment.data;
    },
  },
  components: {
    VAceEditor,
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
