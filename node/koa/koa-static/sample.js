const Koa = require('Koa');
const serve = require('koa-static');
const port = 3000;

const app = new Koa();

app.use(serve('public'));

app.listen(port, () => console.log('listening on port ' + port))