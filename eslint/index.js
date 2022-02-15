function test() {
  console.log('test');
}

console.log(test(), test(), test(), test(), test(), test(), test(), test());

let a = 0;
if (a === 1) {
  a = 2;
}

const obj = {
  a: 1,
};
console.log(obj);

module.exports = {
  a,
};