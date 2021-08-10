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
/* harmony import */ var vue3_draggable_resizable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! vue3-draggable-resizable */ "./node_modules/vue3-draggable-resizable/src/index.js");
/* harmony import */ var vue3_draggable_resizable__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(vue3_draggable_resizable__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var vue3_draggable_resizable_dist_Vue3DraggableResizable_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vue3-draggable-resizable/dist/Vue3DraggableResizable.css */ "./node_modules/vue3-draggable-resizable/dist/Vue3DraggableResizable.css");


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
      windowHeight: window.innerHeight - 98,
      windowWidth: window.innerWidth * 0.33,
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
      childIsOpen: false,
      saveStatus: "",
      test: {},
      x: 0,
      y: 98,
      h: 100,
      w: 100,
      active: true
    };
  },
  methods: {
    print: function print(val) {
      console.log(val);
    },
    getAssignment: function getAssignment() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
        var rawAssignment, payload, empty, initial;
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
                _this.description = _this.assignment.description; //check if empty....post if empty

                payload = {
                  lang: _this.lang
                };
                _context.next = 9;
                return _services_API__WEBPACK_IMPORTED_MODULE_1__.apiClient.post("/code/check/".concat(_this.problemID), payload);

              case 9:
                empty = _context.sent;
                _this.test = empty;

                if (!(empty.data.message == "No progress. Please create.")) {
                  _context.next = 19;
                  break;
                }

                //create progress
                if (_this.lang == "Java") {
                  payload = {
                    lang: _this.lang.toLowerCase(0),
                    problem_id: _this.problemID,
                    code: _this.assignment.java_starter
                  };
                } else {
                  payload = {
                    lang: _this.lang.toLowerCase(0),
                    problem_id: _this.problemID,
                    code: _this.assignment.python_starter
                  };
                }

                _context.next = 15;
                return _services_API__WEBPACK_IMPORTED_MODULE_1__.apiClient.post("/code/", payload);

              case 15:
                initial = _context.sent;

                if (_this.lang == "Java") {
                  _this.code_j = _this.assignment.java_starter;
                  _this.codeID = initial.data.id;
                } else {
                  _this.code_p = _this.assignment.python_starter;
                  _this.codeID = initial.data.id;
                }

                _context.next = 20;
                break;

              case 19:
                //otherwise not empty
                if (_this.lang == "Java") {
                  _this.code_j = empty.data.dump[0].code;
                  _this.codeID = empty.data.dump[0].id;
                } else {
                  _this.code_p = empty.data.dump[0].code;
                  _this.codeID = empty.data.dump[0].id;
                }

              case 20:
                _this.forceReload = 1; // const res = await API.apiClient.get(`/code/search/${this.problemID}`);
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

              case 21:
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
      this.saveStatus = "Saving...";

      if (this.lang == "Java") {
        this.code_j = e.code;
      } else {
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
              return _services_API__WEBPACK_IMPORTED_MODULE_1__.apiClient.put("/code/".concat(this.codeID), payload);

            case 5:
              res = _context4.sent;
              _context4.next = 13;
              break;

            case 8:
              payload = {
                code: this.code_p
              };
              _context4.next = 11;
              return _services_API__WEBPACK_IMPORTED_MODULE_1__.apiClient.put("/code/".concat(this.codeID), payload);

            case 11:
              _res3 = _context4.sent;
              this.saveStatus = "All changes have been saved";

            case 13:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    })), 1000)
  },
  beforeUnmount: function beforeUnmount() {
    // workspace
    console.log("unmounting workspace");
    this.$emit("unmounting");
    this.childIsOpen = false;
  },
  created: function created() {
    var _this4 = this;

    return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee5() {
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _this4.childIsOpen = true;
              _context5.next = 3;
              return _this4.getAssignment();

            case 3:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }))();
  }
}));

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Workspace.vue?vue&type=template&id=d0748a88&scoped=true":
/*!**************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Workspace.vue?vue&type=template&id=d0748a88&scoped=true ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");
var _this = undefined;



var _withId = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.withScopeId)("data-v-d0748a88");

(0,vue__WEBPACK_IMPORTED_MODULE_0__.pushScopeId)("data-v-d0748a88");

var _hoisted_1 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("hr", {
  "class": "instructions-hr"
}, null, -1
/* HOISTED */
);

var _hoisted_2 = {
  key: 1,
  "class": "row"
};

var _hoisted_3 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", {
  "class": "col-8"
}, null, -1
/* HOISTED */
);

(0,vue__WEBPACK_IMPORTED_MODULE_0__.popScopeId)();

