(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_Pages_Labs_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Labs.vue?vue&type=script&lang=js":
/*!*****************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Labs.vue?vue&type=script&lang=js ***!
  \*****************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _services_API__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/API */ "./resources/js/services/API.js");
/* harmony import */ var _Store_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Store/index */ "./resources/js/Store/index.js");


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  props: ["courseID"],
  emits: ["unmounting", "courseEdited"],
  data: function data() {
    return {
      labs: [],
      childisOpen: false,
      labID: null,
      labName: null,
      authUser: null,
      fscID: null,
      progress: []
    };
  },
  methods: {
    goToProblems: function goToProblems(id, name) {
      this.childisOpen = true;
      this.labID = id;
      this.labName = name;
      this.$router.push({
        name: "Problems",
        params: {
          lab_id: id
        }
      });
    },
    getLabs: function getLabs() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
        var rawLabs, prog, i;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _services_API__WEBPACK_IMPORTED_MODULE_1__.apiClient.get("/labs/".concat(_this.courseID));

              case 2:
                rawLabs = _context.sent;
                _this.labs = rawLabs.data.data;
                _context.next = 6;
                return _this.getStudent();

              case 6:
                prog = _context.sent;
                i = 0;

              case 8:
                if (!(i < _this.labs.length)) {
                  _context.next = 18;
                  break;
                }

                _context.next = 11;
                return _this.getPercent(_this.labs[i]);

              case 11:
                _this.labs[i]['percent'] = _context.sent;
                _context.next = 14;
                return _this.getActivity(_this.labs[i]);

              case 14:
                _this.labs[i]['activity'] = _context.sent;

              case 15:
                i++;
                _context.next = 8;
                break;

              case 18:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    Unmounting: function Unmounting() {
      this.childisOpen = false;
      this.labID = null;
      this.labName = null;
      this.$router.push({
        name: "Labs",
        params: {
          course_id: this.courseID
        }
      });
    },
    labEdited: function labEdited() {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee2() {
        var lab;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                ///update the list of courses
                _this2.labs = _this2.labs.filter(function (l) {
                  return l.id != _this2.labID;
                });
                _context2.next = 3;
                return _services_API__WEBPACK_IMPORTED_MODULE_1__.apiClient.get("/labs/full/".concat(_this2.labID));

              case 3:
                lab = _context2.sent;

                _this2.labs.push(lab.data.data);

                _this2.Unmounting();

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    },
    addLab: function addLab() {
      var _this3 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee3() {
        var payload, lab;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                payload = {
                  "name": "New Lab",
                  "description": "New Lab",
                  "course_id": _this3.courseID,
                  "due_date": "2021-06-3 23:59:59"
                };
                _context3.next = 3;
                return _services_API__WEBPACK_IMPORTED_MODULE_1__.apiClient.post("/labs/", payload);

              case 3:
                lab = _context3.sent;

                _this3.labs.push(lab.data.data);

                console.log(lab.data.data);
                _this3.labID = lab.data.data.id;
                _this3.labName = lab.data.data.name;
                console.log(_this3.labID);
                _this3.childisOpen = true;

                _this3.$router.push({
                  name: "EditLab",
                  params: {
                    lab_id: _this3.labID
                  }
                });

              case 11:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }))();
    },
    editLab: function editLab(id, name) {
      this.childisOpen = true;
      this.labID = id;
      this.labName = name;
      this.$router.push({
        name: "EditLab",
        params: {
          lab_id: this.labID
        }
      });
    },
    removeLab: function removeLab(lab, key) {
      var _this4 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee4() {
        var res;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return _services_API__WEBPACK_IMPORTED_MODULE_1__.apiClient.delete("/labs/".concat(lab));

              case 2:
                res = _context4.sent;
                //filter from labs
                _this4.labs = _this4.labs.filter(function (l, i) {
                  return i != key;
                });

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }))();
    },
    getStudent: function getStudent() {
      var _this5 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee5() {
        var res;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _this5.authUser = _Store_index__WEBPACK_IMPORTED_MODULE_2__.default.getters["auth/authUser"];
                _this5.fscID = _this5.authUser.fsc_user.fsc_id;
                _context5.next = 4;
                return _services_API__WEBPACK_IMPORTED_MODULE_1__.apiClient.get("/progress/".concat(_this5.fscID));

              case 4:
                res = _context5.sent;
                _this5.progress = res.data;
                return _context5.abrupt("return", _this5.progress);

              case 7:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }))();
    },
    getPercent: function getPercent(lab) {
      var _this6 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee6() {
        var d, c, i;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                d = JSON.parse(_this6.progress.labs);
                i = 0;

              case 2:
                if (!(i <= d.length)) {
                  _context6.next = 9;
                  break;
                }

                if (!(d[i].lab_id == lab.id)) {
                  _context6.next = 6;
                  break;
                }

                c = d[i];
                return _context6.abrupt("break", 9);

              case 6:
                i++;
                _context6.next = 2;
                break;

              case 9:
                if (!(lab.numProblems == 0)) {
                  _context6.next = 13;
                  break;
                }

                return _context6.abrupt("return", "0%");

              case 13:
                return _context6.abrupt("return", parseInt(c.num_completed / lab.num_problems) * 100 + "%");

              case 14:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }))();
    },
    getActivity: function getActivity(lab) {
      var _this7 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee7() {
        var d, i;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                d = JSON.parse(_this7.progress.labs);
                i = 0;

              case 2:
                if (!(i <= d.length)) {
                  _context7.next = 8;
                  break;
                }

                if (!(d[i].lab_id == lab.id)) {
                  _context7.next = 5;
                  break;
                }

                return _context7.abrupt("return", d[i].last_progress);

              case 5:
                i++;
                _context7.next = 2;
                break;

              case 8:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }))();
    }
  },
  computed: {
    isProf: function isProf() {
      if (_Store_index__WEBPACK_IMPORTED_MODULE_2__.default.getters["auth/isProf"] == null) {
        return false;
      } else {
        return _Store_index__WEBPACK_IMPORTED_MODULE_2__.default.getters["auth/isProf"];
      }
    }
  },
  beforeMount: function beforeMount() {
    var _this8 = this;

    return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee8() {
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _this8.childisOpen = false;
              _context8.next = 3;
              return _this8.getLabs();

            case 3:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    }))();
  },
  beforeUnmount: function beforeUnmount() {
    this.$emit("unmounting");
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Labs.vue?vue&type=template&id=135154af":
/*!*********************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Labs.vue?vue&type=template&id=135154af ***!
  \*********************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

var _hoisted_1 = {
  key: 0
};

var _hoisted_2 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", {
  "class": "courses header"
}, [/*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("h2", null, "Labs"), /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("hr")], -1
/* HOISTED */
);

