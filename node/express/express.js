// 用于继承其它对象的属性和属性描述符。
const mixin = require('merge-descriptors');
const application = require('./application.js');

function createApplication() {
  // 该方法其实就是createServer的回调，服务器的入口
  const app = (req, res) => {
    // handle方法来自proto
    app.handle(req, res);
  }

  // 将proto上的方法赋值给app，成为app的静态方法
  mixin(app, application, false);

  return app;
}

exports = module.exports = createApplication;