const { Tapable, SyncHook, SyncBailHook, AsyncSeriesHook, AsyncParallelHook } = require('tapable');
const NormalModuleFactory = require('./NormalModuleFactory');
const Compilation = require('./Compilation');

class Compiler extends Tapable {
  constructor(context) {
    super();

    // 当前工作目录的绝对路径
    this.context = context;

    // 赋值钩子函数
    this.hooks = {
      // 入口
      entryOption: new SyncBailHook(['context', 'entry']),
      // 打包前
      beforeRun: new AsyncSeriesHook(['compiler']),
      // 运行
      run: new AsyncSeriesHook(['compiler']),
      // 编译前
      beforeCompile: new AsyncSeriesHook(['params']),
      // 编译
      compile: new SyncHook(['params']),
      // 构建
      make: new AsyncParallelHook(['compilation']),
      // 开始一次编译
      thisCompilation: new SyncHook(['compilation', 'params']),
      // 本次编译：创建完成一个新的compilation
      compilation: new SyncHook(['compilation', 'params']),
      // 编译完成
      afterCompiler: new AsyncSeriesHook(['compilation']),
      // 发射
      emit: new AsyncSeriesHook(['compilation']),
      // 所有的编译全部都完成
      done: new AsyncSeriesHook(['stats']),
    };
  }

  /**
   * 创建编译参数
   */
  newCompilationParams() {
    const params = {
      normalModuleFactory: new NormalModuleFactory(), // 创建普通模块工厂
    };
    return params;
  }

  /**
   * 创建单次编译器。
   * 如：配置 watch: true 时，运行过程中仅有一个compiler，但每次文件改变都会创建一个新的compilation
   * @returns {Compilation}
   */
  createCompilation() {
    return new Compilation(this);
  }

  /**
   * 创建单次编译器
   * @param params 编译参数
   * @returns {Compilation} 单次编译器
   */
  newCompilation(params) {
    const compilation = this.createCompilation();
    this.hooks.thisCompilation.call(compilation, params); // 触发 thisCompilation本次编译 钩子
    this.hooks.compilation.call(compilation, params);
    return compilation;
  }

  /**
   * 编译入口
   * @param callback 回调函数
   */
  run(callback) {

    const onCompiled = (error, compilation) => {
      // todo
    };

    this.hooks.beforeRun.callAsync(this, error => { // 触发 beforeRun 钩子
      this.hooks.run.callAsync(this, error => { // 触发 run 钩子
        this.compile(onCompiled);
      });
    });
  }

  /**
   * 编译
   * @param onCompiled 回调函数
   */
  compile(onCompiled) {
    // 编译参数
    const params = this.newCompilationParams();

    // 触发 beforeCompile编译前 钩子
    this.hooks.beforeCompile.callAsync(params, error => {
      // 触发 compile编译 钩子
      this.hooks.compile.call(params);

      // 创建一个compilation对象
      const compilation = this.newCompilation(params);

      // 触发 make构建 钩子执行：开始编译模块
      this.hooks.make.callAsync(compilation, error => {
        // 代码块封装之后编译就完成了
        compilation.seal(error => {
          this.hooks.afterCompile.callAsync(compilation, error => {
            onCompiled(error, compilation);
          });
        });
      });

    });

  }
}

module.exports = Compiler;
