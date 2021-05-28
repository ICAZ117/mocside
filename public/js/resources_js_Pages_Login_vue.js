(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_Pages_Login_vue"],{

/***/ "./node_modules/@vuelidate/validators/dist/index.esm.js":
/*!**************************************************************!*\
  !*** ./node_modules/@vuelidate/validators/dist/index.esm.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "alpha": () => (/* binding */ alpha$1),
/* harmony export */   "alphaNum": () => (/* binding */ alphaNum$1),
/* harmony export */   "and": () => (/* binding */ and$1),
/* harmony export */   "between": () => (/* binding */ between$1),
/* harmony export */   "decimal": () => (/* binding */ decimal$1),
/* harmony export */   "email": () => (/* binding */ email$1),
/* harmony export */   "helpers": () => (/* binding */ common),
/* harmony export */   "integer": () => (/* binding */ integer$1),
/* harmony export */   "ipAddress": () => (/* binding */ ipAddress$1),
/* harmony export */   "macAddress": () => (/* binding */ macAddress$1),
/* harmony export */   "maxLength": () => (/* binding */ maxLength$1),
/* harmony export */   "maxValue": () => (/* binding */ maxValue$1),
/* harmony export */   "minLength": () => (/* binding */ minLength$1),
/* harmony export */   "minValue": () => (/* binding */ minValue$1),
/* harmony export */   "not": () => (/* binding */ not$1),
/* harmony export */   "numeric": () => (/* binding */ numeric$1),
/* harmony export */   "or": () => (/* binding */ or$1),
/* harmony export */   "required": () => (/* binding */ required$1),
/* harmony export */   "requiredIf": () => (/* binding */ requiredIf$1),
/* harmony export */   "requiredUnless": () => (/* binding */ requiredUnless$1),
/* harmony export */   "sameAs": () => (/* binding */ sameAs$1),
/* harmony export */   "url": () => (/* binding */ url$1)
/* harmony export */ });
/* harmony import */ var vue_demi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-demi */ "./node_modules/vue-demi/lib/index.esm.js");


function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function isFunction(val) {
  return typeof val === 'function';
}
function isObject(o) {
  return o !== null && _typeof(o) === 'object' && !Array.isArray(o);
}
/**
 * Returns a standard ValidatorObject
 * Wraps a plain function into a ValidatorObject
 * @param {NormalizedValidator|Function} validator
 * @return {NormalizedValidator}
 */

function normalizeValidatorObject(validator) {
  return isFunction(validator.$validator) ? validator : {
    $validator: validator
  };
}
/**
 * Unwraps a ValidatorResponse object, into a boolean.
 * @param {ValidatorResponse} result
 * @return {boolean}
 */

function unwrapValidatorResponse(result) {
  if (_typeof(result) === 'object') return result.$valid;
  return result;
}
/**
 * Unwraps a `NormalizedValidator` object, returning it's validator function.
 * @param {NormalizedValidator | Function} validator
 * @return {function}
 */

function unwrapNormalizedValidator(validator) {
  return validator.$validator || validator;
}

/**
 * Allows attaching parameters to a validator
 * @param {Object} $params
 * @param {NormalizedValidator|Function} $validator
 * @return {NormalizedValidator}
 */

function withParams($params, $validator) {
  if (!isObject($params)) throw new Error("[@vuelidate/validators]: First parameter to \"withParams\" should be an object, provided ".concat(_typeof($params)));
  if (!isObject($validator) && !isFunction($validator)) throw new Error("[@vuelidate/validators]: Validator must be a function or object with $validator parameter");
  var validatorObj = normalizeValidatorObject($validator);
  validatorObj.$params = Object.assign({}, validatorObj.$params, $params);
  return validatorObj;
}

/**
 * @callback MessageCallback
 * @param {Object} params
 * @return String
 */

/**
 * Attaches a message to a validator
 * @param {MessageCallback | String} $message
 * @param {NormalizedValidator|Function} $validator
 * @return {NormalizedValidator}
 */

