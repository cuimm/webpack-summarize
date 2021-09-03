const webpack = require('webpack');
const webpackConfig = require('./webpack.config');

/**
 * compiler就是编译器，是webpack打包的大管家
 */
const compiler = webpack(webpackConfig);

compiler.run((error, stats) => {
  console.log('error', error);

  const result = stats.toJson({
    entries: true, // 打包入口
    chunks: true, // 产生的代码块
    module: true, // 产生的模块
    assets: true, // 产生的资源
    files: true, // 产生的文件
  });

  console.log('stats', JSON.stringify(result, null, 2));
});


