const NormalModule = require('./NormalModule');

/**
 * 标准模块工厂
 */
class NormalModuleFactory {
  /**
   * 创建标准模块（在webpack中一切皆模块）
   * @param data
   * @returns {NormalModule}
   */
  create(data) {
    return new NormalModule(data);
  }
}

module.exports = NormalModuleFactory;
