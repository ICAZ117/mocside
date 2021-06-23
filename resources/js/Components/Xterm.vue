<template>
  <div style="height: 100%; background: #002833">
    <div id="terminal" ref="terminal"></div>
  </div>
</template>

<script>
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import { AttachAddon } from "xterm-addon-attach";
import { WebLinksAddon } from "xterm-addon-web-links";
import { SearchAddon } from "xterm-addon-search";
import { inject } from "vue";
import { WS } from "../../../config/service/websocket.config";

import "xterm/css/xterm.css";
import "xterm/lib/xterm.js";

export default {
  props: ["containerID"],
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
      socket: "", // to save the socket
    };
  },
  watch: {
    containerID: function() {
      if(containerID != "") {
        this.socket = this.base.WS.websocket;
        const attachAddon = new AttachAddon(this.socket);
        this.term.loadAddon(attachAddon);
      }
    },
  },
  created() {
    this.wsShell();
  },

  setup() {
    // const base = inject(base, "HERE");
    // return {
    //   base,
    // };
    const base = {
      // Parameters & methods
      WS({ url, openFn, messageFn, errorFn, isInit = false } = {}) {
        return new WS({ url, openFn, messageFn, errorFn, isInit });
      },
      isObject: (obj) => {
        return Object.prototype.toString.call(obj) === '[object Object]';
      },
      isArray: (obj) => {
        return Array.isArray(obj);
      }
    };
    return {
      base,
    };
  },

  mounted() {
    let _this = this;
    // console.log("Mounted xterm page");
    const term = new Terminal({
      cursorBlink: true,
      convertEol: true,
      scrollback: true,
      cursorStyle: "bar",
      selectToClipboard: true,
    });
    const fitAddon = new FitAddon();
    const webLinksAddon = new WebLinksAddon();
    const searchAddon = new SearchAddon();


    this.socket = new WebSocket("ws://mocside.com:2376/v1.41/containers/" + this.containerID + "/attach/ws?stdin=true?stdout=true?stderr=true");
    const attachAddon = new AttachAddon(this.socket);
    // const attachAddon = new AttachAddon(this.base.WS.websocket);
    // const attachAddon = new AttachAddon();

    term.loadAddon(fitAddon);
    term.loadAddon(webLinksAddon);
    term.loadAddon(searchAddon);
    term.loadAddon(attachAddon);

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
        // console.log(ev);
        const printable = !ev.altKey && !ev.altGraphKey && !ev.ctrlKey && !ev.metaKey;

        // Because the server return command contains garbled characters, but it is not displayed when using the write method to output, so the actual display content is intercepted
        let index = _this.showOrder.indexOf("sh");
        let show = _this.showOrder.substr(index, _this.showOrder.length - 1);

        //check if Enter
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
            //send data to websocket?
            // socket.send("this is chase's test");
            console.log("sending here");
            _this.onSend(order);
            // Clear the input content variable
          }
          //check if backspace
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
          //check if up arrow or down arrow
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
          //check if tab
        } else if (ev.keyCode === 9) {
          // If you enter the first character of the string returned by the backend before pressing the tab key, this command will be displayed
          if (_this.order !== "" && show.indexOf(_this.order) == 0) {
            term.write(_this.showOrder);
          }
          //check if it does not have ctrl, alt, altgraph, or meta
        } else if (printable) {
          // When it is printable content
          // Save the input content variable
          _this.order = _this.order + key;
          // Write variables into the terminal
          term.write(key);
          //check if the ctrl key is pressed
        } else if (ev.ctrlKey) {
          // console.log("ctrl is pressed");
          // console.log("keycode: " + ev.keyCode + " keyValue is: " + ev.key);
          // console.log("keycode checks");
          if (ev.keyCode == 89) {
            console.log("ctrl + y (yank text)");
            document.execCommand("paste");
          }
          if (ev.keyCode == 81) {
            console.log("ctrl + q (qopy text)");
            document.execCommand("copy");
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
      term.onData(function (data) {
        // _this.order = data;
        // console.log("\nData:");
        // console.log(data);
        // term.write(data);
        if (data == "") {
          _this.order = data;
          // term.write(data);
          document.execCommand("paste");
          console.log("Paste");
        }
      });
    }
    runFakeTerminal(_this);
  },
  methods: {
    trim(str) {
      return str.replace(/(^\s*)|(\s*$)/g, "");
    },
    onSend(data) {
      data = this.base.isObject(data) ? JSON.stringify(data) : data;
      data = this.base.isArray(data) ? data.toString() : data;
      data = data.replace(/\\\\/, "\\");
      console.log(this.shellWs.readyState());
      this.shellWs.onSend(data);
    },
    wsShell() {
      const _this = this;
      // const socket = new WebSocket("ws://mocside.com:2376/v1.41/containers/" + this.containerID + "/attach/ws?stdin=true?stdout=true?stderr=true");
      // let tag = this.urlParam.Tag;
      // let name = this.urlParam.name;
      // let pod = this.urlParam.pod;
      let stdin = true;
      let stdout = true;
      let stderr = true;

      // let query = `?tag=${tag}&name=${name}&pod=${pod}`;
      let query = `?stdin=${stdin}&stdout=${stdout}&stderr=${stderr}`;
      let url = `v1.41/containers/${this.containerID}/attach/ws${query}`; // websocket Connection Interface

      this.shellWs = this.base.WS({
        url,
        isInit: true,
        openFn() {
          //   _this.term.resize({ rows: _this.rows, cols: 100 }); //Resize the terminal window and trigger term.on("resize")
        },
        messageFn(e) {
          console.log("message", e);
          if (e) {
            let data = JSON.parse(e.data);
            if (data.Data == "\n" || data.Data == "\r\nexit\r\n") {
              _this.$message("Connection closed");
            }
            // Print back-end return data
            _this.term.write(data.Data);
          }
        },
        errorFn(e) {
          //An error occurs to close the current ws, and prompt
          console.log("error", e);
          _this.$message.error({
            message: "ws The request failed, please refresh and try again~",
            duration: 5000,
          });
        },
      });
    },
  },
};
</script>

<style></style>
