const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',  // 打包模式
  devtool: false,   // 不生成source-map文件
  entry: './src/index.js',    // 入口文件路径
  output: {
    path: path.resolve(__dirname, 'dist'),  // 输出文件目录（只能是绝对路径）
    filename: '[name].js',    // 打包后的文件名
  },
  plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html',
      }),
  ],
};
