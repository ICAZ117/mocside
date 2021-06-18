<template>
  <div style="height: 100%; background: #002833">
    <div id="terminal" ref="terminal"></div>
  </div>
</template>

<script>
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
// import {AttachAddon} from "xterm-addon-attach";
import { WebLinksAddon } from "xterm-addon-web-links";
import { SearchAddon } from "xterm-addon-search";

import "xterm/css/xterm.css";
import "xterm/lib/xterm.js";

export default {
  name: "Shell",
  data() {
    return {
      order: "",
      urlParam: {
        fullTag: "",
        namespace: "",
        podName: "",
      },
      shellWs: "", // ws instance
      term: "", // save the terminal instance
      showOrder: "", // Save the command returned by the server
      inputList: [], // Save the commands entered by the user to switch between the upper and lower keys
    };
  },

  created() {
    // this.wsShell();
  },

  mounted() {
    let _this = this;
    console.log("Mounted xterm page");
    const term = new Terminal({
      rows: 40,
      cursorBlink: true,
      convertEol: true,
      scrollback: true,
      cursorStyle: "bar",
      selectToClipboard: true,
    });
    const fitAddon = new FitAddon();
    const webLinksAddon = new WebLinksAddon();
    const searchAddon = new SearchAddon();

    // const socket = new WebSocket("");
    // const attachAddon = new AttachAddon(socket);

    term.loadAddon(fitAddon);
    term.loadAddon(webLinksAddon);
    term.loadAddon(searchAddon);
    // terminal.loadAddon(attachAddon);

    // wrap and enter the start character "$"
    term.prompt = () => {
      term.write("\r\n$ ");
    };

    term.open(this.$refs["terminal"]);
    fitAddon.fit();

    term.writeln("Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ");
    term.prompt();

    function runFakeTerminal(_this) {
      if (term._initialized) {
        return;
      }

      term._initialized = true;

      term.prompt = () => {
        term.write("\r\n ");
      };

      term.writeln("Welcome to xterm.js");
      term.writeln(
        "This is a local terminal emulation, without a real terminal in the back-end."
      );
      term.writeln("Type some keys and commands to play around.");
      term.writeln("");
      term.prompt();

      // monitor keyboard input events
      // / **
      // *Add an event listener for events when the key is pressed. Event value contains
      // *The string that will be sent in the data event and DOM event
      // * Triggered it.
      // * @Return an IDisposable to stop monitoring.
      // * /
      let last = 0;

      term.onKey(function (k) {
        // Printable status, that is, not the alt key ctrl and other functions are healthy
        let ev = k.domEvent;
        let key = k.domEvent.key;
        console.log(ev);
        const printable = !ev.altKey && !ev.altGraphKey && !ev.ctrlKey && !ev.metaKey;

        // Because the server return command contains garbled characters, but it is not displayed when using the write method to output, so the actual display content is intercepted
        let index = _this.showOrder.indexOf("sh");
        let show = _this.showOrder.substr(index, _this.showOrder.length - 1);

        //
        if (ev.keyCode === 13) {
          if (_this.order == "cls" || _this.order == "clear") {
            _this.order = "";
            return false;
          }
          //Send the data first
          term.prompt();
          // Determine if it is not in English and give a reminder
          let reg = /[a-zA-Z]/;
          let order = {
            Data: _this.order,
            Op: "stdin",
          };

          if (!reg.test(_this.order)) {
            term.writeln("Please enter a valid command~");
          } else {
            // send data
            _this.inputList.push(_this.order);
            last = _this.inputList.length - 1;
            _this.onSend(order);
            // Clear the input content variable
          }
        } else if (ev.keyCode === 8) {
          // When the input exit

          // Do not delete the prompt
          // If the character length of the current line is equal to the character returned by the backend, it will not be deleted
          if (term._core.buffer.x > _this.showOrder.length) {
            term.write("\b \b"); // output backspace
          }

          // delete the input content variable

          if (_this.trim(_this.order) == _this.trim(_this.showOrder)) {
            return false;
          } else {
            _this.order = _this.order.substr(0, _this.order.length - 1);
          }
        } else if (ev.keyCode == 38 || ev.keyCode == 40) {
          let len = _this.inputList.length;
          let code = ev.keyCode;

          if (code === 38 && last <= len && last >= 0) {
            // Take out the last element of the string array directly
            let inputVal = _this.inputList[last];
            term.write(inputVal);
            if (last > 0) {
              last--;
            }
          }
          if (code === 40 && last < len) {
            // last is now the current element
            if (last == len - 1) {
              return;
            }
            if (last < len - 1) {
              last++;
            }

            let inputVal = _this.inputList[last];
            term.write(inputVal);
          }
        } else if (ev.keyCode === 9) {
          // If you enter the first character of the string returned by the backend before pressing the tab key, this command will be displayed
          if (_this.order !== "" && show.indexOf(_this.order) == 0) {
            term.write(_this.showOrder);
          }
        } else if (printable) {
          // When it is printable content
          // Save the input content variable
          _this.order = _this.order + key;
          // Write variables into the terminal
          term.write(key);
        } else if (ev.ctrlKey && ev.altKey) {
          // Copy (c)
          if (ev.keyCode == 67) {
            console.log("ctrl + c");
            document.execCommand("copy");
          }
          // Cut (x)
          else if (ev.keyCode == 88) {
            console.log("ctrl + x");
            document.execCommand("cut");
          }
          // Paste (v)
          else if (ev.keycode == 66) {
            console.log("ctrl + b");
            document.execCommand("paste");
          }
        }

        function mypasteEvent(ev) {
          ev.stopPropagation();
          if (copiedText === undefined || copiedText === "") {
            copiedText = ev.clipboardData.getData("text/plain");
            if (copiedText === undefined || copiedText === "") {
              copiedText = window.getSelection("Text").toString();
              if (copiedText === undefined || copiedText === "") {
                console.log("clipboard has no data!");
              }
            }
          }
          commands.push(copiedText);
          copiedText = "";
          ev.preventDefault();
        }
        // else if (printable) {
        // // When it is printable content
        // if (/[a-zA-Z]/.test(key)) {
        // key = key.toLowerCase();
        //}
        // // Save the input content variable
        // _this.order = _this.order + key;
        // // Write variables into the terminal
        //   term.write(key);
        // }
      });

      _this.term = term;

      // Paste event
      // term.onData(function (data) {
      //   _this.order = data;
      //   console.log(data);
      //   term.write(data);
      // });
    }
    runFakeTerminal(_this);
  },

  methods: {
    trim(str) {
      return str.replace(/(^\s*)|(\s*$)/g, "");
    },
  },
};
</script>

<style></style>
