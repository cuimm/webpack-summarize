1. webpack 打包时会将 require 方法编译为 __webpack_require__ 方法。
   因为浏览器内部没有 require 方法，__webpack_require__ 对标require方法。

2. 源码内部引入的相对路径，如：./title.js，打包之后会被编译为：./src/title.js。
   webpack打包的时候，资源路径永远是相对于根目录的路径。
  
3. webpack 打包时，不管原始模块是什么规范的模块，都会被打包成 commonjs 模块。
   
   模块内部只要通过 import导入 或者 export导出，那么该模块就是一个ES6模块。

4. __webpack_require__.r 方法
- 改变导出对象的toStringTag的值。( exports[Symbol.toStringTag] = 'Module' )
- 给导出对象定义__esModule属性。( Object.defineProperty(exports, '__esModule', {value: true}) )
- 标记该模块打包前是一个ES6模块。

5. __webpack_require__.o 方法
- 判断目标对象上是否有指定属性

6. __webpack_require__.d 方法
- 判断导出对象上有没有指定属性，如果没有，则在导出对象的该属性上定义 getter 函数

7. __webpack_require__.n 方法
- 获取默认导出，兼容 ES6模块 和 commonjs 模块。
- 如果该模块是一个ES6模块，那么它的默认导出会挂在导出对象的default属性上
- 如果是一个commonjs模块，直接获取导出对象

8. __webpack_require__.e 方法
- import方法异步加载模块时调用，使用JSONP方式异步加载模块

9. __webpack_require__.t 方法
- 创建一个命名空间对象，不论原模块是ES6还是commonjs，都转成es6模块
