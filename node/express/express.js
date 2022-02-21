// 用于继承其它对象的属性和属性描述符。
const mixin = require('merge-descriptors');
const proto = require('./application.js');

function createApplication() {
  // 该方法其实就是createServer的回调，服务器的入口
  const app = (req, res) => {
    // handle方法来自proto
    app.handle(req, res);
  }

  // 将proto上的属性赋值给app
  mixin(app, proto, false);

  return app;
}

exports = module.exports = createApplication;