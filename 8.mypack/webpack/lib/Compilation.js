const path = require('path');
const {Tapable, SyncHook} = require('tapable');
const async = require('neo-async');
const Parser = require('./Parser');
const NormalModuleFactory = require('./NormalModuleFactory');

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
    this.modules = []; // 模块数组：存放所有的模块
    this._modules = {}; // 模块对象：key：模块Id，value：模块对象
    this.chunks = []; // 代码块数组：存放所有的代码块
    this.files = []; // 本次编译产出的所有文件名
    this.assets = {}; // 资源：key是文件名，值是文件的内容
    this.vendors = []; // 第三方模块
    this.commons = []; // 同时被多个代码块依赖的模块
    this.moduleCount = {}; // 每个模块被代码块引用的次数，如果大于等于2，就分离到commons内
    this.asyncChunkCounter = 0;
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
}

module.exports = Compilation;