var render = /*#__PURE__*/_withId(function (_ctx, _cache, $props, $setup, $data, $options) {
  var _component_Tiptap = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Tiptap");

  var _component_Vue3DraggableResizable = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Vue3DraggableResizable");

  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" WorkSpace Page"), _ctx.childIsOpen ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)("button", {
    key: 0,
    onClick: _cache[1] || (_cache[1] = function ($event) {
      return _this.$emit('unmounting');
    }),
    "class": "btn btn-danger btn-block"
  }, " Return to Problems ")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Vue3DraggableResizable, {
    initW: _ctx.windowWidth,
    initH: _ctx.windowHeight,
    x: _ctx.x,
    "onUpdate:x": _cache[2] || (_cache[2] = function ($event) {
      return _ctx.x = $event;
    }),
    y: _ctx.y,
    "onUpdate:y": _cache[3] || (_cache[3] = function ($event) {
      return _ctx.y = $event;
    }),
    w: _ctx.w,
    "onUpdate:w": _cache[4] || (_cache[4] = function ($event) {
      return _ctx.w = $event;
    }),
    h: _ctx.h,
    "onUpdate:h": _cache[5] || (_cache[5] = function ($event) {
      return _ctx.h = $event;
    }),
    active: _ctx.active,
    "onUpdate:active": _cache[6] || (_cache[6] = function ($event) {
      return _ctx.active = $event;
    }),
    draggable: false,
    resizable: true,
    disabledH: true,
    handles: ['mr'],
    onActivated: _cache[7] || (_cache[7] = function ($event) {
      return _ctx.print('activated');
    }),
    onDeactivated: _cache[8] || (_cache[8] = function ($event) {
      return _ctx.print('deactivated');
    }),
    onDragStart: _cache[9] || (_cache[9] = function ($event) {
      return _ctx.print('drag-start');
    }),
    onResizeStart: _cache[10] || (_cache[10] = function ($event) {
      return _ctx.print('resize-start');
    }),
    onDragging: _cache[11] || (_cache[11] = function ($event) {
      return _ctx.print('dragging');
    }),
    onResizing: _cache[12] || (_cache[12] = function ($event) {
      return _ctx.print('resizing');
    }),
    onDragEnd: _cache[13] || (_cache[13] = function ($event) {
      return _ctx.print('drag-end');
    }),
    onResizeEnd: _cache[14] || (_cache[14] = function ($event) {
      return _ctx.print('resize-end');
    }),
    onClick: _cache[15] || (_cache[15] = function ($event) {
      return _ctx.active = true;
    }),
    "class": "instructions"
  }, {
    "default": _withId(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("h4", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.title), 1
      /* TEXT */
      ), _hoisted_1, _ctx.childIsOpen ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_Tiptap, {
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
  , ["initW", "initH", "x", "y", "w", "h", "active"]), _ctx.childIsOpen ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <div class=\"instructions col-4 p-4\">\n      \n    </div> "), _hoisted_3, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <IDE\n      class=\"col-8\"\n      :lang=\"lang\"\n      :showSubmit=\"true\"\n      :saved_j=\"code_j\"\n      :saved_p=\"code_p\"\n      :problemID=\"problemID\"\n      :codeID=\"codeID\"\n      :labID=\"labID\"\n      @update=\"updateContent\"\n      :key=\"forceReload\"\n      v-if=\"childIsOpen\"\n    /> ")])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 64
  /* STABLE_FRAGMENT */
  );
});

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue3-draggable-resizable/dist/Vue3DraggableResizable.css":
/*!***************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue3-draggable-resizable/dist/Vue3DraggableResizable.css ***!
  \***************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".vdr-container{position:absolute;border:1px solid transparent;box-sizing:border-box}.vdr-container.active{border-color:#000;border-style:dashed}.vdr-container.dragging{border-color:#000;border-style:solid}.vdr-handle{box-sizing:border-box;position:absolute;width:7px;height:7px;background:#f0f0f0;border:1px solid #333}.vdr-handle-tl{top:-4px;left:-4px;cursor:nw-resize}.vdr-handle-tm{top:-4px;left:50%;margin-left:-3px;cursor:n-resize}.vdr-handle-tr{top:-4px;right:-4px;cursor:ne-resize}.vdr-handle-ml{top:50%;margin-top:-3px;left:-4px;cursor:w-resize}.vdr-handle-mr{top:50%;margin-top:-3px;right:-4px;cursor:e-resize}.vdr-handle-bl{bottom:-4px;left:-4px;cursor:sw-resize}.vdr-handle-bm{bottom:-4px;left:50%;margin-left:-4px;cursor:s-resize}.vdr-handle-br{bottom:-4px;right:-4px;cursor:se-resize}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue3-draggable-resizable/src/components/index.css":
/*!********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue3-draggable-resizable/src/components/index.css ***!
  \********************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".vdr-container {\r\n  position: absolute;\r\n  border: 1px solid transparent;\r\n  box-sizing: border-box;\r\n}\r\n.vdr-container.active {\r\n  border-color: #000;\r\n  border-style: dashed;\r\n}\r\n.vdr-container.dragging {\r\n  border-color: #000;\r\n  border-style: solid;\r\n}\r\n.vdr-handle {\r\n  box-sizing: border-box;\r\n  position: absolute;\r\n  width: 7px;\r\n  height: 7px;\r\n  background: #f0f0f0;\r\n  border: 1px solid #333;\r\n}\r\n.vdr-handle-tl {\r\n  top: -4px;\r\n  left: -4px;\r\n  cursor: nw-resize;\r\n}\r\n.vdr-handle-tm {\r\n  top: -4px;\r\n  left: 50%;\r\n  margin-left: -3px;\r\n  cursor: n-resize;\r\n}\r\n.vdr-handle-tr {\r\n  top: -4px;\r\n  right: -4px;\r\n  cursor: ne-resize;\r\n}\r\n.vdr-handle-ml {\r\n  top: 50%;\r\n  margin-top: -3px;\r\n  left: -4px;\r\n  cursor: w-resize;\r\n}\r\n.vdr-handle-mr {\r\n  top: 50%;\r\n  margin-top: -3px;\r\n  right: -4px;\r\n  cursor: e-resize;\r\n}\r\n.vdr-handle-bl {\r\n  bottom: -4px;\r\n  left: -4px;\r\n  cursor: sw-resize;\r\n}\r\n.vdr-handle-bm {\r\n  bottom: -4px;\r\n  left: 50%;\r\n  margin-left: -4px;\r\n  cursor: s-resize;\r\n}\r\n.vdr-handle-br {\r\n  bottom: -4px;\r\n  right: -4px;\r\n  cursor: se-resize;\r\n}\r\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Workspace.vue?vue&type=style&index=0&id=d0748a88&scoped=true&lang=css":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Workspace.vue?vue&type=style&index=0&id=d0748a88&scoped=true&lang=css ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\n.resizable-content[data-v-d0748a88] {\n  height: 100%;\n  width: 100%;\n}\n.vdr-container.active[data-v-d0748a88] {\n  background-color: lightcoral;\n}\n.vdr-handle[data-v-d0748a88] {\n  height: 100% !important;\n  top: 0 !important;\n  bottom: 0 !important;\n  margin: 0 !important;\n  display: block !important;\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/vue3-draggable-resizable/dist/Vue3DraggableResizable.css":
/*!*******************************************************************************!*\
  !*** ./node_modules/vue3-draggable-resizable/dist/Vue3DraggableResizable.css ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _css_loader_dist_cjs_js_clonedRuleSet_9_use_1_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_Vue3DraggableResizable_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./Vue3DraggableResizable.css */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue3-draggable-resizable/dist/Vue3DraggableResizable.css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_Vue3DraggableResizable_css__WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_Vue3DraggableResizable_css__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),

