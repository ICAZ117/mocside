(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_Pages_Profile_vue"],{

/***/ "./node_modules/ace-builds/src-noconflict/mode-text.js":
/*!*************************************************************!*\
  !*** ./node_modules/ace-builds/src-noconflict/mode-text.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* module decorator */ module = __webpack_require__.nmd(module);

;                (function() {
                    ace.require(["ace/mode/text"], function(m) {
                        if ( true && module) {
                            module.exports = m;
                        }
                    });
                })();
            

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/BaseBtn.vue?vue&type=script&lang=js":
/*!*************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/BaseBtn.vue?vue&type=script&lang=js ***!
  \*************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "BaseBtn",
  props: {
    type: {
      type: String,
      "default": "submit"
    },
    text: {
      type: String,
      "default": "Submit"
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/FileUpload.vue?vue&type=script&lang=js":
/*!****************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/FileUpload.vue?vue&type=script&lang=js ***!
  \****************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/helpers */ "./resources/js/utils/helpers.js");
/* harmony import */ var _BaseBtn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./BaseBtn */ "./resources/js/Components/BaseBtn.vue");
/* harmony import */ var _services_FileService__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/FileService */ "./resources/js/services/FileService.js");
/* harmony import */ var _FlashMessage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./FlashMessage */ "./resources/js/Components/FlashMessage.vue");


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }





/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "FileUpload",
  props: {
    fileTypes: {
      type: Array,
      "default": null
    },
    endpoint: {
      type: String,
      required: true
    },
    label: {
      type: String,
      "default": ""
    }
  },
  components: {
    BaseBtn: _BaseBtn__WEBPACK_IMPORTED_MODULE_2__.default,
    FlashMessage: _FlashMessage__WEBPACK_IMPORTED_MODULE_4__.default
  },
  data: function data() {
    return {
      file: null,
      message: null,
      error: null
    };
  },
  methods: {
    clearMessage: function clearMessage() {
      this.error = null;
      this.message = null;
    },
    fileChange: function fileChange(event) {
      this.clearMessage();
      this.file = event.target.files[0];
    },
    uploadFile: function uploadFile() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
        var payload, formData, response;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                payload = {};
                formData = new FormData();
                formData.append("file", _this.file);
                payload.file = formData;
                payload.endpoint = _this.endpoint;

                _this.clearMessage();

                _context.prev = 6;
                _context.next = 9;
                return _services_FileService__WEBPACK_IMPORTED_MODULE_3__.default.uploadFile(payload);

              case 9:
                response = _context.sent;
                _this.message = "File uploaded.";
                _context.next = 16;
                break;

              case 13:
                _context.prev = 13;
                _context.t0 = _context["catch"](6);
                _this.error = (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_1__.getError)(_context.t0);

              case 16:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[6, 13]]);
      }))();
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/FlashMessage.vue?vue&type=script&lang=js":
/*!******************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/FlashMessage.vue?vue&type=script&lang=js ***!
  \******************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "FlashMessage",
  props: {
    message: {
      type: String,
      "default": null
    },
    error: {
      type: [Error, String],
      "default": null
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Profile.vue?vue&type=script&lang=js":
/*!********************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Profile.vue?vue&type=script&lang=js ***!
  \********************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _services_API__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/API */ "./resources/js/services/API.js");
