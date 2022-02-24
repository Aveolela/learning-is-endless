const { pathToRegexp } = require("path-to-regexp");

module.exports = Layer;

function Layer(path, methods, middleware) {
  this.methods = [];
  // 注意这里的stack存放的是我们传入的回调函数
  this.stack = Array.isArray(middleware) ? middleware : [middleware];

  for (let i = 0; i < methods.length; i++) {
    this.methods.push(methods[i].toUpperCase());
  }

  this.path = path;
  this.regexp = pathToRegexp(path);
}

Layer.prototype.match = function (path) {
  return this.regexp.test(path);
};