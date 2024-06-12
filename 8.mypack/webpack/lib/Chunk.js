class Chunk {
  constructor(entryModule) {
    this.entryModule = entryModule; // 当前代码块的入口模块实例
    this.async = entryModule.async; // 是否是异步代码块
    this.name = entryModule.name; // 代码块的名字（main）
    this.files = []; // 当前代码块包含的文件
    this.modules = []; // 当前代码块包含哪些模块
  }
}

module.exports = Chunk;