/* harmony import */ var _services_AuthService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/AuthService */ "./resources/js/services/AuthService.js");
/* harmony import */ var _Store_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Store/index */ "./resources/js/Store/index.js");
/* harmony import */ var vue_router__WEBPACK_IMPORTED_MODULE_50__ = __webpack_require__(/*! vue-router */ "./node_modules/vue-router/dist/vue-router.esm-bundler.js");
/* harmony import */ var _services_FileService__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/FileService */ "./resources/js/services/FileService.js");
/* harmony import */ var _Components_FileUpload__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Components/FileUpload */ "./resources/js/Components/FileUpload.vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");
/* harmony import */ var vue3_ace_editor__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! vue3-ace-editor */ "./node_modules/vue3-ace-editor/index.js");
/* harmony import */ var ace_builds_src_noconflict_ext_themelist__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ace-builds/src-noconflict/ext-themelist */ "./node_modules/ace-builds/src-noconflict/ext-themelist.js");
/* harmony import */ var ace_builds_src_noconflict_ext_themelist__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(ace_builds_src_noconflict_ext_themelist__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var ace_builds_src_noconflict_theme_ambiance__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ace-builds/src-noconflict/theme-ambiance */ "./node_modules/ace-builds/src-noconflict/theme-ambiance.js");
/* harmony import */ var ace_builds_src_noconflict_theme_ambiance__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(ace_builds_src_noconflict_theme_ambiance__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var ace_builds_src_noconflict_theme_chaos__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ace-builds/src-noconflict/theme-chaos */ "./node_modules/ace-builds/src-noconflict/theme-chaos.js");
/* harmony import */ var ace_builds_src_noconflict_theme_chaos__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(ace_builds_src_noconflict_theme_chaos__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var ace_builds_src_noconflict_theme_chrome__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ace-builds/src-noconflict/theme-chrome */ "./node_modules/ace-builds/src-noconflict/theme-chrome.js");
/* harmony import */ var ace_builds_src_noconflict_theme_chrome__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(ace_builds_src_noconflict_theme_chrome__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var ace_builds_src_noconflict_theme_clouds__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ace-builds/src-noconflict/theme-clouds */ "./node_modules/ace-builds/src-noconflict/theme-clouds.js");
/* harmony import */ var ace_builds_src_noconflict_theme_clouds__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(ace_builds_src_noconflict_theme_clouds__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var ace_builds_src_noconflict_theme_clouds_midnight__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ace-builds/src-noconflict/theme-clouds_midnight */ "./node_modules/ace-builds/src-noconflict/theme-clouds_midnight.js");
/* harmony import */ var ace_builds_src_noconflict_theme_clouds_midnight__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(ace_builds_src_noconflict_theme_clouds_midnight__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var ace_builds_src_noconflict_theme_cobalt__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ace-builds/src-noconflict/theme-cobalt */ "./node_modules/ace-builds/src-noconflict/theme-cobalt.js");
/* harmony import */ var ace_builds_src_noconflict_theme_cobalt__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(ace_builds_src_noconflict_theme_cobalt__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var ace_builds_src_noconflict_theme_crimson_editor__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ace-builds/src-noconflict/theme-crimson_editor */ "./node_modules/ace-builds/src-noconflict/theme-crimson_editor.js");
/* harmony import */ var ace_builds_src_noconflict_theme_crimson_editor__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(ace_builds_src_noconflict_theme_crimson_editor__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var ace_builds_src_noconflict_theme_dawn__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ace-builds/src-noconflict/theme-dawn */ "./node_modules/ace-builds/src-noconflict/theme-dawn.js");
/* harmony import */ var ace_builds_src_noconflict_theme_dawn__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(ace_builds_src_noconflict_theme_dawn__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var ace_builds_src_noconflict_theme_dracula__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ace-builds/src-noconflict/theme-dracula */ "./node_modules/ace-builds/src-noconflict/theme-dracula.js");
/* harmony import */ var ace_builds_src_noconflict_theme_dracula__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(ace_builds_src_noconflict_theme_dracula__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var ace_builds_src_noconflict_theme_dreamweaver__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ace-builds/src-noconflict/theme-dreamweaver */ "./node_modules/ace-builds/src-noconflict/theme-dreamweaver.js");
/* harmony import */ var ace_builds_src_noconflict_theme_dreamweaver__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(ace_builds_src_noconflict_theme_dreamweaver__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var ace_builds_src_noconflict_theme_eclipse__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ace-builds/src-noconflict/theme-eclipse */ "./node_modules/ace-builds/src-noconflict/theme-eclipse.js");
/* harmony import */ var ace_builds_src_noconflict_theme_eclipse__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(ace_builds_src_noconflict_theme_eclipse__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var ace_builds_src_noconflict_theme_github__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ace-builds/src-noconflict/theme-github */ "./node_modules/ace-builds/src-noconflict/theme-github.js");
/* harmony import */ var ace_builds_src_noconflict_theme_github__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(ace_builds_src_noconflict_theme_github__WEBPACK_IMPORTED_MODULE_20__);
/* harmony import */ var ace_builds_src_noconflict_theme_gob__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ace-builds/src-noconflict/theme-gob */ "./node_modules/ace-builds/src-noconflict/theme-gob.js");
/* harmony import */ var ace_builds_src_noconflict_theme_gob__WEBPACK_IMPORTED_MODULE_21___default = /*#__PURE__*/__webpack_require__.n(ace_builds_src_noconflict_theme_gob__WEBPACK_IMPORTED_MODULE_21__);
/* harmony import */ var ace_builds_src_noconflict_theme_gruvbox__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ace-builds/src-noconflict/theme-gruvbox */ "./node_modules/ace-builds/src-noconflict/theme-gruvbox.js");
/* harmony import */ var ace_builds_src_noconflict_theme_gruvbox__WEBPACK_IMPORTED_MODULE_22___default = /*#__PURE__*/__webpack_require__.n(ace_builds_src_noconflict_theme_gruvbox__WEBPACK_IMPORTED_MODULE_22__);
/* harmony import */ var ace_builds_src_noconflict_theme_idle_fingers__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ace-builds/src-noconflict/theme-idle_fingers */ "./node_modules/ace-builds/src-noconflict/theme-idle_fingers.js");
/* harmony import */ var ace_builds_src_noconflict_theme_idle_fingers__WEBPACK_IMPORTED_MODULE_23___default = /*#__PURE__*/__webpack_require__.n(ace_builds_src_noconflict_theme_idle_fingers__WEBPACK_IMPORTED_MODULE_23__);
/* harmony import */ var ace_builds_src_noconflict_theme_iplastic__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ace-builds/src-noconflict/theme-iplastic */ "./node_modules/ace-builds/src-noconflict/theme-iplastic.js");
/* harmony import */ var ace_builds_src_noconflict_theme_iplastic__WEBPACK_IMPORTED_MODULE_24___default = /*#__PURE__*/__webpack_require__.n(ace_builds_src_noconflict_theme_iplastic__WEBPACK_IMPORTED_MODULE_24__);
/* harmony import */ var ace_builds_src_noconflict_theme_katzenmilch__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ace-builds/src-noconflict/theme-katzenmilch */ "./node_modules/ace-builds/src-noconflict/theme-katzenmilch.js");
/* harmony import */ var ace_builds_src_noconflict_theme_katzenmilch__WEBPACK_IMPORTED_MODULE_25___default = /*#__PURE__*/__webpack_require__.n(ace_builds_src_noconflict_theme_katzenmilch__WEBPACK_IMPORTED_MODULE_25__);
/* harmony import */ var ace_builds_src_noconflict_theme_kr_theme__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ace-builds/src-noconflict/theme-kr_theme */ "./node_modules/ace-builds/src-noconflict/theme-kr_theme.js");
/* harmony import */ var ace_builds_src_noconflict_theme_kr_theme__WEBPACK_IMPORTED_MODULE_26___default = /*#__PURE__*/__webpack_require__.n(ace_builds_src_noconflict_theme_kr_theme__WEBPACK_IMPORTED_MODULE_26__);
/* harmony import */ var ace_builds_src_noconflict_theme_kuroir__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ace-builds/src-noconflict/theme-kuroir */ "./node_modules/ace-builds/src-noconflict/theme-kuroir.js");
/* harmony import */ var ace_builds_src_noconflict_theme_kuroir__WEBPACK_IMPORTED_MODULE_27___default = /*#__PURE__*/__webpack_require__.n(ace_builds_src_noconflict_theme_kuroir__WEBPACK_IMPORTED_MODULE_27__);
/* harmony import */ var ace_builds_src_noconflict_theme_merbivore__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ace-builds/src-noconflict/theme-merbivore */ "./node_modules/ace-builds/src-noconflict/theme-merbivore.js");
/* harmony import */ var ace_builds_src_noconflict_theme_merbivore__WEBPACK_IMPORTED_MODULE_28___default = /*#__PURE__*/__webpack_require__.n(ace_builds_src_noconflict_theme_merbivore__WEBPACK_IMPORTED_MODULE_28__);
/* harmony import */ var ace_builds_src_noconflict_theme_merbivore_soft__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ace-builds/src-noconflict/theme-merbivore_soft */ "./node_modules/ace-builds/src-noconflict/theme-merbivore_soft.js");
/* harmony import */ var ace_builds_src_noconflict_theme_merbivore_soft__WEBPACK_IMPORTED_MODULE_29___default = /*#__PURE__*/__webpack_require__.n(ace_builds_src_noconflict_theme_merbivore_soft__WEBPACK_IMPORTED_MODULE_29__);
/* harmony import */ var ace_builds_src_noconflict_theme_mono_industrial__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ace-builds/src-noconflict/theme-mono_industrial */ "./node_modules/ace-builds/src-noconflict/theme-mono_industrial.js");
/* harmony import */ var ace_builds_src_noconflict_theme_mono_industrial__WEBPACK_IMPORTED_MODULE_30___default = /*#__PURE__*/__webpack_require__.n(ace_builds_src_noconflict_theme_mono_industrial__WEBPACK_IMPORTED_MODULE_30__);
/* harmony import */ var ace_builds_src_noconflict_theme_monokai__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ace-builds/src-noconflict/theme-monokai */ "./node_modules/ace-builds/src-noconflict/theme-monokai.js");
/* harmony import */ var ace_builds_src_noconflict_theme_monokai__WEBPACK_IMPORTED_MODULE_31___default = /*#__PURE__*/__webpack_require__.n(ace_builds_src_noconflict_theme_monokai__WEBPACK_IMPORTED_MODULE_31__);
/* harmony import */ var ace_builds_src_noconflict_theme_nord_dark__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ace-builds/src-noconflict/theme-nord_dark */ "./node_modules/ace-builds/src-noconflict/theme-nord_dark.js");
/* harmony import */ var ace_builds_src_noconflict_theme_nord_dark__WEBPACK_IMPORTED_MODULE_32___default = /*#__PURE__*/__webpack_require__.n(ace_builds_src_noconflict_theme_nord_dark__WEBPACK_IMPORTED_MODULE_32__);
/* harmony import */ var ace_builds_src_noconflict_theme_pastel_on_dark__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ace-builds/src-noconflict/theme-pastel_on_dark */ "./node_modules/ace-builds/src-noconflict/theme-pastel_on_dark.js");
/* harmony import */ var ace_builds_src_noconflict_theme_pastel_on_dark__WEBPACK_IMPORTED_MODULE_33___default = /*#__PURE__*/__webpack_require__.n(ace_builds_src_noconflict_theme_pastel_on_dark__WEBPACK_IMPORTED_MODULE_33__);
/* harmony import */ var ace_builds_src_noconflict_theme_solarized_dark__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ace-builds/src-noconflict/theme-solarized_dark */ "./node_modules/ace-builds/src-noconflict/theme-solarized_dark.js");
/* harmony import */ var ace_builds_src_noconflict_theme_solarized_dark__WEBPACK_IMPORTED_MODULE_34___default = /*#__PURE__*/__webpack_require__.n(ace_builds_src_noconflict_theme_solarized_dark__WEBPACK_IMPORTED_MODULE_34__);
/* harmony import */ var ace_builds_src_noconflict_theme_solarized_light__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ace-builds/src-noconflict/theme-solarized_light */ "./node_modules/ace-builds/src-noconflict/theme-solarized_light.js");
/* harmony import */ var ace_builds_src_noconflict_theme_solarized_light__WEBPACK_IMPORTED_MODULE_35___default = /*#__PURE__*/__webpack_require__.n(ace_builds_src_noconflict_theme_solarized_light__WEBPACK_IMPORTED_MODULE_35__);
/* harmony import */ var ace_builds_src_noconflict_theme_sqlserver__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ace-builds/src-noconflict/theme-sqlserver */ "./node_modules/ace-builds/src-noconflict/theme-sqlserver.js");
/* harmony import */ var ace_builds_src_noconflict_theme_sqlserver__WEBPACK_IMPORTED_MODULE_36___default = /*#__PURE__*/__webpack_require__.n(ace_builds_src_noconflict_theme_sqlserver__WEBPACK_IMPORTED_MODULE_36__);
/* harmony import */ var ace_builds_src_noconflict_theme_terminal__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ace-builds/src-noconflict/theme-terminal */ "./node_modules/ace-builds/src-noconflict/theme-terminal.js");
/* harmony import */ var ace_builds_src_noconflict_theme_terminal__WEBPACK_IMPORTED_MODULE_37___default = /*#__PURE__*/__webpack_require__.n(ace_builds_src_noconflict_theme_terminal__WEBPACK_IMPORTED_MODULE_37__);
/* harmony import */ var ace_builds_src_noconflict_theme_textmate__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! ace-builds/src-noconflict/theme-textmate */ "./node_modules/ace-builds/src-noconflict/theme-textmate.js");
/* harmony import */ var ace_builds_src_noconflict_theme_textmate__WEBPACK_IMPORTED_MODULE_38___default = /*#__PURE__*/__webpack_require__.n(ace_builds_src_noconflict_theme_textmate__WEBPACK_IMPORTED_MODULE_38__);
/* harmony import */ var ace_builds_src_noconflict_theme_tomorrow__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! ace-builds/src-noconflict/theme-tomorrow */ "./node_modules/ace-builds/src-noconflict/theme-tomorrow.js");
/* harmony import */ var ace_builds_src_noconflict_theme_tomorrow__WEBPACK_IMPORTED_MODULE_39___default = /*#__PURE__*/__webpack_require__.n(ace_builds_src_noconflict_theme_tomorrow__WEBPACK_IMPORTED_MODULE_39__);
/* harmony import */ var ace_builds_src_noconflict_theme_tomorrow_night__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! ace-builds/src-noconflict/theme-tomorrow_night */ "./node_modules/ace-builds/src-noconflict/theme-tomorrow_night.js");
/* harmony import */ var ace_builds_src_noconflict_theme_tomorrow_night__WEBPACK_IMPORTED_MODULE_40___default = /*#__PURE__*/__webpack_require__.n(ace_builds_src_noconflict_theme_tomorrow_night__WEBPACK_IMPORTED_MODULE_40__);
/* harmony import */ var ace_builds_src_noconflict_theme_tomorrow_night_blue__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! ace-builds/src-noconflict/theme-tomorrow_night_blue */ "./node_modules/ace-builds/src-noconflict/theme-tomorrow_night_blue.js");
/* harmony import */ var ace_builds_src_noconflict_theme_tomorrow_night_blue__WEBPACK_IMPORTED_MODULE_41___default = /*#__PURE__*/__webpack_require__.n(ace_builds_src_noconflict_theme_tomorrow_night_blue__WEBPACK_IMPORTED_MODULE_41__);
/* harmony import */ var ace_builds_src_noconflict_theme_tomorrow_night_bright__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! ace-builds/src-noconflict/theme-tomorrow_night_bright */ "./node_modules/ace-builds/src-noconflict/theme-tomorrow_night_bright.js");
/* harmony import */ var ace_builds_src_noconflict_theme_tomorrow_night_bright__WEBPACK_IMPORTED_MODULE_42___default = /*#__PURE__*/__webpack_require__.n(ace_builds_src_noconflict_theme_tomorrow_night_bright__WEBPACK_IMPORTED_MODULE_42__);
/* harmony import */ var ace_builds_src_noconflict_theme_tomorrow_night_eighties__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! ace-builds/src-noconflict/theme-tomorrow_night_eighties */ "./node_modules/ace-builds/src-noconflict/theme-tomorrow_night_eighties.js");
/* harmony import */ var ace_builds_src_noconflict_theme_tomorrow_night_eighties__WEBPACK_IMPORTED_MODULE_43___default = /*#__PURE__*/__webpack_require__.n(ace_builds_src_noconflict_theme_tomorrow_night_eighties__WEBPACK_IMPORTED_MODULE_43__);
/* harmony import */ var ace_builds_src_noconflict_theme_twilight__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(/*! ace-builds/src-noconflict/theme-twilight */ "./node_modules/ace-builds/src-noconflict/theme-twilight.js");
/* harmony import */ var ace_builds_src_noconflict_theme_twilight__WEBPACK_IMPORTED_MODULE_44___default = /*#__PURE__*/__webpack_require__.n(ace_builds_src_noconflict_theme_twilight__WEBPACK_IMPORTED_MODULE_44__);
/* harmony import */ var ace_builds_src_noconflict_theme_vibrant_ink__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(/*! ace-builds/src-noconflict/theme-vibrant_ink */ "./node_modules/ace-builds/src-noconflict/theme-vibrant_ink.js");
/* harmony import */ var ace_builds_src_noconflict_theme_vibrant_ink__WEBPACK_IMPORTED_MODULE_45___default = /*#__PURE__*/__webpack_require__.n(ace_builds_src_noconflict_theme_vibrant_ink__WEBPACK_IMPORTED_MODULE_45__);
/* harmony import */ var ace_builds_src_noconflict_theme_xcode__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(/*! ace-builds/src-noconflict/theme-xcode */ "./node_modules/ace-builds/src-noconflict/theme-xcode.js");
/* harmony import */ var ace_builds_src_noconflict_theme_xcode__WEBPACK_IMPORTED_MODULE_46___default = /*#__PURE__*/__webpack_require__.n(ace_builds_src_noconflict_theme_xcode__WEBPACK_IMPORTED_MODULE_46__);
/* harmony import */ var ace_builds_src_noconflict_mode_text__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(/*! ace-builds/src-noconflict/mode-text */ "./node_modules/ace-builds/src-noconflict/mode-text.js");
/* harmony import */ var ace_builds_src_noconflict_mode_text__WEBPACK_IMPORTED_MODULE_47___default = /*#__PURE__*/__webpack_require__.n(ace_builds_src_noconflict_mode_text__WEBPACK_IMPORTED_MODULE_47__);
/* harmony import */ var ace_builds_src_noconflict_mode_java__WEBPACK_IMPORTED_MODULE_48__ = __webpack_require__(/*! ace-builds/src-noconflict/mode-java */ "./node_modules/ace-builds/src-noconflict/mode-java.js");
/* harmony import */ var ace_builds_src_noconflict_mode_java__WEBPACK_IMPORTED_MODULE_48___default = /*#__PURE__*/__webpack_require__.n(ace_builds_src_noconflict_mode_java__WEBPACK_IMPORTED_MODULE_48__);
/* harmony import */ var ace_builds_src_noconflict_mode_python__WEBPACK_IMPORTED_MODULE_49__ = __webpack_require__(/*! ace-builds/src-noconflict/mode-python */ "./node_modules/ace-builds/src-noconflict/mode-python.js");
/* harmony import */ var ace_builds_src_noconflict_mode_python__WEBPACK_IMPORTED_MODULE_49___default = /*#__PURE__*/__webpack_require__.n(ace_builds_src_noconflict_mode_python__WEBPACK_IMPORTED_MODULE_49__);


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








