(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_Pages_CourseEnroll_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/CourseEnroll.vue?vue&type=script&lang=js":
/*!*************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/CourseEnroll.vue?vue&type=script&lang=js ***!
  \*************************************************************************************************************************************************************************************************/
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
  data: function data() {
    return {
      key: "",
      course: {},
      courseID: "",
      courseImg: "",
      imgSizes: {
        width: 0,
        height: 0,
        fScaleToTargetWidth: true
      },
      showInfoModal: false,
      reloadInfoModal: 0
    };
  },
  methods: {
    scaleImage: function scaleImage(srcwidth, srcheight, targetwidth, targetheight, fLetterBox) {
      console.log("HERE");
      console.log(srcwidth);
      console.log(srcheight);
      console.log(targetwidth);
      console.log(targetheight);
      console.log(fLetterBox);
      this.imgSizes = {
        width: 0,
        height: 0,
        fScaleToTargetWidth: true
      };

      if (srcwidth > 0 && srcheight > 0 && targetwidth > 0 && targetheight > 0) {
        // scale to the target width
        var scaleX1 = targetwidth;
        var scaleY1 = srcheight * targetwidth / srcwidth; // scale to the target height

        var scaleX2 = srcwidth * targetheight / srcheight;
        var scaleY2 = targetheight; // now figure out which one we should use

        var fScaleOnWidth = scaleX2 > targetwidth;

        if (fScaleOnWidth) {
          fScaleOnWidth = fLetterBox;
        } else {
          fScaleOnWidth = !fLetterBox;
        }

        if (fScaleOnWidth) {
          this.imgSizes.width = Math.floor(scaleX1);
          this.imgSizes.height = Math.floor(scaleY1);
          this.imgSizes.fScaleToTargetWidth = true;
        } else {
          this.imgSizes.width = Math.floor(scaleX2);
          this.imgSizes.height = Math.floor(scaleY2);
          this.imgSizes.fScaleToTargetWidth = false;
        }

        this.imgSizes.targetleft = Math.floor((targetwidth - this.imgSizes.width) / 2);
        this.imgSizes.targettop = Math.floor((targetheight - this.imgSizes.height) / 2);
      }
    },
    joinCourse: function joinCourse() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
        var res, authUser;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _services_API__WEBPACK_IMPORTED_MODULE_1__.apiClient.post("/invite/enroll/".concat(_this.key));

              case 3:
                res = _context.sent;

                if (!(res.status != 200)) {
                  _context.next = 6;
                  break;
                }

                throw new Error(res);

              case 6:
                _context.next = 8;
                return _this.$store.dispatch("auth/getAuthUser");

              case 8:
                authUser = _context.sent;

                //move to course page
                // this.$router.push({ name: "Labs", params: { course_id: this.courseID } });
                _this.$router.push({
                  name: "Courses"
                });

                _context.next = 17;
                break;

              case 12:
                _context.prev = 12;
                _context.t0 = _context["catch"](0);
                //display modal saying course invite code is no longer active
                console.log("something went wrong in try");

                if (_context.t0.response.status == 403) {
                  console.log(_context.t0.response);
                }

                _this.joining();

              case 17:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 12]]);
      }))();
    },
    cancelCourse: function cancelCourse() {
      //move to home since not joining page
      this.$router.push({
        name: "Courses"
      });
    },
    getCourse: function getCourse() {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee2() {
        var res, resp;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                //if valid key
                if (_this2.key == "") {
                  console.log("404");
                }

                _context2.next = 3;
                return _services_API__WEBPACK_IMPORTED_MODULE_1__.apiClient.get("/invite/".concat(_this2.key));

              case 3:
                res = _context2.sent;
                _this2.courseID = res.data.data.course_id; //grab course using key

                _context2.next = 7;
                return _services_API__WEBPACK_IMPORTED_MODULE_1__.apiClient.get("/courses/".concat(_this2.courseID));

              case 7:
                resp = _context2.sent;
                _this2.course = resp.data.data; //Grab image location from course

                _this2.courseImg = _this2.course.img_loc;

              case 10:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    },
    getKey: function getKey() {
      // /key/enroll
      var r = window.location.pathname;
      r = r.split("/");
      this.key = r[1];
    },
    closeInfo: function closeInfo() {
      this.showInfoModal = false;
    },
    joining: function joining() {
      this.showInfoModal = true;
    }
  },
  watch: {
    showInfoModal: function showInfoModal() {
      if (!this.showInfoModal) {
        this.reloadInfoModal++;
      }
    }
  },
  beforeMount: function beforeMount() {
    var _this3 = this;

    return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee3() {
      var self, img;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _this3.getKey();

              _context3.next = 3;
              return _this3.getCourse();

            case 3:
              console.log(_this3.course);
              self = _this3;
              img = new Image();

              img.onload = function () {
                self.scaleImage(this.width, this.height, 600, 338, false);
              };

              img.src = _this3.courseImg;

            case 8:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }))();
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/CourseEnroll.vue?vue&type=template&id=5b193a4a":
/*!*****************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/CourseEnroll.vue?vue&type=template&id=5b193a4a ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

var _hoisted_1 = {
  "class": "delete Course"
};

var _hoisted_2 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("p", null, "This Invite Code has expired please contact your professor", -1
/* HOISTED */
);

