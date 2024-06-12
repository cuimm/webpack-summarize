const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const {Tapable, SyncHook} = require('tapable');
const async = require('neo-async');
const Parser = require('./Parser');
const NormalModuleFactory = require('./NormalModuleFactory');
const Chunk = require('./Chunk');

/**
 * 编译模版
 */
const deferMainTemplate = fs.readFileSync(path.join(__dirname, 'templates', 'deferMain.ejs'), 'utf8');
const deferMainRender = ejs.compile(deferMainTemplate);
const chunkTemplate = fs.readFileSync(path.join(__dirname, 'templates', 'chunk.ejs'), 'utf8');
const chunkRender = ejs.compile(chunkTemplate);

const parser = new Parser();
const normalModuleFactory = new NormalModuleFactory();

class Compilation extends Tapable {
  constructor(compiler) {
    super();
    this.compiler = compiler; // 编译器对象
    this.options = compiler.options; // 编译参数
    this.context = compiler.context; // 根目录
    this.inputFileSystem = compiler.inputFileSystem; // 读取文件模块
    this.outputFileSystem = compiler.outputFileSystem; // 写入文件模块
    this.entries = []; // 入口模块数组：存放所有的入口模块
    this.modules = []; // 模块数组：存放所有的模块实例
    this._modules = {}; // 模块对象：key：模块Id，value：模块对象
    this.chunks = []; // 代码块数组：存放所有的代码块
    this.files = []; // 本次编译产出的所有文件名
    this.assets = {}; // 资源：key是文件名，值是文件的内容
    this.vendors = []; // 第三方模块
    this.commons = []; // 同时被多个代码块依赖的模块
    this.moduleCount = {}; // 每个模块被代码块引用的次数，如果大于等于2，就分离到commons内（ { module: 模块实例, count: 2 } ）
    this.asyncChunkCounter = 0; // 异步模块计数器
    this.hooks = {
      succeedModule: new SyncHook(['module']),
      seal: new SyncHook(),
      beforeChunks: new SyncHook(),
      afterChunks: new SyncHook(),
    };
  }

  /**
   * 开始编译一个新的入口
   * @param context 根目录（绝对路径）（/Users/cuimm/Documents/cuimm/webpack/webpack-summarize/8.mypack）
   * @param entry 入口模块相对路径（./src/index.js）
   * @param name 入口的名字（main）
   * @param finalCallback 编译完成的回调函数
   */
  addEntry(context, entry, name, finalCallback) {
    console.log('【addEntry】', 'context：', context, ' entry：', entry, ' name：', name);
    this._addModuleChain(context, entry, name, false, (error, module) => {
      finalCallback(error, module);
    });
  }

  /**
   * 从 entry入口 出发进入正式编译阶段
   * @param context 当前工作目录绝对路径（/Users/cuimm/Documents/cuimm/webpack/webpack-summarize/8.mypack）
   * @param rawRequest 当前模块路径（./src/index.js）
   * @param name 模块名（main）
   * @param async 当前模块是否为异步模块
   * @param callback 回调
   * @private
   */
  _addModuleChain(context, rawRequest, name, async, callback) {
    this.createModule(
      {
        name,
        context,
        rawRequest,
        parser,
        resource: path.posix.join(context, rawRequest),
        moduleId: './' + path.posix.relative(context, path.posix.join(context, rawRequest)),
        async,
      },
      entryModule => this.entries.push(entryModule),
      callback
    );
  }

  /**
   * 创建并编译一个模块
   * @param data 要编译的模块信息
   * @param addEntry 增加入口的方法，如果这个模块是入口模块执行该方法，如果不是就什么都不做
   * @param callback 编译完成后的回调
   */
  createModule(data, addEntry, callback) {
    // 通过模块工厂创建一个模块
    const module = normalModuleFactory.create(data);

    // 如果是入口模块，则添加到入口数组内
    addEntry && addEntry(module);

    // 给普通模块数组添加一个新的模块
    this.modules.push(module);

    // 添加新的普通模块对象
    this._modules[module.moduleId] = module;

    // 编译完成后的回调
    const afterBuild = (error, module) => {
      if (module.dependencies.length > 0) { // 当前模块有依赖
        this.processModuleDependencies(module, error => {
          callback(error, module);
        });
      } else {
        callback(error, module);
      }
    };

    // 编译模块
    this.buildModule(module, afterBuild);
  }

