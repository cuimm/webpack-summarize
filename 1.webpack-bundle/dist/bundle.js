(function (modules) {
  // 模块缓存（The module cache）
  var installedModules = {};

  /**
   * webpack自己实现了一个基于common.js模块的require方法。（The require function）
   * @param moduleId 模块ID
   * @returns {exports|{}}
   * @private
   */
  function __webpack_require__(moduleId) {
    // 判断模块在缓存中有没有，有则直接返回，返回的是module的exports对象（Check if module is in cache）
    if (installedModules[moduleId]) {
      return installedModules[moduleId].exports;
    }
    // 创建一个新的模块，并且放到缓存中（Create a new module (and put it into the cache)）
    var module = installedModules[moduleId] = {
      i: moduleId,  // i：模块ID
      l: false,     // l：loaded 是否已经加载过
      exports: {}   // exports：导出对象的默认值（空对象）
    };

    // 执行模块方法（Execute the module function）
    // 模块内部this指向模块的exports对象（导出对象）
    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

    // 把模块设置为已经加载过了（Flag the module as loaded）
    module.l = true;

    // 返回模块的导出对象（Return the exports of the module）
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

  // create a fake namespace object
  // mode & 1: value is a module id, require it
  // mode & 2: merge all properties of value into the ns
  // mode & 4: return value when already ns object
  // mode & 8|1: behave like require
  __webpack_require__.t = function (value, mode) {
    if (mode & 1) value = __webpack_require__(value);
    if (mode & 8) return value;
    if ((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
    var ns = Object.create(null);
    __webpack_require__.r(ns);
    Object.defineProperty(ns, 'default', {enumerable: true, value: value});
    if (mode & 2 && typeof value != 'string') for (var key in value) __webpack_require__.d(ns, key, function (key) {
      return value[key];
    }.bind(null, key));
    return ns;
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


  // Load entry module and return exports
  return __webpack_require__(__webpack_require__.s = "./src/index.js");
})
({
  "./src/index.js":
      (function (module, exports, __webpack_require__) {
        const title = __webpack_require__(/*! ./title */ "./src/title.js");
        console.log(title);
      }),

  "./src/title.js":
      (function (module, exports) {
        module.exports = 'title';
      })
});

/*
// webpack打包后生成的代码是一个自执行函数。
(function (modules) { // webpack
    // code...
})({
  "./src/index.js":
      function (module, exports, __webpack_require__) {
      // 1. 浏览器内部没有require方法，__webpack_require__对标require方法.
      // 2. 源码内部引入的是./title.js，打包之后编译=> ./src/title.js，webpack打包的时候，资源路径永远是相对于根目录的路径。
      const title = __webpack_require__("./src/title.js");
      console.log(title);
    },
  "./src/title.js":
      function (module, exports) {
      module.exports = 'title';
    }
});
*/
