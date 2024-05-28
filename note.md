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

10. webpack 打包流程
    1. 初始化参数。
        - 从配置文件和shell语句中读取并合并参数，得到最终的编译参数。
    2. 初始化Compiler对象。
        - 用上一步得到的配置参数，调用webpack方法，初始化Compiler对象。
    3. 注册插件 plugins。
        - 执行plugin的apply方法，注册插件。
    4. 开始编译。
        - 执行compiler的run方法，开始编译。
    5. 确定入口
        - 根据配置的entry，找到所有的入口文件。
    6. 编译模块
        - 读取入口模块的内容，编译成抽象语法树 ast，通过 require、import 找到入口文件的依赖模块。
        - 递归的编译模块文件依赖的所有模块。
        - 按照入口模块的依赖关系，组装成一个个的代码块 chunk。
    7. 输出资源
        - 将每个代码块 chunk 转换成一个个的文件加入输出列表。
        - 根据配置 output 确定输出的路径和文件名，将文件写入文件系统。

11. `webpack` 的 `devtool` 和 `babel-loader` 的 `sourceMap` 有什么关系？
- `babel-loader` 可以按照 `sourceMap: true` 配置生成sourceMap文件，生成的是`源码的sourceMap文件`。
- `webpack` 可以按照 `devtool: source-map` 配置可以生成我们要求的sourceMap文件，生成的是`babel-loader转译后的代码的sourcemap文件`。
- `babel-loader`按照源码生成sourceMap，`webpack`根据babel-loader转译代码生成sourceMap。
- 只有`babel-loader`和`webpack`都生成sourceMap才可调试`源码`。
- 如果`babel-loader`不生成sourceMap，只有`webpack`生成sourceMap，那么我们调试时只能调试`babel-loader`转译过的代码。
- 如果`babel-loader`生成sourceMap，而`webpack`不生成sourceMap，那么我们只能调试打包后的代码。
- 但是这两个配置都不影响最终生成的打包文件。

12. sourceMap
- sourceMap为了解决开发代码与实际运行代码不一致时，帮助我们debug到原始开发代码的技术.
- webpack通过配置可以自动给我们source maps文件，map文件是一种对应编译文件和源文件的方法.
- 配置项：其实只是五个关键字 `eval`、`source-map`、`cheap`、`module`和`inline`的组合
  - source-map
    - 产生.map文件 
  - eval
    - 使用eval包裹模块代码（可以缓存）
  - cheap
    - 不包含列信息（关于列信息的解释下面会有详细介绍)也不包含loader的sourcemap 
  - module
    - 包含loader的sourcemap（比如jsx to js ，babel的sourcemap）,否则无法定义源文件 
  - inline
    - 将.map作为DataURI嵌入，不单独生成.map文件 

- 开发环境 推荐使用 
    - `source-map`  原始代码。最好的sourcemap质量有完整的结果，但是会很慢
    - `eval-source-map` 原始代码。同样道理，但是最高的质量和最低的性能
    - `cheap-module-eval-source-map` 原始代码（只有行内）。同样道理，但是更高的质量和更低的性能。module会加入loader的source-map。
- 生产环境 推荐使用 
    - `nosources-source-map` 全部隐藏，包括loader构建的代码和最终打包代码
    - `hidden-source-map` 只隐藏源代码，会提示构建后的代码错误信息
    























