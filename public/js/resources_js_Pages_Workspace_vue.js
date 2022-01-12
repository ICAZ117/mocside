(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_Pages_Workspace_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Workspace.vue?vue&type=script&lang=js":
/*!**********************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Workspace.vue?vue&type=script&lang=js ***!
  \**********************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _services_API__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/API */ "./resources/js/services/API.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");
/* harmony import */ var vue3_draggable_resizable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! vue3-draggable-resizable */ "./vue3-draggable-resizable/src/index.js");
/* harmony import */ var vue3_draggable_resizable__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(vue3_draggable_resizable__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _vue3_draggable_resizable_dist_Vue3DraggableResizable_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../vue3-draggable-resizable/dist/Vue3DraggableResizable.css */ "./vue3-draggable-resizable/dist/Vue3DraggableResizable.css");


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }



 //default styles


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,vue__WEBPACK_IMPORTED_MODULE_2__.defineComponent)({
  props: ["problemID", "lang", "labID"],
  emits: ["unmounting", "problemEdited", "deleteMe"],
  components: {
    Vue3DraggableResizable: (vue3_draggable_resizable__WEBPACK_IMPORTED_MODULE_3___default())
  },
  data: function data() {
    return {
      instructionsHeight: window.innerHeight - 60,
      instructionsWidth: window.innerWidth * 0.33,
      IDEHeight: window.innerHeight - 60,
      IDEWidth: window.innerWidth * 0.67,
      assignment: {},
      title: "",
      description: "",
      code_j: "",
      code_p: "",
      theme: "",
      input: "",
      jID: "",
      pID: "",
      codeID: "",
      forceReload: 0,
      reloadSliders: 0,
      childIsOpen: false,
      saveStatus: "",
      test: {},
      x1: 0,
      y1: 60,
      h1: 0,
      w1: 0,
      x2: window.innerWidth * 0.33,
      y2: 60,
      h2: 0,
      w2: window.innerWidth * 0.67,
      active: true,
      debouncedWidth: window.innerWidth * 0.67
    };
  },
  watch: {
    w2: function w2() {
      this.w1 = window.innerWidth - this.w2;
    },
    active: function active() {
      this.active = true;
    }
  },
  methods: {
    resizeEnd: function resizeEnd() {
      this.debouncedWidth = this.w2;
    },
    unmountingWork: function unmountingWork() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                console.log("unmountingWork"); //go back in router by 1

                _this.$router.go(-1);

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    getAssignment: function getAssignment() {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee2() {
        var rawAssignment, payload, empty, initial;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _services_API__WEBPACK_IMPORTED_MODULE_1__.apiClient.get("/problems/full/".concat(_this2.problemID));

              case 2:
                rawAssignment = _context2.sent;
                _this2.assignment = rawAssignment.data.data;
                _this2.title = _this2.assignment.name;
                _this2.description = _this2.assignment.description; //check if empty....post if empty

                payload = {
                  lang: _this2.lang
                };
                _context2.next = 9;
                return _services_API__WEBPACK_IMPORTED_MODULE_1__.apiClient.post("/code/check/".concat(_this2.problemID), payload);

              case 9:
                empty = _context2.sent;
                _this2.test = empty;

                if (_this2.assignment.python_starter == "" || _this2.assignment.python_starter == null) {
                  _this2.assignment.python_starter = "def main():\n\nmain()";
                }

                if (_this2.assignment.java_starter == "" || _this2.assignment.java_starter == null) {
                  _this2.assignment.java_starter = "public class Main {\n\tpublic static void main(String[] args) {\n\t\t}}";
                }

                if (!(empty.data.message == "No progress. Please create.")) {
                  _context2.next = 21;
                  break;
                }

                //create progress
                if (_this2.lang == "Java") {
                  payload = {
                    lang: _this2.lang.toLowerCase(0),
                    problem_id: _this2.problemID,
                    code: _this2.assignment.java_starter
                  };
                } else {
                  payload = {
                    lang: _this2.lang.toLowerCase(0),
                    problem_id: _this2.problemID,
                    code: _this2.assignment.python_starter
                  };
                }

                _context2.next = 17;
                return _services_API__WEBPACK_IMPORTED_MODULE_1__.apiClient.post("/code", payload);

              case 17:
                initial = _context2.sent;

                if (_this2.lang == "Java") {
                  _this2.code_j = _this2.assignment.java_starter;
                  _this2.codeID = initial.data.id;
                  console.log("initial.id " + initial.data.id);
                  console.log(_this2.codeID);
                } else {
                  _this2.code_p = _this2.assignment.python_starter;
                  _this2.codeID = initial.data.id;
                  console.log("initial.id " + initial.data.id);
                  console.log(_this2.codeID);
                }

                _context2.next = 22;
                break;

              case 21:
                //otherwise not empty
                if (_this2.lang == "Java") {
                  _this2.code_j = empty.data.dump[0].code;
                  _this2.codeID = empty.data.dump[0].id;
                  console.log("empty.data.dump[0].id " + empty.data.dump[0].id);
                  console.log(_this2.codeID);
                } else {
                  _this2.code_p = empty.data.dump[0].code;
                  _this2.codeID = empty.data.dump[0].id;
                  console.log("empty.data.dump[0].id " + empty.data.dump[0].id);
                  console.log(_this2.codeID);
                }

              case 22:
                _this2.forceReload = 1; // const res = await API.apiClient.get(`/code/search/${this.problemID}`);
                // var progress = res.data.data;
                // this.code_j = await this.getJava(progress);
                // this.code_p = await this.getPython(progress);
                // if(this.lang == "Java") {
                //   this.codeID = this.jID;
                // }
                // else {
                //   this.codeID = this.pID;
                // }
                // this.forceReload = 1;

              case 23:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    },
    getJava: function getJava(progress) {
      var _this3 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee3() {
        var payload, res, i, _res;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                //if first time opening grab template, else grab student code
                payload = {
                  lang: "java",
                  problem_id: _this3.problemID,
                  code: _this3.assignment.java_starter
                };

                if (!(progress.length == 0)) {
                  _context3.next = 9;
                  break;
                }

                _context3.next = 4;
                return _services_API__WEBPACK_IMPORTED_MODULE_1__.apiClient.post("/code", payload);

              case 4:
                res = _context3.sent;
                _this3.jID = res.data.id; // console.log("Got Java");

                return _context3.abrupt("return", _this3.assignment.java_starter);

              case 9:
                i = 0;

              case 10:
                if (!(i < progress.length)) {
                  _context3.next = 18;
                  break;
                }

                if (!(progress[i].lang == "java")) {
                  _context3.next = 15;
                  break;
                }

                console.log("Got Java");
                _this3.jID = progress[i].id;
                return _context3.abrupt("return", progress[i].code);

              case 15:
                i++;
                _context3.next = 10;
                break;

              case 18:
                _context3.next = 20;
                return _services_API__WEBPACK_IMPORTED_MODULE_1__.apiClient.post("/code", payload);

              case 20:
                _res = _context3.sent;
                _this3.jID = _res.data.id; // console.log("Got Java");

                return _context3.abrupt("return", _this3.assignment.java_starter);

              case 23:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }))();
    },
    getPython: function getPython(progress) {
      var _this4 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee4() {
        var payload, res, i, _res2;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                //if first time opening grab template, else grab student code
                payload = {
                  lang: "python",
                  problem_id: _this4.problemID,
                  code: _this4.assignment.python_starter
                };

                if (!(progress.length == 0)) {
                  _context4.next = 9;
                  break;
                }

                _context4.next = 4;
                return _services_API__WEBPACK_IMPORTED_MODULE_1__.apiClient.post("/code", payload);

              case 4:
                res = _context4.sent;
                _this4.pID = res.data.id;
                return _context4.abrupt("return", _this4.assignment.python_starter);

              case 9:
                i = 0;

              case 10:
                if (!(i < progress.length)) {
                  _context4.next = 17;
                  break;
                }

                if (!(progress[i].lang == "python")) {
                  _context4.next = 14;
                  break;
                }

                _this4.pID = progress[i].id;
                return _context4.abrupt("return", progress[i].code);

              case 14:
                i++;
                _context4.next = 10;
                break;

              case 17:
                _context4.next = 19;
                return _services_API__WEBPACK_IMPORTED_MODULE_1__.apiClient.post("/code", payload);

              case 19:
                _res2 = _context4.sent;
                _this4.pID = _res2.data.id;
                return _context4.abrupt("return", _this4.assignment.python_starter);

              case 22:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }))();
    },
    updateContent: function updateContent(e) {
      this.saveStatus = "Saving...";

      if (this.lang == "Java") {
        this.code_j = e.code;
      } else {
        this.code_p = e.code;
      }

      this.timeout();
    },
    timeout: _.debounce( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee5() {
      var payload, res, _res3;

      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              payload = {};

              if (!(this.lang == "Java")) {
                _context5.next = 8;
                break;
              }

              payload = {
                code: this.code_j
              };
              _context5.next = 5;
              return _services_API__WEBPACK_IMPORTED_MODULE_1__.apiClient.put("/code/".concat(this.codeID), payload);

            case 5:
              res = _context5.sent;
              _context5.next = 13;
              break;

            case 8:
              payload = {
                code: this.code_p
              };
              _context5.next = 11;
              return _services_API__WEBPACK_IMPORTED_MODULE_1__.apiClient.put("/code/".concat(this.codeID), payload);

            case 11:
              _res3 = _context5.sent;
              this.saveStatus = "All changes have been saved";

            case 13:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this);
    })), 1000)
  },
  beforeUnmount: function beforeUnmount() {
    // workspace
    console.log("unmounting workspace");
    this.$emit("unmounting");
    this.childIsOpen = false;
    document.getElementById("thisIsTheDumbestThingIHaveEverHadToDo").style = "";
  },
  created: function created() {
    var _this5 = this;

    return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee6() {
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _this5.childIsOpen = true;
              _context6.next = 3;
              return _this5.getAssignment();

            case 3:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }))();
  },
  mounted: function mounted() {
    this.reloadSliders++;
    document.getElementById("resizeableInstructions").remove();
    document.getElementById("thisIsTheDumbestThingIHaveEverHadToDo").style = "overflow: hidden!important";
  }
}));

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Workspace.vue?vue&type=template&id=d0748a88":
/*!**************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Workspace.vue?vue&type=template&id=d0748a88 ***!
  \**************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

var _hoisted_1 = {
  key: 0,
  "class": "workspace-page"
};
var _hoisted_2 = {
  key: 0
};

var _hoisted_3 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("↩ Return to Problems");

var _hoisted_4 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("br", null, null, -1
/* HOISTED */
);

