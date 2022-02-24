```
function new(Fn, ...args) {
  const obj = {};
  Object.setPrototypeOf(obj, Fn.prototype);
  const result = Fn.call(obj, ...args);
  return result instanceof Object ? result : obj;
}
```
