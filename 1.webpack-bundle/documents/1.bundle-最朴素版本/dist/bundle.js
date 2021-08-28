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

  return __webpack_require__("./src/index.js");
})
({
  "./src/index.js":
      (function (module, exports, __webpack_require__) {
        // 1. 浏览器内部没有require方法，__webpack_require__对标require方法.
        // 2. 源码内部引入的是./title.js，打包之后编译=> ./src/title.js，webpack打包的时候，资源路径永远是相对于根目录的路径。
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