var tabs = ["Profile", "Grades", "Security"];
 //////////////////////////////////////////////////////////////////////
//                            THEMES                                //
//////////////////////////////////////////////////////////////////////










































 //whitespace

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_defineProperty({
  components: {
    FileUpload: _Components_FileUpload__WEBPACK_IMPORTED_MODULE_5__.default,
    VAceEditor: vue3_ace_editor__WEBPACK_IMPORTED_MODULE_7__.VAceEditor
  },
  data: function data() {
    return {
      authUser: null,
      fscID: null,
      progress: [],
      username: "",
      student: {},
      grades: [],
      letters: [],
      enrolledCourses: [],
      courses: [],
      content: "",
      user: {
        name: "",
        email: "",
        pfp: "",
        fsc_id: "",
        screen_name: "",
        username: "",
        settings: {
          consoleOptions: {
            foreground: "",
            background: ""
          },
          ideOptions: {
            theme: "",
            defaultLang: ""
          }
        },
        pronouns: ""
      },
      password: {
        current: "",
        "new": "",
        confirm: ""
      },
      temppfp: "",
      showEmailChange: false,
      showPassChange: false,
      showUpgrade: false,
      showAvatarModal: false,
      showEmailModal: false,
      showPassModal: false,
      passNoMatch: false,
      hasLowerCase: false,
      hasUpperCase: false,
      hasNumber: false,
      hasSymbol: false,
      showDeleteUserModal: false,
      showUnsavedChangesModal: false,
      changeGradeUser: "",
      hasUnsavedChanges: false,
      leavePage: ""
    };
  },
  watch: {
    userString: function userString(newVal, oldVal) {
      if (newVal != oldVal) {
        console.log("Unsaved changes");
        this.hasUnsavedChanges = true;
      }
    }
  },
  setup: function setup() {
    var route = (0,vue_router__WEBPACK_IMPORTED_MODULE_50__.useRoute)();
    var currentDirectory = (0,vue__WEBPACK_IMPORTED_MODULE_6__.computed)(function () {
      return route.path;
    });
    var state = (0,vue__WEBPACK_IMPORTED_MODULE_6__.reactive)({
      selectedTab: tabs[0]
    });
    return _objectSpread({
      currentDirectory: currentDirectory,
      tabs: tabs
    }, (0,vue__WEBPACK_IMPORTED_MODULE_6__.toRefs)(state));
  },
  methods: {
    updatePFP: function updatePFP() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
        var au;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _this.$store.dispatch("auth/getAuthUser");

              case 2:
                au = _context.sent;

                if (_this.authUser != null) {
                  _this.user.pfp = au.pfp_path;

                  if (_this.user.pfp == undefined || _this.user.pfp == null) {
                    _this.user.pfp = "images/DefaultPFP.png?dca25dcd82b7a37cf8c8334dbf19eb69=";
                  }

                  document.getElementById("d_navpfp").src = _this.user.pfp;
                  document.getElementById("l_navpfp").src = _this.user.pfp;
                }

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    updatePass: function updatePass() {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee2() {
        var payload, res;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(_this2.password["new"] != _this2.password.confirm)) {
                  _context2.next = 5;
                  break;
                }

                console.log("These passwords do not match");
                _this2.passNoMatch = true;
                _context2.next = 19;
                break;

              case 5:
                _context2.next = 7;
                return _this2.passCheck(_this2.password["new"]);

              case 7:
                _context2.t0 = _context2.sent;

                if (!(_context2.t0 == true)) {
                  _context2.next = 18;
                  break;
                }

                // do this if pass the other checks
                _this2.passNoMatch = false;
                _this2.showPassModal = false;
                console.log("updatedPassword"); //try fortify route and pass current and new password....i believe it checks for us and returns an error/status code

                payload = {
                  current_password: _this2.password.current,
                  password: _this2.password["new"],
                  password_confirmation: _this2.password.confirm
                }; // const res1 = await AuthService.authClient.get(`user/confirm-password`, this.password.new);

                _context2.next = 15;
                return _services_AuthService__WEBPACK_IMPORTED_MODULE_2__.default.updatePassword(payload);

              case 15:
                res = _context2.sent;
                _context2.next = 19;
                break;

              case 18:
                //password doesn't pass the requirements
                console.log("password does not meet requirements");

              case 19:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    },
    passCheck: function passCheck(value) {
      var _this3 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee3() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (/[a-z]/.test(value)) {
                  _context3.next = 3;
                  break;
                }

                _this3.$notify({
                  type: "error",
                  text: "Your password must have a lowercase letter!"
                });

                return _context3.abrupt("return", false);

              case 3:
                if (/[A-Z]/.test(value)) {
                  _context3.next = 6;
                  break;
                }

                _this3.$notify({
                  type: "error",
                  text: "Your password must have an uppercase letter!"
                });

                return _context3.abrupt("return", false);

              case 6:
                if (/\d/.test(value)) {
                  _context3.next = 9;
                  break;
                }

                _this3.$notify({
                  type: "error",
                  text: "Your password must have a numeric digit!"
                });

                return _context3.abrupt("return", false);

              case 9:
                if (/\W/.test(value)) {
                  _context3.next = 12;
                  break;
                }

                _this3.$notify({
                  type: "error",
                  text: "Your password must contain a symbol!"
                });

                return _context3.abrupt("return", false);

              case 12:
                return _context3.abrupt("return", true);

              case 13:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }))();
    },
    updateEmail: function updateEmail() {
      var _this4 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee4() {
        var payload;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                // this.showEmailChange = false;
                _this4.showEmailModal = false;
                console.log("updateEmail");
                payload = {
                  email: _this4.user.email
                }; // const res = await API.apiClient.put();

              case 3:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }))();
    },
    closeAvatarModal: function closeAvatarModal() {
      this.showAvatarModal = false;
    },
    closeEmailModal: function closeEmailModal() {
      this.showEmailModal = false;
    },
    closePassModal: function closePassModal() {
      this.passNoMatch = false;
      this.hasUpperCase = false;
      this.hasLowerCase = false;
      this.hasNumber = false;
      this.hasSymbol = false;
      this.showPassModal = false;
    },
    closeDeleteUserModal: function closeDeleteUserModal() {
      this.showDeleteUserModal = false;
    },
    getUser: function getUser() {
      this.user.name = this.authUser.name;
      this.user.email = this.authUser.email;
      this.user.screen_name = this.authUser.fsc_user.screen_name;
      this.user.username = this.authUser.username;
      this.user.fsc_id = this.authUser.fsc_user.fsc_id;
      this.user.pronouns = this.authUser.fsc_user.pronouns;
      this.user.settings = this.authUser.settings;
      this.user.pfp = this.authUser.pfp_path;

      if (this.user.pfp == undefined || this.user.pfp == null) {
        this.user.pfp = "images/DefaultPFP.png?dca25dcd82b7a37cf8c8334dbf19eb69=";
      }

      document.getElementById("pfp").src = this.user.pfp;
    },
    clearMessage: function clearMessage() {
      this.error = null;
      this.message = null;
    },
    fileChange: function fileChange(event) {
      this.clearMessage();
      this.file = event.target.files[0];
    },
    uploadImage: function uploadImage() {
      var _this5 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee5() {
        var payload, formData, response;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (!(_this5.file != null)) {
                  _context5.next = 19;
                  break;
                }

                payload = {};
                formData = new FormData();
                formData.append("file", _this5.file);
                payload.file = formData;
                payload.endpoint = "/images/store";

                _this5.clearMessage();

                _context5.prev = 7;
                _context5.next = 10;
                return _services_FileService__WEBPACK_IMPORTED_MODULE_4__.default.uploadFile(payload);

              case 10:
                response = _context5.sent;
                _this5.message = "File uploaded.";
                console.log(response.data.asset_link);
                _this5.temppfp = response.data.asset_link;
                _context5.next = 19;
                break;

              case 16:
                _context5.prev = 16;
                _context5.t0 = _context5["catch"](7);
                _this5.error = getError(_context5.t0);

              case 19:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[7, 16]]);
      }))();
    },
    saveProfile: function saveProfile() {
      var _this6 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee6() {
        var payload, res;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                //route works...jsut can't updated all parts of profile yet
                console.log("saving profile");

                _this6.$notify({
                  type: "success",
                  text: "Your changes have been saved!"
                });

                _this6.hasUnsavedChanges = false;
                payload = {
                  name: _this6.user.name,
                  username: _this6.user.username,
                  screen_name: _this6.user.screen_name,
                  pfp_path: _this6.user.pfp,
                  settings: _this6.user.settings,
                  pronouns: _this6.user.pronouns
                }; //call route

                _context6.next = 6;
                return _services_API__WEBPACK_IMPORTED_MODULE_1__.apiClient.put("/profile/full/".concat(_this6.authUser.fsc_user.fsc_id), payload);

              case 6:
                res = _context6.sent;
                console.log(res);

              case 8:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }))();
    },
    updateImage: function updateImage() {
      var _this7 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee7() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return _this7.uploadImage();

              case 2:
                document.getElementById("pfpmodal").src = _this7.temppfp;
                console.log("showing the new avatar look on screen but not saving changes yet");

              case 4:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }))();
    },
    changeAvatar: function changeAvatar() {
      var _this8 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee8() {
        var payload, res;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                console.log("changing the avatar picture in backend"); //api call to backend to update pfp path

                payload = {
                  pfp_path: _this8.temppfp
                };
                _context8.next = 4;
                return _services_API__WEBPACK_IMPORTED_MODULE_1__.apiClient.put("/profile/pfp", payload);

              case 4:
                res = _context8.sent;
                //change other frontend pfp
                _this8.user.pfp = _this8.temppfp;
                document.getElementById("pfp").src = _this8.user.pfp; //after changing in backend

                _this8.showAvatarModal = false;

                _this8.updatePFP(); //delete old picture


              case 9:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }))();
    },
    editAvatar: function editAvatar() {
      document.getElementById("pfpmodal").src = this.user.pfp;
      this.showAvatarModal = true;
    },
    editEmail: function editEmail() {
      this.showEmailModal = true;
    },
    editPass: function editPass() {
      this.showPassModal = true;
    },
    deleteAccount: function deleteAccount() {
      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee9() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                console.log("delete account"); //not working yet

              case 1:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9);
      }))();
    },
    getGrades: function getGrades() {
      for (var i = 0; i < this.enrolledCourses.length; i++) {
        if (this.student.gradebook_courses == "null" || this.student.gradebook_courses == null) {
          this.letters.push("--");
          continue;
        }

        var val = JSON.parse(this.student.gradebook_courses).grades[this.enrolledCourses[i]];
        this.grades.push(val);

        if (val >= 90) {
          this.letters.push("A");
        } else if (val >= 80) {
          this.letters.push("B");
        } else if (val >= 70) {
          this.letters.push("C");
        } else if (val >= 60) {
          this.letters.push("D");
        } else if (val == undefined) {
          this.letters.push("--");
        } else {
          this.letters.push("F");
        }
      }
    },
    getStudent: function getStudent() {
      var _this9 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee10() {
        var res;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _this9.authUser = _Store_index__WEBPACK_IMPORTED_MODULE_3__.default.getters["auth/authUser"];
                _this9.fscID = _this9.authUser.fsc_user.fsc_id;

                if (_this9.isProf) {
                  _context10.next = 8;
                  break;
                }

                _context10.next = 5;
                return _services_API__WEBPACK_IMPORTED_MODULE_1__.apiClient.get("/progress/".concat(_this9.fscID));

              case 5:
                res = _context10.sent;
                _this9.progress = res.data.data;
                return _context10.abrupt("return", _this9.progress);

              case 8:
                return _context10.abrupt("return", {});

              case 9:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10);
      }))();
    },
    getStudentObject: function getStudentObject() {
      var _this10 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee11() {
        var res;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _context11.next = 2;
                return _services_API__WEBPACK_IMPORTED_MODULE_1__.apiClient.get("/students/".concat(_this10.authUser.fsc_user.fsc_id));

              case 2:
                res = _context11.sent;
                _this10.student = res.data;

              case 4:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11);
      }))();
    },
    getCourses: function getCourses() {
      var _this11 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee12() {
        var i, cur, course;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                _this11.courses = [];
                i = 0;

              case 2:
                if (!(i < _this11.enrolledCourses.length)) {
                  _context12.next = 11;
                  break;
                }

                cur = _this11.enrolledCourses[i];
                _context12.next = 6;
                return _services_API__WEBPACK_IMPORTED_MODULE_1__.apiClient.get("/courses/".concat(cur));

              case 6:
                course = _context12.sent;

                _this11.courses.push(course.data.data);

              case 8:
                i++;
                _context12.next = 2;
                break;

              case 11:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12);
      }))();
    },
    waitForDecision: function waitForDecision() {
      this.showUnsavedChangesModal = true;

      while (this.leavePage == "") {
        continue;
      }

      return this.leavePage;
    }
  },
  computed: {
    isProf: function isProf() {
      if (_Store_index__WEBPACK_IMPORTED_MODULE_3__.default.getters["auth/isProf"] == null) {
        return false;
      } else {
        return _Store_index__WEBPACK_IMPORTED_MODULE_3__.default.getters["auth/isProf"];
      }
    },
    userString: function userString() {
      return JSON.stringify(this.user);
    }
  },
  beforeMount: function beforeMount() {
    var _this12 = this;

    return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee13() {
      var res;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              _context13.next = 2;
              return _Store_index__WEBPACK_IMPORTED_MODULE_3__.default.getters["auth/authUser"];

            case 2:
              _this12.authUser = _context13.sent;

              if (!(_this12.authUser.settings == null)) {
                _context13.next = 10;
                break;
              }

              _context13.next = 6;
              return _services_API__WEBPACK_IMPORTED_MODULE_1__.apiClient.post("/profile/init");

            case 6:
              res = _context13.sent;
              _context13.next = 9;
              return _Store_index__WEBPACK_IMPORTED_MODULE_3__.default.getters["auth/authUser"];

            case 9:
              _this12.authUser = _context13.sent;

            case 10:
              _this12.username = _this12.authUser.username;

              if (_this12.authUser.fsc_user.courses) {
                _this12.enrolledCourses = JSON.parse(_this12.authUser.fsc_user.courses).courses;
              }

              _context13.next = 14;
              return _this12.getCourses();

            case 14:
              if (_this12.isProf) {
                _context13.next = 19;
                break;
              }

              _context13.next = 17;
              return _this12.getStudentObject();

            case 17:
              _context13.next = 19;
              return _this12.getGrades();

            case 19:
              _context13.next = 21;
              return _this12.getUser();

            case 21:
              if (_this12.isProf) {
                _this12.showUpgrade = true; //change this later to check for admin instead of professor
              }

              _this12.hasUnsavedChanges = false;

            case 23:
            case "end":
              return _context13.stop();
          }
        }
      }, _callee13);
    }))();
  },
  beforeRouteLeave: function beforeRouteLeave(to, from, next) {
    var _this13 = this;

    return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee14() {
      var decision;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              console.log("HERE");

              if (!_this13.hasUnsavedChanges) {
                _context14.next = 15;
                break;
              }

              _context14.next = 4;
              return _this13.waitForDecision();

            case 4:
              decision = _context14.sent;
              console.log("HAS UNSAVED CHANGES");

              if (!(decision == "yes")) {
                _context14.next = 12;
                break;
              }

              _this13.leavePage = "";
              _this13.showUnsavedChangesModal = false;
              return _context14.abrupt("return", next());

            case 12:
              _this13.leavePage = "";
              _this13.showUnsavedChangesModal = false;
              return _context14.abrupt("return", next(false));

            case 15:
              return _context14.abrupt("return", next());

            case 16:
            case "end":
              return _context14.stop();
          }
        }
      }, _callee14);
    }))();
  }
}, "beforeRouteLeave", function beforeRouteLeave(to, from, next) {
  if (this.hasUnsavedChanges) {
    if (!window.confirm("You have unsaved changes! Are you sure you want to leave this page?")) {
      return;
    }
  }

  next();
}));

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/BaseBtn.vue?vue&type=template&id=c7838c60":
/*!*****************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/BaseBtn.vue?vue&type=template&id=c7838c60 ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)("button", (0,vue__WEBPACK_IMPORTED_MODULE_0__.mergeProps)({
    type: $props.type
  }, _ctx.$attrs, {
    "class": "px-2.5 py-1.5 border border-transparent text-xs rounded shadow-sm text-white bg-blue-400 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-center transition"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.text), 17
  /* TEXT, FULL_PROPS */
  , ["type"]);
}

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/FileUpload.vue?vue&type=template&id=3d3558a8":
/*!********************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/FileUpload.vue?vue&type=template&id=3d3558a8 ***!
  \********************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

var _hoisted_1 = {
  "class": "mb-4"
};
var _hoisted_2 = {
  "for": "file",
  "class": "sr-only"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_BaseBtn = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("BaseBtn");

  var _component_FlashMessage = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("FlashMessage");

  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)("form", {
    onSubmit: _cache[2] || (_cache[2] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)(function () {
      return $options.uploadFile && $options.uploadFile.apply($options, arguments);
    }, ["prevent"]))
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("label", _hoisted_2, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.label), 1
  /* TEXT */
  ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("input", {
    type: "file",
    accept: $props.fileTypes,
    onChange: _cache[1] || (_cache[1] = function () {
      return $options.fileChange && $options.fileChange.apply($options, arguments);
    }),
    id: "file"
  }, null, 40
  /* PROPS, HYDRATE_EVENTS */
  , ["accept"])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_BaseBtn, {
    text: "Upload"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_FlashMessage, {
    message: $data.message,
    error: $data.error
  }, null, 8
  /* PROPS */
  , ["message", "error"])], 32
  /* HYDRATE_EVENTS */
  );
}

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/FlashMessage.vue?vue&type=template&id=12c86242":
/*!**********************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/FlashMessage.vue?vue&type=template&id=12c86242 ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

var _hoisted_1 = {
  key: 0,
  "class": "mt-2 text-sm text-green-500"
};
var _hoisted_2 = {
  key: 1,
  "class": "mt-2 text-sm text-red-500"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)("div", null, [$props.message ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)("p", _hoisted_1, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.message), 1
  /* TEXT */
  )) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $props.error ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)("p", _hoisted_2, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.error), 1
  /* TEXT */
  )) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]);
}

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Profile.vue?vue&type=template&id=1bdc34e0":
/*!************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Profile.vue?vue&type=template&id=1bdc34e0 ***!
  \************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

var _hoisted_1 = {
  "class": "courses header"
};
var _hoisted_2 = {
  "class": "heading"
};

var _hoisted_3 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("p", {
  style: {
    "margin": "auto !important"
  }
}, " You have unsaved changes! Are you sure you want to continue? ", -1
/* HOISTED */
);

