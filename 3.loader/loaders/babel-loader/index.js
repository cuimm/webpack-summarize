const babel = require('@babel/core');

function babelLoader(source) {

  console.log('request=', this.request); // /Users/mengmeng19/Documents/cuimm/webpack/webpack-summarize/3.loader/loaders/babel-loader/index.js!/Users/mengmeng19/Documents/cuimm/webpack/webpack-summarize/3.loader/src/index.js
  console.log('resourcePath=', this.resourcePath); // /Users/mengmeng19/Documents/cuimm/webpack/webpack-summarize/3.loader/src/index.js
  console.log('userRequest=', this.userRequest);
  console.log('rawRequest=', this.rawRequest);

  const opts = {
    presets: ['@babel/preset-env'], // 配置预设，这是一个插件包
    sourceMap: true, // 生成sourceMap文件，才可以调试源码。生成的是经过 babel-loader 转译后的代码的sourceMap文件
    filename: this.resourcePath.split('/').pop(), // filename可生成用于调试的文件名，否则文件名是unknown，无法确认当前文件是哪个（resourcePath 是要转译的文件的绝对路径）
  };

  const { code, map, ast, options, sourceType } = babel.transform(source, opts);

  /*
  const sum = (a, b) => a + b;
  转译结果:
  "use strict";
  var sum = function sum(a, b) {
    return a + b;
  };
  * */
  console.log('babel转译后的代码字符串-code：', code);

  /*
  如果babel转译后提供了ast抽象语法树，那么webpack会直接使用这个loader提供的语法树，而不再需要自己生成ast了。

  map 打印结果：{
 	  version: 3, // sourceMap文件版本
 	  sources: ['index.js'], // 源文件列表，用于mappings
 	  names: ['sum', 'a', 'b'], // 源文件变量名和属性名，用于mappings
 	  mappings: ';;AAAA,IAAMA,GAAG,GAAG,SAANA,GAAM,CAACC,CAAD,EAAIC,CAAJ;AAAA,SAAUD,CAAC,GAAGC,CAAd;AAAA,CAAZ', // 位置信息
 	  sourcesContent: ['const sum = (a, b) => a + b;\n']
  }
  * */
  console.log('babel转译后的sourceMap文件-map：', map);
  console.log('babel转译后的ast语法树-ast：', ast);
  // console.log('babel转译后生成的options-options：', options);

  /*
  如果当前loader返回单一的值，可以直接return返回值。
  如果当前loader要返回多个值，调用this.callback(null, code, map, ast)
  * */
  // return source;
  return this.callback(null, code, map, ast);
}

module.exports = babelLoader;
