const types = {
  SET_CURRENT_STATE: 'SET_CURRENT_STATE',
};

const setCurrentState = (currentState) => ({
  type: types.SET_CURRENT_STATE,
  currentState,
});

export {
  setCurrentState,
  types,
};
