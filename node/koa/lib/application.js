// 该类就是一个发布订阅模式的实现
const Emitter = require('events');
const http = require('http');
const compose = require('koa-compose');

// const context = require('./context');

// 辅助方法
function respond(ctx) {
  const res = ctx.res; // 取出res对象
  const body = ctx.body; // 取出body

  return res.end(body); // 用res返回body
}

module.exports = class Application extends Emitter {
  constructor() {
    super();

    // 用来存放中间件
    this.middleware = [];
    this.context = {};
  }

  use(fn) {
    // 中间件必须是一个函数，不然就报错
    if (typeof fn !== "function") {
      throw new TypeError("middleware must be a function!");
    }
    this.middleware.push(fn);
    // 为了实现链式调用 —— app.use(fn1).use(fn2)
    return this;
  }

  listen(...args) {
    // 从这里可以看出 callback 是入口函数
    const server = http.createServer(this.callback());
    return server.listen(...args);
  }

  callback() {
    const fn = compose(this.middleware);

    return (req, res) => {
      const ctx = this.createContext(req, res);
      return this.handleRequest(ctx, fn);
    }
  }

  createContext(req, res) {
    const context = Object.create(this.context);
    context.app = this;
    context.req = req;
    context.res = res;

    return context;
  }

  handleRequest(ctx, fnMiddleware) {
    const handleResponse = () => respond(ctx);
    // 调用中间件处理
    // 所有处理完后就调用handleResponse返回请求
    return fnMiddleware(ctx)
      .then(handleResponse)
      .catch((err) => {
        console.log("Somethis is wrong: ", err);
      });
  }
}

// 相比于express而言，koa基于class实现面向对象，express还是基于原型实现的面向对象
// express兼容性更强，koa只支持node版本不小于 v7.6.0 的版本
// koa的处理逻辑是以中间件的形式存在的，对于一个请求来说，他必须一个一个的穿过所有的中间件，具体穿过的逻辑

// use注册中间件
// compose处理中间件
// callback调用中间件