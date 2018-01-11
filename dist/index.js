/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.mapTwoWayState = undefined;

var _mapTwoWayState = __webpack_require__(1);

var _mapTwoWayState2 = _interopRequireDefault(_mapTwoWayState);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.mapTwoWayState = _mapTwoWayState2.default;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    /*
     * This function supports two argument signatures. if the
     * first argument is a object, we will use that as the
     * namespace and prefix for computed properties, and the
     * next argument as the state mapping.
     */
    var _parseArguments = parseArguments(arguments),
        namespace = _parseArguments.namespace,
        prefix = _parseArguments.prefix,
        mappings = _parseArguments.mappings; // eslint-disable-line prefer-rest-params

    var computedProperties = {};

    /*
     * Turn key into getters and setters.
     */
    mappings.forEach(function (key) {
        var name = key;

        if (prefix) {
            /*
             * To camel case.
             */
            name = name.charAt(0).toUpperCase() + name.slice(1);
            name = '' + namespace.replace(/(\/)(\w{1})/, function (match) {
                return match[1].toUpperCase();
            }) + name;
        }

        computedProperties[name] = {
            get: createGetter(namespace, key),
            set: createSetter(namespace, key)
        };
    });

    return computedProperties;
};

var parseArguments = function parseArguments(initialArguments) {
    var first = initialArguments[0];
    var second = initialArguments[1];

    var result = {
        namespace: null,
        prefix: false,
        mappings: first
    };

    if (!Array.isArray(first)) {
        result = {
            namespace: first.namespace !== undefined ? first.namespace : null,
            prefix: first.prefix !== undefined ? first.prefix : false,
            mappings: second
        };
    }

    return result;
};

var createGetter = function createGetter(namespace, mapping) {
    var getter = mapping;

    if (namespace) {
        getter = namespace + '/' + getter;
    }

    // eslint-disable-next-line func-names
    return function () {
        return this.$store.getters[getter];
    };
};

var createSetter = function createSetter(namespace, mapping) {
    /*
     * To upper snake case.
     */
    var mutation = mapping.replace(/([A-Z])/, '_$1').toUpperCase();

    if (namespace) {
        mutation = namespace + '/' + mutation;
    }

    // eslint-disable-next-line func-names
    return function (value) {
        this.$store.commit(mutation, value);
    };
};

/**
 * Generates two way computed properties.
 *
 * @param {string|Array} required
 * @param {boolean|Array} optional
 * @param {Array} optional
 *
 * @return {Object}
 */

/***/ })
/******/ ]);