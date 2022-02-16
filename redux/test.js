import { createStore, combineReducers } from './redux.js';
import actions from './actions.js';

import reducerA from './reducer/reducerA.js'
import reducerB from './reducer/reducerB.js'

const reducer = combineReducers({ modelA: reducerA, modelB: reducerB });
const store = createStore(reducer);

store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(actions.plusA);
store.dispatch(actions.takeA);
store.dispatch(actions.plusB);
store.dispatch(actions.takeB);

store.getState();
