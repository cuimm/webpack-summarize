function __webpack_require__() {
  //noop
}

/**
 * 获取默认导出，为了兼容非ES6模块。
 * 同时兼容ES6 module 和 common.js，获取他们的默认导出。
 *
 * getDefaultExport function for compatibility with non-harmony modules
 *
 * @param module 非模块本身，而是模块的导出exports对象
 * @returns {function(): *}
 */
__webpack_require__.n = function (module) {

  var getter = module && module.__esModule ?
      function getDefault() {
        return module['default']; // 如果该模块是一个ES6模块，那么它的默认导出会挂在导出对象的default属性上
      } :
      function getModuleExports() {
        return module; // 如果是一个commonjs模块，直接获取导出对象
      };

  __webpack_require__.d(getter, 'a', getter); // 给getter函数定义a属性，属性getter方法（也就是获取值得方法）是getter本身

  return getter;
};


// define getter function for harmony exports
__webpack_require__.d = function (exports, name, getter) {
  if (!__webpack_require__.o(exports, name)) {
    Object.defineProperty(exports, name, {enumerable: true, get: getter});
  }
};

__webpack_require__.o = function (object, property) {
  return Object.prototype.hasOwnProperty.call(object, property);
};


// 用法
const myModule = {name: 'title_name'};
const getter = __webpack_require__.n(myModule);
console.log(getter.a);     // {name: 'title_name'}
