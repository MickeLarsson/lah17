import { types } from './actions';

const initialState = {
  currentState: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_CURRENT_STATE:
      return {
        ...state,
        currentState: action.currentState,
      };
    default:
      return state;
  }
};
