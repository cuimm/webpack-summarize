const path = require('path');

const context = '/Users/cuimm/Documents/cuimm/webpack/webpack-summarize/8.mypack';
const resource = '/Users/cuimm/Documents/cuimm/webpack/webpack-summarize/8.mypack/src/index.js';

// 获取相对路径
console.log(path.posix.relative(context, resource)); // src/index.js
