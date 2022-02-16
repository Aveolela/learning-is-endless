import { compose } from './utils.js';
/**
 * store 有以下几个方法
 * 1、createStore(reducer)
 * 2、store.dispatch(action)
 * 3、store.subscribe(callback)
 * 4、store.getState()
 * 5、第二个参数enhancer用来增强store的dispatch能力 -> type StoreEnhancer = (next: StoreCreator) => StoreCreator
 */

function createStore(reducer, enhancer) {
  if (enhancer && typeof enhancer === 'function') {
    const newCreateStore = enhancer(createStore);
    const newStore = newCreateStore(reducer);
    return newStore;
  }

  let state = { modelA: { milk: 1 }, modelB: { milk: 10 } };
  // 保存所有的订阅的回调
  const listeners = [];

  // 将所有的回调拿出来执行
  function dispatch(action) {
    state = reducer(state, action);
    listeners.forEach((listener) => listener());
  }

  // 订阅所有的回调
  function subscribe(listener) {
    listeners.push(listener);
  }

  // 返回当前的所有状态
  function getState() {
    return state;
  }

  return {
    dispatch,
    subscribe,
    getState
  };
}

// combineReducers 特性：
// 1、返回reducer(state, action)，作为createStore的参数；reducer返回新的state
// 2、reducerMap中的key值需要和state中每个key值保持一致，即一个reducer对应一个state
function combineReducers(reducerMap) {
  const reducerKeys = Object.keys(reducerMap);
  let newState = {};

  const reducer = (state = {}, action) => {
    const type = action.type;
    for (let i = 0; i < reducerKeys.length; i++) {
      const key = reducerKeys[i];
      const [model] = type.split('/');
      if (key === model) {
        const curReducer = reducerMap[model];
        const preState = state[model];
        newState = { ...state, [key]: { ...newState[key], ...curReducer(preState, action) } };
        break;
      }
    }
    return newState;
  }

  return reducer;
}

// 中间件是不是都是将最基本的功能进行了一层包装？？？

// applyMiddleware返回值应该是一个enhancer
// enhancer返回值是一个createStore,因为它是用来增强store的dispatch方法
function applyMiddleware(...middlewares) {
  function enhancer(createStore) {
    function newCreateStore(reducer) {
      const store = createStore(reducer);
      const chain = middlewares.map(middleware => middleware(store));
      const { dispatch } = store;
      const newDispatchGen = compose(...chain);
      const newDispatch = newDispatchGen(dispatch);
      return { ...store, dispatch: newDispatch };
    }
    return newCreateStore;
  }
  return enhancer;
}


// logger中间件
// 一个中间件接收store作为参数，会返回一个函数
// 返回的这个函数接收老的dispatch函数作为参数，会返回一个新的函数
// 返回的新函数就是新的dispatch函数，这个函数里面可以拿到外面两层传进来的store和老dispatch函数（装饰者模式？？？）
function logger(store) {
  return function (next) {
    return function (action) {
      console.group(action.type);
      console.info('dispatching', action);
      let result = next(action);
      console.log('next state', store.getState());
      console.groupEnd();
      return result
    }
  }
}


export { createStore, combineReducers, applyMiddleware };
