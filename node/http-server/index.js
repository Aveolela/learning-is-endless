const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const server = http.createServer((req, res) => {
  // 请求一次，为什么会触发三次——/ / /favicon.ico？

  // 通过url.parse解析地址
  const { pathname } = url.parse(req.url);
  res.statusCode = 200;

  if (pathname.startsWith('/apis')) {
    // 通过req.method获取http请求方式
    if (req.method === 'GET') {
      let text;
      switch (pathname) {
        case '/apis/book':
          text = { kind: 'book' };
          break;
        case '/apis/apple':
          text = { kind: 'apple' };
          break;
        default:
          text = { kind: 'null' };
          break;
      }
      // res.setHeader(name, value) 设置响应头
      res.setHeader('Content-Type', 'application/json');
      // 以字符串的形式传递信息，write是什么作用？？
      res.write(JSON.stringify(text), (e) => {
        console.log('error', e);
      });
      // res.end()是什么作用？？
      res.end();
    } else if (req.method === 'POST') {
      let cache = '';
      req.on('data', (chunk) => {
        cache += chunk;
      });
      req.on('end', () => {
        fs.appendFile(path.resolve(__dirname, './db.txt'), cache, () => {
          res.write(cache);
          res.end();
        });
      });
    } else {
      res.end('request method error');
    }
  } else if (pathname.endsWith('.txt')) {
    fs.readFile(path.resolve(__dirname, './static.txt'), (err, data) => {
      if (err) res.end('read file error');
      // 响应头中需要设置编码格式，不然会乱码
      res.setHeader('Content-Type', 'text/plain;charset=UTF8');
      res.write(data);
      res.end();
    });
  } else {
    res.end('404');
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on http://127.0.0.1:${PORT}`);
});

// 可将以下功能抽离出去：
// 路由处理
// HTTP动词
// 静态资源
// 数据持久化