var _hoisted_3 = {
  "class": "delete-buttons"
};
var _hoisted_4 = {
  "class": "invite-card center"
};
var _hoisted_5 = {
  "class": "crop"
};

var _hoisted_6 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("br", null, null, -1
/* HOISTED */
);

var _hoisted_7 = {
  "class": "center"
};

var _hoisted_8 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("br", null, null, -1
/* HOISTED */
);

var _hoisted_9 = {
  "class": "center"
};

var _hoisted_10 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("br", null, null, -1
/* HOISTED */
);

function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_vue_final_modal = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("vue-final-modal");

  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_vue_final_modal, {
    "class": "delete-modal",
    modelValue: $data.showInfoModal,
    "onUpdate:modelValue": _cache[3] || (_cache[3] = function ($event) {
      return $data.showInfoModal = $event;
    }),
    classes: "modal-container",
    "content-class": "modal-content delete-modal",
    "esc-to-close": true
  }, {
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("button", {
        "class": "modal-close",
        onClick: _cache[1] || (_cache[1] = function ($event) {
          return $options.closeInfo();
        })
      }, "x"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", _hoisted_1, [_hoisted_2, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("button", {
        "class": "btn btn-md btn-danger delete-button",
        onClick: _cache[2] || (_cache[2] = function ($event) {
          return $options.closeInfo();
        })
      }, "OK")])])];
    }),
    _: 1
    /* STABLE */

  }, 8
  /* PROPS */
  , ["modelValue"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", {
    style: 'background-image: url("' + this.courseImg + '")',
    "class": "inviteBG"
  }, null, 4
  /* STYLE */
  ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <img\n        :src=\"this.courseImg\"\n        alt=\"Course Image\"\n        class=\"invite-card-img\"\n        :width=\"imgSizes.width\"\n        :height=\"imgSizes.height\"\n      /> "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("img", {
    src: this.courseImg,
    alt: "Course Image",
    width: "600"
  }, null, 8
  /* PROPS */
  , ["src"])]), _hoisted_6, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("h3", _hoisted_7, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.course.name), 1
  /* TEXT */
  ), _hoisted_8, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("p", _hoisted_9, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.course.start_date) + " — " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.course.end_date), 1
  /* TEXT */
  ), _hoisted_10, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("button", {
    "class": "btn btn-lg",
    style: {
      "width": "97%",
      "background-color": "#14a160",
      "border-radius": "5px !important",
      "color": "white"
    },
    onClick: _cache[4] || (_cache[4] = function ($event) {
      return $options.joinCourse();
    })
  }, " Join! ")])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <h1>You have been invited to join {{ course.name }}</h1>\n  <button @click=\"joinCourse()\" type=\"submit\">Join</button>\n  <button @click=\"cancelCourse()\" type=\"submit\">Cancel</button>\n  <p>yah</p> ")], 2112
  /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
  );
}

/***/ }),

/***/ "./resources/js/Pages/CourseEnroll.vue":
/*!*********************************************!*\
  !*** ./resources/js/Pages/CourseEnroll.vue ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _CourseEnroll_vue_vue_type_template_id_5b193a4a__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CourseEnroll.vue?vue&type=template&id=5b193a4a */ "./resources/js/Pages/CourseEnroll.vue?vue&type=template&id=5b193a4a");
/* harmony import */ var _CourseEnroll_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CourseEnroll.vue?vue&type=script&lang=js */ "./resources/js/Pages/CourseEnroll.vue?vue&type=script&lang=js");



_CourseEnroll_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__.default.render = _CourseEnroll_vue_vue_type_template_id_5b193a4a__WEBPACK_IMPORTED_MODULE_0__.render
/* hot reload */
if (false) {}

_CourseEnroll_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__.default.__file = "resources/js/Pages/CourseEnroll.vue"

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_CourseEnroll_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__.default);

/***/ }),

/***/ "./resources/js/Pages/CourseEnroll.vue?vue&type=script&lang=js":
/*!*********************************************************************!*\
  !*** ./resources/js/Pages/CourseEnroll.vue?vue&type=script&lang=js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_CourseEnroll_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__.default)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_CourseEnroll_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./CourseEnroll.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/CourseEnroll.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/Pages/CourseEnroll.vue?vue&type=template&id=5b193a4a":
/*!***************************************************************************!*\
  !*** ./resources/js/Pages/CourseEnroll.vue?vue&type=template&id=5b193a4a ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_CourseEnroll_vue_vue_type_template_id_5b193a4a__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_CourseEnroll_vue_vue_type_template_id_5b193a4a__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./CourseEnroll.vue?vue&type=template&id=5b193a4a */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/CourseEnroll.vue?vue&type=template&id=5b193a4a");


/***/ })

}]);