function withMessage($message, $validator) {
  if (!isFunction($message) && typeof (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.unref)($message) !== 'string') throw new Error("[@vuelidate/validators]: First parameter to \"withMessage\" should be string or a function returning a string, provided ".concat(_typeof($message)));
  if (!isObject($validator) && !isFunction($validator)) throw new Error("[@vuelidate/validators]: Validator must be a function or object with $validator parameter");
  var validatorObj = Object.assign({}, normalizeValidatorObject($validator));
  validatorObj.$message = $message;
  return validatorObj;
}

var req = function req(value) {
  value = (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.unref)(value);
  if (Array.isArray(value)) return !!value.length;

  if (value === undefined || value === null) {
    return false;
  }

  if (value === false) {
    return true;
  }

  if (value instanceof Date) {
    // invalid date won't pass
    return !isNaN(value.getTime());
  }

  if (_typeof(value) === 'object') {
    for (var _ in value) {
      return true;
    }

    return false;
  }

  return !!String(value).length;
};
/**
 * Returns the length of an arbitrary value
 * @param {Array|Object|String} value
 * @return {number}
 */

var len = function len(value) {
  value = (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.unref)(value);
  if (Array.isArray(value)) return value.length;

  if (_typeof(value) === 'object') {
    return Object.keys(value).length;
  }

  return String(value).length;
};
/**
 * Regex based validator template
 * @param {RegExp} expr
 * @return {function(*=): boolean}
 */

function regex(expr) {
  return function (value) {
    value = (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.unref)(value);
    return !req(value) || expr.test(value);
  };
}



var common = /*#__PURE__*/Object.freeze({
  __proto__: null,
  withParams: withParams,
  withMessage: withMessage,
  req: req,
  len: len,
  regex: regex,
  unwrap: vue_demi__WEBPACK_IMPORTED_MODULE_0__.unref
});

var alpha = regex(/^[a-zA-Z]*$/);

/**
 * Validate if value is alphabetical string.
 * @type {NormalizedValidator}
 */

var alpha$1 = {
  $validator: alpha,
  $message: 'The value is not alphabetical'
};

var alphaNum = regex(/^[a-zA-Z0-9]*$/);

/**
 * Validate if value is alpha-numeric string.
 * @type {NormalizedValidator}
 */

var alphaNum$1 = {
  $validator: alphaNum,
  $message: 'The value must be alpha-numeric'
};

var numeric = regex(/^\d*(\.\d+)?$/);

/**
 * Check whether a value is numeric.
 * @type NormalizedValidator
 */

var numeric$1 = {
  $validator: numeric,
  $message: 'Value must be numeric'
};

/**
 * Check if a numeric value is between two values.
 * @param {Ref<Number> | Number} min
 * @param {Ref<Number> | Number} max
 * @return {function(*=): boolean}
 */

function between (min, max) {
  return function (value) {
    return !req(value) || (!/\s/.test(value) || value instanceof Date) && +(0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.unref)(min) <= +value && +(0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.unref)(max) >= +value;
  };
}

/**
 * Checks if a value is between two values.
 * @param {Ref<Number> | Number} min
 * @param {Ref<Number> | Number} max
 * @return {NormalizedValidator}
 */

function between$1 (min, max) {
  return {
    $validator: between(min, max),
    $message: function $message(_ref) {
      var $params = _ref.$params;
      return "The value must be between ".concat($params.min, " and ").concat($params.max);
    },
    $params: {
      min: min,
      max: max
    }
  };
}

