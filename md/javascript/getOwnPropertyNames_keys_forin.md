# 比较`Object.getOwnPropertyNames`、`Object.keys`、`forIn`的区别

## `Object.getOwnPropertyNames`

- 获取目标对象自身的所有属性名称（包括可枚举和不可枚举的属性），以字符串数组的形式返回

## `Object.keys`

- 获取目标对象自身的多有可枚举属性，`enumerable`为`false`的会被过滤掉

## `for...in...`

- 以任意顺序遍历一个对象的除`Symbol`以外的可枚举属性，包括继承的可枚举属性（即原型链上的可枚举属性）
