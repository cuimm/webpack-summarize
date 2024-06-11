const path = require('path');
const async = require('neo-async');
const {runLoaders} = require('loader-runner');
const types = require('babel-types');
const traverse = require('babel-traverse').default;
const generate = require('babel-generator').default;

class NormalModule {
  /**
   * 构造函数
   * @param name 入口的名字（main）
   * @param context 根目录（上下文绝对路径，如：/Users/cuimm/Documents/cuimm/webpack/webpack-summarize/8.mypack）
   * @param rawRequest 入口模块的相对路径（./src/index.js）
   * @param resource 当前模块的绝对路径（/Users/cuimm/Documents/cuimm/webpack/webpack-summarize/8.mypack/src/index.js）
   * @param parser AST解析器，可以把源代码转化成AST抽象语法树
   * @param moduleId 当前模块Id（./src/index.js）
   * @param async 是否为异步模块（同步模块/异步模块）
   */
  constructor({name, context, rawRequest, resource, parser, moduleId, async}) {
    this.name = name; // 入口的名字，如：main
    this.context = context; // 上下文根目录，如：/Users/cuimm/Documents/cuimm/webpack/webpack-summarize/8.mypack
    this.rawRequest = rawRequest; // 入口模块的相对路径，如：./src/index.js
    this.resource = resource; // 当前模块的绝对路径，如：/Users/cuimm/Documents/cuimm/webpack/webpack-summarize/8.mypack/src/index.js
    this.parser = parser; // AST解析器
    this.moduleId = moduleId || ('./' + path.posix.relative(context, resource)); // 当前模块Id，如：./src/index.js
    this.async = async; // 当前模块是否为异步模块

    this._source; // 当前模块对应的源代码
    this._ast; // 当前模块对应的AST语法树
    this.dependencies = []; // 当前模块依赖的模块信息
    this.blocks = []; // 当前模块依赖的异步模块，如：import引入的那些模块
  }

