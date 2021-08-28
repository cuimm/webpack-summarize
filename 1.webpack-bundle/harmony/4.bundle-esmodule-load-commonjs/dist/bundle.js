(function (modules) { // webpackBootstrap
                      // The module cache
  var installedModules = {};

  // The require function
  function __webpack_require__(moduleId) {
    if (installedModules[moduleId]) {
      return installedModules[moduleId].exports;
    }
    var module = installedModules[moduleId] = {
      i: moduleId,
      l: false,
      exports: {}
    };

    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

    module.l = true;

    return module.exports;
  }


  // expose the modules object (__webpack_modules__)
  __webpack_require__.m = modules;

  // expose the module cache
  __webpack_require__.c = installedModules;

  // define getter function for harmony exports
  __webpack_require__.d = function (exports, name, getter) {
    if (!__webpack_require__.o(exports, name)) {
      Object.defineProperty(exports, name, {enumerable: true, get: getter});
    }
  };

  // define __esModule on exports
  __webpack_require__.r = function (exports) {
    if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
      Object.defineProperty(exports, Symbol.toStringTag, {value: 'Module'});
    }
    Object.defineProperty(exports, '__esModule', {value: true});
  };

  // getDefaultExport function for compatibility with non-harmony modules
  __webpack_require__.n = function (module) {
    var getter = module && module.__esModule ?
        function getDefault() {
          return module['default'];
        } :
        function getModuleExports() {
          return module;
        };
    __webpack_require__.d(getter, 'a', getter);
    return getter;
  };

  // Object.prototype.hasOwnProperty.call
  __webpack_require__.o = function (object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  };

  // __webpack_public_path__
  __webpack_require__.p = "";

  return __webpack_require__(__webpack_require__.s = "./src/index.js");
})({
  "./src/index.js": /*! no exports provided */
      (function (module, __webpack_exports__, __webpack_require__) {

        "use strict";
        __webpack_require__.r(__webpack_exports__); // 标记ES6模块

        /* harmony import => ES6模块导入 */
        var _title__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/title.js");

        /* harmony import => ES6模块导入 */
        var _title__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(_title__WEBPACK_IMPORTED_MODULE_0__); // 获取默认导出

        console.log(_title__WEBPACK_IMPORTED_MODULE_0___default.a); // a属性上是默认导出
        console.log(_title__WEBPACK_IMPORTED_MODULE_0__["age"]);
      }),

  "./src/title.js": /*! no static exports found */
      (function (module, exports) {
        module.exports = {
          name: 'title_name',
          age: 18,
        };
      })
});
