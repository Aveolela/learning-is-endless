function reducerB(state, action) {
  console.log('reducerB', { milk: state, payload: action.payload });
  switch (action.type) {
    case 'modelB/plusB':
      return { ...state, milk: state.milk + action.payload };
    case 'modelB/takeB':
      return { ...state, milk: state.milk - action.payload };
    default:
      return state;
  }
}

export default reducerB;