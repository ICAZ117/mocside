(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_Pages_Register_vue"],{

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
/* harmony import */ var vue_demi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-demi */ "./node_modules/@vuelidate/validators/node_modules/vue-demi/lib/index.esm.js");


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
  return isFunction(validator.$validator) ? Object.assign({}, validator) : {
    $validator: validator
  };
}
function isPromise(object) {
  return isObject(object) && isFunction(object.then);
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
  validatorObj.$params = Object.assign({}, validatorObj.$params || {}, $params);
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
  var validatorObj = normalizeValidatorObject($validator);
  validatorObj.$message = $message;
  return validatorObj;
}

/**
 * @typedef {function(*): Promise<boolean|ValidatorResponse>} asyncValidator
 */

/**
 * @typedef {Ref<*>[]|function(*): *} watchTargets
 */

/**
 * Wraps validators that returns a Promise.
 * @param {asyncValidator} $validator
 * @param {watchTargets} $watchTargets
 * @return {{$async: boolean, $validator: asyncValidator, $watchTargets: watchTargets}}
 */

function withAsync($validator) {
  var $watchTargets = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var validatorObj = normalizeValidatorObject($validator);
  return Object.assign({}, validatorObj, {
    $async: true,
    $watchTargets: $watchTargets
  });
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
  withAsync: withAsync,
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

var validate = function validate(prop, val) {
  return prop ? req(val) : true;
};
/**
 * Returns required if the passed property is truthy
 * @param {Boolean | String | function(any): Boolean | Ref<string | boolean>} propOrFunction
 * @return {function(value: *, parentVM: object): Boolean}
 */


function requiredIf(propOrFunction) {
  return function (value, parentVM) {
    if (typeof propOrFunction !== 'function') {
      return validate((0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.unref)(propOrFunction), value);
    }

    var result = propOrFunction.call(this, value, parentVM);
    return validate(result, value);
  };
}

/**
 * Returns required if the passed property is truthy
 * @param {Boolean | String | function(): (Boolean | Promise<boolean>)} prop
 * @return {NormalizedValidator}
 */

function requiredIf$1 (prop) {
  return {
    $validator: requiredIf(prop),
    $message: 'The value is required',
    $params: {
      type: 'requiredIf',
      prop: prop
    }
  };
}

var validate$1 = function validate(prop, val) {
  return !prop ? req(val) : true;
};
/**
 * Returns required if the passed property is falsy.
 * @param {Boolean | String | function(any): Boolean | Ref<string | boolean>} propOrFunction
 * @return {function(value: *, parentVM: object): Boolean}
 */


function requiredUnless(propOrFunction) {
  return function (value, parentVM) {
    if (typeof propOrFunction !== 'function') {
      return validate$1((0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.unref)(propOrFunction), value);
    }

    var result = propOrFunction.call(this, value, parentVM);
    return validate$1(result, value);
  };
}

/**
 * Returns required unless the passed property is truthy
 * @param {Boolean | String | function(): (Boolean | Promise<boolean>)} prop
 * @return {NormalizedValidator}
 */

function requiredUnless$1 (prop) {
  return {
    $params: {
      type: 'requiredUnless',
      prop: prop
    },
    $validator: requiredUnless(prop),
    $message: 'The value is required'
  };
}

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

function _await(value, then, direct) {
  if (direct) {
    return then ? then(value) : value;
  }

  if (!value || !value.then) {
    value = Promise.resolve(value);
  }

  return then ? value.then(then) : value;
}

function syncOr(validators) {
  return function () {
    var _this = this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return validators.reduce(function (valid, fn) {
      if (unwrapValidatorResponse(valid)) return valid;
      return unwrapNormalizedValidator(fn).apply(_this, args);
    }, false);
  };
}

function asyncOr(validators) {
  return function () {
    var _this2 = this;

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return validators.reduce(function (valid, fn) {
      return _await(valid, function (r) {
        return unwrapValidatorResponse(r) ? r : unwrapNormalizedValidator(fn).apply(_this2, args);
      });
    }, Promise.resolve(false));
  };
}
/**
 * Returns true when one of the provided functions returns true.
 * @param {...(NormalizedValidator|Function)} validators
 * @return {{$validator: function(...[*]=): (boolean | Promise<boolean>), $async: boolean, $watchTargets: any[]}}
 */


function or() {
  for (var _len3 = arguments.length, validators = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    validators[_key3] = arguments[_key3];
  }

  var $async = validators.some(function (v) {
    return v.$async;
  });
  var $watchTargets = validators.reduce(function (all, v) {
    if (!v.$watchTargets) return all;
    return all.concat(v.$watchTargets);
  }, []);

  var $validator = function $validator() {
    return false;
  };

  if (validators.length) $validator = $async ? asyncOr(validators) : syncOr(validators);
  return {
    $async: $async,
    $validator: $validator,
    $watchTargets: $watchTargets
  };
}

/**
 * Returns true when one of the provided functions returns true.
 * @param {...(NormalizedValidator|Function)} validators
 * @return {NormalizedValidator}
 */

function or$1 () {
  return Object.assign({}, or.apply(void 0, arguments), {
    $message: 'The value does not match any of the provided validators'
  });
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
/**
 *
 * @param validators
 * @return {function(...[*]=): Promise<boolean>}
 */


function syncAnd(validators) {
  return function () {
    var _this = this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return validators.reduce(function (valid, fn) {
      if (!unwrapValidatorResponse(valid)) return valid;
      return unwrapNormalizedValidator(fn).apply(_this, args);
    }, true);
  };
}

function asyncAnd(validators) {
  return function () {
    var _this2 = this;

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return validators.reduce(function (valid, fn) {
      return _await$1(valid, function (r) {
        return unwrapValidatorResponse(r) ? unwrapNormalizedValidator(fn).apply(_this2, args) : r;
      });
    }, Promise.resolve(true));
  };
}
/**
 * Returns true when all validators are truthy
 * @param {...(NormalizedValidator | Function)} validators
 * @return {{$validator: function(...[*]=): (boolean | Promise<boolean>), $async: boolean, $watchTargets: any[]}}
 */


function and() {
  for (var _len3 = arguments.length, validators = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    validators[_key3] = arguments[_key3];
  }

  var $async = validators.some(function (v) {
    return v.$async;
  });
  var $watchTargets = validators.reduce(function (all, v) {
    if (!v.$watchTargets) return all;
    return all.concat(v.$watchTargets);
  }, []);

  var $validator = function $validator() {
    return false;
  };

  if (validators.length) $validator = $async ? asyncAnd(validators) : syncAnd(validators);
  return {
    $async: $async,
    $validator: $validator,
    $watchTargets: $watchTargets
  };
}

/**
 * Validate if all validators match.
 * @param {...*} validators
 * @returns {NormalizedValidator}
 */

function and$1 () {
  return Object.assign({}, and.apply(void 0, arguments), {
    $message: 'The value does not match all of the provided validators'
  });
}

/**
 * Swaps the result of a value
 * @param {NormalizedValidator|Function} validator
 * @returns {function(*=, *=): boolean}
 */

function not (validator) {
  return function (value, vm) {
    if (!req(value)) return true;
    var response = unwrapNormalizedValidator(validator).call(this, value, vm);
    if (!isPromise(response)) return !unwrapValidatorResponse(response);
    return response.then(function (r) {
      return !unwrapValidatorResponse(r);
    });
  };
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

/***/ "./node_modules/@vuelidate/validators/node_modules/vue-demi/lib/index.esm.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/@vuelidate/validators/node_modules/vue-demi/lib/index.esm.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "set": () => (/* binding */ set),
/* harmony export */   "del": () => (/* binding */ del),
/* harmony export */   "BaseTransition": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.BaseTransition),
/* harmony export */   "Comment": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.Comment),
/* harmony export */   "Fragment": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.Fragment),
/* harmony export */   "KeepAlive": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.KeepAlive),
/* harmony export */   "Static": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.Static),
/* harmony export */   "Suspense": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.Suspense),
/* harmony export */   "Teleport": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.Teleport),
/* harmony export */   "Text": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.Text),
/* harmony export */   "Transition": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.Transition),
/* harmony export */   "TransitionGroup": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.TransitionGroup),
/* harmony export */   "callWithAsyncErrorHandling": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.callWithAsyncErrorHandling),
/* harmony export */   "callWithErrorHandling": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.callWithErrorHandling),
/* harmony export */   "camelize": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.camelize),
/* harmony export */   "capitalize": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.capitalize),
/* harmony export */   "cloneVNode": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.cloneVNode),
/* harmony export */   "compatUtils": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.compatUtils),
/* harmony export */   "compile": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.compile),
/* harmony export */   "computed": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.computed),
/* harmony export */   "createApp": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.createApp),
/* harmony export */   "createBlock": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.createBlock),
/* harmony export */   "createCommentVNode": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode),
/* harmony export */   "createHydrationRenderer": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.createHydrationRenderer),
/* harmony export */   "createRenderer": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.createRenderer),
/* harmony export */   "createSSRApp": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.createSSRApp),
/* harmony export */   "createSlots": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.createSlots),
/* harmony export */   "createStaticVNode": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode),
/* harmony export */   "createTextVNode": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode),
/* harmony export */   "createVNode": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.createVNode),
/* harmony export */   "customRef": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.customRef),
/* harmony export */   "defineAsyncComponent": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.defineAsyncComponent),
/* harmony export */   "defineComponent": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.defineComponent),
/* harmony export */   "defineEmit": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.defineEmit),
/* harmony export */   "defineProps": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.defineProps),
/* harmony export */   "devtools": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.devtools),
/* harmony export */   "getCurrentInstance": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.getCurrentInstance),
/* harmony export */   "getTransitionRawChildren": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.getTransitionRawChildren),
/* harmony export */   "h": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.h),
/* harmony export */   "handleError": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.handleError),
/* harmony export */   "hydrate": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.hydrate),
/* harmony export */   "initCustomFormatter": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.initCustomFormatter),
/* harmony export */   "inject": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.inject),
/* harmony export */   "isProxy": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.isProxy),
/* harmony export */   "isReactive": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.isReactive),
/* harmony export */   "isReadonly": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.isReadonly),
/* harmony export */   "isRef": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.isRef),
/* harmony export */   "isRuntimeOnly": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.isRuntimeOnly),
/* harmony export */   "isVNode": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.isVNode),
/* harmony export */   "markRaw": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.markRaw),
/* harmony export */   "mergeProps": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.mergeProps),
/* harmony export */   "nextTick": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.nextTick),
/* harmony export */   "onActivated": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.onActivated),
/* harmony export */   "onBeforeMount": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.onBeforeMount),
/* harmony export */   "onBeforeUnmount": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.onBeforeUnmount),
/* harmony export */   "onBeforeUpdate": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.onBeforeUpdate),
/* harmony export */   "onDeactivated": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.onDeactivated),
/* harmony export */   "onErrorCaptured": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.onErrorCaptured),
/* harmony export */   "onMounted": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.onMounted),
/* harmony export */   "onRenderTracked": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.onRenderTracked),
/* harmony export */   "onRenderTriggered": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.onRenderTriggered),
/* harmony export */   "onServerPrefetch": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.onServerPrefetch),
/* harmony export */   "onUnmounted": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.onUnmounted),
/* harmony export */   "onUpdated": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.onUpdated),
/* harmony export */   "openBlock": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.openBlock),
/* harmony export */   "popScopeId": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.popScopeId),
/* harmony export */   "provide": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.provide),
/* harmony export */   "proxyRefs": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.proxyRefs),
/* harmony export */   "pushScopeId": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.pushScopeId),
/* harmony export */   "queuePostFlushCb": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.queuePostFlushCb),
/* harmony export */   "reactive": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.reactive),
/* harmony export */   "readonly": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.readonly),
/* harmony export */   "ref": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.ref),
/* harmony export */   "registerRuntimeCompiler": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.registerRuntimeCompiler),
/* harmony export */   "render": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "renderList": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.renderList),
/* harmony export */   "renderSlot": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.renderSlot),
/* harmony export */   "resolveComponent": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent),
/* harmony export */   "resolveDirective": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.resolveDirective),
/* harmony export */   "resolveDynamicComponent": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.resolveDynamicComponent),
/* harmony export */   "resolveFilter": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.resolveFilter),
/* harmony export */   "resolveTransitionHooks": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.resolveTransitionHooks),
/* harmony export */   "setBlockTracking": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.setBlockTracking),
/* harmony export */   "setDevtoolsHook": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.setDevtoolsHook),
/* harmony export */   "setTransitionHooks": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.setTransitionHooks),
/* harmony export */   "shallowReactive": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.shallowReactive),
/* harmony export */   "shallowReadonly": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.shallowReadonly),
/* harmony export */   "shallowRef": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.shallowRef),
/* harmony export */   "ssrContextKey": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.ssrContextKey),
/* harmony export */   "ssrUtils": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.ssrUtils),
/* harmony export */   "toDisplayString": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString),
/* harmony export */   "toHandlerKey": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.toHandlerKey),
/* harmony export */   "toHandlers": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.toHandlers),
/* harmony export */   "toRaw": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.toRaw),
/* harmony export */   "toRef": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.toRef),
/* harmony export */   "toRefs": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.toRefs),
/* harmony export */   "transformVNodeArgs": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.transformVNodeArgs),
/* harmony export */   "triggerRef": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.triggerRef),
/* harmony export */   "unref": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.unref),
/* harmony export */   "useContext": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.useContext),
/* harmony export */   "useCssModule": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.useCssModule),
/* harmony export */   "useCssVars": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.useCssVars),
/* harmony export */   "useSSRContext": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.useSSRContext),
/* harmony export */   "useTransitionState": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.useTransitionState),
/* harmony export */   "vModelCheckbox": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.vModelCheckbox),
/* harmony export */   "vModelDynamic": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.vModelDynamic),
/* harmony export */   "vModelRadio": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.vModelRadio),
/* harmony export */   "vModelSelect": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect),
/* harmony export */   "vModelText": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.vModelText),
/* harmony export */   "vShow": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.vShow),
/* harmony export */   "version": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.version),
/* harmony export */   "warn": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.warn),
/* harmony export */   "watch": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.watch),
/* harmony export */   "watchEffect": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.watchEffect),
/* harmony export */   "withCtx": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.withCtx),
/* harmony export */   "withDirectives": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives),
/* harmony export */   "withKeys": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.withKeys),
/* harmony export */   "withModifiers": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers),
/* harmony export */   "withScopeId": () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.withScopeId),
/* harmony export */   "Vue": () => (/* reexport module object */ vue__WEBPACK_IMPORTED_MODULE_0__),
/* harmony export */   "Vue2": () => (/* binding */ Vue2),
/* harmony export */   "isVue2": () => (/* binding */ isVue2),
/* harmony export */   "isVue3": () => (/* binding */ isVue3),
/* harmony export */   "install": () => (/* binding */ install)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");