  /**
   * 编译模块
   * 模块的真正编译逻辑是放在module内部完成的
   * @param module 要编译的模块
   * @param afterBuild 编译完成后的回调
   */
  buildModule(module, afterBuild) {
    module.build(this, error => {
      this.hooks.succeedModule.call(module); // 触发当前模块编译完成钩子
      afterBuild(error, module);
    });
  }

  /**
   * 处理当前模块的依赖模块
   * 递归处理当前模块的依赖模块
   * @param module 当前编译的模块
   * @param callback 回调
   */
  processModuleDependencies(module, callback) {
    // 获取当前模块依赖的模块
    const dependencies = module.dependencies;

    // 遍历当前模块的依赖模块，当所有模块全部编译完毕后调用callback
    async.forEach(
      dependencies,
      (dependency, done) => {
        const {name, context, rawRequest, resource, moduleId} = dependency || {};
        this.createModule(
          {
            name,
            context,
            rawRequest,
            resource,
            moduleId,
            parser,
          },
          null,
          done
        );
      },
      callback);
  }

  /**
   * 把模块封装成代码块
   * @param callback
   */
  seal(callback) {
    this.hooks.seal.call();
    this.hooks.beforeChunks.call();

    // 遍历所有的modules数组
    for (const module of this.modules) {
      if (/node_modules/.test(module.moduleId)) { // 第三方模块
        module.name = 'vendors';
        if (this.vendors.find(item => item.moduleId === module.moduleId)) {
          this.vendors.push(module);
        }
      } else {
        const count = this.moduleCount[module.moduleId]; // 记录模块引用次数
        if (count) {
          this.moduleCount[module.moduleId].count++;
        } else {
          this.moduleCount[module.moduleId] = { module, count: 1 };
        }
      }
    }

    // 将同时被多个代码块依赖的模块加入commons数组
    for (let moduleId in this.moduleCount) {
      const { module, count } = this.moduleCount[moduleId];
      if (count > 2) {
        module.name = 'commons';
        this.commons.push(module);
      }
    }

    const deferredModuleIds = [...this.vendors, ...this.commons].map(module => module.moduleId); // 分割到vendors和commons中的模块Ids
    this.modules = this.modules.filter(module => !deferredModuleIds.includes(module.moduleId)); // 没有分割到vendors和commons中的模块

    // 遍历入口。默认情况下，每一个入口会生成一个代码块
    for (const entryModule of this.entries) {
      const chunk = new Chunk(entryModule); // 根据入口模块得到一个代码块
      this.chunks.push(chunk);
      chunk.modules = this.modules.filter(module => module.name === chunk.name); // 对所有模块进行过滤，找出模块名称跟这个chunk一样的模块
    }

    // 处理第三方模块
    if (this.vendors.length > 0) {
      const chunk = new Chunk(this.vendors[0]);
      chunk.async = true;
      this.chunks.push(chunk);
      chunk.modules = this.vendors;
    }

    // 处理被多次依赖的模块
    if (this.commons.length > 0) {
      const chunk = new Chunk(this.commons[0]);
      chunk.async = true;
      this.chunks.push(chunk);
      chunk.modules = this.commons;
    }

    // 触发 afterChunks 钩子
    this.hooks.afterChunks.call(this.chunks);

    // 生成代码块对应的资源
    this.createChunkAssets();

    callback();
  }

  /**
   * 生成代码块对应资源
   */
  createChunkAssets() {
    for (let index = 0; index < this.chunks.length; index++) {
      const chunk = this.chunks[index];
      const file = chunk.name + '.js'; // main.js
      chunk.files.push(file);

      let source;
      if (chunk.async) {
        source = chunkRender({
          chunkName: chunk.name, // 代码块名字（main）
          modules: chunk.modules, // 此代码块包含的模块数组（[module实例1, module实例2]）
        });
      } else {
        const deferredChunks = [];
        if (this.vendors.length > 0) {
          deferredChunks.push('vendors');
        }
        if (this.commons.length > 0) {
          deferredChunks.push('commons');
        }
        source = deferMainRender({
          deferredChunks,
          entryModuleId: chunk.entryModule.moduleId,  // ./src/index.js
          modules: chunk.modules, // 此代码块包含的模块数组（[module实例1, module实例2]）
        });
      }

      this.emitAssets(file, source);
    }
  }

  emitAssets(file, source) {
    this.assets[file] = source;
    this.files.push(file);
  }
}

module.exports = Compilation;
