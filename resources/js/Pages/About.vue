<template>
  <div style="height: 100%; background: #002833">
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

export default {
  name: "Shell",
  data() {
    return {
      order: "",
      urlParam: {
        fullTag: "",
        namespace: "",
        podName: ""
      },
      shellWs: "", // ws实例
      term: "", // 保存terminal实例
      showOrder: "", // 保存服务端返回的命令
      inputList: [] // 保存用户输入的命令，用以上下健切换
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

    // 换行并输入起始符“$”
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

      // 监控键盘输入事件
      // / **
      //     *添加事件监听器，用于按下键时的事件。事件值包含
      //     *将在data事件以及DOM事件中发送的字符串
      //     *触发了它。
      //     * @返回一个IDisposable停止监听。
      //  * /
      let last = 0;

      term.onKey(function (key, ev) {
        // 可打印状态，即不是alt键ctrl等功能健时
        const printable =
          !ev.altKey && !ev.altGraphKey && !ev.ctrlKey && !ev.metaKey;

        // 因服务端返回命令包含乱码，但使用write方法输出时并不显示，故将真实显示内容截取出来
        let index = _this.showOrder.indexOf("sh");
        let show = _this.showOrder.substr(index, _this.showOrder.length - 1);

        //  当输入回车时
        if (ev.keyCode === 13) {
          if (_this.order == "cls" || _this.order == "clear") {
            _this.order = "";
            return false;
          }
          //先将数据发送
          term.prompt();
          // 判断如果不是英文给出提醒
          let reg = /[a-zA-Z]/;
          let order = {
            Data: _this.order,
            Op: "stdin",
          };

          if (!reg.test(_this.order)) {
            term.writeln("请输入有效指令~");
          } else {
            // 发送数据
            _this.inputList.push(_this.order);
            last = _this.inputList.length - 1;
            _this.onSend(order);
            // 清空输入内容变量
          }
        } else if (ev.keyCode === 8) {
          // 当输入退

          // Do not delete the prompt
          // 当前行字符长度如果等于后端返回字符就不进行删除
          if (term._core.buffer.x > _this.showOrder.length) {
            term.write("\b \b"); // 输出退格
          }

          // 将输入内容变量删除

          if (_this.trim(_this.order) == _this.trim(_this.showOrder)) {
            return false;
          } else {
            _this.order = _this.order.substr(0, _this.order.length - 1);
          }
        } else if (ev.keyCode == 38 || ev.keyCode == 40) {
          let len = _this.inputList.length;
          let code = ev.keyCode;

          if (code === 38 && last <= len && last >= 0) {
            // 直接取出字符串数组最后一个元素
            let inputVal = _this.inputList[last];
            term.write(inputVal);
            if (last > 0) {
              last--;
            }
          }
          if (code === 40 && last < len) {
            // last现在为当前元素
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
          // 如果按tab键前输入了之前后端返回字符串的第一个字符，就显示此命令
          if (_this.order !== "" && show.indexOf(_this.order) == 0) {
            term.write(_this.showOrder);
          }
        } else if (printable) {
          // 当为可打印内容时
          if (/[a-zA-Z]/.test(key)) {
            key = key.toLowerCase();
          }
          // 存入输入内容变量
          _this.order = _this.order + key;
          // 将变量写入终端内
          term.write(key);
        }
      });

      _this.term = term;

      // 粘贴事件
      term.onData(function (data) {
        _this.order = data;
        term.write(data);
      });
    }
    runFakeTerminal(_this);
  },
};
</script>

<style>
</style>