var isVue2 = false
var isVue3 = true
var Vue2 = undefined

function install() {}

function set(target, key, val) {
  if (Array.isArray(target)) {
    target.length = Math.max(target.length, key)
    target.splice(key, 1, val)
    return val
  }
  target[key] = val
  return val
}

function del(target, key) {
  if (Array.isArray(target)) {
    target.splice(key, 1)
    return
  }
  delete target[key]
}





/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Register.vue?vue&type=script&lang=js":
/*!*********************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Register.vue?vue&type=script&lang=js ***!
  \*********************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _vuelidate_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @vuelidate/core */ "./node_modules/@vuelidate/core/dist/index.esm.js");
/* harmony import */ var _utils_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/helpers */ "./resources/js/utils/helpers.js");
/* harmony import */ var _vuelidate_validators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @vuelidate/validators */ "./node_modules/@vuelidate/validators/dist/index.esm.js");
/* harmony import */ var _services_AuthService__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/AuthService */ "./resources/js/services/AuthService.js");
/* harmony import */ var _services_API__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/API */ "./resources/js/services/API.js");


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }







var mustContainLower = function mustContainLower(value) {
  return /[a-z]/.test(value);
};

var mustContainUpper = function mustContainUpper(value) {
  return /[A-Z]/.test(value);
};

