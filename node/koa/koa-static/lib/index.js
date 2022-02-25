const send = require('../../koa-send');

module.exports = serve;


function serve(root, opts) {
  opts = Object.assign(Object.create(null), opts);
  opts.root = resolve(root);

  if (opts.index !== false) opts.index = opts.index || 'index.html'
  return async function (ctx, next) {
    let done = false;

    if (ctx.method === 'HEAD' || ctx.method === 'GET') {
      try {
        done = await send(ctx, ctx.path, opts);
      } catch (error) {
        if (error.status !== 404) throw error;
      }
    }

    if (!done) {
      await next();
    }
  }
}