var _hoisted_3 = {
  "class": "table labtable"
};

var _hoisted_4 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("thead", {
  "class": "labtable"
}, [/*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("tr", null, [/*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("th", null, "Title"), /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("th", null, "# Problems"), /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("th", null, "% Complete"), /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("th", null, "Due Date"), /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("th", null, "Last Activity")])], -1
/* HOISTED */
);

function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_router_view = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("router-view");

  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, [!$data.childisOpen ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Main Page"), _hoisted_2, $options.isProf ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)("a", {
    key: 0,
    "class": "pointer no-decor",
    onClick: _cache[1] || (_cache[1] = function () {
      return $options.addLab && $options.addLab.apply($options, arguments);
    })
  }, "ADD")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("table", _hoisted_3, [_hoisted_4, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("tbody", null, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.labs, function (lab, key) {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
      key: lab.id
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("tr", {
      "class": "lab pointer",
      onClick: function onClick($event) {
        return $options.goToProblems(lab.id, lab.name);
      }
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("td", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("a", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(lab.name), 1
    /* TEXT */
    )]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(lab.num_problems), 1
    /* TEXT */
    ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(lab.percent), 1
    /* TEXT */
    ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <td>69%</td> "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(lab.due_date.split(" ")[0]), 1
    /* TEXT */
    ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(lab.activity), 1
    /* TEXT */
    ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <td>4/20/0420</td> ")], 8
    /* PROPS */
    , ["onClick"]), $options.isProf ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)("a", {
      key: 0,
      "class": "pointer no-decor",
      onClick: function onClick($event) {
        return $options.editLab(lab.id, lab.name);
      }
    }, "•••", 8
    /* PROPS */
    , ["onClick"])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $options.isProf ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)("a", {
      key: 1,
      "class": "pointer no-decor",
      onClick: function onClick($event) {
        return $options.removeLab(lab.id, key);
      }
    }, "X", 8
    /* PROPS */
    , ["onClick"])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 64
    /* STABLE_FRAGMENT */
    );
  }), 128
  /* KEYED_FRAGMENT */
  )), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <tr\n            class=\"lab\"\n            style=\"cursor: pointer\"\n          >\n            <td><a>Lab 2: Printing & I/O</a></td>\n            <td>5</td>\n            <td>100%</td>\n            <td>1/31/2021</td>\n            <td>1/31/2021</td>\n          </tr> ")])])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $data.childisOpen ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_router_view, {
    key: 1,
    onUnmounting: _cache[2] || (_cache[2] = function ($event) {
      return $options.Unmounting();
    }),
    onLabEdited: _cache[3] || (_cache[3] = function ($event) {
      return $options.labEdited();
    }),
    labID: $data.labID,
    labName: $data.labName
  }, null, 8
  /* PROPS */
  , ["labID", "labName"])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 64
  /* STABLE_FRAGMENT */
  );
}

/***/ }),

/***/ "./resources/js/Pages/Labs.vue":
/*!*************************************!*\
  !*** ./resources/js/Pages/Labs.vue ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Labs_vue_vue_type_template_id_135154af__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Labs.vue?vue&type=template&id=135154af */ "./resources/js/Pages/Labs.vue?vue&type=template&id=135154af");
/* harmony import */ var _Labs_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Labs.vue?vue&type=script&lang=js */ "./resources/js/Pages/Labs.vue?vue&type=script&lang=js");



_Labs_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__.default.render = _Labs_vue_vue_type_template_id_135154af__WEBPACK_IMPORTED_MODULE_0__.render
/* hot reload */
if (false) {}

_Labs_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__.default.__file = "resources/js/Pages/Labs.vue"

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_Labs_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__.default);

/***/ }),

/***/ "./resources/js/Pages/Labs.vue?vue&type=script&lang=js":
/*!*************************************************************!*\
  !*** ./resources/js/Pages/Labs.vue?vue&type=script&lang=js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Labs_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__.default)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Labs_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Labs.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Labs.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/Pages/Labs.vue?vue&type=template&id=135154af":
/*!*******************************************************************!*\
  !*** ./resources/js/Pages/Labs.vue?vue&type=template&id=135154af ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Labs_vue_vue_type_template_id_135154af__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Labs_vue_vue_type_template_id_135154af__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Labs.vue?vue&type=template&id=135154af */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Labs.vue?vue&type=template&id=135154af");


/***/ })

}]);