var mustContainNumber = function mustContainNumber(value) {
  return /\d/.test(value);
};

var mustContainSymbol = function mustContainSymbol(value) {
  return /\W/.test(value);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  setup: function setup() {
    return {
      v$: (0,_vuelidate_core__WEBPACK_IMPORTED_MODULE_1__.default)()
    };
  },
  data: function data() {
    return {
      error: null,
      message: null,
      userForm: {
        fname: "",
        lname: "",
        email: "",
        fscid: "",
        username: "",
        password: "",
        confirmPassword: ""
      },
      isSubmitted: false
    };
  },
  validations: {
    userForm: {
      fname: {
        required: _vuelidate_validators__WEBPACK_IMPORTED_MODULE_5__.required
      },
      lname: {
        required: _vuelidate_validators__WEBPACK_IMPORTED_MODULE_5__.required
      },
      username: {
        required: _vuelidate_validators__WEBPACK_IMPORTED_MODULE_5__.required
      },
      fscid: {
        required: _vuelidate_validators__WEBPACK_IMPORTED_MODULE_5__.required,
        between: (0,_vuelidate_validators__WEBPACK_IMPORTED_MODULE_5__.between)(0, 10000000),
        minLength: (0,_vuelidate_validators__WEBPACK_IMPORTED_MODULE_5__.minLength)(7),
        maxLength: (0,_vuelidate_validators__WEBPACK_IMPORTED_MODULE_5__.maxLength)(7),
        integer: _vuelidate_validators__WEBPACK_IMPORTED_MODULE_5__.integer
      },
      email: {
        required: _vuelidate_validators__WEBPACK_IMPORTED_MODULE_5__.required,
        email: _vuelidate_validators__WEBPACK_IMPORTED_MODULE_5__.email
      },
      password: {
        required: _vuelidate_validators__WEBPACK_IMPORTED_MODULE_5__.required,
        minLength: (0,_vuelidate_validators__WEBPACK_IMPORTED_MODULE_5__.minLength)(10),
        mustContainLower: mustContainLower,
        mustContainUpper: mustContainUpper,
        mustContainNumber: mustContainNumber,
        mustContainSymbol: mustContainSymbol
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

      this.registerUser();
    },
    registerUser: function registerUser() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
        var payload, self, flag, res, res2, res3, res4, au;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this.error = null;
                _this.message = null;
                payload = {
                  name: _this.userForm.fname + " " + _this.userForm.lname,
                  username: _this.userForm.username,
                  email: _this.userForm.email,
                  fsc_id: _this.userForm.fscid,
                  password: _this.userForm.password,
                  password_confirmation: _this.userForm.confirmPassword
                }; // AuthService.registerUser(payload)
                //   .then(() => this.$router.push("/login")) // user is logged in via sanctum from register, but not in store
                //   .catch((error) => (this.error = getError(error)));

                self = _this;
                flag = true;
                _context.next = 7;
                return _services_AuthService__WEBPACK_IMPORTED_MODULE_3__.default.registerUser(payload)["catch"](function (error) {
                  if (error.response.data.errors.hasOwnProperty("email")) {
                    console.log("Email Error");
                    self.$notify({
                      type: "error",
                      text: "An account with your email already exists!"
                    });
                    flag = false;
                  }

                  if (error.response.data.errors.hasOwnProperty("username")) {
                    console.log("Username Error");
                    self.$notify({
                      type: "error",
                      text: "An account with your username already exists!"
                    });
                    flag = false;
                  }

                  if (error.response.data.errors.hasOwnProperty("fsc_id")) {
                    console.log("FSC ID Error");
                    self.$notify({
                      type: "error",
                      text: "An account with your FSC ID already exists!"
                    });
                    flag = false;
                  }
                });

              case 7:
                res = _context.sent;

                if (!flag) {
                  _context.next = 26;
                  break;
                }

                _context.next = 11;
                return _services_API__WEBPACK_IMPORTED_MODULE_4__.apiClient.post('/students', {
                  fsc_id: payload.fsc_id
                });

              case 11:
                res2 = _context.sent;
                console.log(res2); // if we've made it this far, they have a student (probably), and we can push to login
                // but not before we init gradebook!

                _context.next = 15;
                return _services_API__WEBPACK_IMPORTED_MODULE_4__.apiClient.post("/gradebook/init/".concat(res2.data.data.id), {
                  scope: "student"
                });

              case 15:
                res3 = _context.sent;
                console.log(res3);
                _context.next = 19;
                return _services_API__WEBPACK_IMPORTED_MODULE_4__.apiClient.post('/progress');

              case 19:
                res4 = _context.sent;
                console.log(res4); //update user record in store to get new pfp path?

                _context.next = 23;
                return _this.$store.dispatch("auth/getAuthUser");

              case 23:
                au = _context.sent;

                if (_this.authUser != null) {
                  _this.pfp = au.pfp_path;

                  if (_this.pfp == undefined || _this.pfp == null) {
                    console.log("empty path");
                    _this.pfp = "images/DefaultPFP.png?dca25dcd82b7a37cf8c8334dbf19eb69=";
                  }

                  document.getElementById("d_navpfp").src = _this.pfp;
                  document.getElementById("l_navpfp").src = _this.pfp;
                } // now, push to login


                _this.$router.push('/courses'); // this will get them properly authorized,
                // and in the future possibly aid email verification.


              case 26:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    }
  },
  computed: {
    isDiff: function isDiff() {
      return this.userForm.password != this.userForm.confirmPassword;
    },
    isEmpty: function isEmpty() {
      return this.userForm.confirmPassword == "";
    },
    hasError: function hasError() {
      return this.isEmpty || this.isDiff;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Register.vue?vue&type=template&id=b7e42868":
/*!*************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Register.vue?vue&type=template&id=b7e42868 ***!
  \*************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

var _hoisted_1 = {
  "class": "container"
};
var _hoisted_2 = {
  "class": "register"
};

var _hoisted_3 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("h3", {
  "class": "register-title"
}, "Sign Up", -1
/* HOISTED */
);

var _hoisted_4 = {
  "class": "form-group"
};

var _hoisted_5 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("label", {
  "for": "fname"
}, "First Name", -1
/* HOISTED */
);

var _hoisted_6 = {
  key: 0,
  "class": "invalid-feedback"
};

var _hoisted_7 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("br", null, null, -1
/* HOISTED */
);

var _hoisted_8 = {
  "class": "form-group"
};

var _hoisted_9 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("label", {
  "for": "lname"
}, "Last Name", -1
/* HOISTED */
);

var _hoisted_10 = {
  key: 0,
  "class": "invalid-feedback"
};

var _hoisted_11 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("br", null, null, -1
/* HOISTED */
);

var _hoisted_12 = {
  "class": "form-group"
};

var _hoisted_13 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("label", {
  "for": "username"
}, "Username", -1
/* HOISTED */
);

var _hoisted_14 = {
  key: 0,
  "class": "invalid-feedback"
};

var _hoisted_15 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("br", null, null, -1
/* HOISTED */
);

var _hoisted_16 = {
  "class": "form-group"
};

var _hoisted_17 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("label", {
  "for": "email"
}, "Email", -1
/* HOISTED */
);

var _hoisted_18 = {
  key: 0,
  "class": "invalid-feedback"
};
var _hoisted_19 = {
  key: 0
};
var _hoisted_20 = {
  key: 1
};

var _hoisted_21 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("br", null, null, -1
/* HOISTED */
);

var _hoisted_22 = {
  "class": "form-group"
};

var _hoisted_23 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("label", {
  "for": "email"
}, "FSC ID", -1
/* HOISTED */
);

var _hoisted_24 = {
  key: 0,
  "class": "invalid-feedback"
};
var _hoisted_25 = {
  key: 0
};
var _hoisted_26 = {
  key: 1
};
var _hoisted_27 = {
  key: 2
};
var _hoisted_28 = {
  key: 3
};
var _hoisted_29 = {
  key: 4
};

var _hoisted_30 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("br", null, null, -1
/* HOISTED */
);

var _hoisted_31 = {
  "class": "form-group"
};

var _hoisted_32 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("label", {
  "for": "password"
}, "Password", -1
/* HOISTED */
);

var _hoisted_33 = {
  key: 0,
  "class": "invalid-feedback"
};
var _hoisted_34 = {
  key: 0
};

var _hoisted_35 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Please enter a password ");

var _hoisted_36 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("br", null, null, -1
/* HOISTED */
);

var _hoisted_37 = {
  key: 1
};

var _hoisted_38 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Passwords must be at ");

var _hoisted_39 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("i", null, "LEAST", -1
/* HOISTED */
);

var _hoisted_40 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("  10 characters long ");

var _hoisted_41 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("br", null, null, -1
/* HOISTED */
);

var _hoisted_42 = {
  key: 2
};

var _hoisted_43 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Passwords must contain a lowercase character ");

var _hoisted_44 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("br", null, null, -1
/* HOISTED */
);

var _hoisted_45 = {
  key: 3
};

var _hoisted_46 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Passwords must contain an uppercase character ");

var _hoisted_47 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("br", null, null, -1
/* HOISTED */
);

var _hoisted_48 = {
  key: 4
};

var _hoisted_49 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Passwords must contain a numeric character ");

var _hoisted_50 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("br", null, null, -1
/* HOISTED */
);

var _hoisted_51 = {
  key: 5
};

var _hoisted_52 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Passwords must contain a symbol ");

var _hoisted_53 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("br", null, null, -1
/* HOISTED */
);

var _hoisted_54 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("br", null, null, -1
/* HOISTED */
);

var _hoisted_55 = {
  "class": "form-group"
};

var _hoisted_56 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("label", {
  "for": "confirmPassword"
}, "Confirm Password", -1
/* HOISTED */
);

var _hoisted_57 = {
  key: 0,
  "class": "invalid-feedback"
};
var _hoisted_58 = {
  key: 0
};
var _hoisted_59 = {
  key: 1
};

var _hoisted_60 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("br", null, null, -1
/* HOISTED */
);

var _hoisted_61 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", {
  "class": "form-group"
}, [/*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("button", {
  "class": "btn btn-danger btn-block"
}, "Register")], -1
/* HOISTED */
);

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", _hoisted_2, [_hoisted_3, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("------------------- START FORM -------------------"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("form", {
    onSubmit: _cache[8] || (_cache[8] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)(function () {
      return $options.handleSubmit && $options.handleSubmit.apply($options, arguments);
    }, ["prevent"]))
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("------------------ FIRST NAME ------------------"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", _hoisted_4, [_hoisted_5, (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("input", {
    type: "text",
    "onUpdate:modelValue": _cache[1] || (_cache[1] = function ($event) {
      return $data.userForm.fname = $event;
    }),
    id: "fname",
    name: "fname",
    "class": ["form-control", {
      'is-invalid': $data.isSubmitted && $setup.v$.userForm.fname.$error
    }]
  }, null, 2
  /* CLASS */
  ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.userForm.fname]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <div v-if=\"isSubmitted && !v$.userForm.name.required\" class=\"invalid-feedback\"> "), $data.isSubmitted && $setup.v$.userForm.fname.$error ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)("div", _hoisted_6, " Please enter your first name ")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), _hoisted_7, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("------------------ LAST NAME ------------------"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", _hoisted_8, [_hoisted_9, (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("input", {
    type: "text",
    "onUpdate:modelValue": _cache[2] || (_cache[2] = function ($event) {
      return $data.userForm.lname = $event;
    }),
    id: "lname",
    name: "lname",
    "class": ["form-control", {
      'is-invalid': $data.isSubmitted && $setup.v$.userForm.lname.$error
    }]
  }, null, 2
  /* CLASS */
  ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.userForm.lname]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <div v-if=\"isSubmitted && !v$.userForm.name.required\" class=\"invalid-feedback\"> "), $data.isSubmitted && $setup.v$.userForm.lname.$error ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)("div", _hoisted_10, " Please enter your last name ")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), _hoisted_11, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("------------------ USERNAME ------------------"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", _hoisted_12, [_hoisted_13, (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("input", {
    type: "text",
    "onUpdate:modelValue": _cache[3] || (_cache[3] = function ($event) {
      return $data.userForm.username = $event;
    }),
    id: "username",
    name: "username",
    "class": ["form-control", {
      'is-invalid': $data.isSubmitted && $setup.v$.userForm.username.$error
    }]
  }, null, 2
  /* CLASS */
  ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.userForm.username]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <div v-if=\"isSubmitted && !v$.userForm.name.required\" class=\"invalid-feedback\"> "), $data.isSubmitted && $setup.v$.userForm.username.$error ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)("div", _hoisted_14, " Please enter a username ")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), _hoisted_15, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("------------------- EMAIL -------------------"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", _hoisted_16, [_hoisted_17, (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("input", {
    type: "text",
    "onUpdate:modelValue": _cache[4] || (_cache[4] = function ($event) {
      return $data.userForm.email = $event;
    }),
    id: "email",
    name: "email",
    "class": ["form-control", {
      'is-invalid': $data.isSubmitted && $setup.v$.userForm.email.$error
    }]
  }, null, 2
  /* CLASS */
  ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.userForm.email]]), $data.isSubmitted && $setup.v$.userForm.email.$error ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)("div", _hoisted_18, [$setup.v$.userForm.email.required.$invalid ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)("span", _hoisted_19, "Please enter your email")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $setup.v$.userForm.email.email.$invalid ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)("span", _hoisted_20, "Please provide a valid email address (rickastley@NeverGonnaGiveYouUp.com)")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), _hoisted_21, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("------------------- FSCID -------------------"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", _hoisted_22, [_hoisted_23, (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("input", {
    type: "number",
    "onUpdate:modelValue": _cache[5] || (_cache[5] = function ($event) {
      return $data.userForm.fscid = $event;
    }),
    id: "fscid",
    name: "fscid",
    "class": ["form-control", {
      'is-invalid': $data.isSubmitted && $setup.v$.userForm.fscid.$error
    }]
  }, null, 2
  /* CLASS */
  ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.userForm.fscid]]), $data.isSubmitted && $setup.v$.userForm.fscid.$error ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)("div", _hoisted_24, [$setup.v$.userForm.fscid.required.$invalid ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)("span", _hoisted_25, "Please enter your FSC ID")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $setup.v$.userForm.fscid.integer.$invalid ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)("span", _hoisted_26, "Bruh. That needs to be a number smh")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $setup.v$.userForm.fscid.between.$invalid ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)("span", _hoisted_27, "ID's are between 0-10000000 big brain")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $setup.v$.userForm.fscid.minLength.$invalid ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)("span", _hoisted_28, "All ID's are 7 digits long")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $setup.v$.userForm.fscid.maxLength.$invalid ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)("span", _hoisted_29, "All ID's are 7 digits long")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), _hoisted_30, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("----------------- PASSWORD -----------------"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", _hoisted_31, [_hoisted_32, (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("input", {
    type: "password",
    "onUpdate:modelValue": _cache[6] || (_cache[6] = function ($event) {
      return $data.userForm.password = $event;
    }),
    id: "password",
    name: "password",
    "class": ["form-control", {
      'is-invalid': $data.isSubmitted && $setup.v$.userForm.password.$error
    }],
    autocomplete: "new-password"
  }, null, 2
  /* CLASS */
  ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.userForm.password]]), $data.isSubmitted && $setup.v$.userForm.password.$error ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)("div", _hoisted_33, [$setup.v$.userForm.password.required.$invalid ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)("span", _hoisted_34, [_hoisted_35, _hoisted_36])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $setup.v$.userForm.password.minLength.$invalid ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)("span", _hoisted_37, [_hoisted_38, _hoisted_39, _hoisted_40, _hoisted_41])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $setup.v$.userForm.password.mustContainLower.$invalid ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)("span", _hoisted_42, [_hoisted_43, _hoisted_44])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $setup.v$.userForm.password.mustContainUpper.$invalid ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)("span", _hoisted_45, [_hoisted_46, _hoisted_47])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $setup.v$.userForm.password.mustContainNumber.$invalid ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)("span", _hoisted_48, [_hoisted_49, _hoisted_50])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $setup.v$.userForm.password.mustContainSymbol.$invalid ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)("span", _hoisted_51, [_hoisted_52, _hoisted_53])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), _hoisted_54, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("-------------- REPEAT PASSWORD --------------"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", _hoisted_55, [_hoisted_56, (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("input", {
    type: "password",
    "onUpdate:modelValue": _cache[7] || (_cache[7] = function ($event) {
      return $data.userForm.confirmPassword = $event;
    }),
    "class": ["form-control", {
      'is-invalid': $data.isSubmitted && $options.hasError
    }],
    autocomplete: "new-password"
  }, null, 2
  /* CLASS */
  ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.userForm.confirmPassword]]), $options.hasError ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)("div", _hoisted_57, [$options.isEmpty ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)("span", _hoisted_58, "Please re-enter your password")) : $options.isDiff ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)("span", _hoisted_59, "Your passwords don't match! ")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), _hoisted_60, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("------------------ SUBMIT ------------------"), _hoisted_61], 32
  /* HYDRATE_EVENTS */
  )])]);
}