/***/ "./node_modules/vue3-draggable-resizable/src/components/index.css":
/*!************************************************************************!*\
  !*** ./node_modules/vue3-draggable-resizable/src/components/index.css ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _css_loader_dist_cjs_js_clonedRuleSet_9_use_1_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_index_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./index.css */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue3-draggable-resizable/src/components/index.css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_index_css__WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_index_css__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Workspace.vue?vue&type=style&index=0&id=d0748a88&scoped=true&lang=css":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Workspace.vue?vue&type=style&index=0&id=d0748a88&scoped=true&lang=css ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Workspace_vue_vue_type_style_index_0_id_d0748a88_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Workspace.vue?vue&type=style&index=0&id=d0748a88&scoped=true&lang=css */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Workspace.vue?vue&type=style&index=0&id=d0748a88&scoped=true&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Workspace_vue_vue_type_style_index_0_id_d0748a88_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Workspace_vue_vue_type_style_index_0_id_d0748a88_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

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
/* harmony import */ var _Workspace_vue_vue_type_template_id_d0748a88_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Workspace.vue?vue&type=template&id=d0748a88&scoped=true */ "./resources/js/Pages/Workspace.vue?vue&type=template&id=d0748a88&scoped=true");
/* harmony import */ var _Workspace_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Workspace.vue?vue&type=script&lang=js */ "./resources/js/Pages/Workspace.vue?vue&type=script&lang=js");
/* harmony import */ var _Workspace_vue_vue_type_style_index_0_id_d0748a88_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Workspace.vue?vue&type=style&index=0&id=d0748a88&scoped=true&lang=css */ "./resources/js/Pages/Workspace.vue?vue&type=style&index=0&id=d0748a88&scoped=true&lang=css");




;
_Workspace_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__.default.render = _Workspace_vue_vue_type_template_id_d0748a88_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render
_Workspace_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__.default.__scopeId = "data-v-d0748a88"
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

/***/ "./resources/js/Pages/Workspace.vue?vue&type=template&id=d0748a88&scoped=true":
/*!************************************************************************************!*\
  !*** ./resources/js/Pages/Workspace.vue?vue&type=template&id=d0748a88&scoped=true ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Workspace_vue_vue_type_template_id_d0748a88_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Workspace_vue_vue_type_template_id_d0748a88_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Workspace.vue?vue&type=template&id=d0748a88&scoped=true */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Workspace.vue?vue&type=template&id=d0748a88&scoped=true");


/***/ }),

/***/ "./resources/js/Pages/Workspace.vue?vue&type=style&index=0&id=d0748a88&scoped=true&lang=css":
/*!**************************************************************************************************!*\
  !*** ./resources/js/Pages/Workspace.vue?vue&type=style&index=0&id=d0748a88&scoped=true&lang=css ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Workspace_vue_vue_type_style_index_0_id_d0748a88_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/style-loader/dist/cjs.js!../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Workspace.vue?vue&type=style&index=0&id=d0748a88&scoped=true&lang=css */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Workspace.vue?vue&type=style&index=0&id=d0748a88&scoped=true&lang=css");


/***/ }),

/***/ "./node_modules/vue3-draggable-resizable/src/components/DraggableContainer.js":
/*!************************************************************************************!*\
  !*** ./node_modules/vue3-draggable-resizable/src/components/DraggableContainer.js ***!
  \************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var vue_1 = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");
var utils_1 = __webpack_require__(/*! ./utils */ "./node_modules/vue3-draggable-resizable/src/components/utils.js");
exports.default = vue_1.defineComponent({
    name: 'DraggableContainer',
    props: {
        disabled: {
            type: Boolean,
            "default": false
        },
        adsorbParent: {
            type: Boolean,
            "default": true
        },
        adsorbCols: {
            type: Array,
            "default": null
        },
        adsorbRows: {
            type: Array,
            "default": null
        },
        referenceLineVisible: {
            type: Boolean,
            "default": true
        },
        referenceLineColor: {
            type: String,
            "default": '#f00'
        }
    },
    setup: function (props) {
        var positionStore = vue_1.reactive({});
        var updatePosition = function (id, position) {
            positionStore[id] = position;
        };
        var getPositionStore = function (excludeId) {
            var _positionStore = Object.assign({}, positionStore);
            if (excludeId) {
                delete _positionStore[excludeId];
            }
            return _positionStore;
        };
        var state = vue_1.reactive({
            matchedLine: null
        });
        var matchedRows = vue_1.computed(function () { return (state.matchedLine && state.matchedLine.row) || []; });
        var matchedCols = vue_1.computed(function () { return (state.matchedLine && state.matchedLine.col) || []; });
        var setMatchedLine = function (matchedLine) {
            state.matchedLine = matchedLine;
        };
        vue_1.provide('identity', utils_1.IDENTITY);
        vue_1.provide('updatePosition', updatePosition);
        vue_1.provide('getPositionStore', getPositionStore);
        vue_1.provide('setMatchedLine', setMatchedLine);
        vue_1.provide('disabled', vue_1.toRef(props, 'disabled'));
        vue_1.provide('adsorbParent', vue_1.toRef(props, 'adsorbParent'));
        vue_1.provide('adsorbCols', props.adsorbCols || []);
        vue_1.provide('adsorbRows', props.adsorbRows || []);
        return {
            matchedRows: matchedRows,
            matchedCols: matchedCols
        };
    },
    methods: {
        renderReferenceLine: function () {
            var _this = this;
            if (!this.referenceLineVisible) {
                return [];
            }
            return __spreadArrays(this.matchedCols.map(function (item) {
                return vue_1.h('div', {
                    style: {
                        width: '0',
                        height: '100%',
                        top: '0',
                        left: item + 'px',
                        borderLeft: "1px dashed " + _this.referenceLineColor,
                        position: 'absolute'
                    }
                });
            }), this.matchedRows.map(function (item) {
                return vue_1.h('div', {
                    style: {
                        width: '100%',
                        height: '0',
                        left: '0',
                        top: item + 'px',
                        borderTop: "1px dashed " + _this.referenceLineColor,
                        position: 'absolute'
                    }
                });
            }));
        }
    },
    render: function () {
        return vue_1.h('div', {
            style: { width: '100%', height: '100%', position: 'relative' }
        }, __spreadArrays([
            this.$slots["default"] && this.$slots["default"]()
        ], this.renderReferenceLine()));
    }
});


