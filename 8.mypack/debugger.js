const webpack = require('webpack');
const webpackOptions = require('./webpack.config');

const compiler = webpack(webpackOptions);

compiler.run((error, stats) => {
  console.log(error);
  console.log(stats.toJson());
});
