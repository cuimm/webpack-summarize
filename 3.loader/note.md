1. `webpack` 的 `devtool` 和 `babel-loader` 的 `sourceMap` 有什么关系？

- `babel-loader` 可以按照 `sourceMap: true` 配置生成sourceMap文件，生成的是`源码的sourceMap文件`。
- `webpack` 可以按照 `devtool: source-map` 配置可以生成我们要求的sourceMap文件，生成的是`babel-loader转译后的代码的sourcemap文件`。
- `babel-loader`按照源码生成sourceMap，`webpack`根据babel-loader转译代码生成sourceMap。
- 只有`babel-loader`和`webpack`都生成sourceMap才可调试`源码`。
- 如果`babel-loader`不生成sourceMap，只有`webpack`生成sourceMap，那么我们调试时只能调试`babel-loader`转译过的代码。
- 如果`babel-loader`生成sourceMap，而`webpack`不生成sourceMap，那么我们只能调试打包后的代码。
- 但是这两个配置都不影响最终生成的打包文件。