var _hoisted_4 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("br", null, null, -1
/* HOISTED */
);

var _hoisted_5 = {
  "class": "row"
};
var _hoisted_6 = {
  "class": "row h-100"
};
var _hoisted_7 = {
  "class": "col-3",
  style: {
    "border-right": "1px var(--FSCgrey) solid !important"
  }
};
var _hoisted_8 = {
  "class": "profile-picture"
};

var _hoisted_9 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("img", {
  "class": "large-pfp",
  src: "this.user.pfp",
  alt: "Profile",
  id: "pfp"
}, null, -1
/* HOISTED */
);

var _hoisted_10 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("br", null, null, -1
/* HOISTED */
);

var _hoisted_11 = {
  "class": "col-9 settings",
  style: {
    "padding": "50px !important",
    "height": "100%",
    "color": "#888"
  }
};
var _hoisted_12 = {
  "class": "profile-section"
};
var _hoisted_13 = {
  "class": "editable"
};

var _hoisted_14 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("h3", null, "Profile Options", -1
/* HOISTED */
);

var _hoisted_15 = {
  "class": "row"
};
var _hoisted_16 = {
  "class": "col-6"
};

var _hoisted_17 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("label", {
  "for": "Name"
}, "Name: ", -1
/* HOISTED */
);

var _hoisted_18 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("br", null, null, -1
/* HOISTED */
);

