// const Koa = require('koa');
const Koa = require('./lib/application');
const app = new Koa();
const port = 3000;

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

app.use((ctx) => {
  ctx.body = "Hello World";
});

app.listen(port, function () {
  console.log('listening on port ' + port);
});

// 1. ctx 代替了 req，res
// 2. 可以使用async await