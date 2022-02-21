const http = require('http');
const finalhandler = require('finalhandler');
const Router = require('./router');

// 此处代码相当于以下代码：
// const app = {};
// exports = {};
// module.exports = {};
// 连续赋值的顺序是从左往右依次进行赋值；
const app = exports = module.exports = {};

app.handle = function handle(req, res) {
  var router = this._router;

  // 作为响应http请求的最后一步调用的Node.js函数，err的处理
  var done = finalhandler(req, res);

  // 如果没有路由，直接返回404
  if (!router) {
    done();
    return;
  }

  // 有路由，就由router处理
  router.handle(req, res, done);
}

// 用来判断路由是否实例化
app.lazyrouter = function lazyrouter() {
  if (!this._router) {
    // 此处的new已经失去作用
    this._router = new Router();
  }
}

const methods = ['get', 'post'];
methods.forEach(method => {
  app[method] = function (path) {
    this.lazyrouter();

    const route = this._router.route(path);
    route[method].apply(route, Array.prototype.slice.call(arguments, 1));
    return this;
  }
})

// app.use就是调用router.use
app.use = function use(fn) {
  var path = "/";

  this.lazyrouter();
  var router = this._router;
  router.use(path, fn);
};

app.listen = function listen() {
  // listen作为app上的静态方法，所以被调用时，此处的this就是app本身
  // 即：this === (req, res) => app.handle(req, res);
  const server = http.createServer(this);
  server.listen(...arguments);
}