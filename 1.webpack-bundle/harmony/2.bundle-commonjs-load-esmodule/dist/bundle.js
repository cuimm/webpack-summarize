(function (modules) { // webpackBootstrap
  // The module cache
  var installedModules = {};

  // The require function
  function __webpack_require__(moduleId) {

    // Check if module is in cache
    if (installedModules[moduleId]) {
      return installedModules[moduleId].exports;
    }
    // Create a new module (and put it into the cache)
    var module = installedModules[moduleId] = {
      i: moduleId,
      l: false,
      exports: {}
    };

    // Execute the module function
    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

    // Return the exports of the module
    return module.exports;
  }

  // 判断导出对象上有没有指定属性，如果没有，则在导出对象的该属性上定义 getter 函数（define getter function for harmony exports）
  __webpack_require__.d = function (exports, name, getter) {
    if (!__webpack_require__.o(exports, name)) {
      Object.defineProperty(exports, name, {enumerable: true, get: getter});
    }
  };

  // 给导出对象（exports）上定义__exModule属性，用来标记模块打包前是一个ES6模块（define __esModule on exports）
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
  "./src/index.js":
      (function (module, exports, __webpack_require__) {
        const title = __webpack_require__("./src/title.js");
        console.log(title.default);
        console.log(title.age);
      }),

  "./src/title.js":
      (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";

        __webpack_require__.r(__webpack_exports__); // 标记ES6模块：给导出对象（exports）上定义__exModule属性，用来标记该模块打包前是一个ES6模块。

        /* harmony export (binding) => ES6模块导出绑定 */
        __webpack_require__.d(__webpack_exports__, "age", function () {
          return age;
        });

        /* harmony default export => ES6模块默认导出绑定 */
        __webpack_exports__["default"] = ('title_name');

        const age = 18;
      })
});
