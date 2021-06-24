(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_Pages_About_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/About.vue?vue&type=script&lang=js":
/*!******************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/About.vue?vue&type=script&lang=js ***!
  \******************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var xterm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! xterm/lib/xterm.js */ "./node_modules/xterm/lib/xterm.js");
/* harmony import */ var xterm__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(xterm__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var xterm_addon_fit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! xterm-addon-fit */ "./node_modules/xterm-addon-fit/lib/xterm-addon-fit.js");
/* harmony import */ var xterm_addon_fit__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(xterm_addon_fit__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var xterm_addon_web_links__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! xterm-addon-web-links */ "./node_modules/xterm-addon-web-links/lib/xterm-addon-web-links.js");
/* harmony import */ var xterm_addon_web_links__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(xterm_addon_web_links__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var xterm_addon_search__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! xterm-addon-search */ "./node_modules/xterm-addon-search/lib/xterm-addon-search.js");
/* harmony import */ var xterm_addon_search__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(xterm_addon_search__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var xterm_css_xterm_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! xterm/css/xterm.css */ "./node_modules/xterm/css/xterm.css");

 // import {AttachAddon} from "xterm-addon-attach";





/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "Shell",
  data: function data() {
    return {
      order: "",
      urlParam: {
        fullTag: "",
        namespace: "",
        podName: ""
      },
      shellWs: "",
      // ws instance
      term: "",
      // save the terminal instance
      showOrder: "",
      // Save the command returned by the server
      inputList: [] // Save the commands entered by the user to switch between the upper and lower keys

    };
  },
  created: function created() {// this.wsShell();
  },
  mounted: function mounted() {
    var _this = this;

    console.log("Mounted xterm page");
    var term = new xterm__WEBPACK_IMPORTED_MODULE_0__.Terminal({
      rows: 40,
      cursorBlink: true,
      convertEol: true,
      scrollback: true,
      cursorStyle: "bar",
      selectToClipboard: true
    });
    var fitAddon = new xterm_addon_fit__WEBPACK_IMPORTED_MODULE_1__.FitAddon();
    var webLinksAddon = new xterm_addon_web_links__WEBPACK_IMPORTED_MODULE_2__.WebLinksAddon();
    var searchAddon = new xterm_addon_search__WEBPACK_IMPORTED_MODULE_3__.SearchAddon(); // const socket = new WebSocket("");
    // const attachAddon = new AttachAddon(socket);

    term.loadAddon(fitAddon);
    term.loadAddon(webLinksAddon);
    term.loadAddon(searchAddon); // terminal.loadAddon(attachAddon);
    // wrap and enter the start character "$"

    term.prompt = function () {
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

      term.prompt = function () {
        term.write("\r\n ");
      };

      term.writeln("Welcome to xterm.js");
      term.writeln("This is a local terminal emulation, without a real terminal in the back-end.");
      term.writeln("Type some keys and commands to play around.");
      term.writeln("");
      term.prompt(); // monitor keyboard input events
      // / **
      // *Add an event listener for events when the key is pressed. Event value contains
      // *The string that will be sent in the data event and DOM event
      // * Triggered it.
      // * @Return an IDisposable to stop monitoring.
      // * /

      var last = 0;
      term.onKey(function (k) {
        // Printable status, that is, not the alt key ctrl and other functions are healthy
        var ev = k.domEvent;
        var key = k.domEvent.key;
        console.log(ev);
        var printable = !ev.altKey && !ev.altGraphKey && !ev.ctrlKey && !ev.metaKey; // Because the server return command contains garbled characters, but it is not displayed when using the write method to output, so the actual display content is intercepted

        var index = _this.showOrder.indexOf("sh");

        var show = _this.showOrder.substr(index, _this.showOrder.length - 1); //


        if (ev.keyCode === 13) {
          if (_this.order == "cls" || _this.order == "clear") {
            _this.order = "";
            return false;
          } //Send the data first


          term.prompt(); // Determine if it is not in English and give a reminder

          var reg = /[a-zA-Z]/;
          var order = {
            Data: _this.order,
            Op: "stdin"
          };

          if (!reg.test(_this.order)) {
            term.writeln("Please enter a valid command~");
          } else {
            // send data
            _this.inputList.push(_this.order);

            last = _this.inputList.length - 1;

            _this.onSend(order); // Clear the input content variable

          }
        } else if (ev.keyCode === 8) {
          // When the input exit
          // Do not delete the prompt
          // If the character length of the current line is equal to the character returned by the backend, it will not be deleted
          if (term._core.buffer.x > _this.showOrder.length) {
            term.write("\b \b"); // output backspace
          } // delete the input content variable


          if (_this.trim(_this.order) == _this.trim(_this.showOrder)) {
            return false;
          } else {
            _this.order = _this.order.substr(0, _this.order.length - 1);
          }
        } else if (ev.keyCode == 38 || ev.keyCode == 40) {
          var len = _this.inputList.length;
          var code = ev.keyCode;

          if (code === 38 && last <= len && last >= 0) {
            // Take out the last element of the string array directly
            var inputVal = _this.inputList[last];
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

            var _inputVal = _this.inputList[last];
            term.write(_inputVal);
          }
        } else if (ev.keyCode === 9) {
          // If you enter the first character of the string returned by the backend before pressing the tab key, this command will be displayed
          if (_this.order !== "" && show.indexOf(_this.order) == 0) {
            term.write(_this.showOrder);
          }
        } else if (printable) {
          // When it is printable content
          // Save the input content variable
          _this.order = _this.order + key; // Write variables into the terminal

          term.write(key);
        } else if (ev.ctrlKey) {
          // Copy (c)
          if (ev.keyCode == 81) {
            console.log("ctrl + q (qopy text)");
            document.execCommand("copy");
          } // Paste (v)
          else if (ev.keycode == 89) {
              console.log("ctrl + y (yank text)");
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
        } // else if (printable) {
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
      _this.term = term; // Paste event
      // term.onData(function (data) {
      //   _this.order = data;
      //   console.log(data);
      //   term.write(data);
      // });
    }

    runFakeTerminal(_this);
  },
  methods: {
    trim: function trim(str) {
      return str.replace(/(^\s*)|(\s*$)/g, "");
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/About.vue?vue&type=template&id=169e1534":
/*!**********************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/About.vue?vue&type=template&id=169e1534 ***!
  \**********************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

var _hoisted_1 = {
  style: {
    "height": "100%",
    "background": "#002833"
  }
};
var _hoisted_2 = {
  id: "terminal",
  ref: "terminal"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", _hoisted_2, null, 512
  /* NEED_PATCH */
  )]);
}

/***/ }),