var _hoisted_19 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("br", null, null, -1
/* HOISTED */
);

var _hoisted_20 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("label", {
  "for": "pronouns"
}, "Preferred Pronouns: ", -1
/* HOISTED */
);

var _hoisted_21 = {
  "class": "col-6"
};

var _hoisted_22 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("label", {
  "for": "ScreenName"
}, "ScreenName: ", -1
/* HOISTED */
);

var _hoisted_23 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("br", null, null, -1
/* HOISTED */
);

var _hoisted_24 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("br", null, null, -1
/* HOISTED */
);

var _hoisted_25 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("label", {
  "for": "FSCID"
}, "FSC ID: ", -1
/* HOISTED */
);

var _hoisted_26 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("br", null, null, -1
/* HOISTED */
);

var _hoisted_27 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("br", null, null, -1
/* HOISTED */
);

var _hoisted_28 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("hr", null, null, -1
/* HOISTED */
);

var _hoisted_29 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("br", null, null, -1
/* HOISTED */
);

var _hoisted_30 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("br", null, null, -1
/* HOISTED */
);

var _hoisted_31 = {
  "class": "Editor-Settings"
};

var _hoisted_32 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("h3", null, "Console Options", -1
/* HOISTED */
);

var _hoisted_33 = {
  "class": "row"
};
var _hoisted_34 = {
  "class": "col-6"
};

var _hoisted_35 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("label", {
  "for": "Theme"
}, "Default Theme: ", -1
/* HOISTED */
);

