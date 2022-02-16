function reducerA(state, action) {
  console.log('reducerA', { milk: state, payload: action.payload });
  switch (action.type) {
    case 'modelA/plusA':
      return { ...state, milk: state.milk + action.payload };
    case 'modelA/takeA':
      return { ...state, milk: state.milk - action.payload };
    default:
      return state;
  }
}

export default reducerA;