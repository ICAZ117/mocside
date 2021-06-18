<template>
  <div 
  style="height: 100%;
  background: #002833;">
    <div id="terminal" ref="terminal"></div>
  </div>
</template>

<script>
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
// import { AttachAddon } from "xterm-addon-attach";
import { WebLinksAddon } from "xterm-addon-web-links";
import { SearchAddon } from "xterm-addon-search";

import "xterm/css/xterm.css";
import "xterm/lib/xterm.js";

const terminal = new Terminal();
const fitAddon = new FitAddon();
const webLinksAddon = new WebLinksAddon();
const searchAddon = new SearchAddon();

// const socket = new WebSocket("");
// const attachAddon = new AttachAddon(socket);

terminal.loadAddon(fitAddon);
terminal.loadAddon(webLinksAddon);
terminal.loadAddon(searchAddon);
// terminal.loadAddon(attachAddon);

terminal.open(document.getElementById('terminal'));

fitAddon.fit();

term.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ')

export default {
  name: "Shell",
  data() {
    return {
      shellWs: "",
      term: "",
      rows: 40,
      cols: 100,
    };
  },

  created() {
    // this.wsShell();
  },

  mounted() {
    console.log('Mounted xterm page');
  },
}
</script>

<style>

</style>