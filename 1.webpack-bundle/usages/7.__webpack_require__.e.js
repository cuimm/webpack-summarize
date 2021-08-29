(function (modules) {

  /**
   * 在代码块加载后安装一个JSON callback的回调（install a JSONP callback for chunk loading）
   * @param data
   *  data = [
   ["title"],
   {
            "./src/title.js": (function (module, exports) {
              module.exports = 'title';
            })
          }
   *    ]
   */
  function webpackJsonpCallback(data) {
    var chunkIds = data[0]; // chunkIds = ["title"]
    var moreModules = data[1]; // more Modules = { "./src/title.js": (function (module, exports) { module.exports = 'title';}) }

    // 将moreModules加入modules对象内（add "moreModules" to the modules object,）
    // 然后标记所有的chunkIds为已加载（then flag all "chunkIds" as loaded and fire callback）
    var moduleId, chunkId, i = 0, resolves = [];
    for (; i < chunkIds.length; i++) {
      chunkId = chunkIds[i];
      if (Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) { // installedChunks[chunkId] = [resolve, reject, promise]
        resolves.push(installedChunks[chunkId][0]);
      }
      installedChunks[chunkId] = 0; // 改变title代码块的加载状态：0 表示已经加载成功
    }
    for (moduleId in moreModules) {
      if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
        modules[moduleId] = moreModules[moduleId]; // 将title代码块加入到modules代码块集合内
      }
    }
    if (parentJsonpFunction) parentJsonpFunction(data);

    while (resolves.length) {
      resolves.shift()(); // 执行所有的resolve方法，意味着对应的promise都完成了
    }
  };

  // The module cache
  var installedModules = {};

  // 用来存放加载过的和加载中的代码块的对象（=> object to store loaded and loading chunks）
  // undefined = chunk not loaded, 【undefined：表示未加载】
  // null = chunk preloaded/prefetched【null：表示预加载或预获取】
  // Promise = chunk loading, 【Promise：此代码块正在加载中】
  // 0 = chunk loaded【0：已经加载成功】
  var installedChunks = {
    "main": 0
  };


  // script path function
  function jsonpScriptSrc(chunkId) {
    return __webpack_require__.p + "" + ({"title": "title"}[chunkId] || chunkId) + ".js"
  }

  // The require function
  function __webpack_require__(moduleId) {

    // Check if module is in cache
    if (installedModules[moduleId]) {
      return installedModules[moduleId].exports;
    }
    // Create a new module (and put it into the cache)
    var module = installedModules[moduleId] = {
      i: moduleId,
      l: false,
      exports: {}
    };

    // Execute the module function
    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

    // Flag the module as loaded
    module.l = true;

    // Return the exports of the module
    return module.exports;
  }

  // main.js只包含入口代码块 （This file contains only the entry chunk.）
  // 这个 __webpack_require__.e 方法是用来加载额外的代码块的，比如：title.js（=> The chunk loading function for additional chunks）
  __webpack_require__.e = function requireEnsure(chunkId) {

    // 因为加载代码块是异步的，所以声明promises空数组进行异步加载
    var promises = [];

    // 使用JSONP进行异步加载（=> JSONP chunk loading for javascript）

    var installedChunkData = installedChunks[chunkId]; // 从installedChunks内检查代码块加载状态（该示例中title代码块的状态返回undefined，表示未加载）

    if (installedChunkData !== 0) { // 0 means "already installed".
      // a Promise means "currently loading".
      if (installedChunkData) {
        promises.push(installedChunkData[2]);
      } else {
        // setup Promise in chunk cache 在代码块缓存中设置Promise
        var promise = new Promise(function (resolve, reject) {
          installedChunkData = installedChunks[chunkId] = [resolve, reject]; // installedChunks['./src/title.js'] = [resolve, reject]
        });
        promises.push(installedChunkData[2] = promise); // installedChunks['./src/title.js'] = [resolve, reject, promise]

        // start chunk loading
        var script = document.createElement('script');
        var onScriptComplete;

        script.charset = 'utf-8';
        script.timeout = 120;
        if (__webpack_require__.nc) {
          script.setAttribute("nonce", __webpack_require__.nc); // 设置随机数，防止重复攻击
        }
        script.src = jsonpScriptSrc(chunkId); //=> script.src = title.js

        // create error before stack unwound to get useful stacktrace later
        var error = new Error();

        onScriptComplete = function (event) {
          // avoid mem leaks in IE.
          script.onerror = script.onload = null;
          clearTimeout(timeout);
          var chunk = installedChunks[chunkId];
          if (chunk !== 0) {
            if (chunk) {
              var errorType = event && (event.type === 'load' ? 'missing' : event.type);
              var realSrc = event && event.target && event.target.src;
              error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
              error.name = 'ChunkLoadError';
              error.type = errorType;
              error.request = realSrc;
              chunk[1](error);
            }
            installedChunks[chunkId] = undefined;
          }
        };
        var timeout = setTimeout(function () {
          onScriptComplete({type: 'timeout', target: script});
        }, 120000);
        script.onerror = script.onload = onScriptComplete;

        document.head.appendChild(script); // 将script脚本添加到document上，发送请求获取 /title.js 代码块
      }
    }
    return Promise.all(promises);
  };

  // define getter function for harmony exports
  __webpack_require__.d = function (exports, name, getter) {
    if (!__webpack_require__.o(exports, name)) {
      Object.defineProperty(exports, name, {enumerable: true, get: getter});
    }
  };

  // define __esModule on exports
  __webpack_require__.r = function (exports) {
    if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
      Object.defineProperty(exports, Symbol.toStringTag, {value: 'Module'});
    }
    Object.defineProperty(exports, '__esModule', {value: true});
  };

  // 创建一个命名空间对象（create a fake namespace object）
  // mode是一个二进制数，有4位[bit, bit, bit, bit]，从0000到1111
  // mode & 1: value is a module id, require it
  // mode & 2: merge all properties of value into the ns
  // mode & 4: return value when already ns object
  // mode & 8|1: behave like require
  __webpack_require__.t = function (value, mode) {
    if (mode & 1) value = __webpack_require__(value);
    if (mode & 8) return value;
    if ((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
    var ns = Object.create(null);
    __webpack_require__.r(ns);
    Object.defineProperty(ns, 'default', {enumerable: true, value: value});
    if (mode & 2 && typeof value != 'string') for (var key in value) __webpack_require__.d(ns, key, function (key) {
      return value[key];
    }.bind(null, key));
    return ns;
  };

  // Object.prototype.hasOwnProperty.call
  __webpack_require__.o = function (object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  };

  // __webpack_public_path__
  __webpack_require__.p = "";

  var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
  var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
  jsonpArray.push = webpackJsonpCallback; // 重写了window["webpackJsonp"]的push方法
  jsonpArray = jsonpArray.slice();
  for (var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);

  var parentJsonpFunction = oldJsonpFunction;

  // Load entry module and return exports
  return __webpack_require__(__webpack_require__.s = "./src/index.js");
})({

  "./src/index.js":
  /*! no static exports found */
      (function (module, exports, __webpack_require__) {

        btn.addEventListener('click', () => {
          // 异步加载模块
          __webpack_require__.e(/*! import() | title */ "title")
              .then(__webpack_require__.t.bind(null, /*! ./title.js */ "./src/title.js", 7)) // 此处的then：异步加载的模块已经加载完毕，并且合并到modules上去了
              .then(res => {
                console.log(res);
              });
        });

      })
});



/********************************************** title chunk ************************************************v*/
(window["webpackJsonp"] = window["webpackJsonp"] || []).push(
    [
      ["title"],
      {
        "./src/title.js":
        /*! no static exports found */
            (function (module, exports) {
              module.exports = 'title';
            })

      }
    ]
);

/*
  push参数：
    第一个参数：是代码块的ID数组
    第二个参数：是额外的代码块定义
  window["webpackJsonp"].push([chunkIds, moreModules]);
* */
