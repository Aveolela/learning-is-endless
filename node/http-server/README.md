# 使用`node`原生模块`http`搭建服务器

## 创建服务器

```
const server = http.createServer((req, res) => {
  // 此处为服务器的入口
})
```

## 监听端口

```
server.listen(port, () => {})
```

## 静态资源

- 通过匹配约定的`url`地址，利用`fs`模块，将对应的资源从文件中读取出来，并返回给前端

```
fs.readFile(path, (err, data) => {
  res.write(data);
  res.end();
})
```

## 路由处理

- 通过`req.url`进行设计，不同的`url`执行不同的业务逻辑

## `HTTP`动词——如：`GET`、`POST`等

- 通过`req.method`获取`http`的请求方式

## 数据持久化

- 利用数据库进行存储，如`mysql`等
- 利用`fs`模块进行文件的存储，保存至服务器上
