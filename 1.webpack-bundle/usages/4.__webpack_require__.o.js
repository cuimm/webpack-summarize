function __webpack_require__() {
  //noop
}

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