var _hoisted_5 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("br", null, null, -1
/* HOISTED */
);

var _hoisted_6 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("hr", {
  "class": "instructions-hr"
}, null, -1
/* HOISTED */
);

function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _this = this;

  var _component_btn = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("btn");

  var _component_Tiptap = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Tiptap");

  var _component_Vue3DraggableResizable = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Vue3DraggableResizable");

  var _component_IDE = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("IDE");

  return _ctx.childIsOpen ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" WorkSpace Page"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <button v-if=\"childIsOpen\" @click=\"unmountingWork()\" class=\"btn btn-danger btn-block\">\n      Return to Problems\n    </button> "), _ctx.childIsOpen ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)("div", _hoisted_2, [_ctx.childIsOpen ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_Vue3DraggableResizable, {
    initW: _ctx.instructionsWidth,
    initH: _ctx.instructionsHeight,
    x: _ctx.x1,
    "onUpdate:x": _cache[2] || (_cache[2] = function ($event) {
      return _ctx.x1 = $event;
    }),
    y: _ctx.y1,
    "onUpdate:y": _cache[3] || (_cache[3] = function ($event) {
      return _ctx.y1 = $event;
    }),
    w: _ctx.w1,
    "onUpdate:w": _cache[4] || (_cache[4] = function ($event) {
      return _ctx.w1 = $event;
    }),
    h: _ctx.h1,
    "onUpdate:h": _cache[5] || (_cache[5] = function ($event) {
      return _ctx.h1 = $event;
    }),
    active: _ctx.active,
    "onUpdate:active": _cache[6] || (_cache[6] = function ($event) {
      return _ctx.active = $event;
    }),
    draggable: false,
    resizable: true,
    disabledH: true,
    handles: ['mr'],
    key: _ctx.reloadSliders,
    "class": "instructions",
    id: "resizeableInstructions",
    style: {
      "overflow-y": "hidden !important",
      "overflow-x": "auto !important"
    }
  }, {
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_btn, {
        "class": "btn btn-secondary btn-sm",
        style: {
          "margin-left": "calc((100% - (100% - 16px)) / 2) !important",
          "width": "calc(100% - 20px) !important",
          "margin-top": "5px"
        },
        onClick: _cache[1] || (_cache[1] = function ($event) {
          return _this.$emit('unmounting');
        })
      }, {
        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
          return [_hoisted_3];
        }),
        _: 1
        /* STABLE */

      }), _hoisted_4, _hoisted_5, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("h4", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.title), 1
      /* TEXT */
      ), _hoisted_6, _ctx.childIsOpen ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_Tiptap, {
        key: 0,
        savedText: JSON.parse(_ctx.description),
        editable: false,
        showMenuBar: false,
        isDark: true
      }, null, 8
      /* PROPS */
      , ["savedText"])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)];
    }),
    _: 1
    /* STABLE */

  }, 8
  /* PROPS */
  , ["initW", "initH", "x", "y", "w", "h", "active"])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Vue3DraggableResizable, {
    initW: _ctx.IDEWidth,
    initH: _ctx.IDEHeight,
    x: _ctx.x2,
    "onUpdate:x": _cache[7] || (_cache[7] = function ($event) {
      return _ctx.x2 = $event;
    }),
    y: _ctx.y2,
    "onUpdate:y": _cache[8] || (_cache[8] = function ($event) {
      return _ctx.y2 = $event;
    }),
    w: _ctx.w2,
    "onUpdate:w": _cache[9] || (_cache[9] = function ($event) {
      return _ctx.w2 = $event;
    }),
    h: _ctx.h2,
    "onUpdate:h": _cache[10] || (_cache[10] = function ($event) {
      return _ctx.h2 = $event;
    }),
    active: _ctx.active,
    "onUpdate:active": _cache[11] || (_cache[11] = function ($event) {
      return _ctx.active = $event;
    }),
    draggable: false,
    resizable: true,
    disabledH: true,
    handles: ['ml'],
    onResizeEnd: _ctx.resizeEnd,
    key: _ctx.reloadSliders,
    id: "resizeableIDE"
  }, {
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [_ctx.childIsOpen ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_IDE, {
        offsetTop: 0,
        lang: _ctx.lang,
        showSubmit: true,
        saved_j: _ctx.code_j,
        saved_p: _ctx.code_p,
        problemID: _ctx.problemID,
        codeID: _ctx.codeID,
        labID: _ctx.labID,
        onUpdate: _ctx.updateContent,
        key: _ctx.forceReload,
        width: _ctx.debouncedWidth
      }, null, 8
      /* PROPS */
      , ["lang", "saved_j", "saved_p", "problemID", "codeID", "labID", "onUpdate", "width"])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)];
    }),
    _: 1
    /* STABLE */

  }, 8
  /* PROPS */
  , ["initW", "initH", "x", "y", "w", "h", "active", "onResizeEnd"])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true);
}