var emailRegex = /^(?:[A-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9]{2,}(?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
var email = regex(emailRegex);

/**
 * Validate if value is an email.
 * @type {NormalizedValidator}
 */

var email$1 = {
  $validator: email,
  $message: 'Value is not a valid email address'
};

/**
 * Check if a string is an IP Address
 * @param {String} value
 * @returns {boolean}
 */

function ipAddress (value) {
  if (!req(value)) {
    return true;
  }

  if (typeof value !== 'string') {
    return false;
  }

  var nibbles = value.split('.');
  return nibbles.length === 4 && nibbles.every(nibbleValid);
}

var nibbleValid = function nibbleValid(nibble) {
  if (nibble.length > 3 || nibble.length === 0) {
    return false;
  }

  if (nibble[0] === '0' && nibble !== '0') {
    return false;
  }

  if (!nibble.match(/^\d+$/)) {
    return false;
  }

  var numeric = +nibble | 0;
  return numeric >= 0 && numeric <= 255;
};

/**
 * Validate if value is an ipAddress string.
 * @type {NormalizedValidator}
 */

var ipAddress$1 = {
  $validator: ipAddress,
  $message: 'The value is not a valid IP address'
};

/**
 * Check if value is a properly formatted Mac Address.
 * @param {String | Ref<String>} [separator]
 * @returns {function(*): boolean}
 */

function macAddress () {
  var separator = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ':';
  return function (value) {
    separator = (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.unref)(separator);

    if (!req(value)) {
      return true;
    }

    if (typeof value !== 'string') {
      return false;
    }

    var parts = typeof separator === 'string' && separator !== '' ? value.split(separator) : value.length === 12 || value.length === 16 ? value.match(/.{2}/g) : null;
    return parts !== null && (parts.length === 6 || parts.length === 8) && parts.every(hexValid);
  };
}

var hexValid = function hexValid(hex) {
  return hex.toLowerCase().match(/^[0-9a-f]{2}$/);
};

/**
 * Validate if value is a valid Mac Address string.
 * @returns {NormalizedValidator}
 */

function macAddress$1 (separator) {
  return {
    $validator: macAddress(separator),
    $message: 'The value is not a valid MAC Address'
  };
}

/**
 * Check if provided value has a maximum length
 * @param {Number | Ref<Number>} length
 * @returns {function(Array|Object|String): boolean}
 */

function maxLength (length) {
  return function (value) {
    return !req(value) || len(value) <= (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.unref)(length);
  };
}

/**
 * Validate the max length of a string.
 * @param {Number} max
 * @return {NormalizedValidator}
 */

function maxLength$1 (max) {
  return {
    $validator: maxLength(max),
    $message: function $message(_ref) {
      var $params = _ref.$params;
      return "The maximum length allowed is ".concat($params.max);
    },
    $params: {
      max: max
    }
  };
}

/**
 * Check if value is above a threshold.
 * @param {Number | Ref<Number>} length
 * @returns {function(Array|Object|String): boolean}
 */

function minLength (length) {
  return function (value) {
    return !req(value) || len(value) >= (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.unref)(length);
  };
}

/**
 * Check if value is above a threshold.
 * @param {Number | Ref<Number>} min
 * @returns {NormalizedValidator}
 */

function minLength$1 (min) {
  return {
    $validator: minLength(min),
    $message: function $message(_ref) {
      var $params = _ref.$params;
      return "This field should be at least ".concat($params.min, " long");
    },
    $params: {
      min: min
    }
  };
}

/**
 * Validates if a value is empty.
 * @param {String | Array | Date | Object} value
 * @returns {boolean}
 */

function required (value) {
  if (typeof value === 'string') {
    value = value.trim();
  }

  return req(value);
}

/**
 * Check if a value is empty or not.
 * @type {NormalizedValidator}
 */

var required$1 = {
  $validator: required,
  $message: 'Value is required'
};

function _await(value, then, direct) {
  if (direct) {
    return then ? then(value) : value;
  }

  if (!value || !value.then) {
    value = Promise.resolve(value);
  }

  return then ? value.then(then) : value;
}

var validate = function validate(prop, val) {
  return prop ? req(val) : true;
};
/**
 * Returns required if the passed property is truthy
 * @param {Boolean | String | function(any): (Boolean | Promise<boolean>)} propOrFunction
 * @return {function(*): (Boolean | Promise<Boolean>)}
 */


function _async(f) {
  return function () {
    for (var args = [], i = 0; i < arguments.length; i++) {
      args[i] = arguments[i];
    }

    try {
      return Promise.resolve(f.apply(this, args));
    } catch (e) {
      return Promise.reject(e);
    }
  };
}

function requiredIf(propOrFunction) {
  var _this = this;

  return _async(function (value, parentVM) {
    return typeof propOrFunction !== 'function' ? validate(propOrFunction, value) : _await(propOrFunction.call(_this, value, parentVM), function (result) {
      return validate(result, value);
    });
  });
}

/**
 * Returns required if the passed property is truthy
 * @param {Boolean | String | function(): (Boolean | Promise<boolean>)} prop
 * @return {NormalizedValidator}
 */

function requiredIf$1 (prop) {
  return {
    $validator: requiredIf(prop),
    $message: 'The value is required'
  };
}

function _await$1(value, then, direct) {
  if (direct) {
    return then ? then(value) : value;
  }

  if (!value || !value.then) {
    value = Promise.resolve(value);
  }

  return then ? value.then(then) : value;
}

var validate$1 = function validate(prop, val) {
  return !prop ? req(val) : true;
};
/**
 * Returns required if the passed property is falsy.
 * @param {Boolean | String | function(any): (Boolean | Promise<boolean>)} propOrFunction
 * @return {function(*): (Boolean | Promise<Boolean>)}
 */


function _async$1(f) {
  return function () {
    for (var args = [], i = 0; i < arguments.length; i++) {
      args[i] = arguments[i];
    }

    try {
      return Promise.resolve(f.apply(this, args));
    } catch (e) {
      return Promise.reject(e);
    }
  };
}

function requiredUnless(propOrFunction) {
  var _this = this;

  return _async$1(function (value, parentVM) {
    return typeof propOrFunction !== 'function' ? validate$1(propOrFunction, value) : _await$1(propOrFunction.call(_this, value, parentVM), function (result) {
      return validate$1(result, value);
    });
  });
}

/**
 * Returns required unless the passed property is truthy
 * @param {Boolean | String | function(): (Boolean | Promise<boolean>)} prop
 * @return {NormalizedValidator}
 */

var requiredUnless$1 = (function (prop) {
  return {
    $validator: requiredUnless(prop),
    $message: 'The value is required'
  };
});

/**
 * Check if two values are identical.
 * @param {*} equalTo
 * @return {function(*=): boolean}
 */

function sameAs (equalTo) {
  return function (value) {
    return (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.unref)(value) === (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.unref)(equalTo);
  };
}

/**
 * Check if two values are identical
 * @param {*} equalTo
 * @param {String} [otherName]
 * @return {NormalizedValidator}
 */

function sameAs$1 (equalTo) {
  var otherName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'other';
  return {
    $validator: sameAs(equalTo),
    $message: function $message(_ref) {
      var $params = _ref.$params;
      return "The value must be equal to the ".concat(otherName, " value");
    },
    $params: {
      equalTo: equalTo,
      otherName: otherName
    }
  };
}

var urlRegex = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i;
var url = regex(urlRegex);

/**
 * Check if a value is a url
 * @type {NormalizedValidator}
 */

var url$1 = {
  $validator: url,
  $message: 'The value is not a valid URL address'
};

/**
 * Returns true when one of the provided functions returns true.
 * @param {...(NormalizedValidator|Function)} validators
 * @return {function(...[*]=): boolean}
 */

function _await$2(value, then, direct) {
  if (direct) {
    return then ? then(value) : value;
  }

  if (!value || !value.then) {
    value = Promise.resolve(value);
  }

  return then ? value.then(then) : value;
}

function or() {
  for (var _len = arguments.length, validators = new Array(_len), _key = 0; _key < _len; _key++) {
    validators[_key] = arguments[_key];
  }

  return function orInternal() {
    var _this = this;

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return validators.length > 0 && validators.reduce(function (valid, fn) {
      return _await$2(valid, function (_valid) {
        return _await$2(_valid || unwrapNormalizedValidator(fn).apply(_this, args), function (_unwrapNormalizedVali) {
          return _valid || unwrapValidatorResponse(_unwrapNormalizedVali);
        }, _valid);
      });
    }, Promise.resolve(false));
  };
}

/**
 * Returns true when one of the provided functions returns true.
 * @param {...(NormalizedValidator|Function)} validators
 * @return {NormalizedValidator}
 */

function or$1 () {
  return {
    $validator: or.apply(void 0, arguments),
    $message: 'The value does not match any of the provided validators'
  };
}

/**
 * Returns true when all validators are truthy
 * @param {...(NormalizedValidator | Function | function(): Promise<boolean>)} validators
 * @return {function(...[*]=): boolean}
 */

function _await$3(value, then, direct) {
  if (direct) {
    return then ? then(value) : value;
  }

  if (!value || !value.then) {
    value = Promise.resolve(value);
  }

  return then ? value.then(then) : value;
}

function and() {
  var _this = this;

  for (var _len = arguments.length, validators = new Array(_len), _key = 0; _key < _len; _key++) {
    validators[_key] = arguments[_key];
  }

  return function () {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return validators.length > 0 && validators.reduce(function (valid, fn) {
      return _await$3(valid, function (_valid) {
        return _await$3(_valid && unwrapNormalizedValidator(fn).apply(_this, args), function (_unwrapNormalizedVali) {
          return _valid && unwrapValidatorResponse(_unwrapNormalizedVali);
        }, !_valid);
      });
    }, Promise.resolve(true));
  };
}

/**
 * Validate if all validators match.
 * @param {...*} validators
 * @returns {NormalizedValidator}
 */

function and$1 () {
  return {
    $validator: and.apply(void 0, arguments),
    $message: 'The value does not match all of the provided validators'
  };
}

/**
 * Swaps the result of a value
 * @param {NormalizedValidator|Function} validator
 * @returns {function(*=, *=): boolean}
 */

function _await$4(value, then, direct) {
  if (direct) {
    return then ? then(value) : value;
  }

  if (!value || !value.then) {
    value = Promise.resolve(value);
  }

  return then ? value.then(then) : value;
}

function _async$2(f) {
  return function () {
    for (var args = [], i = 0; i < arguments.length; i++) {
      args[i] = arguments[i];
    }

    try {
      return Promise.resolve(f.apply(this, args));
    } catch (e) {
      return Promise.reject(e);
    }
  };
}

function not (validator) {
  var _this = this;

  return _async$2(function (value, vm) {
    var _req = !req(value);

    return _await$4(_req || unwrapNormalizedValidator(validator).call(_this, value, vm), function (_unwrapNormalizedVali) {
      return _req || !unwrapValidatorResponse(_unwrapNormalizedVali);
    }, _req);
  });
}

/**
 * Swaps the result of a value
 * @param {NormalizedValidator|Function} validator
 * @returns {NormalizedValidator}
 */

function not$1 (validator) {
  return {
    $validator: not(validator),
    $message: "The value does not match the provided validator"
  };
}

/**
 * Check if a value is above a threshold.
 * @param {String | Number | Ref<Number> | Ref<String>} min
 * @returns {function(*=): boolean}
 */

function minValue (min) {
  return function (value) {
    return !req(value) || (!/\s/.test(value) || value instanceof Date) && +value >= +(0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.unref)(min);
  };
}

/**
 * Check if a value is above a threshold.
 * @param {String | Number | Ref<Number> | Ref<String>} min
 * @returns {NormalizedValidator}
 */

function minValue$1 (min) {
  return {
    $validator: minValue(min),
    $message: function $message(_ref) {
      var $params = _ref.$params;
      return "The minimum value allowed is ".concat($params.min);
    },
    $params: {
      min: min
    }
  };
}

/**
 * Check if value is below a threshold.
 * @param {Number | Ref<Number> | Ref<String>} max
 * @returns {function(*=): boolean}
 */

function maxValue (max) {
  return function (value) {
    return !req(value) || (!/\s/.test(value) || value instanceof Date) && +value <= +(0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.unref)(max);
  };
}

/**
 * Check if value is below a threshold.
 * @param {Number | Ref<Number> | Ref<String>} max
 * @return {NormalizedValidator}
 */

var maxValue$1 = (function (max) {
  return {
    $validator: maxValue(max),
    $message: function $message(_ref) {
      var $params = _ref.$params;
      return "The maximum value is ".concat($params.max);
    },
    $params: {
      max: max
    }
  };
});

// ^-[0-9]+$ - only for negative integer (minus sign without at least 1 digit is not a number)

var integer = regex(/(^[0-9]*$)|(^-[0-9]+$)/);

/**
 * Validate if value is integer.
 * @type {NormalizedValidator}
 */

var integer$1 = {
  $validator: integer,
  $message: 'Value is not an integer'
};

var decimal = regex(/^[-]?\d*(\.\d+)?$/);

/**
 * Validate if value is decimal number.
 * @type {NormalizedValidator}
 */

var decimal$1 = {
  $validator: decimal,
  $message: 'Value must be decimal'
};




/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Login.vue?vue&type=script&lang=js":
/*!******************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Login.vue?vue&type=script&lang=js ***!
  \******************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _services_AuthService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/AuthService */ "./resources/js/services/AuthService.js");
/* harmony import */ var _utils_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/helpers */ "./resources/js/utils/helpers.js");
/* harmony import */ var _vuelidate_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @vuelidate/core */ "./node_modules/@vuelidate/core/dist/index.esm.js");
/* harmony import */ var _vuelidate_validators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @vuelidate/validators */ "./node_modules/@vuelidate/validators/dist/index.esm.js");


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }





