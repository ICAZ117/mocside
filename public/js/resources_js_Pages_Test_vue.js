(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_Pages_Test_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Test.vue?vue&type=script&lang=js":
/*!*****************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Test.vue?vue&type=script&lang=js ***!
  \*****************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");
/* harmony import */ var vue3_draggable_resizable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue3-draggable-resizable */ "./vue3-draggable-resizable/src/index.js");
/* harmony import */ var vue3_draggable_resizable__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(vue3_draggable_resizable__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var vue3_draggable_resizable_dist_Vue3DraggableResizable_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vue3-draggable-resizable/dist/Vue3DraggableResizable.css */ "./vue3-draggable-resizable/dist/Vue3DraggableResizable.css");

 //default styles


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,vue__WEBPACK_IMPORTED_MODULE_0__.defineComponent)({
  components: {
    Vue3DraggableResizable: (vue3_draggable_resizable__WEBPACK_IMPORTED_MODULE_1___default())
  },
  data: function data() {
    return {
      x: 100,
      y: 100,
      h: 100,
      w: 100,
      active: true
    };
  },
  methods: {
    print: function print(val) {
      console.log(val);
    }
  }
}));

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Test.vue?vue&type=template&id=430422bb":
/*!*********************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Test.vue?vue&type=template&id=430422bb ***!
  \*********************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

var _hoisted_1 = {
  id: "app"
};
var _hoisted_2 = {
  "class": "parent"
};

var _hoisted_3 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" This is a test example ");

function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_Vue3DraggableResizable = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Vue3DraggableResizable");

  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Vue3DraggableResizable, {
    initW: 110,
    initH: 120,
    x: _ctx.x,
    "onUpdate:x": _cache[1] || (_cache[1] = function ($event) {
      return _ctx.x = $event;
    }),
    y: _ctx.y,
    "onUpdate:y": _cache[2] || (_cache[2] = function ($event) {
      return _ctx.y = $event;
    }),
    w: _ctx.w,
    "onUpdate:w": _cache[3] || (_cache[3] = function ($event) {
      return _ctx.w = $event;
    }),
    h: _ctx.h,
    "onUpdate:h": _cache[4] || (_cache[4] = function ($event) {
      return _ctx.h = $event;
    }),
    active: _ctx.active,
    "onUpdate:active": _cache[5] || (_cache[5] = function ($event) {
      return _ctx.active = $event;
    }),
    draggable: false,
    resizable: true,
    disabledH: true,
    handles: ['mr'],
    onActivated: _cache[6] || (_cache[6] = function ($event) {
      return _ctx.print('activated');
    }),
    onDeactivated: _cache[7] || (_cache[7] = function ($event) {
      return _ctx.print('deactivated');
    }),
    onDragStart: _cache[8] || (_cache[8] = function ($event) {
      return _ctx.print('drag-start');
    }),
    onResizeStart: _cache[9] || (_cache[9] = function ($event) {
      return _ctx.print('resize-start');
    }),
    onDragging: _cache[10] || (_cache[10] = function ($event) {
      return _ctx.print('dragging');
    }),
    onResizing: _cache[11] || (_cache[11] = function ($event) {
      return _ctx.print('resizing');
    }),
    onDragEnd: _cache[12] || (_cache[12] = function ($event) {
      return _ctx.print('drag-end');
    }),
    onResizeEnd: _cache[13] || (_cache[13] = function ($event) {
      return _ctx.print('resize-end');
    }),
    onClick: _cache[14] || (_cache[14] = function ($event) {
      return _ctx.active = true;
    })
  }, {
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [_hoisted_3];
    }),
    _: 1
    /* STABLE */

  }, 8
  /* PROPS */
  , ["x", "y", "w", "h", "active"])])]);
}

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Test.vue?vue&type=style&index=0&id=430422bb&lang=css":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Test.vue?vue&type=style&index=0&id=430422bb&lang=css ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "\n.parent {\n  width: 200px;\n  height: 200px;\n  position: absolute;\n  top: 100px;\n  left: 100px;\n  border: 1px solid #000;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n}\n.vdr-container.active {\n  background-color: lightcoral;\n}\n.vdr-handle {\n  height: 100% !important;\n  top: 0 !important;\n  bottom: 0 !important;\n  margin: 0 !important;\n  display: block!important;\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Test.vue?vue&type=style&index=0&id=430422bb&lang=css":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Test.vue?vue&type=style&index=0&id=430422bb&lang=css ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Test_vue_vue_type_style_index_0_id_430422bb_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Test.vue?vue&type=style&index=0&id=430422bb&lang=css */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Test.vue?vue&type=style&index=0&id=430422bb&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Test_vue_vue_type_style_index_0_id_430422bb_lang_css__WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Test_vue_vue_type_style_index_0_id_430422bb_lang_css__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),

/***/ "./resources/js/Pages/Test.vue":
/*!*************************************!*\
  !*** ./resources/js/Pages/Test.vue ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Test_vue_vue_type_template_id_430422bb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Test.vue?vue&type=template&id=430422bb */ "./resources/js/Pages/Test.vue?vue&type=template&id=430422bb");
/* harmony import */ var _Test_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Test.vue?vue&type=script&lang=js */ "./resources/js/Pages/Test.vue?vue&type=script&lang=js");
/* harmony import */ var _Test_vue_vue_type_style_index_0_id_430422bb_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Test.vue?vue&type=style&index=0&id=430422bb&lang=css */ "./resources/js/Pages/Test.vue?vue&type=style&index=0&id=430422bb&lang=css");




;
_Test_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__.default.render = _Test_vue_vue_type_template_id_430422bb__WEBPACK_IMPORTED_MODULE_0__.render
/* hot reload */
if (false) {}

_Test_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__.default.__file = "resources/js/Pages/Test.vue"

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_Test_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__.default);

/***/ }),

/***/ "./resources/js/Pages/Test.vue?vue&type=script&lang=js":
/*!*************************************************************!*\
  !*** ./resources/js/Pages/Test.vue?vue&type=script&lang=js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Test_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__.default)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Test_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Test.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Test.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/Pages/Test.vue?vue&type=template&id=430422bb":
/*!*******************************************************************!*\
  !*** ./resources/js/Pages/Test.vue?vue&type=template&id=430422bb ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Test_vue_vue_type_template_id_430422bb__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Test_vue_vue_type_template_id_430422bb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Test.vue?vue&type=template&id=430422bb */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Test.vue?vue&type=template&id=430422bb");


/***/ }),

/***/ "./resources/js/Pages/Test.vue?vue&type=style&index=0&id=430422bb&lang=css":
/*!*********************************************************************************!*\
  !*** ./resources/js/Pages/Test.vue?vue&type=style&index=0&id=430422bb&lang=css ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Test_vue_vue_type_style_index_0_id_430422bb_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/style-loader/dist/cjs.js!../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Test.vue?vue&type=style&index=0&id=430422bb&lang=css */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Test.vue?vue&type=style&index=0&id=430422bb&lang=css");


/***/ })

}]);