/***/ }),

/***/ "./resources/js/Pages/Workspace.vue":
/*!******************************************!*\
  !*** ./resources/js/Pages/Workspace.vue ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Workspace_vue_vue_type_template_id_d0748a88__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Workspace.vue?vue&type=template&id=d0748a88 */ "./resources/js/Pages/Workspace.vue?vue&type=template&id=d0748a88");
/* harmony import */ var _Workspace_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Workspace.vue?vue&type=script&lang=js */ "./resources/js/Pages/Workspace.vue?vue&type=script&lang=js");



_Workspace_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__.default.render = _Workspace_vue_vue_type_template_id_d0748a88__WEBPACK_IMPORTED_MODULE_0__.render
/* hot reload */
if (false) {}

_Workspace_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__.default.__file = "resources/js/Pages/Workspace.vue"

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_Workspace_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__.default);

/***/ }),

/***/ "./resources/js/Pages/Workspace.vue?vue&type=script&lang=js":
/*!******************************************************************!*\
  !*** ./resources/js/Pages/Workspace.vue?vue&type=script&lang=js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Workspace_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__.default)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Workspace_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Workspace.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Workspace.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/Pages/Workspace.vue?vue&type=template&id=d0748a88":
/*!************************************************************************!*\
  !*** ./resources/js/Pages/Workspace.vue?vue&type=template&id=d0748a88 ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Workspace_vue_vue_type_template_id_d0748a88__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Workspace_vue_vue_type_template_id_d0748a88__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Workspace.vue?vue&type=template&id=d0748a88 */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Workspace.vue?vue&type=template&id=d0748a88");


/***/ })

}]);