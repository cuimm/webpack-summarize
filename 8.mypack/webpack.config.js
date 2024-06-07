const path = require('path');

module.exports = {
  context: process.cwd(), // 当前工作目录
  mode: 'development',
  entry: './src/index.js',
  /*
  entry: {
    page1: './src/page1.js',
    page2: './src/page22.js',
  },
  */
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    chunkFilename: '[name].js',
  },
  resolveLoader: {
    modules: ['loaders', 'node_modules']
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: ['style-loader', 'less-loader'],
      }
    ]
  },
};
