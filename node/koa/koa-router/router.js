module.exports = Router;

function Router() {
  if (!this instanceof Router) return new Router();

  this.stack = [];
}

const methods = ['get', 'post'];
for (let i = 0; i < methods.length; i++) {
  const method = methods[i];

  Router.prototype[method] = function (path, middleware) {
    middleware = [].slice.call(arguments, 1);
    this.register(path, [method], middleware);
    return this;
  }
}

Router.prototype.register = function (path, methods, middleware) {
  const stack = this.stack;
  const route = new Layer(path, methods, middleware);
  stack.push(route);
  return route;
}

// 对于koa来说，每个请求来了都会依次经过中间件，所以路由匹配也是在中间件里面做的
// 所以routes需要返回一个中间件，供koa调用
// routes的主要作用是遍历router上的layer，找到匹配的路由，并拿出来执行
Router.prototype.routes = function () {
  const router = this;

  let dispatch = function dispatch(ctx, next) {
    const path = ctx.path;
    // 获取匹配的layer
    const matched = path.match(path, ctx.method);

    // 定义一个变量来串联所有匹配的layer
    let layerChain;

    // 把router挂载到ctx上供其他中间件使用
    ctx.router = router;

    if (!matched.route) return next();
    // 获取所有path和method都匹配的layer
    const matchedLayers = matched.pathAndMethod;

    // 下面这段代码的作用是将所有layer上的stack，也就是layer的回调函数都合并到一个数组layerChain里面去
    layerChain = matchedLayers.reduce(function (memo, layer) {
      return memo.concat(layer.stack);
    }, []);

    // 这里的compose也是koa-compose这个库，源码在讲Koa源码的时候讲过
    // 使用compose将layerChain数组合并成一个可执行的方法，并拿来执行，传入参数是Koa中间件参数ctx, next
    return compose(layerChain)(ctx, next);
  }

  return dispatch;
}

Router.prototype.match = function (path, method) {
  const layers = this.stack; // 取出所有layer

  let layer;
  // 构建一个结构来保存匹配结果，最后返回的也是这个matched
  const matched = {
    path: [], // path保存仅仅path匹配的layer
    pathAndMethod: [], // pathAndMethod保存path和method都匹配的layer
    route: false, // 只要有一个path和method都匹配的layer，就说明这个路由是匹配上的，这个变量置为true
  };

  // 循环layers来进行匹配
  for (let i = 0; i < layers.length; i++) {
    layer = layers[i];
    // 匹配的时候调用的是layer的实例方法match
    if (layer.match(path)) {
      matched.path.push(layer); // 只要path匹配就先放到matched.path上去

      // 如果method也有匹配的，将layer放到pathAndMethod里面去
      // layer.methods.indexOf(method) > -1
      // ~表示按位取反
      // ~ -1;      // 返回0，也就是false
      // ~ 0;       // 返回-1, 注意-1转换为bool是true
      // ~ 1;       // 返回-2，转换为bool也是true
      if (~layer.methods.indexOf(method)) {
        matched.pathAndMethod.push(layer);
        if (layer.methods.length) matched.route = true;
      }
    }
  }

  return matched;
};