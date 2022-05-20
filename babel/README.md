# `babel`是什么?

- `babel` 是一个 `JavaScript` 的编译器，主要将 `ES2015+` 的语法转换为向后兼容的 `JavaScript` 语法，以便于代码能够在当前浏览器和旧版浏览器都能够运行。

# `babel` 具体做了什么？

## 语法转换

### `@babel/preset-env`

- 将 ES6next 的新特性都封装到了一起，不用我们一个一个的单独安装
- preset 可以传递参数
  - targets：可以配置浏览器的版本，这样最终转换时只会转换该浏览器的版本不支持的特性，对于支持的特性就不做转换
  - useBuiltIns：配置为 usage 时，只会把必须的 polyfill 包含进来

## 通过 `Polyfill` 的方式在目标环境中添加缺失的特性（引入第三方 `polyfill` 模块，如 `core-js`）

### `@babel/polyfill`

- 该模块包含 core-js 和一个自定义的 regenerator runtime 来模拟完整的 ES2015+ 环境

## 源码转换（`codemods`）

- 插件会启用对应的语法插件，所以不必同时指定两种插件