var _hoisted_36 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("optgroup", {
  label: "Dark"
}, [/*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("option", {
  value: "ambiance"
}, "Ambiance"), /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("option", {
  value: "chaos"
}, "Chaos"), /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("option", {
  value: "clouds_midnight"
}, "Clouds Midnight"), /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("option", {
  value: "dracula"
}, "Dracula"), /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("option", {
  value: "cobalt"
}, "Cobalt"), /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("option", {
  value: "gruvbox"
}, "Gruvbox"), /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("option", {
  value: "gob",
  selected: ""
}, "Green on Black"), /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("option", {
  value: "idle_fingers"
}, "idle Fingers"), /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("option", {
  value: "kr_theme"
}, "krTheme"), /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("option", {
  value: "merbivore"
}, "Merbivore"), /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("option", {
  value: "merbivore_soft"
}, "Merbivore Soft"), /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("option", {
  value: "mono_industrial"
}, "Mono Industrial"), /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("option", {
  value: "monokai"
}, "Monokai"), /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("option", {
  value: "nord_dark"
}, "Nord Dark"), /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("option", {
  value: "pastel_on_dark"
}, "Pastel on dark"), /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("option", {
  value: "solarized_dark"
}, "Solarized Dark"), /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("option", {
  value: "terminal"
}, "Terminal"), /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("option", {
  value: "tomorrow_night"
}, "Tomorrow Night"), /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("option", {
  value: "tomorrow_night_blue"
}, "Tomorrow Night Blue"), /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("option", {
  value: "tomorrow_night_bright"
}, "Tomorrow Night Bright"), /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("option", {
  value: "tomorrow_night_eighties"
}, "Tomorrow Night 80s"), /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("option", {
  value: "twilight"
}, "Twilight"), /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("option", {
  value: "vibrant_ink"
}, "Vibrant Ink")], -1
/* HOISTED */
);

var _hoisted_37 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("optgroup", {
  label: "Light"
}, [/*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("option", {
  value: "chrome"
}, "Chrome"), /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("option", {
  value: "clouds"
}, "Clouds"), /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("option", {
  value: "crimson_editor"
}, "Crimson Editor"), /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("option", {
  value: "dawn"
}, "Dawn"), /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("option", {
  value: "dreamweaver"
}, "Dreamweaver"), /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("option", {
  value: "eclipse"
}, "Eclipse"), /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("option", {
  value: "github"
}, "GitHub"), /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("option", {
  value: "iplastic"
}, "IPlastic"), /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("option", {
  value: "solarized_light"
}, "Solarized Light"), /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("option", {
  value: "textmate"
}, "TextMate"), /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("option", {
  value: "tomorrow"
}, "Tomorrow"), /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("option", {
  value: "xcode"
}, "Xcode"), /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("option", {
  value: "kuroir"
}, "Kuroir"), /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("option", {
  value: "katzenmilch"
}, "KatzenMilch"), /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("option", {
  value: "sqlserver"
}, "SQL Server")], -1
/* HOISTED */
);

var _hoisted_38 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("br", null, null, -1
/* HOISTED */
);

var _hoisted_39 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("br", null, null, -1
/* HOISTED */
);

var _hoisted_40 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("label", {
  "for": "ConsoleForeground"
}, "Console Foreground Color: ", -1
/* HOISTED */
);

var _hoisted_41 = {
  "class": "col-6"
};

var _hoisted_42 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("label", {
  "for": "Language"
}, "Default Language: ", -1
/* HOISTED */
);

var _hoisted_43 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("option", {
  value: "python"
}, "Python", -1
/* HOISTED */
);

var _hoisted_44 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("option", {
  value: "java"
}, "Java", -1
/* HOISTED */
);

var _hoisted_45 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("br", null, null, -1
/* HOISTED */
);

var _hoisted_46 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("br", null, null, -1
/* HOISTED */
);

var _hoisted_47 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("label", {
  "for": "ConsoleBackground"
}, "Console Background Color: ", -1
/* HOISTED */
);

var _hoisted_48 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("br", null, null, -1
/* HOISTED */
);

var _hoisted_49 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("br", null, null, -1
/* HOISTED */
);

var _hoisted_50 = {
  "class": "sampleIDE"
};
var _hoisted_51 = {
  "class": "row"
};
var _hoisted_52 = {
  "class": "col-6"
};
var _hoisted_53 = {
  "class": "col-6"
};

var _hoisted_54 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("br", null, null, -1
/* HOISTED */
);

var _hoisted_55 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("img", {
  "class": "large-pfp",
  src: "this.user.pfp",
  alt: "Profile",
  id: "pfpmodal"
}, null, -1
/* HOISTED */
);

var _hoisted_56 = {
  "class": "picture"
};

var _hoisted_57 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("label", {
  "for": "file",
  "class": "sr-only"
}, "Upload New Avatar", -1
/* HOISTED */
);

var _hoisted_58 = {
  "class": "row"
};
var _hoisted_59 = {
  style: {
    "border": "1px solid #9e9e9e !important",
    "padding": "0 !important",
    "width": "min-content !important",
    "margin": "2rem 2rem 2rem 2rem !important"
  }
};
var _hoisted_60 = {
  "class": "table problemtable",
  style: {
    "margin": "0 !important"
  }
};

var _hoisted_61 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("thead", {
  "class": "problemtable",
  style: {
    "border": "none !important"
  }
}, [/*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("tr", null, [/*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("th", {
  width: "41.6%"
}, "Course"), /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("th", {
  width: "14.0%"
}, "Letter Grade"), /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("th", {
  width: "19.5%"
}, "Grade Percentage"), /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("th", {
  width: "12.2%"
}, "Start Date"), /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("th", {
  width: "12.7%"
}, "End Date")])], -1
/* HOISTED */
);

var _hoisted_62 = {
  "class": "problem pointer"
};
var _hoisted_63 = {
  width: "41.6%"
};
var _hoisted_64 = {
  width: "14.0%"
};
var _hoisted_65 = {
  width: "19.5%"
};
var _hoisted_66 = {
  width: "12.2%"
};
var _hoisted_67 = {
  width: "12.7%"
};

var _hoisted_68 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("label", {
  "for": "Username"
}, "Username", -1
/* HOISTED */
);

var _hoisted_69 = {
  "class": "change-Email"
};

var _hoisted_70 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("label", {
  "for": "Verify"
}, "Verification Code", -1
/* HOISTED */
);

var _hoisted_71 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("input", {
  type: "text",
  id: "Verify"
}, null, -1
/* HOISTED */
);

var _hoisted_72 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("label", {
  "for": "Email"
}, "Email", -1
/* HOISTED */
);

var _hoisted_73 = {
  "class": "change-Pass"
};

var _hoisted_74 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("label", {
  "for": "CurrentPass"
}, "Current Password", -1
/* HOISTED */
);

var _hoisted_75 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("label", {
  "for": "NewPass"
}, "New Password", -1
/* HOISTED */
);

var _hoisted_76 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("label", {
  "for": "ConfirmPass"
}, "Confirm Password", -1
/* HOISTED */
);

var _hoisted_77 = {
  key: 0,
  "class": "invalid-feedback"
};

var _hoisted_78 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("span", null, "Your passwords don't match!", -1
/* HOISTED */
);

var _hoisted_79 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("p", null, " Are you sure you would like to delete your account? You will no longer be able to sign in to your account or access your courses! ", -1
/* HOISTED */
);

var _hoisted_80 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("label", {
  "for": "fscID"
}, null, -1
/* HOISTED */
);

var _hoisted_81 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("input", {
  type: "number",
  id: "fscID",
  name: "fscID"
}, null, -1
/* HOISTED */
);

function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_tab = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("tab");

  var _component_tabs = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("tabs");

  var _component_vue_final_modal = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("vue-final-modal");

  var _component_VAceEditor = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("VAceEditor");

  var _component_tab_panel = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("tab-panel");

  var _component_tab_panels = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("tab-panels");

  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_tabs, {
    modelValue: _ctx.selectedTab,
    "onUpdate:modelValue": _cache[1] || (_cache[1] = function ($event) {
      return _ctx.selectedTab = $event;
    })
  }, {
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.tabs, function (tab, i) {
        return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_tab, {
          "class": "tab",
          key: "t".concat(i),
          val: tab,
          label: tab,
          indicator: true
        }, null, 8
        /* PROPS */
        , ["val", "label"]);
      }), 128
      /* KEYED_FRAGMENT */
      ))];
    }),
    _: 1
    /* STABLE */

  }, 8
  /* PROPS */
  , ["modelValue"])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_tab_panels, {
    modelValue: _ctx.selectedTab,
    "onUpdate:modelValue": _cache[42] || (_cache[42] = function ($event) {
      return _ctx.selectedTab = $event;
    }),
    animate: true
  }, {
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_tab_panel, {
        val: 'Profile',
        "class": "profile darkBG"
      }, {
        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_vue_final_modal, {
            modelValue: $data.showUnsavedChangesModal,
            "onUpdate:modelValue": _cache[4] || (_cache[4] = function ($event) {
              return $data.showUnsavedChangesModal = $event;
            }),
            classes: "modal-container",
            "content-class": "modal-content",
            "esc-to-close": true
          }, {
            "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
              return [_hoisted_3, _hoisted_4, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("button", {
                onClick: _cache[2] || (_cache[2] = function ($event) {
                  return $data.leavePage = 'yes';
                }),
                "class": "col-4 btn btn-lg btn-danger mx-1"
              }, " Leave page "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("button", {
                onClick: _cache[3] || (_cache[3] = function ($event) {
                  return $data.leavePage = 'no';
                }),
                "class": "col-4 btn btn-lg btn-danger mx-1"
              }, " Cancel ")])];
            }),
            _: 1
            /* STABLE */

          }, 8
          /* PROPS */
          , ["modelValue"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", _hoisted_6, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", _hoisted_7, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", _hoisted_8, [_hoisted_9, _hoisted_10, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("button", {
            onClick: _cache[5] || (_cache[5] = function ($event) {
              return $options.editAvatar();
            }),
            "class": "btn btn-danger btn-block",
            style: {
              "width": "252px",
              "margin-top": "20px"
            }
          }, " Edit ")])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", _hoisted_11, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", _hoisted_12, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", _hoisted_13, [_hoisted_14, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", _hoisted_15, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", _hoisted_16, [_hoisted_17, (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("input", {
            "class": "profile-field",
            type: "text",
            "onUpdate:modelValue": _cache[6] || (_cache[6] = function ($event) {
              return $data.user.name = $event;
            }),
            id: "Name"
          }, null, 512
          /* NEED_PATCH */
          ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.user.name]]), _hoisted_18, _hoisted_19, _hoisted_20, (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("input", {
            "class": "profile-field",
            type: "text",
            name: "pronouns",
            id: "pronouns",
            "onUpdate:modelValue": _cache[7] || (_cache[7] = function ($event) {
              return $data.user.pronouns = $event;
            })
          }, null, 512
          /* NEED_PATCH */
          ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.user.pronouns]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", _hoisted_21, [_hoisted_22, (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("input", {
            "class": "profile-field",
            type: "text",
            "onUpdate:modelValue": _cache[8] || (_cache[8] = function ($event) {
              return $data.user.screen_name = $event;
            }),
            id: "ScreenName"
          }, null, 512
          /* NEED_PATCH */
          ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.user.screen_name]]), _hoisted_23, _hoisted_24, _hoisted_25, (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("input", {
            "class": "profile-field",
            type: "number",
            "onUpdate:modelValue": _cache[9] || (_cache[9] = function ($event) {
              return $data.user.fsc_id = $event;
            }),
            id: "FSCID",
            disabled: ""
          }, null, 512
          /* NEED_PATCH */
          ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.user.fsc_id]])])])])]), _hoisted_26, _hoisted_27, _hoisted_28, _hoisted_29, _hoisted_30, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", _hoisted_31, [_hoisted_32, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", _hoisted_33, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", _hoisted_34, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" theme, language, console theme "), _hoisted_35, (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("select", {
            "class": "profile-select",
            name: "Theme",
            id: "Theme",
            "onUpdate:modelValue": _cache[10] || (_cache[10] = function ($event) {
              return $data.user.settings.ideOptions.theme = $event;
            })
          }, [_hoisted_36, _hoisted_37], 512
          /* NEED_PATCH */
          ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.user.settings.ideOptions.theme]]), _hoisted_38, _hoisted_39, _hoisted_40, (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("input", {
            "class": "profile-field",
            type: "color",
            name: "ConsoleForeground",
            id: "ConsoleForeground",
            "onUpdate:modelValue": _cache[11] || (_cache[11] = function ($event) {
              return $data.user.settings.consoleOptions.foreground = $event;
            })
          }, null, 512
          /* NEED_PATCH */
          ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.user.settings.consoleOptions.foreground]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", _hoisted_41, [_hoisted_42, (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("select", {
            "class": "profile-select",
            name: "Language",
            id: "Language",
            "onUpdate:modelValue": _cache[12] || (_cache[12] = function ($event) {
              return $data.user.settings.ideOptions.defaultLang = $event;
            })
          }, [_hoisted_43, _hoisted_44], 512
          /* NEED_PATCH */
          ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.user.settings.ideOptions.defaultLang]]), _hoisted_45, _hoisted_46, _hoisted_47, (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("input", {
            "class": "profile-field",
            type: "color",
            name: "ConsoleBackground",
            id: "ConsoleBackground",
            "onUpdate:modelValue": _cache[13] || (_cache[13] = function ($event) {
              return $data.user.settings.consoleOptions.background = $event;
            })
          }, null, 512
          /* NEED_PATCH */
          ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.user.settings.consoleOptions.background]])])])]), _hoisted_48, _hoisted_49, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", _hoisted_50, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", _hoisted_51, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", _hoisted_52, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_VAceEditor, {
            theme: $data.user.settings.ideOptions.theme,
            value: $data.content,
            "onUpdate:value": _cache[14] || (_cache[14] = function ($event) {
              return $data.content = $event;
            }),
            lang: $data.user.settings.ideOptions.defaultLang,
            style: {
              "width": "100%",
              "height": "200px"
            },
            key: $data.user.settings.ideOptions.defaultLang
          }, null, 8
          /* PROPS */
          , ["theme", "value", "lang"])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", _hoisted_53, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("textarea", {
            "class": "sampleConsole",
            contenteditable: "true",
            spellcheck: "false",
            style: 'background-color: ' + $data.user.settings.consoleOptions.background + '; color: ' + $data.user.settings.consoleOptions.foreground + ';'
          }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.user.username) + "@mocside.com:/usr/src$ ", 5
          /* TEXT, STYLE */
          )])])]), _hoisted_54, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("button", {
            onClick: _cache[15] || (_cache[15] = function () {
              return $options.saveProfile && $options.saveProfile.apply($options, arguments);
            }),
            "class": "btn btn-danger btn-md btn-block"
          }, " Save ")])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_vue_final_modal, {
            modelValue: $data.showAvatarModal,
            "onUpdate:modelValue": _cache[21] || (_cache[21] = function ($event) {
              return $data.showAvatarModal = $event;
            }),
            classes: "modal-container",
            "content-class": "modal-content",
            "esc-to-close": true
          }, {
            "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
              return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("button", {
                "class": "modal-close",
                onClick: _cache[16] || (_cache[16] = function ($event) {
                  return $data.showAvatarModal = false;
                })
              }, "x"), _hoisted_55, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", _hoisted_56, [_hoisted_57, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("input", {
                type: "file",
                accept: ['image/*'],
                onChange: _cache[17] || (_cache[17] = function () {
                  return $options.fileChange && $options.fileChange.apply($options, arguments);
                }),
                id: "file"
              }, null, 32
              /* HYDRATE_EVENTS */
              ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("button", {
                onClick: _cache[18] || (_cache[18] = function ($event) {
                  return $options.updateImage();
                }),
                "class": "btn btn-danger btn-block"
              }, " Change Avatar ")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", _hoisted_58, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("button", {
                onClick: _cache[19] || (_cache[19] = function () {
                  return $options.closeAvatarModal && $options.closeAvatarModal.apply($options, arguments);
                }),
                "class": "col-4 btn btn-lg btn-secondary mx-1"
              }, " Cancel "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("button", {
                onClick: _cache[20] || (_cache[20] = function () {
                  return $options.changeAvatar && $options.changeAvatar.apply($options, arguments);
                }),
                "class": "col-4 btn btn-lg btn-success mx-1"
              }, " Submit Changes ")])];
            }),
            _: 1
            /* STABLE */

          }, 8
          /* PROPS */
          , ["modelValue"])];
        }),
        _: 1
        /* STABLE */

      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_tab_panel, {
        val: 'Grades'
      }, {
        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", _hoisted_59, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("table", _hoisted_60, [_hoisted_61, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("tbody", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Loop over all LABS "), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.courses, function (course, index) {
            return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
              key: index
            }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Regular table row "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("tr", _hoisted_62, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("td", _hoisted_63, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(course.name), 1
            /* TEXT */
            ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("td", _hoisted_64, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.letters[index] == undefined ? "--" : $data.letters[index]), 1
            /* TEXT */
            ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("td", _hoisted_65, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.grades[index] == undefined ? "--" : $data.grades[index] + "%"), 1
            /* TEXT */
            ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("td", _hoisted_66, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(course.start_date), 1
            /* TEXT */
            ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("td", _hoisted_67, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(course.end_date), 1
            /* TEXT */
            )])], 64
            /* STABLE_FRAGMENT */
            );
          }), 128
          /* KEYED_FRAGMENT */
          ))])])])];
        }),
        _: 1
        /* STABLE */

      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_tab_panel, {
        val: 'Security'
      }, {
        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
          return [_hoisted_68, (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("input", {
            type: "text",
            "onUpdate:modelValue": _cache[22] || (_cache[22] = function ($event) {
              return $data.user.username = $event;
            }),
            id: "Username"
          }, null, 512
          /* NEED_PATCH */
          ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.user.username]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("button", {
            onClick: _cache[23] || (_cache[23] = function ($event) {
              return $options.editEmail();
            }),
            "class": "btn btn-danger btn-block"
          }, "Change Email"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_vue_final_modal, {
            modelValue: $data.showEmailModal,
            "onUpdate:modelValue": _cache[27] || (_cache[27] = function ($event) {
              return $data.showEmailModal = $event;
            }),
            classes: "modal-container",
            "content-class": "modal-content",
            "esc-to-close": true
          }, {
            "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
              return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("button", {
                "class": "modal-close",
                onClick: _cache[24] || (_cache[24] = function ($event) {
                  return $data.showEmailModal = false;
                })
              }, "x"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", _hoisted_69, [_hoisted_70, _hoisted_71, _hoisted_72, (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("input", {
                type: "email",
                id: "Email",
                "onUpdate:modelValue": _cache[25] || (_cache[25] = function ($event) {
                  return $data.user.email = $event;
                })
              }, null, 512
              /* NEED_PATCH */
              ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.user.email]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("button", {
                onClick: _cache[26] || (_cache[26] = function ($event) {
                  return $options.updateEmail();
                }),
                "class": "btn btn-danger btn-block"
              }, "Save")])];
            }),
            _: 1
            /* STABLE */

          }, 8
          /* PROPS */
          , ["modelValue"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("button", {
            onClick: _cache[28] || (_cache[28] = function ($event) {
              return $options.editPass();
            }),
            "class": "btn btn-danger btn-block"
          }, " Change Password "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_vue_final_modal, {
            modelValue: $data.showPassModal,
            "onUpdate:modelValue": _cache[34] || (_cache[34] = function ($event) {
              return $data.showPassModal = $event;
            }),
            classes: "modal-container",
            "content-class": "modal-content",
            "esc-to-close": true
          }, {
            "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
              return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("button", {
                "class": "modal-close",
                onClick: _cache[29] || (_cache[29] = function ($event) {
                  return $data.showPassModal = false;
                })
              }, "x"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", _hoisted_73, [_hoisted_74, (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("input", {
                type: "password",
                id: "CurrentPass",
                "onUpdate:modelValue": _cache[30] || (_cache[30] = function ($event) {
                  return $data.password.current = $event;
                })
              }, null, 512
              /* NEED_PATCH */
              ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.password.current]]), _hoisted_75, (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("input", {
                type: "password",
                id: "NewPass",
                "onUpdate:modelValue": _cache[31] || (_cache[31] = function ($event) {
                  return $data.password["new"] = $event;
                })
              }, null, 512
              /* NEED_PATCH */
              ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.password["new"]]]), _hoisted_76, (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("input", {
                type: "password",
                id: "ConfirmPass",
                "onUpdate:modelValue": _cache[32] || (_cache[32] = function ($event) {
                  return $data.password.confirm = $event;
                }),
                "class": {
                  'is-invalid': $data.passNoMatch
                }
              }, null, 2
              /* CLASS */
              ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.password.confirm]]), $data.passNoMatch ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)("div", _hoisted_77, [_hoisted_78])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("button", {
                onClick: _cache[33] || (_cache[33] = function ($event) {
                  return $options.updatePass();
                }),
                "class": "btn btn-danger btn-block"
              }, "Save")])];
            }),
            _: 1
            /* STABLE */

          }, 8
          /* PROPS */
          , ["modelValue"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("button", {
            onClick: _cache[35] || (_cache[35] = function () {
              return $options.saveProfile && $options.saveProfile.apply($options, arguments);
            }),
            "class": "btn btn-danger btn-block"
          }, "Save"), $options.isProf ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)("button", {
            key: 0,
            onClick: _cache[36] || (_cache[36] = function ($event) {
              return $data.showDeleteUserModal = true;
            }),
            "class": "btn btn-danger btn-block"
          }, " Delete Account ")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_vue_final_modal, {
            modelValue: $data.showDeleteUserModal,
            "onUpdate:modelValue": _cache[41] || (_cache[41] = function ($event) {
              return $data.showDeleteUserModal = $event;
            }),
            classes: "modal-container",
            "content-class": "modal-content",
            "esc-to-close": true
          }, {
            "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
              return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("button", {
                "class": "modal-close",
                onClick: _cache[37] || (_cache[37] = function ($event) {
                  return $data.showDeleteUserModal = false;
                })
              }, "x"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("button", {
                "class": "modal-close",
                onClick: _cache[38] || (_cache[38] = function ($event) {
                  return _ctx.showUpgradeModal = false;
                })
              }, "x"), _hoisted_79, _hoisted_80, _hoisted_81, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("button", {
                onClick: _cache[39] || (_cache[39] = function ($event) {
                  return $data.showDeleteUserModal = false;
                }),
                "class": "btn btn-danger btn-block"
              }, " Cancel "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("button", {
                onClick: _cache[40] || (_cache[40] = function ($event) {
                  return $options.deleteAccount();
                }),
                "class": "btn btn-danger btn-block"
              }, " Yes, delete my account ")];
            }),
            _: 1
            /* STABLE */

          }, 8
          /* PROPS */
          , ["modelValue"])];
        }),
        _: 1
        /* STABLE */

      })];
    }),
    _: 1
    /* STABLE */

  }, 8
  /* PROPS */
  , ["modelValue"])], 64
  /* STABLE_FRAGMENT */
  );
}

