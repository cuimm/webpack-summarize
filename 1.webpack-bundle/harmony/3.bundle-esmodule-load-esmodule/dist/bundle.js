(function (modules) { // webpackBootstrap

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

  // Object.prototype.hasOwnProperty.call
  __webpack_require__.o = function (object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  };

  // Load entry module and return exports
  return __webpack_require__(__webpack_require__.s = "./src/index.js");
})({

  "./src/index.js": /*! no exports provided */
      (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";

        __webpack_require__.r(__webpack_exports__); // 标记ES模块

        /* harmony import => ES6模块导入 */
        var _title__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/title.js");

        console.log(_title__WEBPACK_IMPORTED_MODULE_0__["default"]);
        console.log(_title__WEBPACK_IMPORTED_MODULE_0__["age"]);
      }),

  "./src/title.js": /*! exports provided: default, age */
      (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";

        __webpack_require__.r(__webpack_exports__); // 标记ES6模块

        /* harmony export (binding) => ES6模块导出 */
        __webpack_require__.d(__webpack_exports__, "age", function () {
          return age;
        });

        /* harmony default export => ES6模块默认导出 */
        __webpack_exports__["default"] = ('title_name');

        const age = 18;
      })
});