/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  setup: function setup() {
    return {
      v$: (0,_vuelidate_core__WEBPACK_IMPORTED_MODULE_3__.default)()
    };
  },
  data: function data() {
    return {
      error: null,
      message: null,
      userForm: {
        userEmail: "",
        password: ""
      },
      isSubmitted: false
    };
  },
  validations: {
    userForm: {
      userEmail: {
        required: _vuelidate_validators__WEBPACK_IMPORTED_MODULE_4__.required
      },
      password: {
        required: _vuelidate_validators__WEBPACK_IMPORTED_MODULE_4__.required // minLength: minLength(8),

      }
    }
  },
  methods: {
    handleSubmit: function handleSubmit() {
      this.isSubmitted = true;
      this.v$.$touch();

      if (this.v$.$invalid) {
        return;
      }

      this.login();
    },
    login: function login() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
        var payload, authUser, error;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                payload = {
                  email: _this.userForm.userEmail,
                  password: _this.userForm.password
                };
                _this.error = null;
                _context.prev = 2;
                _context.next = 5;
                return _services_AuthService__WEBPACK_IMPORTED_MODULE_1__.default.login(payload);

              case 5:
                _context.next = 7;
                return _this.$store.dispatch("auth/getAuthUser");

              case 7:
                authUser = _context.sent;

                if (!authUser) {
                  _context.next = 13;
                  break;
                }

                _this.$store.dispatch("auth/setGuest", {
                  value: "isNotGuest"
                });

                _this.$router.push("/courses"); // push home?


                _context.next = 16;
                break;

              case 13:
                error = Error("Unable to fetch user after login, check your API settings.");
                error.name = "Fetch User";
                throw error;

              case 16:
                _context.next = 21;
                break;

              case 18:
                _context.prev = 18;
                _context.t0 = _context["catch"](2);
                _this.error = (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_2__.getError)(_context.t0);

              case 21:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[2, 18]]);
      }))();
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Login.vue?vue&type=template&id=0004d9e0":
/*!**********************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Login.vue?vue&type=template&id=0004d9e0 ***!
  \**********************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

var _hoisted_1 = {
  "class": "login"
};

var _hoisted_2 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("h3", {
  "class": "login-title"
}, "Login", -1
/* HOISTED */
);