/***/ }),

/***/ "./resources/js/services/FileService.js":
/*!**********************************************!*\
  !*** ./resources/js/services/FileService.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _API__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./API */ "./resources/js/services/API.js");


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  uploadFile: function uploadFile(payload) {
    return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
      var res;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _API__WEBPACK_IMPORTED_MODULE_1__.apiClient.post(payload.endpoint, payload.file);

            case 2:
              res = _context.sent;
              return _context.abrupt("return", res);

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  }
});

/***/ }),

/***/ "./resources/js/Components/BaseBtn.vue":
/*!*********************************************!*\
  !*** ./resources/js/Components/BaseBtn.vue ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _BaseBtn_vue_vue_type_template_id_c7838c60__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseBtn.vue?vue&type=template&id=c7838c60 */ "./resources/js/Components/BaseBtn.vue?vue&type=template&id=c7838c60");
/* harmony import */ var _BaseBtn_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BaseBtn.vue?vue&type=script&lang=js */ "./resources/js/Components/BaseBtn.vue?vue&type=script&lang=js");



_BaseBtn_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__.default.render = _BaseBtn_vue_vue_type_template_id_c7838c60__WEBPACK_IMPORTED_MODULE_0__.render
/* hot reload */
if (false) {}

_BaseBtn_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__.default.__file = "resources/js/Components/BaseBtn.vue"

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_BaseBtn_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__.default);

