1. `webpack` 的 `devtool` 和 `babel-loader` 的 `sourceMap` 有什么关系？

- `babel-loader` 可以按照 `sourceMap: true` 配置生成sourceMap文件，生成的是`源码的sourceMap文件`。
- `webpack` 可以按照 `devtool: source-map` 配置可以生成我们要求的sourceMap文件，生成的是`babel-loader转译后的代码的sourcemap文件`。
- `babel-loader`按照源码生成sourceMap，`webpack`根据babel-loader转译代码生成sourceMap。
- 只有`babel-loader`和`webpack`都生成sourceMap才可调试`源码`。
- 如果`babel-loader`不生成sourceMap，只有`webpack`生成sourceMap，那么我们调试时只能调试`babel-loader`转译过的代码。
- 如果`babel-loader`生成sourceMap，而`webpack`不生成sourceMap，那么我们只能调试打包后的代码。
- 但是这两个配置都不影响最终生成的打包文件。


2. sourceMap
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
    

3. sourceMap转换工具
- base64vlq在线转换 https://www.murzwin.com/base64vlq.html
- compiler官方下载 https://developers.google.com/closure/compiler


