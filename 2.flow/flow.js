const path = require('path');
const fs = require('fs');
const {SyncHook} = require('tapable');

function babelLoader(source) {
  return `
    require('./index.css');
    var sum = function(a, b) {
      return a + b;
    }
  `;
}

function cssLoader(source) {
  return `
    const style = document.createElement('style');
    style.innerHTML = "body{background-color: red;}";
    document.head.appendChild(style);
  `;
}

class Compiler {
  constructor(config) {
    this.config = config;
    this.config.context = config.context || process.cwd();
    this.hooks = {
      emit: new SyncHook(['assets']),
    };
  }

  /**
   * 编译
   */
  run() {
    console.log('run');
    const entries = []; // 存放所有的入口，默认情况下每个入口对应一个代码块chunk
    const modules = []; // 存放所有的模块
    const chunks = [];  // 存放所有的代码块
    const assets = {};  // 存放所有的资源
    const files = []; // 存放所有的文件 files = Object.keys(assets)

    // 5、确定入口。根据配置中的entry找出所有的入口文件。
    const entry = path.join(this.config.context, this.config.entry);
    entries.push({
      name: 'main',
      entry
    });

    // 6、编译模块。从入口文件出发，调用所有配置的loader对模块进行编译
    // 6-1、读取入口entry文件的内容
    const entryContent = fs.readFileSync(entry, 'utf8');
    const entrySource = babelLoader(entryContent);
    const entryModule = {
      id: './src/index.js',
      source: entrySource,
      name: 'main',
    };
    modules.push(entryModule);

    // 6-2、把entryModule编译成抽象语法树，然后通过 require、import 找到里面的依赖，递归的编译所有依赖的模块
    const cssPath = path.join(this.config.context, './src/index.css');
    const cssContent = fs.readFileSync(cssPath, 'utf8');
    const cssSource = cssLoader(cssContent);
    const cssModule = {
      id: './src/index.css',
      source: cssSource,
      name: 'main',
    };
    modules.push(cssModule);

    // 7、输出资源。根据入口和模块之间的依赖关系，组装成一个个包含多个模块的chunk。
    const chunk = {
      id: 'main',
      modules: [entryModule, cssModule],
    };
    chunks.push(chunk);

    // 8、把每个chunk转换成一个个单独的文件，加入到输出列表
    for (let chunk of chunks) {
      const assetId = `${chunk.id}.js`;
      assets[assetId] = `
        (function (modules) {
          return __webpack_require__("./src/index.js")
        })({
          "./src/index.js": (function (module, exports) {
            console.log("index");
          })
        })
      `;
    }

    // 触发emit钩子执行
    this.hooks.emit.call(assets);

    // 写入硬盘的文件名的数组
    files.push(Object.keys(assets));

    // 9、在确定好输出内容后，根据配置确定输出路径和文件名，把文件写入文件系统。
    for (let file in assets) {
      const filePath = path.join(this.config.output.path, file);
      fs.writeFileSync(filePath, assets[file]);
    }
  }
}

// 1、初始化参数。从配置文件以及shell脚本中读取与合并参数，得到最终配置。
const webpackConfig = require('./webpack.config');

// 2、开始编译。使用上一步得到的配置参数初始化Compiler对象。
const compiler = new Compiler(webpackConfig);

// 3、加载所有的插件
for (let plugin of webpackConfig.plugins) {
  plugin.apply(compiler);
}

// 4、执行compiler的run方法开始编译
compiler.run();