/***/ }),

/***/ "./node_modules/vue3-draggable-resizable/src/components/Vue3DraggableResizable.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/vue3-draggable-resizable/src/components/Vue3DraggableResizable.js ***!
  \****************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.ALL_HANDLES = void 0;
var vue_1 = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");
var hooks_1 = __webpack_require__(/*! ./hooks */ "./node_modules/vue3-draggable-resizable/src/components/hooks.js");
__webpack_require__(/*! ./index.css */ "./node_modules/vue3-draggable-resizable/src/components/index.css");
var utils_1 = __webpack_require__(/*! ./utils */ "./node_modules/vue3-draggable-resizable/src/components/utils.js");
exports.ALL_HANDLES = [
    'tl',
    'tm',
    'tr',
    'ml',
    'mr',
    'bl',
    'bm',
    'br'
];
var VdrProps = {
    initW: {
        type: Number,
        "default": null
    },
    initH: {
        type: Number,
        "default": null
    },
    w: {
        type: Number,
        "default": 0
    },
    h: {
        type: Number,
        "default": 0
    },
    x: {
        type: Number,
        "default": 0
    },
    y: {
        type: Number,
        "default": 0
    },
    draggable: {
        type: Boolean,
        "default": true
    },
    resizable: {
        type: Boolean,
        "default": true
    },
    disabledX: {
        type: Boolean,
        "default": false
    },
    disabledY: {
        type: Boolean,
        "default": false
    },
    disabledW: {
        type: Boolean,
        "default": false
    },
    disabledH: {
        type: Boolean,
        "default": false
    },
    minW: {
        type: Number,
        "default": 20
    },
    minH: {
        type: Number,
        "default": 20
    },
    active: {
        type: Boolean,
        "default": false
    },
    parent: {
        type: Boolean,
        "default": false
    },
    handles: {
        type: Array,
        "default": exports.ALL_HANDLES,
        validator: function (handles) {
            return utils_1.filterHandles(handles).length === handles.length;
        }
    },
    classNameDraggable: {
        type: String,
        "default": 'draggable'
    },
    classNameResizable: {
        type: String,
        "default": 'resizable'
    },
    classNameDragging: {
        type: String,
        "default": 'dragging'
    },
    classNameResizing: {
        type: String,
        "default": 'resizing'
    },
    classNameActive: {
        type: String,
        "default": 'active'
    },
    classNameHandle: {
        type: String,
        "default": 'handle'
    },
    lockAspectRatio: {
        type: Boolean,
        "default": false
    }
};
var emits = [
    'activated',
    'deactivated',
    'drag-start',
    'resize-start',
    'dragging',
    'resizing',
    'drag-end',
    'resize-end',
    'update:w',
    'update:h',
    'update:x',
    'update:y',
    'update:active'
];
var VueDraggableResizable = vue_1.defineComponent({
    name: 'Vue3DraggableResizable',
    props: VdrProps,
    emits: emits,
    setup: function (props, _a) {
        var emit = _a.emit;
        var containerProps = hooks_1.initState(props, emit);
        var provideIdentity = vue_1.inject('identity');
        var containerProvider = null;
        if (provideIdentity === utils_1.IDENTITY) {
            containerProvider = {
                updatePosition: vue_1.inject('updatePosition'),
                getPositionStore: vue_1.inject('getPositionStore'),
                disabled: vue_1.inject('disabled'),
                adsorbParent: vue_1.inject('adsorbParent'),
                adsorbCols: vue_1.inject('adsorbCols'),
                adsorbRows: vue_1.inject('adsorbRows'),
                setMatchedLine: vue_1.inject('setMatchedLine')
            };
        }
        var containerRef = vue_1.ref();
        var parentSize = hooks_1.initParent(containerRef);
        var limitProps = hooks_1.initLimitSizeAndMethods(props, parentSize, containerProps);
        hooks_1.initDraggableContainer(containerRef, containerProps, limitProps, vue_1.toRef(props, 'draggable'), emit, containerProvider, parentSize);
        var resizeHandle = hooks_1.initResizeHandle(containerProps, limitProps, parentSize, props, emit);
        hooks_1.watchProps(props, limitProps);
        return __assign(__assign(__assign(__assign({ containerRef: containerRef,
            containerProvider: containerProvider }, containerProps), parentSize), limitProps), resizeHandle);
    },
    computed: {
        style: function () {
            return {
                width: this.width + 'px',
                height: this.height + 'px',
                top: this.top + 'px',
                left: this.left + 'px'
            };
        },
        klass: function () {
            var _a;
            return _a = {},
                _a[this.classNameActive] = this.enable,
                _a[this.classNameDragging] = this.dragging,
                _a[this.classNameResizing] = this.resizing,
                _a[this.classNameDraggable] = this.draggable,
                _a[this.classNameResizable] = this.resizable,
                _a;
        }
    },
    mounted: function () {
        if (!this.containerRef)
            return;
        this.containerRef.ondragstart = function () { return false; };
        var _a = utils_1.getElSize(this.containerRef), width = _a.width, height = _a.height;
        this.setWidth(this.initW === null ? this.w || width : this.initW);
        this.setHeight(this.initH === null ? this.h || height : this.initH);
        if (this.containerProvider) {
            this.containerProvider.updatePosition(this.id, {
                x: this.left,
                y: this.top,
                w: this.width,
                h: this.height
            });
        }
    },
    render: function () {
        var _this = this;
        return vue_1.h('div', {
            ref: 'containerRef',
            "class": ['vdr-container', this.klass],
            style: this.style
        }, __spreadArrays([
            this.$slots["default"] && this.$slots["default"]()
        ], this.handlesFiltered.map(function (item) {
            return vue_1.h('div', {
                "class": [
                    'vdr-handle',
                    'vdr-handle-' + item,
                    _this.classNameHandle,
                    _this.classNameHandle + "-" + item
                ],
                style: { display: _this.enable ? 'block' : 'none' },
                onMousedown: function (e) {
                    return _this.resizeHandleDown(e, item);
                }
            });
        })));
    }
});
exports.default = VueDraggableResizable;


