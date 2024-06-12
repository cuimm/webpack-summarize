class Stats {
  constructor(compilation) {
    this.entries = compilation.entries; // 输出入口
    this.modules = compilation.modules; // 输出模块
    this.chunks = compilation.chunks; // 输出代码块
    this.files = compilation.files; // 输出files
  }

  toJson() {
    return this;
  }
}

module.exports = Stats;
