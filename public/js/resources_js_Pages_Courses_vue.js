(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_Pages_Courses_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Courses.vue?vue&type=script&lang=js":
/*!********************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Courses.vue?vue&type=script&lang=js ***!
  \********************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Store_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Store/index */ "./resources/js/Store/index.js");
/* harmony import */ var _services_API__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/API */ "./resources/js/services/API.js");


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  data: function data() {
    return {
      authUser: null,
      enrolledCourses: [],
      courses: [],
      childIsOpen: false,
      courseID: null
    };
  },
  methods: {
    addCourse: function addCourse() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
        var payload, course;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                payload = {
                  name: "New Course",
                  description: "New Course"
                };
                _context.next = 3;
                return _services_API__WEBPACK_IMPORTED_MODULE_2__.apiClient.post("/courses", payload);

              case 3:
                course = _context.sent;
                _this.courseID = course.data.id;

                _this.enrolledCourses.push(_this.courseID);

                _this.addProfessor();

                _this.childIsOpen = true;

                _this.$router.push({
                  name: "EditCourse",
                  params: {
                    course_id: _this.courseID
                  }
                });

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    addProfessor: function addProfessor() {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee2() {
        var payload, prof;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                payload = {
                  "courses": JSON.stringify({
                    "courses": _this2.enrolledCourses
                  })
                };
                _context2.next = 3;
                return _services_API__WEBPACK_IMPORTED_MODULE_2__.apiClient.put("/professors/".concat(_this2.authUser.fsc_user.fsc_id), payload);

              case 3:
                prof = _context2.sent;
                return _context2.abrupt("return", prof);

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    },
    editCourse: function editCourse(id) {
      this.childIsOpen = true;
      this.courseID = id;
      this.$router.push({
        name: "EditCourse",
        params: {
          course_id: this.courseID
        }
      });
    },
    deleteCourse: function deleteCourse(id, course) {
      var _this3 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee3() {
        var flag, res, i, ind;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                flag = confirm("Are you Sure you want to delete " + course.name);

                if (!flag) {
                  _context3.next = 17;
                  break;
                }

                _this3.childIsOpen = false; //delete the course

                _context3.next = 5;
                return _services_API__WEBPACK_IMPORTED_MODULE_2__.apiClient.delete("/courses/".concat(id));

              case 5:
                res = _context3.sent;
                console.log(res);
                console.log("delete Course: " + id);
                ind = null;

                for (i = 0; i <= _this3.enrolledCourses.length; i++) {
                  if (_this3.enrolledCourses[i] == id) {
                    ind = i;
                  }
                }

                _this3.enrolledCourses.splice(ind, 1);

                _this3.addProfessor();

                delete _this3.courses.course;
                _this3.courseID = null;

                _this3.getCourses();

                _context3.next = 18;
                break;

              case 17:
                console.log("Delete avoided");

              case 18:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }))();
    },
    goToLabs: function goToLabs(id) {
      this.childIsOpen = true;
      this.courseID = id;
      this.$router.push({
        name: "Labs",
        params: {
          course_id: this.courseID
        }
      });
    },
    getCourses: function getCourses() {
      var _this4 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee4() {
        var i, cur, course;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _this4.courses = [];
                i = 0;

              case 2:
                if (!(i < _this4.enrolledCourses.length)) {
                  _context4.next = 11;
                  break;
                }

                cur = _this4.enrolledCourses[i];
                _context4.next = 6;
                return _services_API__WEBPACK_IMPORTED_MODULE_2__.apiClient.get("/courses/".concat(cur));

              case 6:
                course = _context4.sent;

                _this4.courses.push(course.data);

              case 8:
                i++;
                _context4.next = 2;
                break;

              case 11:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }))();
    },
    childUnmounting: function childUnmounting() {
      this.childIsOpen = false;
      this.courseID = null;
    }
  },
  mounted: function mounted() {
    this.childIsOpen = false;
    this.authUser = _Store_index__WEBPACK_IMPORTED_MODULE_1__.default.getters["auth/authUser"];

    if (this.authUser.fsc_user.courses) {
      this.enrolledCourses = JSON.parse(this.authUser.fsc_user.courses).courses;
    }

    this.getCourses();
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Courses.vue?vue&type=template&id=38da3fc2":
/*!************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Courses.vue?vue&type=template&id=38da3fc2 ***!
  \************************************************************************************************************************************************************************************************************************************************************************/
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
}, [/*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("h2", null, "My Courses"), /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("hr")], -1
/* HOISTED */
);

var _hoisted_3 = {
  "class": "coursecontainer"
};
var _hoisted_4 = {
  "class": "courserow row my-5"
};
var _hoisted_5 = {
  "class": "width col-xl-3 col-lg-4 col-md-6 col-sm-12 col-xs-12"
};
var _hoisted_6 = {
  "class": "card coursecard w-100"
};
var _hoisted_7 = {
  "class": "courses card-content"
};
var _hoisted_8 = {
  "class": "card-title my-3 mx-2 mb-0"
};

