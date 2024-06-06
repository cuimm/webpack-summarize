const SingleEntryPlugin = require('./SingleEntryPlugin');

const itemToPlugin = (context, entry, name) => {
  return new SingleEntryPlugin(context, entry, name);
};

class EntryOptionPlugin {

  apply(compiler) {
    compiler.hooks.entryOption.tap('EntryOptionPlugin', (context, entry) => { // 监听 entryOption入口 钩子
      if (typeof entry === 'string') {
        itemToPlugin(context, entry, 'main').apply(compiler);
      } else {
        for (const entryName in entry) {
          itemToPlugin(context, entry[entryName], entryName).apply(compiler);
        }
      }
    });
  }

}

module.exports = EntryOptionPlugin;