/***/ }),

/***/ "./resources/js/Pages/Register.vue":
/*!*****************************************!*\
  !*** ./resources/js/Pages/Register.vue ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Register_vue_vue_type_template_id_b7e42868__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Register.vue?vue&type=template&id=b7e42868 */ "./resources/js/Pages/Register.vue?vue&type=template&id=b7e42868");
/* harmony import */ var _Register_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Register.vue?vue&type=script&lang=js */ "./resources/js/Pages/Register.vue?vue&type=script&lang=js");



_Register_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__.default.render = _Register_vue_vue_type_template_id_b7e42868__WEBPACK_IMPORTED_MODULE_0__.render
/* hot reload */
if (false) {}

_Register_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__.default.__file = "resources/js/Pages/Register.vue"

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_Register_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__.default);

/***/ }),

/***/ "./resources/js/Pages/Register.vue?vue&type=script&lang=js":
/*!*****************************************************************!*\
  !*** ./resources/js/Pages/Register.vue?vue&type=script&lang=js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Register_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__.default)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Register_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Register.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Register.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/Pages/Register.vue?vue&type=template&id=b7e42868":
/*!***********************************************************************!*\
  !*** ./resources/js/Pages/Register.vue?vue&type=template&id=b7e42868 ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Register_vue_vue_type_template_id_b7e42868__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Register_vue_vue_type_template_id_b7e42868__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Register.vue?vue&type=template&id=b7e42868 */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Register.vue?vue&type=template&id=b7e42868");


/***/ })

}]);