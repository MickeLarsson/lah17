import { types } from './actions';
import { status } from '../../fetch';

const initialState = {
  artists: [],
  isLoading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ARTISTS: {
      switch (action.meta.status) {
        case status.ERROR:
        case status.TIMEOUT:
        case status.BEGIN:
          return {
            ...state,
            isLoading: true,
          };
        case status.SUCCESS: {
          console.log(action.payload);
          return {
            ...state,
            isLoading: false,
            artists: action.payload.data,
          };
        }
        default:
          return state;
      }
    }
    default:
      return state;
  }
};
