class DonePlugin {
  apply(compiler) {
    compiler.hooks.emit.tap('DonePlugin', assets => {
      assets['done.json'] = `
        {
            "name": "cuimm"
        }
      `;
    });
  }
}

module.exports = DonePlugin;
