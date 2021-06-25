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


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  props: ["problemID", "lang"],
  emits: ["unmounting"],
  data: function data() {
    return {
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
      forceReload: 0
    };
  },
  methods: {
    getAssignment: function getAssignment() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
        var rawAssignment, res, progress;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _services_API__WEBPACK_IMPORTED_MODULE_1__.apiClient.get("/problems/full/".concat(_this.problemID));

              case 2:
                rawAssignment = _context.sent;
                _this.assignment = rawAssignment.data.data;
                _this.title = _this.assignment.name;
                _this.description = _this.assignment.description;
                _context.next = 8;
                return _services_API__WEBPACK_IMPORTED_MODULE_1__.apiClient.get("/code/search/".concat(_this.problemID));

              case 8:
                res = _context.sent;
                progress = res.data.data;
                _context.next = 12;
                return _this.getJava(progress);

              case 12:
                _this.code_j = _context.sent;
                _context.next = 15;
                return _this.getPython(progress);

              case 15:
                _this.code_p = _context.sent;

                if (_this.lang == "Java") {
                  _this.codeID = _this.jID;
                } else {
                  _this.codeID = _this.pID;
                }

                _this.forceReload = 1;

              case 18:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    getJava: function getJava(progress) {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee2() {
        var payload, res, i, _res;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                //if first time opening grab template, else grab student code
                payload = {
                  lang: "java",
                  problem_id: _this2.problemID,
                  code: _this2.assignment.java_starter
                };

                if (!(progress.length == 0)) {
                  _context2.next = 9;
                  break;
                }

                _context2.next = 4;
                return _services_API__WEBPACK_IMPORTED_MODULE_1__.apiClient.post("/code/", payload);

              case 4:
                res = _context2.sent;
                _this2.jID = res.data.id; // console.log("Got Java");

                return _context2.abrupt("return", _this2.assignment.java_starter);

              case 9:
                i = 0;

              case 10:
                if (!(i < progress.length)) {
                  _context2.next = 18;
                  break;
                }

                if (!(progress[i].lang == "java")) {
                  _context2.next = 15;
                  break;
                }

                console.log("Got Java");
                _this2.jID = progress[i].id;
                return _context2.abrupt("return", progress[i].code);

              case 15:
                i++;
                _context2.next = 10;
                break;

              case 18:
                _context2.next = 20;
                return _services_API__WEBPACK_IMPORTED_MODULE_1__.apiClient.post("/code/", payload);

              case 20:
                _res = _context2.sent;
                _this2.jID = _res.data.id; // console.log("Got Java");

                return _context2.abrupt("return", _this2.assignment.java_starter);

              case 23:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    },
    getPython: function getPython(progress) {
      var _this3 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee3() {
        var payload, res, i, _res2;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                //if first time opening grab template, else grab student code
                payload = {
                  lang: "python",
                  problem_id: _this3.problemID,
                  code: _this3.assignment.python_starter
                };

                if (!(progress.length == 0)) {
                  _context3.next = 9;
                  break;
                }

                _context3.next = 4;
                return _services_API__WEBPACK_IMPORTED_MODULE_1__.apiClient.post("/code/", payload);

              case 4:
                res = _context3.sent;
                _this3.pID = res.data.id;
                return _context3.abrupt("return", _this3.assignment.python_starter);

              case 9:
                i = 0;

              case 10:
                if (!(i < progress.length)) {
                  _context3.next = 17;
                  break;
                }

                if (!(progress[i].lang == "python")) {
                  _context3.next = 14;
                  break;
                }

                _this3.pID = progress[i].id;
                return _context3.abrupt("return", progress[i].code);

              case 14:
                i++;
                _context3.next = 10;
                break;

              case 17:
                _context3.next = 19;
                return _services_API__WEBPACK_IMPORTED_MODULE_1__.apiClient.post("/code/", payload);

              case 19:
                _res2 = _context3.sent;
                _this3.pID = _res2.data.id;
                return _context3.abrupt("return", _this3.assignment.python_starter);

              case 22:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }))();
    },
    updateContent: function updateContent(e) {
      // console.log(e);
      //e is {code: "...", input: "..."}
      if (this.lang == "Java") {
        // console.log(e.code);
        this.code_j = e.code;
      } else {
        // console.log(e.code);
        this.code_p = e.code;
      }

      this.timeout();
    },
    timeout: _.debounce( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee4() {
      var payload, res, _res3;

      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              payload = {};

              if (!(this.lang == "Java")) {
                _context4.next = 8;
                break;
              }

              payload = {
                code: this.code_j
              };
              _context4.next = 5;
              return _services_API__WEBPACK_IMPORTED_MODULE_1__.apiClient.put("/code/".concat(this.jID), payload);

            case 5:
              res = _context4.sent;
              _context4.next = 12;
              break;

            case 8:
              payload = {
                code: this.code_p
              };
              _context4.next = 11;
              return _services_API__WEBPACK_IMPORTED_MODULE_1__.apiClient.put("/code/".concat(this.pID), payload);

            case 11:
              _res3 = _context4.sent;

            case 12:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    })), 1000)
  },
  beforeUnmount: function beforeUnmount() {
    this.$emit("unmounting");
  },
  created: function created() {
    var _this4 = this;

    return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee5() {
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return _this4.getAssignment();

            case 2:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }))();
  }
});

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
  "class": "row"
};
var _hoisted_2 = {
  "class": "instructions col-4 p-4"
};

var _hoisted_3 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("hr", {
  "class": "instructions-hr"
}, null, -1
/* HOISTED */
);

function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_Tiptap = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Tiptap");

  var _component_IDE = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("IDE");

  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Main Page"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("h4", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.title), 1
  /* TEXT */
  ), _hoisted_3, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Tiptap, {
    savedText: JSON.parse($data.description),
    editable: false,
    showMenuBar: false,
    isDark: true
  }, null, 8
  /* PROPS */
  , ["savedText"])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_IDE, {
    "class": "col-8",
    lang: $props.lang,
    showSubmit: true,
    saved_j: $data.code_j,
    saved_p: $data.code_p,
    problemID: $props.problemID,
    codeID: $data.codeID,
    onUpdate: $options.updateContent,
    key: $data.forceReload
  }, null, 8
  /* PROPS */
  , ["lang", "saved_j", "saved_p", "problemID", "codeID", "onUpdate"])])], 2112
  /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
  );
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