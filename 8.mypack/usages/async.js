const async = require('neo-async');

var order = [];
var array = [1, 3, 2];
var iterator = function (num, done) {
  setTimeout(function () {
    order.push(num);
    done();
  }, num * 10);
};
async.each(array, iterator, function (err, res) {
  console.log(res); // undefined
  console.log(order); // [1, 2, 3]
});
