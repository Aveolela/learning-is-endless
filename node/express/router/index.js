// 一个简单的跨平台实现，用于设置实例化对象的原型
const setprototypeof = require('setprototypeof');
const parseUrl = require('parseurl');
const Route = require('./router');
const Layer = require('./layer');

const proto = module.exports = function () {
  function router(req, res, next) {
    // app.handle()最终调用的是router.handle()
    // 可以理解为express的核心逻辑都是从router.handle()开始
    router.handle(req, res, next);
  }

  // 将proto设置为router的原型
  setprototypeof(router, proto);

  // stack是用来存储layer的
  router.stack = [];

  // 此处 return router 代替了 new 时的 return {...}
  // 构造函数return的值非基本类型时，会时new操作符无效
  return router;
};

// router的数据结构如下：
// const router = {
//   stack: [
//     // 里面很多layer
//     {
//       path: '/api/users',
//       route: {
//         stack: [
//           // 里面存了多个method和回调函数
//           {
//             method: 'get',
//             handle: function1
//           },
//           {
//             method: 'post',
//             handle: function2
//           }
//         ]
//       }
//     }
//   ]
// }

proto.route = function route(path) {
  const route = new Route();
  const layer = new Layer(path, route.dispatch.bind(route));

  layer.route = route;

  this.stack.push(layer);

  return route;
}


// 真正处理路由的函数
proto.handle = function handle(req, res, done) {
  var self = this;
  var idx = 0;
  var stack = self.stack;

  // next方法来查找对应的layer和回调函数
  next();
  function next() {
    // 使用第三方库parseUrl获取path，如果没有path，直接返回
    var path = parseUrl(req).pathname;
    if (path == null) {
      return done();
    }

    var layer;
    var match;
    var route;

    while (match !== true && idx < stack.length) {
      layer = stack[idx++];
      match = layer.match(path); // 调用layer.match来检测当前路径是否匹配
      route = layer.route;

      // 没匹配上，跳出当次循环
      if (match !== true) {
        continue;
      }

      // layer匹配上了，但是没有route，也跳出当次循环
      if (!route) {
        continue;
      }

      // 匹配上了，看看route上有没有对应的method
      var method = req.method;
      var has_method = route._handles_method(method);
      // 如果没有对应的method，其实也是没匹配上，跳出当次循环
      if (!has_method) {
        match = false;
        continue;
      }
    }

    // 循环完了还没有匹配的，就done了，其实就是404
    if (match !== true) {
      return done();
    }

    // 如果匹配上了，就执行对应的回调函数
    return layer.handle_request(req, res, next);
  }
};

proto.use = function use(path, fn) {
  var layer = new Layer(path, fn);

  this.stack.push(layer);
};