let { Tapable, SyncHook } = require('tapable');

class Compilation extends Tapable {
  constructor(compiler) {
    super();
    this.compiler = compiler; // 编译器对象
  }

  /**
   * 开始编译一个新的入口
   * @param context 根目录（绝对路径）
   * @param entry 入口模块相对路径（./src/index.js）
   * @param name 入口的名字（main）
   * @param finalCallback 编译完成的回调函数
   */
  addEntry(context, entry, name, finalCallback) {
    console.log('addEntry', context, entry, name);
  }
}

module.exports = Compilation;
