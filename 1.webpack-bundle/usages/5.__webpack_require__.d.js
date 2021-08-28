function __webpack_require__() {
  //noop
}

/**
 * 判断导出对象上有没有指定属性，如果没有，则在导出对象的该属性上定义 getter 函数
 * define getter function for harmony exports
 * @param exports
 * @param name
 * @param getter
 */
__webpack_require__.d = function (exports, name, getter) {
  if (!__webpack_require__.o(exports, name)) {
    Object.defineProperty(exports, name, {enumerable: true, get: getter});
  }
};

/**
 * 判断目标对象上是否有指定属性（Object.prototype.hasOwnProperty.call）
 * 在原来Object.prototype.hasOwnProperty基础上再封装一层为了减小打包体积
 * @param object
 * @param property
 * @returns {boolean}
 */
__webpack_require__.o = function (object, property) {
  return Object.prototype.hasOwnProperty.call(object, property);
};