/***/ "./resources/js/Pages/About.vue":
/*!**************************************!*\
  !*** ./resources/js/Pages/About.vue ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _About_vue_vue_type_template_id_169e1534__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./About.vue?vue&type=template&id=169e1534 */ "./resources/js/Pages/About.vue?vue&type=template&id=169e1534");
/* harmony import */ var _About_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./About.vue?vue&type=script&lang=js */ "./resources/js/Pages/About.vue?vue&type=script&lang=js");



_About_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__.default.render = _About_vue_vue_type_template_id_169e1534__WEBPACK_IMPORTED_MODULE_0__.render
/* hot reload */
if (false) {}

_About_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__.default.__file = "resources/js/Pages/About.vue"

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_About_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__.default);

/***/ }),

/***/ "./resources/js/Pages/About.vue?vue&type=script&lang=js":
/*!**************************************************************!*\
  !*** ./resources/js/Pages/About.vue?vue&type=script&lang=js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_About_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__.default)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_About_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./About.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/About.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/Pages/About.vue?vue&type=template&id=169e1534":
/*!********************************************************************!*\
  !*** ./resources/js/Pages/About.vue?vue&type=template&id=169e1534 ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_About_vue_vue_type_template_id_169e1534__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_About_vue_vue_type_template_id_169e1534__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./About.vue?vue&type=template&id=169e1534 */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/About.vue?vue&type=template&id=169e1534");


/***/ })

}]);