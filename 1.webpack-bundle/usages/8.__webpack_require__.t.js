const modules = {
  moduleA: (module, exports) => {
    exports.value = 'moduleA';
  },
  moduleB: (module, exports) => {
    exports.__esModule = true;
    exports.default = {
      value: 'moduleB'
    };
  },
};

// The require function
function __webpack_require__(moduleId) {
  // Create a new module (and put it into the cache)
  var module = {
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

// Object.prototype.hasOwnProperty.call
__webpack_require__.o = function (object, property) {
  return Object.prototype.hasOwnProperty.call(object, property);
};

__webpack_require__.d = function (exports, name, getter) {
  if (!__webpack_require__.o(exports, name)) {
    Object.defineProperty(exports, name, {enumerable: true, get: getter});
  }
};

// 给导出对象增加__esModule属性
__webpack_require__.r = function (exports) {
  if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
    Object.defineProperty(exports, Symbol.toStringTag, {value: 'Module'});
  }
  Object.defineProperty(exports, '__esModule', {value: true});
};

// 创建一个命名空间对象（create a fake namespace object）不论原模块是ES6还是commonjs，都转成es6模块
// mode是一个二进制数，有4位[bit, bit, bit, bit]，从0000到1111
// mode & 1: value is a module id, require it （value是一个模块，加载它）
// mode & 2: merge all properties of value into the ns（合并所有的属性到ns上）
// mode & 4: return value when already ns object（属性已经合并到ns上，直接返回）
// mode & 8|1: behave like require（行为和require一致）
__webpack_require__.t = function (value, mode) {
  if (mode & 1) value = __webpack_require__(value);

  if (mode & 8) return value;

  if ((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;

  var ns = Object.create(null);

  __webpack_require__.r(ns); // ns.__esModule = true

  Object.defineProperty(ns, 'default', {enumerable: true, value: value}); // ns.default = {enumerable: true, value: value}

  if (mode & 2 && typeof value != 'string') {
    console.log('value', JSON.stringify(value));
    for (var key in value) {
      __webpack_require__.d(ns, key, function (key) {
        return value[key];
      }.bind(null, key))
    }
  }
  return ns;
};


/*************** 二进制 *******************/
// 将指定数字转为二进制，长度为4，长度不够补0
console.log((1).toString(2).padStart(4, '0')); // 0001 -> 0b0001（二进制以0b开头）
console.log((2).toString(2).padStart(4, '0')); // 0010 -> 0b0010
console.log((4).toString(2).padStart(4, '0')); // 0100 -> 0b0100
console.log((8).toString(2).padStart(4, '0')); // 1000 -> 0b1000

const result1 = __webpack_require__.t('moduleA', 0b0001); // mode=1  (mode & 1: value is a module id, require it)
console.log(result1); // [Object: null prototype] [Module] { default: { value: 'moduleA' } }

const result2 = __webpack_require__.t('moduleA', 0b1001); // mode=9  (mode & 8|1: behave like require)
console.log(result2); // { value: 'moduleA' }

const result3 = __webpack_require__.t('moduleB', 0b0101);  // mode=5
console.log('result3', result3); // { __esModule: true, default: { value: 'moduleB' } }

const result4 = __webpack_require__.t('moduleB', 0b0011);  // mode=3
console.log(result4); // {"default":{"__esModule":true,"default":{"value":"moduleB"}}, __esModule: true}

const result5 = __webpack_require__.t('moduleB', 0b0111);  // mode=7
console.log(result5); // { __esModule: true, default: { value: 'moduleB' } }

/*
  0111 = 7
  1=1（最后一个1） 说明value参数是模块ID
  1=2（倒数第二个1）说明要把value上的属性都合并到ns对象上
  1=4（倒数第三个1）说明这个value已经是一个esmodule，可以直接返回
* */