/***/ }),

/***/ "./resources/js/Components/FileUpload.vue":
/*!************************************************!*\
  !*** ./resources/js/Components/FileUpload.vue ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _FileUpload_vue_vue_type_template_id_3d3558a8__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FileUpload.vue?vue&type=template&id=3d3558a8 */ "./resources/js/Components/FileUpload.vue?vue&type=template&id=3d3558a8");
/* harmony import */ var _FileUpload_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FileUpload.vue?vue&type=script&lang=js */ "./resources/js/Components/FileUpload.vue?vue&type=script&lang=js");



_FileUpload_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__.default.render = _FileUpload_vue_vue_type_template_id_3d3558a8__WEBPACK_IMPORTED_MODULE_0__.render
/* hot reload */
if (false) {}

_FileUpload_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__.default.__file = "resources/js/Components/FileUpload.vue"

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_FileUpload_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__.default);

/***/ }),

/***/ "./resources/js/Components/FlashMessage.vue":
/*!**************************************************!*\
  !*** ./resources/js/Components/FlashMessage.vue ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _FlashMessage_vue_vue_type_template_id_12c86242__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FlashMessage.vue?vue&type=template&id=12c86242 */ "./resources/js/Components/FlashMessage.vue?vue&type=template&id=12c86242");
/* harmony import */ var _FlashMessage_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FlashMessage.vue?vue&type=script&lang=js */ "./resources/js/Components/FlashMessage.vue?vue&type=script&lang=js");



_FlashMessage_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__.default.render = _FlashMessage_vue_vue_type_template_id_12c86242__WEBPACK_IMPORTED_MODULE_0__.render
/* hot reload */
if (false) {}

_FlashMessage_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__.default.__file = "resources/js/Components/FlashMessage.vue"

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_FlashMessage_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__.default);

/***/ }),

/***/ "./resources/js/Pages/Profile.vue":
/*!****************************************!*\
  !*** ./resources/js/Pages/Profile.vue ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Profile_vue_vue_type_template_id_1bdc34e0__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Profile.vue?vue&type=template&id=1bdc34e0 */ "./resources/js/Pages/Profile.vue?vue&type=template&id=1bdc34e0");
/* harmony import */ var _Profile_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Profile.vue?vue&type=script&lang=js */ "./resources/js/Pages/Profile.vue?vue&type=script&lang=js");



_Profile_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__.default.render = _Profile_vue_vue_type_template_id_1bdc34e0__WEBPACK_IMPORTED_MODULE_0__.render
/* hot reload */
if (false) {}

_Profile_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__.default.__file = "resources/js/Pages/Profile.vue"

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_Profile_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__.default);

/***/ }),

/***/ "./resources/js/Components/BaseBtn.vue?vue&type=script&lang=js":
/*!*********************************************************************!*\
  !*** ./resources/js/Components/BaseBtn.vue?vue&type=script&lang=js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_BaseBtn_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__.default)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_BaseBtn_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./BaseBtn.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/BaseBtn.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/Components/FileUpload.vue?vue&type=script&lang=js":
/*!************************************************************************!*\
  !*** ./resources/js/Components/FileUpload.vue?vue&type=script&lang=js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_FileUpload_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__.default)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_FileUpload_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./FileUpload.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/FileUpload.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/Components/FlashMessage.vue?vue&type=script&lang=js":
/*!**************************************************************************!*\
  !*** ./resources/js/Components/FlashMessage.vue?vue&type=script&lang=js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_FlashMessage_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__.default)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_FlashMessage_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./FlashMessage.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/FlashMessage.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/Pages/Profile.vue?vue&type=script&lang=js":
/*!****************************************************************!*\
  !*** ./resources/js/Pages/Profile.vue?vue&type=script&lang=js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Profile_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__.default)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Profile_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Profile.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Profile.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/Components/BaseBtn.vue?vue&type=template&id=c7838c60":
/*!***************************************************************************!*\
  !*** ./resources/js/Components/BaseBtn.vue?vue&type=template&id=c7838c60 ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_BaseBtn_vue_vue_type_template_id_c7838c60__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_BaseBtn_vue_vue_type_template_id_c7838c60__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./BaseBtn.vue?vue&type=template&id=c7838c60 */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/BaseBtn.vue?vue&type=template&id=c7838c60");


/***/ }),

/***/ "./resources/js/Components/FileUpload.vue?vue&type=template&id=3d3558a8":
/*!******************************************************************************!*\
  !*** ./resources/js/Components/FileUpload.vue?vue&type=template&id=3d3558a8 ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_FileUpload_vue_vue_type_template_id_3d3558a8__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_FileUpload_vue_vue_type_template_id_3d3558a8__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./FileUpload.vue?vue&type=template&id=3d3558a8 */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/FileUpload.vue?vue&type=template&id=3d3558a8");


/***/ }),

/***/ "./resources/js/Components/FlashMessage.vue?vue&type=template&id=12c86242":
/*!********************************************************************************!*\
  !*** ./resources/js/Components/FlashMessage.vue?vue&type=template&id=12c86242 ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_FlashMessage_vue_vue_type_template_id_12c86242__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_FlashMessage_vue_vue_type_template_id_12c86242__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./FlashMessage.vue?vue&type=template&id=12c86242 */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/FlashMessage.vue?vue&type=template&id=12c86242");


/***/ }),

/***/ "./resources/js/Pages/Profile.vue?vue&type=template&id=1bdc34e0":
/*!**********************************************************************!*\
  !*** ./resources/js/Pages/Profile.vue?vue&type=template&id=1bdc34e0 ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Profile_vue_vue_type_template_id_1bdc34e0__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Profile_vue_vue_type_template_id_1bdc34e0__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Profile.vue?vue&type=template&id=1bdc34e0 */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Profile.vue?vue&type=template&id=1bdc34e0");


/***/ })

}]);