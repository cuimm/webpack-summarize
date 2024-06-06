class SingleEntryPlugin {
  /**
   * 构造函数
   * @param context 上下文绝对路径，如：/Users/cuimm/Documents/cuimm/webpack/webpack-summarize/8.mypack
   * @param entry 入口模块路径，如：./src/index.js
   * @param name 入口的名字，如：main
   */
  constructor(context, entry, name) {
    this.context = context;
    this.entry = entry;
    this.name = name;
  }

  apply(compiler) {

    // 监听 make 钩子
    compiler.hooks.make.tapAsync('SingleEntryPlugin', (compilation, callback) => {

      // 从此处入口开始编译
      const { context, entry, name } = this;

      // 开始编译一个新的入口文件
      compilation.addEntry(context, entry, name, callback);

    });

  }
}

module.exports = SingleEntryPlugin;