/***/ }),

/***/ "./node_modules/vue3-draggable-resizable/src/components/hooks.js":
/*!***********************************************************************!*\
  !*** ./node_modules/vue3-draggable-resizable/src/components/hooks.js ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.watchProps = exports.initResizeHandle = exports.initDraggableContainer = exports.initLimitSizeAndMethods = exports.initParent = exports.initState = exports.useState = void 0;
var vue_1 = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");
var utils_1 = __webpack_require__(/*! ./utils */ "./node_modules/vue3-draggable-resizable/src/components/utils.js");
function useState(initialState) {
    var state = vue_1.ref(initialState);
    var setState = function (value) {
        state.value = value;
        return value;
    };
    return [state, setState];
}
exports.useState = useState;
function initState(props, emit) {
    var _a = useState(props.initW), width = _a[0], setWidth = _a[1];
    var _b = useState(props.initH), height = _b[0], setHeight = _b[1];
    var _c = useState(props.x), left = _c[0], setLeft = _c[1];
    var _d = useState(props.y), top = _d[0], setTop = _d[1];
    var _e = useState(props.active), enable = _e[0], setEnable = _e[1];
    var _f = useState(false), dragging = _f[0], setDragging = _f[1];
    var _g = useState(false), resizing = _g[0], setResizing = _g[1];
    var _h = useState(''), resizingHandle = _h[0], setResizingHandle = _h[1];
    var _j = useState(Infinity), resizingMaxWidth = _j[0], setResizingMaxWidth = _j[1];
    var _k = useState(Infinity), resizingMaxHeight = _k[0], setResizingMaxHeight = _k[1];
    var _l = useState(props.minW), resizingMinWidth = _l[0], setResizingMinWidth = _l[1];
    var _m = useState(props.minH), resizingMinHeight = _m[0], setResizingMinHeight = _m[1];
    var aspectRatio = vue_1.computed(function () { return height.value / width.value; });
    vue_1.watch(width, function (newVal) {
        emit('update:w', newVal);
    }, { immediate: true });
    vue_1.watch(height, function (newVal) {
        emit('update:h', newVal);
    }, { immediate: true });
    vue_1.watch(top, function (newVal) {
        emit('update:y', newVal);
    });
    vue_1.watch(left, function (newVal) {
        emit('update:x', newVal);
    });
    vue_1.watch(enable, function (newVal, oldVal) {
        emit('update:active', newVal);
        if (!oldVal && newVal) {
            emit('activated');
        }
        else if (oldVal && !newVal) {
            emit('deactivated');
        }
    });
    vue_1.watch(function () { return props.active; }, function (newVal) {
        setEnable(newVal);
    });
    return {
        id: utils_1.getId(),
        width: width,
        height: height,
        top: top,
        left: left,
        enable: enable,
        dragging: dragging,
        resizing: resizing,
        resizingHandle: resizingHandle,
        resizingMaxHeight: resizingMaxHeight,
        resizingMaxWidth: resizingMaxWidth,
        resizingMinWidth: resizingMinWidth,
        resizingMinHeight: resizingMinHeight,
        aspectRatio: aspectRatio,
        setEnable: setEnable,
        setDragging: setDragging,
        setResizing: setResizing,
        setResizingHandle: setResizingHandle,
        setResizingMaxHeight: setResizingMaxHeight,
        setResizingMaxWidth: setResizingMaxWidth,
        setResizingMinWidth: setResizingMinWidth,
        setResizingMinHeight: setResizingMinHeight,
        $setWidth: function (val) { return setWidth(Math.floor(val)); },
        $setHeight: function (val) { return setHeight(Math.floor(val)); },
        $setTop: function (val) { return setTop(Math.floor(val)); },
        $setLeft: function (val) { return setLeft(Math.floor(val)); }
    };
}
exports.initState = initState;
function initParent(containerRef) {
    var parentWidth = vue_1.ref(0);
    var parentHeight = vue_1.ref(0);
    vue_1.onMounted(function () {
        if (containerRef.value && containerRef.value.parentElement) {
            var _a = utils_1.getElSize(containerRef.value.parentElement), width = _a.width, height = _a.height;
            parentWidth.value = width;
            parentHeight.value = height;
        }
    });
    return {
        parentWidth: parentWidth,
        parentHeight: parentHeight
    };
}
exports.initParent = initParent;
function initLimitSizeAndMethods(props, parentSize, containerProps) {
    var width = containerProps.width, height = containerProps.height, left = containerProps.left, top = containerProps.top, resizingMaxWidth = containerProps.resizingMaxWidth, resizingMaxHeight = containerProps.resizingMaxHeight, resizingMinWidth = containerProps.resizingMinWidth, resizingMinHeight = containerProps.resizingMinHeight;
    var $setWidth = containerProps.$setWidth, $setHeight = containerProps.$setHeight, $setTop = containerProps.$setTop, $setLeft = containerProps.$setLeft;
    var parentWidth = parentSize.parentWidth, parentHeight = parentSize.parentHeight;
    var limitProps = {
        minWidth: vue_1.computed(function () {
            return resizingMinWidth.value;
        }),
        minHeight: vue_1.computed(function () {
            return resizingMinHeight.value;
        }),
        maxWidth: vue_1.computed(function () {
            var max = Infinity;
            if (props.parent) {
                max = Math.min(parentWidth.value, resizingMaxWidth.value);
            }
            return max;
        }),
        maxHeight: vue_1.computed(function () {
            var max = Infinity;
            if (props.parent) {
                max = Math.min(parentHeight.value, resizingMaxHeight.value);
            }
            return max;
        }),
        minLeft: vue_1.computed(function () {
            return props.parent ? 0 : -Infinity;
        }),
        minTop: vue_1.computed(function () {
            return props.parent ? 0 : -Infinity;
        }),
        maxLeft: vue_1.computed(function () {
            return props.parent ? parentWidth.value - width.value : Infinity;
        }),
        maxTop: vue_1.computed(function () {
            return props.parent ? parentHeight.value - height.value : Infinity;
        })
    };
    var limitMethods = {
        setWidth: function (val) {
            if (props.disabledW) {
                return width.value;
            }
            return $setWidth(Math.min(limitProps.maxWidth.value, Math.max(limitProps.minWidth.value, val)));
        },
        setHeight: function (val) {
            if (props.disabledH) {
                return height.value;
            }
            return $setHeight(Math.min(limitProps.maxHeight.value, Math.max(limitProps.minHeight.value, val)));
        },
        setTop: function (val) {
            if (props.disabledY) {
                return top.value;
            }
            return $setTop(Math.min(limitProps.maxTop.value, Math.max(limitProps.minTop.value, val)));
        },
        setLeft: function (val) {
            if (props.disabledX) {
                return left.value;
            }
            return $setLeft(Math.min(limitProps.maxLeft.value, Math.max(limitProps.minLeft.value, val)));
        }
    };
    return __assign(__assign({}, limitProps), limitMethods);
}
exports.initLimitSizeAndMethods = initLimitSizeAndMethods;
function initDraggableContainer(containerRef, containerProps, limitProps, draggable, emit, containerProvider, parentSize) {
    var x = containerProps.left, y = containerProps.top, w = containerProps.width, h = containerProps.height, dragging = containerProps.dragging, id = containerProps.id;
    var setDragging = containerProps.setDragging, setEnable = containerProps.setEnable, setResizing = containerProps.setResizing, setResizingHandle = containerProps.setResizingHandle;
    var setTop = limitProps.setTop, setLeft = limitProps.setLeft;
    var lstX = 0;
    var lstY = 0;
    var lstPageX = 0;
    var lstPageY = 0;
    var referenceLineMap = null;
    var _unselect = function (e) {
        var _a;
        var target = e.target;
        if (!((_a = containerRef.value) === null || _a === void 0 ? void 0 : _a.contains(target))) {
            setEnable(false);
            setDragging(false);
            setResizing(false);
            setResizingHandle('');
        }
    };
    var handleUp = function (e) {
        setDragging(false);
        document.documentElement.removeEventListener('mouseup', handleUp);
        document.documentElement.removeEventListener('mousemove', handleDrag);
        referenceLineMap = null;
        if (containerProvider) {
            containerProvider.updatePosition(id, {
                x: x.value,
                y: y.value,
                w: w.value,
                h: h.value
            });
            containerProvider.setMatchedLine(null);
        }
    };
    var handleDrag = function (e) {
        if (!(dragging.value && containerRef.value))
            return;
        var pageX = e.pageX, pageY = e.pageY;
        var deltaX = pageX - lstPageX;
        var deltaY = pageY - lstPageY;
        var newLeft = lstX + deltaX;
        var newTop = lstY + deltaY;
        if (referenceLineMap !== null) {
            var widgetSelfLine = {
                col: [newLeft, newLeft + w.value / 2, newLeft + w.value],
                row: [newTop, newTop + h.value / 2, newTop + h.value]
            };
            var matchedLine = {
                row: widgetSelfLine.row
                    .map(function (i, index) {
                    var match = null;
                    Object.values(referenceLineMap.row).forEach(function (referItem) {
                        if (i >= referItem.min && i <= referItem.max) {
                            match = referItem.value;
                        }
                    });
                    if (match !== null) {
                        if (index === 0) {
                            newTop = match;
                        }
                        else if (index === 1) {
                            newTop = Math.floor(match - h.value / 2);
                        }
                        else if (index === 2) {
                            newTop = Math.floor(match - h.value);
                        }
                    }
                    return match;
                })
                    .filter(function (i) { return i !== null; }),
                col: widgetSelfLine.col
                    .map(function (i, index) {
                    var match = null;
                    Object.values(referenceLineMap.col).forEach(function (referItem) {
                        if (i >= referItem.min && i <= referItem.max) {
                            match = referItem.value;
                        }
                    });
                    if (match !== null) {
                        if (index === 0) {
                            newLeft = match;
                        }
                        else if (index === 1) {
                            newLeft = Math.floor(match - w.value / 2);
                        }
                        else if (index === 2) {
                            newLeft = Math.floor(match - w.value);
                        }
                    }
                    return match;
                })
                    .filter(function (i) { return i !== null; })
            };
            containerProvider.setMatchedLine(matchedLine);
        }
        emit('dragging', { x: setLeft(newLeft), y: setTop(newTop) });
    };
    var handleDown = function (e) {
        if (!draggable.value)
            return;
        setDragging(true);
        lstX = x.value;
        lstY = y.value;
        lstPageX = e.pageX;
        lstPageY = e.pageY;
        document.documentElement.addEventListener('mousemove', handleDrag);
        document.documentElement.addEventListener('mouseup', handleUp);
        if (containerProvider && !containerProvider.disabled.value) {
            referenceLineMap = utils_1.getReferenceLineMap(containerProvider, parentSize, id);
        }
    };
    vue_1.watch(dragging, function (cur, pre) {
        if (!pre && cur) {
            emit('drag-start', { x: x.value, y: y.value });
            setEnable(true);
            setDragging(true);
        }
        else {
            emit('drag-end', { x: x.value, y: y.value });
            setDragging(false);
        }
    });
    vue_1.onMounted(function () {
        var el = containerRef.value;
        if (!el)
            return;
        el.style.left = x + 'px';
        el.style.top = y + 'px';
        document.documentElement.addEventListener('mousedown', _unselect);
        el.addEventListener('mousedown', handleDown);
    });
    vue_1.onUnmounted(function () {
        if (!containerRef.value)
            return;
        document.documentElement.removeEventListener('mousedown', _unselect);
        document.documentElement.removeEventListener('mouseup', handleUp);
        document.documentElement.removeEventListener('mousemove', handleDrag);
    });
    return { containerRef: containerRef };
}
exports.initDraggableContainer = initDraggableContainer;
function initResizeHandle(containerProps, limitProps, parentSize, props, emit) {
    var setWidth = limitProps.setWidth, setHeight = limitProps.setHeight, setLeft = limitProps.setLeft, setTop = limitProps.setTop;
    var width = containerProps.width, height = containerProps.height, left = containerProps.left, top = containerProps.top, aspectRatio = containerProps.aspectRatio;
    var setResizing = containerProps.setResizing, setResizingHandle = containerProps.setResizingHandle, setResizingMaxWidth = containerProps.setResizingMaxWidth, setResizingMaxHeight = containerProps.setResizingMaxHeight, setResizingMinWidth = containerProps.setResizingMinWidth, setResizingMinHeight = containerProps.setResizingMinHeight;
    var parentWidth = parentSize.parentWidth, parentHeight = parentSize.parentHeight;
    var lstW = 0;
    var lstH = 0;
    var lstX = 0;
    var lstY = 0;
    var lstPageX = 0;
    var lstPageY = 0;
    var tmpAspectRatio = 1;
    var idx0 = '';
    var idx1 = '';
    var resizeHandleDrag = function (e) {
        var deltaX = e.clientX - lstPageX;
        var deltaY = e.clientY - lstPageY;
        var _deltaX = deltaX;
        var _deltaY = deltaY;
        if (props.lockAspectRatio) {
            deltaX = Math.abs(deltaX);
            deltaY = deltaX * tmpAspectRatio;
            if (idx0 === 't') {
                if (_deltaX < 0 || (idx1 === 'm' && _deltaY < 0)) {
                    deltaX = -deltaX;
                    deltaY = -deltaY;
                }
            }
            else {
                if (_deltaX < 0 || (idx1 === 'm' && _deltaY < 0)) {
                    deltaX = -deltaX;
                    deltaY = -deltaY;
                }
            }
        }
        if (idx0 === 't') {
            setHeight(lstH - deltaY);
            setTop(lstY - (height.value - lstH));
        }
        else if (idx0 === 'b') {
            setHeight(lstH + deltaY);
        }
        if (idx1 === 'l') {
            setWidth(lstW - deltaX);
            setLeft(lstX - (width.value - lstW));
        }
        else if (idx1 === 'r') {
            setWidth(lstW + deltaX);
        }
        emit('resizing', {
            x: left.value,
            y: top.value,
            w: width.value,
            h: height.value
        });
    };
    var resizeHandleUp = function (e) {
        emit('resize-end', {
            x: left.value,
            y: top.value,
            w: width.value,
            h: height.value
        });
        setResizingHandle('');
        setResizing(false);
        setResizingMaxWidth(Infinity);
        setResizingMaxHeight(Infinity);
        setResizingMinWidth(props.minW);
        setResizingMinHeight(props.minH);
        document.documentElement.removeEventListener('mousemove', resizeHandleDrag);
        document.documentElement.removeEventListener('mouseup', resizeHandleUp);
    };
    var resizeHandleDown = function (e, handleType) {
        if (!props.resizable)
            return;
        e.stopPropagation();
        setResizingHandle(handleType);
        setResizing(true);
        idx0 = handleType[0];
        idx1 = handleType[1];
        if (aspectRatio.value) {
            if (['tl', 'tm', 'ml', 'bl'].includes(handleType)) {
                idx0 = 't';
                idx1 = 'l';
            }
            else {
                idx0 = 'b';
                idx1 = 'r';
            }
        }
        var minHeight = props.minH;
        var minWidth = props.minW;
        if (minHeight / minWidth > aspectRatio.value) {
            minWidth = minHeight / aspectRatio.value;
        }
        else {
            minHeight = minWidth * aspectRatio.value;
        }
        setResizingMinWidth(minWidth);
        setResizingMinHeight(minHeight);
        if (parent) {
            var maxHeight = idx0 === 't' ? top.value + height.value : parentHeight.value - top.value;
            var maxWidth = idx1 === 'l' ? left.value + width.value : parentWidth.value - left.value;
            if (props.lockAspectRatio) {
                if (maxHeight / maxWidth < aspectRatio.value) {
                    maxWidth = maxHeight / aspectRatio.value;
                }
                else {
                    maxHeight = maxWidth * aspectRatio.value;
                }
            }
            setResizingMaxHeight(maxHeight);
            setResizingMaxWidth(maxWidth);
        }
        lstW = width.value;
        lstH = height.value;
        lstX = left.value;
        lstY = top.value;
        lstPageX = e.clientX;
        lstPageY = e.clientY;
        tmpAspectRatio = aspectRatio.value;
        emit('resize-start', {
            x: left.value,
            y: top.value,
            w: width.value,
            h: height.value
        });
        document.documentElement.addEventListener('mousemove', resizeHandleDrag);
        document.documentElement.addEventListener('mouseup', resizeHandleUp);
    };
    vue_1.onUnmounted(function () {
        document.documentElement.removeEventListener('mouseup', resizeHandleDrag);
        document.documentElement.removeEventListener('mousemove', resizeHandleUp);
    });
    var handlesFiltered = vue_1.computed(function () {
        return props.resizable ? utils_1.filterHandles(props.handles) : [];
    });
    return {
        handlesFiltered: handlesFiltered,
        resizeHandleDown: resizeHandleDown
    };
}
exports.initResizeHandle = initResizeHandle;
function watchProps(props, limits) {
    var setWidth = limits.setWidth, setHeight = limits.setHeight, setLeft = limits.setLeft, setTop = limits.setTop;
    vue_1.watch(function () { return props.w; }, function (newVal) {
        setWidth(newVal);
    });
    vue_1.watch(function () { return props.h; }, function (newVal) {
        setHeight(newVal);
    });
    vue_1.watch(function () { return props.x; }, function (newVal) {
        setLeft(newVal);
    });
    vue_1.watch(function () { return props.y; }, function (newVal) {
        setTop(newVal);
    });
}
exports.watchProps = watchProps;


