1. webpack 打包时会将 require 方法编译为 __webpack_require__ 方法。
   因为浏览器内部没有 require 方法，__webpack_require__ 对标require方法。

2. 源码内部引入的相对路径，如：./title.js，打包之后会被编译为：./src/title.js。
   webpack打包的时候，资源路径永远是相对于根目录的路径。

3. 



