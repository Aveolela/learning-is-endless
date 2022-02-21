const http = require('http');
const finalhandler = require('finalhandler');
const Router = require('./router');

const app = exports = module.exports = {};

app.handle = function handle(req, res) {
  var router = this._router;

  // 最终的处理方法
  var done = finalhandler(req, res);

  // 如果没有路由，直接返回
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
  const server = http.createServer(this);
  server.listen(...arguments);
}