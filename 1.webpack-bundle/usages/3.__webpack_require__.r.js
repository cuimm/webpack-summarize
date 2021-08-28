
function __webpack_require__() {
  //noop
}

/**
 * 在导出exports对象上定义__exModule属性（define __esModule on exports）
 *
 * => 1. 改变导出对象的toStringTag的值
 * => 2. 给导出对象定义__esModule属性（true）
 * => 标记该原始打包前是一个ES6模块
 *
 * @param exports 导出对象
 */
__webpack_require__.r = function (exports) {
  if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
    Object.defineProperty(exports, Symbol.toStringTag, {value: 'Module'}); // exports[Symbol.toStringTag] = 'Module'
  }
  Object.defineProperty(exports, '__esModule', {value: true}); // exports['__esModule'] = true
};


// 用法
const myExports = {};
__webpack_require__.r(myExports);

console.log(Object.prototype.toString.call(myExports)); // 打印：[object Module]
console.log(myExports['__esModule']); // 打印：true