/***/ }),

/***/ "./node_modules/vue3-draggable-resizable/src/components/utils.js":
/*!***********************************************************************!*\
  !*** ./node_modules/vue3-draggable-resizable/src/components/utils.js ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.getReferenceLineMap = exports.getId = exports.filterHandles = exports.removeEvent = exports.addEvent = exports.getElSize = exports.IDENTITY = void 0;
var Vue3DraggableResizable_1 = __webpack_require__(/*! ./Vue3DraggableResizable */ "./node_modules/vue3-draggable-resizable/src/components/Vue3DraggableResizable.js");
exports.IDENTITY = Symbol('Vue3DraggableResizable');
function getElSize(el) {
    var style = window.getComputedStyle(el);
    return {
        width: parseFloat(style.getPropertyValue('width')),
        height: parseFloat(style.getPropertyValue('height'))
    };
}
exports.getElSize = getElSize;
function addEvent(el, event, handler) {
    if (!el) {
        return;
    }
    el.addEventListener(event, handler);
}
exports.addEvent = addEvent;
function removeEvent(el, event, handler) {
    if (!el) {
        return;
    }
    el.removeEventListener(event, handler);
}
exports.removeEvent = removeEvent;
function filterHandles(handles) {
    if (handles && handles.length > 0) {
        var result_1 = [];
        handles.forEach(function (item) {
            if (Vue3DraggableResizable_1.ALL_HANDLES.includes(item) && !result_1.includes(item)) {
                result_1.push(item);
            }
        });
        return result_1;
    }
    else {
        return [];
    }
}
exports.filterHandles = filterHandles;
function getId() {
    return String(Math.random()).substr(2) + String(Date.now());
}
exports.getId = getId;
function getReferenceLineMap(containerProvider, parentSize, id) {
    var _a, _b;
    if (containerProvider.disabled.value) {
        return null;
    }
    var referenceLine = {
        row: [],
        col: []
    };
    var parentWidth = parentSize.parentWidth, parentHeight = parentSize.parentHeight;
    (_a = referenceLine.row).push.apply(_a, containerProvider.adsorbRows);
    (_b = referenceLine.col).push.apply(_b, containerProvider.adsorbCols);
    if (containerProvider.adsorbParent.value) {
        referenceLine.row.push(0, parentHeight.value, parentHeight.value / 2);
        referenceLine.col.push(0, parentWidth.value, parentWidth.value / 2);
    }
    var widgetPositionStore = containerProvider.getPositionStore(id);
    Object.values(widgetPositionStore).forEach(function (_a) {
        var x = _a.x, y = _a.y, w = _a.w, h = _a.h;
        referenceLine.row.push(y, y + h, y + h / 2);
        referenceLine.col.push(x, x + w, x + w / 2);
    });
    var referenceLineMap = {
        row: referenceLine.row.reduce(function (pre, cur) {
            var _a;
            return __assign(__assign({}, pre), (_a = {}, _a[cur] = { min: cur - 5, max: cur + 5, value: cur }, _a));
        }, {}),
        col: referenceLine.col.reduce(function (pre, cur) {
            var _a;
            return __assign(__assign({}, pre), (_a = {}, _a[cur] = { min: cur - 5, max: cur + 5, value: cur }, _a));
        }, {})
    };
    return referenceLineMap;
}
exports.getReferenceLineMap = getReferenceLineMap;


/***/ }),

/***/ "./node_modules/vue3-draggable-resizable/src/index.js":
/*!************************************************************!*\
  !*** ./node_modules/vue3-draggable-resizable/src/index.js ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
var Vue3DraggableResizable_1 = __webpack_require__(/*! ./components/Vue3DraggableResizable */ "./node_modules/vue3-draggable-resizable/src/components/Vue3DraggableResizable.js");
var DraggableContainer_1 = __webpack_require__(/*! ./components/DraggableContainer */ "./node_modules/vue3-draggable-resizable/src/components/DraggableContainer.js");
Vue3DraggableResizable_1["default"].install = function (app) {
    app.component(Vue3DraggableResizable_1["default"].name, Vue3DraggableResizable_1["default"]);
    app.component(DraggableContainer_1["default"].name, DraggableContainer_1["default"]);
    return app;
};
var DraggableContainer_2 = __webpack_require__(/*! ./components/DraggableContainer */ "./node_modules/vue3-draggable-resizable/src/components/DraggableContainer.js");
__createBinding(exports, DraggableContainer_2, "default", "DraggableContainer");
exports.default = Vue3DraggableResizable_1["default"];


/***/ })

}]);