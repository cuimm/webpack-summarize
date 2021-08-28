const obj = Object.create(null);
/* => obj的原型链为null
* 使用Object.create(null)创建的对象，没有任何属性,把它当作一个非常纯净的 map 来使用，我们可以自己定义hasOwnProperty、toString方法,完全不必担心会将原型链上的同名方法覆盖掉。
* 在我们使用for..in循环的时候会遍历对象原型链上的属性，使用create(null)就不必再对属性进行检查了
*/

// 模拟 Object.create 内部实现
if (typeof Object.create !== 'function') {
  Object.create = function (proto) {
    function Fn() {}
    Fn.prototype = proto;
    return new Fn();
  }
}

