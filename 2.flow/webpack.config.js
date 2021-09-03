const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DonePlugin = require('./plugins/DonePlugin');

module.exports = {
  mode: 'development',
  devtool: false,
  entry: './src/index.js',
  output: {
    // path: path.resolve(__dirname, 'dist'),
    path: path.resolve(__dirname, 'dist2'),
    filename: 'cuimm.js'
  },
  resolveLoader: {
    modules: [
      'node_modules',
    ],
  },
  module: {
    rules: [
      {
        test: /\.css/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          }
        ],
      }
    ],
  },
  plugins: [
    /*
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
    */
    new DonePlugin(),
  ],
};