var _hoisted_3 = {
  "class": "form-group"
};

var _hoisted_4 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("label", {
  "for": "userEmail"
}, "Username/Email", -1
/* HOISTED */
);

var _hoisted_5 = {
  key: 0,
  "class": "invalid-feedback"
};

var _hoisted_6 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("br", null, null, -1
/* HOISTED */
);

var _hoisted_7 = {
  "class": "form-group"
};

var _hoisted_8 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("label", {
  "for": "password"
}, "Password", -1
/* HOISTED */
);

var _hoisted_9 = {
  key: 0,
  "class": "invalid-feedback"
};

var _hoisted_10 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<br><div class=\"form-group form-check\"><label class=\"form-check-label\"><input class=\"form-check-input\" type=\"checkbox\" name=\"remember\">Remember Me <div class=\"valid-feedback\">Valid.</div><div class=\"invalid-feedback\">Check this checkbox to continue.</div></label></div>", 2);

var _hoisted_12 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", {
  "class": "form-group"
}, [/*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("button", {
  "class": "btn btn-danger btn-block"
}, "Login")], -1
/* HOISTED */
);

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Login Form "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", _hoisted_1, [_hoisted_2, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("form", {
    onSubmit: _cache[3] || (_cache[3] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)(function () {
      return $options.handleSubmit && $options.handleSubmit.apply($options, arguments);
    }, ["prevent"])),
    "class": "needs-validation"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("------------------ USERNAME ------------------"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", _hoisted_3, [_hoisted_4, (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("input", {
    type: "text",
    "onUpdate:modelValue": _cache[1] || (_cache[1] = function ($event) {
      return $data.userForm.userEmail = $event;
    }),
    id: "userEmail",
    name: "userEmail",
    "class": ["form-control", {
      'is-invalid': $data.isSubmitted && $setup.v$.userForm.userEmail.$error
    }],
    autocomplete: "username"
  }, null, 2
  /* CLASS */
  ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.userForm.userEmail]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <div v-if=\"isSubmitted && !v$.userForm.name.required\" class=\"invalid-feedback\"> "), $data.isSubmitted && $setup.v$.userForm.userEmail.$error ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)("div", _hoisted_5, " Please enter your username or email address ")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), _hoisted_6, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("----------------- PASSWORD -----------------"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", _hoisted_7, [_hoisted_8, (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("input", {
    type: "password",
    "onUpdate:modelValue": _cache[2] || (_cache[2] = function ($event) {
      return $data.userForm.password = $event;
    }),
    id: "password",
    name: "password",
    "class": ["form-control", {
      'is-invalid': $data.isSubmitted && $setup.v$.userForm.password.$error
    }],
    autocomplete: "current-password"
  }, null, 2
  /* CLASS */
  ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.userForm.password]]), $data.isSubmitted && $setup.v$.userForm.password.$error ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)("div", _hoisted_9, " Please enter your password ")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), _hoisted_10, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("------------------ SUBMIT ------------------"), _hoisted_12], 32
  /* HYDRATE_EVENTS */
  )])]);
}

