const stats = {
  "errors": [], // 打包产生的错误
  "warnings": [], // 打包产生的警告
  "version": "4.46.0", // webpack版本号
  "hash": "ba748324f8bdec9b2719", // 本次打包hash
  "time": 92, // 本次打包所用时间
  "builtAt": 1630242506224, // 本次打包开始时间
  "publicPath": "", // 打包文件的访问路径
  "outputPath": "/Users/mengmeng19/Documents/cuimm/webpack/webpack-summarize/2.flow/dist", // 打包资源输出目录
  "assetsByChunkName": { // 对象key(main)：代码块的名字 对象值(cuimm.js)：产出资源（文件）的名字
    "main": "cuimm.js" // chunkName=main, 该代码块内包含一个assets资源cuimm.js
  },
  "assets": [ // 打包输出的资源/文件
    {
      "name": "cuimm.js", // 输出的文件名称
      "size": 4430, // 输出的文件大小
      "chunks": [ // 该文件所属chunk
        "main"
      ],
      "chunkNames": [ // 该文件所属chunk名字
        "main"
      ],
      "info": {},
      "emitted": true
    },
    {
      "name": "index.html",
      "size": 322,
      "chunks": [],
      "chunkNames": [],
      "info": {},
      "emitted": true
    }
  ],
  "filteredAssets": 0,
  "entrypoints": { // 入口点。入口点名字是main（默认），产出的一个代码块：main，产出一个资源：cuimm.js
    "main": {
      "chunks": [
        "main"
      ],
      "assets": [
        "cuimm.js"
      ],
      "children": {},
      "childAssets": {}
    }
  },
  "namedChunkGroups": { // 用来代码块分组，代码分割相关
    "main": {
      "chunks": [
        "main"
      ],
      "assets": [
        "cuimm.js"
      ],
      "children": {},
      "childAssets": {}
    }
  },
  "chunks": [ // 产出的代码块
    {
      "id": "main",
      "rendered": true,
      "initial": true,
      "entry": true,
      "size": 76,
      "names": [
        "main"
      ],
      "files": [
        "cuimm.js"
      ],
      "hash": "02fc1ed87d537e8fcd43", // 代码块hash
      "siblings": [],
      "parents": [],
      "children": [],
      "childrenByOrder": {},
      "modules": [ // 代码块内部包含的模块module
        {
          "id": "./src/index.js",
          "identifier": "/Users/mengmeng19/Documents/cuimm/webpack/webpack-summarize/2.flow/src/index.js",
          "name": "./src/index.js",
          "index": 0,
          "index2": 1,
          "size": 50,
          "cacheable": true,
          "built": true,
          "optional": false,
          "prefetched": false,
          "chunks": [
            "main"
          ],
          "issuer": null,
          "issuerId": null,
          "issuerName": null,
          "issuerPath": null,
          "failed": false,
          "errors": 0,
          "warnings": 0,
          "assets": [],
          "reasons": [
            {
              "moduleId": null,
              "moduleIdentifier": null,
              "module": null,
              "moduleName": null,
              "type": "single entry",
              "userRequest": "./src/index.js",
              "loc": "main"
            }
          ],
          "providedExports": [],
          "optimizationBailout": [],
          "depth": 0,
          "source": "import title from './title';\n\nconsole.log(title);\n"
        },
        {
          "id": "./src/title.js",
          "identifier": "/Users/mengmeng19/Documents/cuimm/webpack/webpack-summarize/2.flow/src/title.js",
          "name": "./src/title.js",
          "index": 1,
          "index2": 0,
          "size": 26,
          "cacheable": true,
          "built": true,
          "optional": false,
          "prefetched": false,
          "chunks": [
            "main"
          ],
          "issuer": "/Users/mengmeng19/Documents/cuimm/webpack/webpack-summarize/2.flow/src/index.js",
          "issuerId": "./src/index.js",
          "issuerName": "./src/index.js",
          "issuerPath": [
            {
              "id": "./src/index.js",
              "identifier": "/Users/mengmeng19/Documents/cuimm/webpack/webpack-summarize/2.flow/src/index.js",
              "name": "./src/index.js"
            }
          ],
          "failed": false,
          "errors": 0,
          "warnings": 0,
          "assets": [],
          "reasons": [
            {
              "moduleId": "./src/index.js",
              "moduleIdentifier": "/Users/mengmeng19/Documents/cuimm/webpack/webpack-summarize/2.flow/src/index.js",
              "module": "./src/index.js",
              "moduleName": "./src/index.js",
              "type": "harmony side effect evaluation",
              "userRequest": "./title",
              "loc": "1:0-28"
            },
            {
              "moduleId": "./src/index.js",
              "moduleIdentifier": "/Users/mengmeng19/Documents/cuimm/webpack/webpack-summarize/2.flow/src/index.js",
              "module": "./src/index.js",
              "moduleName": "./src/index.js",
              "type": "harmony import specifier",
              "userRequest": "./title",
              "loc": "3:12-17"
            }
          ],
          "providedExports": null,
          "optimizationBailout": [],
          "depth": 1,
          "source": "module.exports = 'title';\n"
        }
      ],
      "filteredModules": 0,
      "origins": [
        {
          "module": "",
          "moduleIdentifier": "",
          "moduleName": "",
          "loc": "main",
          "request": "./src/index.js",
          "reasons": []
        }
      ]
    }
  ],
  "modules": [
    {
      "id": "./src/index.js",
      "identifier": "/Users/mengmeng19/Documents/cuimm/webpack/webpack-summarize/2.flow/src/index.js",
      "name": "./src/index.js",
      "index": 0,
      "index2": 1,
      "size": 50,
      "cacheable": true,
      "built": true,
      "optional": false,
      "prefetched": false,
      "chunks": [
        "main"
      ],
      "issuer": null,
      "issuerId": null,
      "issuerName": null,
      "issuerPath": null,
      "failed": false,
      "errors": 0,
      "warnings": 0,
      "assets": [],
      "reasons": [
        {
          "moduleId": null,
          "moduleIdentifier": null,
          "module": null,
          "moduleName": null,
          "type": "single entry",
          "userRequest": "./src/index.js",
          "loc": "main"
        }
      ],
      "providedExports": [],
      "optimizationBailout": [],
      "depth": 0,
      "source": "import title from './title';\n\nconsole.log(title);\n"
    },
    {
      "id": "./src/title.js",
      "identifier": "/Users/mengmeng19/Documents/cuimm/webpack/webpack-summarize/2.flow/src/title.js",
      "name": "./src/title.js",
      "index": 1,
      "index2": 0,
      "size": 26,
      "cacheable": true,
      "built": true,
      "optional": false,
      "prefetched": false,
      "chunks": [
        "main"
      ],
      "issuer": "/Users/mengmeng19/Documents/cuimm/webpack/webpack-summarize/2.flow/src/index.js",
      "issuerId": "./src/index.js",
      "issuerName": "./src/index.js",
      "issuerPath": [
        {
          "id": "./src/index.js",
          "identifier": "/Users/mengmeng19/Documents/cuimm/webpack/webpack-summarize/2.flow/src/index.js",
          "name": "./src/index.js"
        }
      ],
      "failed": false,
      "errors": 0,
      "warnings": 0,
      "assets": [],
      "reasons": [
        {
          "moduleId": "./src/index.js",
          "moduleIdentifier": "/Users/mengmeng19/Documents/cuimm/webpack/webpack-summarize/2.flow/src/index.js",
          "module": "./src/index.js",
          "moduleName": "./src/index.js",
          "type": "harmony side effect evaluation",
          "userRequest": "./title",
          "loc": "1:0-28"
        },
        {
          "moduleId": "./src/index.js",
          "moduleIdentifier": "/Users/mengmeng19/Documents/cuimm/webpack/webpack-summarize/2.flow/src/index.js",
          "module": "./src/index.js",
          "moduleName": "./src/index.js",
          "type": "harmony import specifier",
          "userRequest": "./title",
          "loc": "3:12-17"
        }
      ],
      "providedExports": null,
      "optimizationBailout": [],
      "depth": 1,
      "source": "module.exports = 'title';\n"
    }
  ],
  "filteredModules": 0,
  "logging": {
    "webpack.buildChunkGraph.visitModules": {
      "entries": [],
      "filteredEntries": 2,
      "debug": false
    }
  },
  "children": [
    {
      "errors": [],
      "warnings": [],
      "publicPath": "",
      "outputPath": "/Users/mengmeng19/Documents/cuimm/webpack/webpack-summarize/2.flow/dist",
      "assetsByChunkName": {
        "HtmlWebpackPlugin_0": "__child-HtmlWebpackPlugin_0"
      },
      "assets": [
        {
          "name": "__child-HtmlWebpackPlugin_0",
          "size": 4653,
          "chunks": [
            "HtmlWebpackPlugin_0"
          ],
          "chunkNames": [
            "HtmlWebpackPlugin_0"
          ],
          "info": {},
          "emitted": false
        }
      ],
      "filteredAssets": 0,
      "entrypoints": {
        "HtmlWebpackPlugin_0": {
          "chunks": [
            "HtmlWebpackPlugin_0"
          ],
          "assets": [
            "__child-HtmlWebpackPlugin_0"
          ],
          "children": {},
          "childAssets": {}
        }
      },
      "namedChunkGroups": {
        "HtmlWebpackPlugin_0": {
          "chunks": [
            "HtmlWebpackPlugin_0"
          ],
          "assets": [
            "__child-HtmlWebpackPlugin_0"
          ],
          "children": {},
          "childAssets": {}
        }
      },
      "chunks": [
        {
          "id": "HtmlWebpackPlugin_0",
          "rendered": true,
          "initial": true,
          "entry": true,
          "size": 574,
          "names": [
            "HtmlWebpackPlugin_0"
          ],
          "files": [
            "__child-HtmlWebpackPlugin_0"
          ],
          "hash": "d1ecc8be2c0dde066928",
          "siblings": [],
          "parents": [],
          "children": [],
          "childrenByOrder": {},
          "modules": [
            {
              "id": "./node_modules/html-webpack-plugin/lib/loader.js!./src/index.html",
              "identifier": "/Users/mengmeng19/Documents/cuimm/webpack/webpack-summarize/2.flow/node_modules/html-webpack-plugin/lib/loader.js!/Users/mengmeng19/Documents/cuimm/webpack/webpack-summarize/2.flow/src/index.html",
              "name": "./node_modules/html-webpack-plugin/lib/loader.js!./src/index.html",
              "index": 0,
              "index2": 0,
              "size": 574,
              "cacheable": true,
              "built": true,
              "optional": false,
              "prefetched": false,
              "chunks": [
                "HtmlWebpackPlugin_0"
              ],
              "issuer": null,
              "issuerId": null,
              "issuerName": null,
              "issuerPath": null,
              "failed": false,
              "errors": 0,
              "warnings": 0,
              "assets": [],
              "reasons": [
                {
                  "moduleId": null,
                  "moduleIdentifier": null,
                  "module": null,
                  "moduleName": null,
                  "type": "single entry",
                  "userRequest": "/Users/mengmeng19/Documents/cuimm/webpack/webpack-summarize/2.flow/node_modules/html-webpack-plugin/lib/loader.js!/Users/mengmeng19/Documents/cuimm/webpack/webpack-summarize/2.flow/src/index.html",
                  "loc": "HtmlWebpackPlugin_0"
                }
              ],
              "providedExports": null,
              "optimizationBailout": [],
              "depth": 0,
              "source": "var _ = __non_webpack_require__(\"/Users/mengmeng19/Documents/cuimm/webpack/webpack-summarize/2.flow/node_modules/lodash/lodash.js\");module.exports = function (templateParams) { with(templateParams) {return (function(data) {\nvar __t, __p = '';\n__p += '<html>\\n<head>\\n  <meta charset=\"UTF-8\">\\n  <meta name=\"viewport\"\\n        content=\"width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0\">\\n  <meta http-equiv=\"X-UA-Compatible\" content=\"ie=edge\">\\n  <title>Document</title>\\n</head>\\n<body>\\n\\n</body>\\n</html>\\n';\nreturn __p\n})();}}"
            }
          ],
          "filteredModules": 0,
          "origins": [
            {
              "module": "",
              "moduleIdentifier": "",
              "moduleName": "",
              "loc": "HtmlWebpackPlugin_0",
              "request": "/Users/mengmeng19/Documents/cuimm/webpack/webpack-summarize/2.flow/node_modules/html-webpack-plugin/lib/loader.js!/Users/mengmeng19/Documents/cuimm/webpack/webpack-summarize/2.flow/src/index.html",
              "reasons": []
            }
          ]
        }
      ],
      "modules": [
        {
          "id": "./node_modules/html-webpack-plugin/lib/loader.js!./src/index.html",
          "identifier": "/Users/mengmeng19/Documents/cuimm/webpack/webpack-summarize/2.flow/node_modules/html-webpack-plugin/lib/loader.js!/Users/mengmeng19/Documents/cuimm/webpack/webpack-summarize/2.flow/src/index.html",
          "name": "./node_modules/html-webpack-plugin/lib/loader.js!./src/index.html",
          "index": 0,
          "index2": 0,
          "size": 574,
          "cacheable": true,
          "built": true,
          "optional": false,
          "prefetched": false,
          "chunks": [
            "HtmlWebpackPlugin_0"
          ],
          "issuer": null,
          "issuerId": null,
          "issuerName": null,
          "issuerPath": null,
          "failed": false,
          "errors": 0,
          "warnings": 0,
          "assets": [],
          "reasons": [
            {
              "moduleId": null,
              "moduleIdentifier": null,
              "module": null,
              "moduleName": null,
              "type": "single entry",
              "userRequest": "/Users/mengmeng19/Documents/cuimm/webpack/webpack-summarize/2.flow/node_modules/html-webpack-plugin/lib/loader.js!/Users/mengmeng19/Documents/cuimm/webpack/webpack-summarize/2.flow/src/index.html",
              "loc": "HtmlWebpackPlugin_0"
            }
          ],
          "providedExports": null,
          "optimizationBailout": [],
          "depth": 0,
          "source": "var _ = __non_webpack_require__(\"/Users/mengmeng19/Documents/cuimm/webpack/webpack-summarize/2.flow/node_modules/lodash/lodash.js\");module.exports = function (templateParams) { with(templateParams) {return (function(data) {\nvar __t, __p = '';\n__p += '<html>\\n<head>\\n  <meta charset=\"UTF-8\">\\n  <meta name=\"viewport\"\\n        content=\"width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0\">\\n  <meta http-equiv=\"X-UA-Compatible\" content=\"ie=edge\">\\n  <title>Document</title>\\n</head>\\n<body>\\n\\n</body>\\n</html>\\n';\nreturn __p\n})();}}"
        }
      ],
      "filteredModules": 0,
      "logging": {
        "webpack.buildChunkGraph.visitModules": {
          "entries": [],
          "filteredEntries": 2,
          "debug": false
        }
      },
      "children": [],
      "name": "HtmlWebpackCompiler"
    }
  ]
};
