const NodeEnvironmentPlugin = require('./node/NodeEnvironmentPlugin');
const WebpackOptionApply = require('./WebpackOptionApply');
const Compiler = require('./Compiler');

/**
 * webpack 入口
 * @param options 初始化参数
 */
const webpack = options => {
  // 创建编译器对象：创建 Compiler实例（compiler上有context上下文对象、hooks注册的所有钩子函数）
  const compiler = new Compiler(options.context);

  // 赋值打包参数
  compiler.options = options;

  // 让compiler可以读写文件
  new NodeEnvironmentPlugin().apply(compiler);

  // 注册钩子函数：挂载配置文件里提供的所有plugins
  if (options.plugins && Array.isArray(options.plugins)) {
    for (const plugin of options.plugins) {
      plugin.apply(compiler);
    }
  }

  // 初始化编译环境：注册内置插件、注册各种模块工厂等
  new WebpackOptionApply().process(options, compiler);

  return compiler;
};

exports = module.exports = webpack;
