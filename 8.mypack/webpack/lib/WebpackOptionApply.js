/**
 * 初始化编译环境
 */
const EntryOptionPlugin = require('./EntryOptionPlugin');

class WebpackOptionApply {
  process(options, compiler) {
    // 注册入口插件
    new EntryOptionPlugin().apply(compiler);

    // 触发 entryOption 钩子：context是根目录的路径、entry是入口文件相对路径./src/index.js
    compiler.hooks.entryOption.call(options.context, options.entry);
  }
}

module.exports = WebpackOptionApply;