  build(compilation, callback) {
    this.doBuild(compilation, error => {
      // 调用 parser 将 JS文本 转换为 AST语法树
      this._ast = this.parser.parse(this._source);

      // 遍历语法树，找到模块的依赖进行依赖收集
      traverse(this._ast, {
        CallExpression: nodePath => { // 当遍历到 CallExpression节点的时候，就会进入回调
          const node = nodePath.node; // 节点
          if (node.callee.name === 'require') { // 方法名是 require。如：require('./title.less')
            console.log('require 引入');
            // 1. 将方法名改为 __webpack_require__
            node.callee.name = '__webpack_require__';
            // 2. 获取当前依赖的模块名称（./title.less））
            const moduleName = node.arguments[0].value;
            // 3. 计算依赖模块的绝对路径
            let depResource;
            if (moduleName.startsWith('.')) {
              /** 如果模块的名字是以.开头，说明是一个本地模块，或者说用户自定义模块 **/
              // 获得可能的扩展名
              const extName = moduleName.split(path.posix.sep).pop().indexOf('.') == -1 ? '.js' : '';
              // 获取依赖模块(./src/title.less)的绝对路径（win \ linux /）（/Users/cuimm/Documents/cuimm/webpack/webpack-summarize/8.mypack/src/title.less）
              depResource = path.posix.join(path.posix.dirname(this.resource), moduleName + extName);
            } else {
              /** 否则是第三方模块（node_modules 里的模块）**/
              depResource = require.resolve(path.posix.join(this.context, 'node_modules', moduleName));
              depResource = depResource.replace(/\\/g, '/'); // 把window里的 \ 转成 /
            }
            // 4. 依赖的模块ID：./ + 从根目录出发到依赖模块的绝对路径的相对路径
            const depModuleId = '.' + depResource.slice(this.context.length);
            // 5. 修改节点arguments，将 require引入的模块路径从./title.less 转换成 ./src/title.less
            node.arguments = [types.stringLiteral(depModuleId)];

            // 6. 加入当前模块依赖
            this.dependencies.push({
              name: this.name, // 入口的名字（main）
              context: this.context, // 当前工作目录的绝对路径（/Users/cuimm/Documents/cuimm/webpack/webpack-summarize/8.mypack）
              rawRequest: moduleName, // 依赖模块的最初引入路径（./title.less）
              moduleId: depModuleId, // 依赖模块的Id：相对于根目录的相对路径，以 ./ 开头（./src/title.less）
              resource: depResource, // 依赖模块的绝对路径（/Users/cuimm/Documents/cuimm/webpack/webpack-summarize/8.mypack/src/title.less）
            });

            console.log('当前模块绝对路径：', this.resource);
            console.log('当前模块的依赖模块：', this.dependencies);
            /**
             当前模块绝对路径： /Users/mengmeng19/Documents/cuimm/webpack/webpack-summarize/8.mypack/src/index.js
             当前模块的依赖模块：[
               {
                  name: 'main',
                  context: '/Users/mengmeng19/Documents/cuimm/webpack/webpack-summarize/8.mypack',
                  rawRequest: './title.less',
                  moduleId: './src/title.less',
                  resource: '/Users/mengmeng19/Documents/cuimm/webpack/webpack-summarize/8.mypack/src/title.less'
               }
             ]
             */
          } else if (types.isImport(node.callee)) { // import 引入。如：import('./title.less')，异步引入
            console.log('import 引入');
            // 1. 获取模块名称（./title.less）
            const moduleName = node.arguments[0].value;
            // 2. 获取可能的扩展名
            const extName = moduleName.split(path.posix.sep).pop().indexOf('.') == -1 ? '.js' : '';
            // 3. 获取依赖的模块的绝对路径
            const depResource = path.posix.join(path.posix.dirname(this.resource), moduleName + extName);
            // 4.依赖的模块ID：./ + 从根目录出发到依赖模块的绝对路径的相对路径 ./src/title.less
            const depModuleId = './' + path.posix.relative(this.context, depResource);

            // 异步引入默认生成的代码块名字。如果不指定webpackChunkName，代码块名字就是数字，0.js\1.js\2.js...
            let chunkName = compilation.asyncChunkCounter++;
            // 判断是否存在模块注释，如：import(/* webpackChunkName: "title" */'./title.less');
            if (Array.isArray(node.arguments[0].leadingComments) && node.arguments[0].leadingComments.length > 0) {
              const leadingComments = node.arguments[0].leadingComments[0].value; // 获取魔法注释的值：webpackChunkName: \"title\"
              let regexp = /webpackChunkName:\s*['"]([^'"]+)['"]/;
              chunkName = leadingComments.match(regexp)[1]; // 获取魔法注释内的代码块名称，title
            }
            nodePath.replaceWithSourceString(`__webpack_require__.e("${chunkName}").then(__webpack_require__.t.bind(null,"${depModuleId}", 7))`); // async import

            // 当前模块依赖的异步模块数组
            this.blocks.push({
              context: this.context, // 当前工作目录的绝对路径（/Users/cuimm/Documents/cuimm/webpack/webpack-summarize/8.mypack）
              entry: depModuleId, // 依赖的异步模块入口路径（./src/title.less）
              name: chunkName, // 默认是数字，可通过魔法注释指定chunkName
              async: true, // 当前模块依赖的模块为异步代码块
            });

            console.log('当前模块绝对路径：', this.resource);
            console.log('当前模块依赖的异步模块：', this.blocks);
            /**
              当前模块绝对路径： /Users/cuimm/Documents/cuimm/webpack/webpack-summarize/8.mypack/src/index.js
              当前模块依赖的异步模块：[
                {
                  context: '/Users/cuimm/Documents/cuimm/webpack/webpack-summarize/8.mypack',
                  entry: './src/title.less',
                  name: 0,
                  async: true
                }
              ]
             */
          }
        },
      });

      // console.log('编译后的ast语法树', this._ast);

      // 将转换后的语法树重新生成源代码
      const { code } = generate(this._ast);
      console.log('转换前的源代码：', this._source);
      console.log('转换后的源代码：', code);
      /*
      * 1. require('./title.less');
      * 转换前的源代码： require('./title.less');
      * 转换后的源代码： __webpack_require__("./src/title.less");
      *
      * 2.import('./title.less');
      * 转换前的源代码： import('./title.less');
      * 转换后的源代码： __webpack_require__.e("0").then(__webpack_require__.t.bind(null, "./src/title.less", 7));
      *
      * 3. import(\/* webpackChunkName: "title" *\/'./title.less');
      * 转换前的源代码： import(\/* webpackChunkName: "title" *\/'./title.less')
      * 转换后的源代码： __webpack_require__.e("title").then(__webpack_require__.t.bind(null, "./src/title.less", 7));
      * */

      this._source = code;

      // 循环构建每一个异步代码块，都构建完成时，代表当前模块编译完成
      async.forEach(this.blocks, (block, done) => {
        const { context, entry, name, async } = block;
        compilation._addModuleChain(context, entry, name, async, done); // 构建异步模块
      }, callback);
    });
  }

  /**
   * 获取 loader 转译后的标准 JaveScript 内容
   * @param compilation 本次编译器
   * @param callback 回调函数
   */
  doBuild(compilation, callback) {
    this.getSource(compilation, (error, source) => {

      // 获取当前模块匹配的loaders
      let loaders = [];
      const {module: {rules = []}} = compilation.options;
      for (let index = 0; index < rules.length; index++) {
        const rule = rules[index];
        if (rule.test.test(this.resource)) {
          loaders.push(...rule.use);
        }
      }
      // 获取loader的绝对路径（此项目模拟loader全部存放在./loaders目录下）
      const resolveLoader = loader => require.resolve(path.posix.join(this.context, 'loaders', loader));
      loaders = loaders.map(resolveLoader);
      console.log('loaders', loaders);

      // 调用 loader 将模块转译为标准JS内容。处理完后的最后结果必须是可以被 acorn 处理的标准 JavaScript 语法。
      runLoaders({
        loaders,
        resource: this.resource,
      }, (error, {result}) => {
        this._source = result.toString(); // 获取loader转译后的JavaScript内容
        console.log(this.resource, '转译后的JS内容：', this._source);
        callback();
      });
    });
  }

  /**
   * 读取文件源代码
   * @param compilation 单次编译器
   * @param callback 回调函数
   */
  getSource(compilation, callback) {
    compilation.inputFileSystem.readFile(this.resource, 'utf8', callback); // fs.readFile
  }
}

module.exports = NormalModule;
