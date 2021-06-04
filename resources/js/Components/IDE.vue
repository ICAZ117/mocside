<template>
<div class="work-area">
    <div class="editor row" style="padding: 0 !important; background-color: rgb(58, 58, 58)">
        <v-ace-editor class="editor" v-model:value="content" :lang="editorLangauge" :theme="theme" />
        <div class="row px-1 my-1">
            <button type="run" name="run" class="run-code col-1 btn btn-success">
                Run
            </button>
            <button type="submit" name="submit" class="submit-code col-1 btn btn-success">
                Submit
            </button>
            <div style="width: 78% !important">
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
    <div class="console row"></div>
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

export default {
    name: "IDE",
    props: ["lang"],
    data() {
        return {
            theme: "gob",
            content: "",
            editorLangauge: "",
        };
    },
    components: {
        VAceEditor,
    },
    beforeMount() {
        if (this.lang == "Java") {
            this.editorLangauge = "java";
        } else {
            this.editorLangauge = "python";
        }
    },
};
</script>

<style></style>
