
const toString = Object.prototype.toString;

console.log(toString.call('cuimm')); // [object String]
console.log(toString.call(100)); // [object Number]
console.log(toString.call(true)); // [object Boolean]
console.log(toString.call(undefined)); // [object Undefined]
console.log(toString.call(Symbol('Symbol'))); // [object Symbol]
console.log(toString.call(null)); // [object Null]
console.log(toString.call([1, 2, 3])); // [object Array]
console.log(toString.call({})); // [object Object]

/*
  基本数据类型为什么可以调用toString方法？
  => 在基本数据类型内部有类型转换，可以将基本数据类型隐式的转化为对应的对象数据类型，如：会将字符串'cuimm'转为new String('cuimm')。
* */


/*
* Symbol.toStringTag 是一个内置 symbol，它通常作为对象的属性键使用，对应的属性值应该为字符串类型，
* 这个字符串用来表示该对象的自定义类型标签。
* */
const myExports = {};
Object.defineProperty(myExports, Symbol.toStringTag, {
  value: 'myModule'
});

console.log(Object.prototype.toString.call(myExports)); // [object myModule]
