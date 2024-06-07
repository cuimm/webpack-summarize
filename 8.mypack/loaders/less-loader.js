const less = require('less');

module.exports = function (source) {
  console.log('less-loader');
  less.render(source, (error, output) => {
    this.callback(error, output.css);
  });
};

/*
output.css:
body {
  background-color: red;
}
* */