var _hoisted_9 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("hr", {
  "class": "courses my-0"
}, null, -1
/* HOISTED */
);

var _hoisted_10 = {
  "class": "add-course fixed-course-width"
};

var _hoisted_11 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", {
  "class": "width col-xl-3 col-lg-4 col-md-6 col-sm-12 col-xs-12"
}, [/*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", {
  "class": "card coursecard w-100"
}, [/*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", {
  "class": "courses card-img-add"
}), /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <div class=\"courses card-content\">\n                    <h6 class=\"card-title my-3 mx-2 mb-0\">Add Course</h6>\n                    <hr class=\"courses my-0\" />\n\n                    <a class=\"courselaunch text-danger mx-2 my-1 no-decor\"></a\n                    >\n                  </div> ")])], -1
/* HOISTED */
);

var _hoisted_12 = {
  key: 0
};

var _hoisted_13 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("h1", null, "No Registered Courses", -1
/* HOISTED */
);

function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_router_view = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("router-view");

  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Main Page"), !$data.childIsOpen ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)("div", _hoisted_1, [_hoisted_2, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", _hoisted_4, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.courses, function (course) {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)("div", {
      "class": "fixed-course-width",
      key: course.id
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("a", {
      onClick: function onClick($event) {
        return $options.goToLabs(course.id);
      },
      "class": "no-decor"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" :to=\"{ name: 'Labs', params: { id: course.id } }\" "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", _hoisted_6, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", {
      "class": "courses card-img-top",
      style: {
        backgroundImage: "url(".concat(course.img_loc, ")")
      }
    }, null, 4
    /* STYLE */
    ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", _hoisted_7, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("h6", _hoisted_8, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(course.name), 1
    /* TEXT */
    ), _hoisted_9, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <a href=\"Labs.vue\" class=\"courselaunch text-danger mx-2 my-1 no-decor\"\n                      >Get Started</a\n                    > ")])])])], 8
    /* PROPS */
    , ["onClick"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("a", {
      onClick: function onClick($event) {
        return $options.editCourse(course.id);
      },
      "class": "courselaunch text-danger mx-2 my-1 no-decor"
    }, "•••", 8
    /* PROPS */
    , ["onClick"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("a", {
      onClick: function onClick($event) {
        return $options.deleteCourse(course.id, course);
      },
      "class": "courselaunch text-danger mx-2 my-1 no-decor"
    }, "X", 8
    /* PROPS */
    , ["onClick"])]);
  }), 128
  /* KEYED_FRAGMENT */
  )), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", _hoisted_10, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("a", {
    onClick: _cache[1] || (_cache[1] = function ($event) {
      return $options.addCourse();
    }),
    "class": "no-decor"
  }, [_hoisted_11])]), $data.courses.length == 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)("div", _hoisted_12, [_hoisted_13])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $data.childIsOpen ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_router_view, {
    key: 1,
    onLabUnmounting: _cache[2] || (_cache[2] = function ($event) {
      return $options.childUnmounting();
    }),
    onEditUnmounting: _cache[3] || (_cache[3] = function ($event) {
      return $options.childUnmounting();
    }),
    courseID: $data.courseID
  }, null, 8
  /* PROPS */
  , ["courseID"])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]);
}

/***/ }),

/***/ "./resources/js/Pages/Courses.vue":
/*!****************************************!*\
  !*** ./resources/js/Pages/Courses.vue ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Courses_vue_vue_type_template_id_38da3fc2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Courses.vue?vue&type=template&id=38da3fc2 */ "./resources/js/Pages/Courses.vue?vue&type=template&id=38da3fc2");
/* harmony import */ var _Courses_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Courses.vue?vue&type=script&lang=js */ "./resources/js/Pages/Courses.vue?vue&type=script&lang=js");



_Courses_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__.default.render = _Courses_vue_vue_type_template_id_38da3fc2__WEBPACK_IMPORTED_MODULE_0__.render
/* hot reload */
if (false) {}

_Courses_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__.default.__file = "resources/js/Pages/Courses.vue"

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_Courses_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__.default);

/***/ }),

/***/ "./resources/js/Pages/Courses.vue?vue&type=script&lang=js":
/*!****************************************************************!*\
  !*** ./resources/js/Pages/Courses.vue?vue&type=script&lang=js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Courses_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__.default)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Courses_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Courses.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Courses.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/Pages/Courses.vue?vue&type=template&id=38da3fc2":
/*!**********************************************************************!*\
  !*** ./resources/js/Pages/Courses.vue?vue&type=template&id=38da3fc2 ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Courses_vue_vue_type_template_id_38da3fc2__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Courses_vue_vue_type_template_id_38da3fc2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Courses.vue?vue&type=template&id=38da3fc2 */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Courses.vue?vue&type=template&id=38da3fc2");


/***/ })

}]);