/***/ }),

/***/ "./resources/js/Pages/Login.vue":
/*!**************************************!*\
  !*** ./resources/js/Pages/Login.vue ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Login_vue_vue_type_template_id_0004d9e0__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Login.vue?vue&type=template&id=0004d9e0 */ "./resources/js/Pages/Login.vue?vue&type=template&id=0004d9e0");
/* harmony import */ var _Login_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Login.vue?vue&type=script&lang=js */ "./resources/js/Pages/Login.vue?vue&type=script&lang=js");



_Login_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__.default.render = _Login_vue_vue_type_template_id_0004d9e0__WEBPACK_IMPORTED_MODULE_0__.render
/* hot reload */
if (false) {}

_Login_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__.default.__file = "resources/js/Pages/Login.vue"

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_Login_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__.default);

/***/ }),

/***/ "./resources/js/Pages/Login.vue?vue&type=script&lang=js":
/*!**************************************************************!*\
  !*** ./resources/js/Pages/Login.vue?vue&type=script&lang=js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Login_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__.default)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Login_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Login.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Login.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/Pages/Login.vue?vue&type=template&id=0004d9e0":
/*!********************************************************************!*\
  !*** ./resources/js/Pages/Login.vue?vue&type=template&id=0004d9e0 ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Login_vue_vue_type_template_id_0004d9e0__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Login_vue_vue_type_template_id_0004d9e0__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Login.vue?vue&type=template&id=0004d9e0 */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Login.vue?vue&type=template&id=0004d9e0");


/***/ })

}]);