function compose(...func) {
  return funcs.reduce((a, b) => (...args) => a(b(...args)));
}

export { compose };