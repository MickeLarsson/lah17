import { types } from './actions';
import { NavigationExperimental } from 'react-native';

const {
  StateUtils: NavigationStateUtils,
} = NavigationExperimental;

const initialState = {
  index: 0,
  currentTab: 0,
  replacing: false,
  routes: [
    {
      key: 'Splash',
      component: 'Splash',
    },
  ],
  isLoadingState: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'INIT_STATE_LOADED':
      return {
        ...state,
        isLoadingState: false,
      };
    case types.PUSH_ROUTE: {
      if (state.routes[state.index].key === (action.route && action.route.key)) return state;
      return NavigationStateUtils.push(state, action.route);
    }
    case types.POP_ROUTE: {
      if (state.index === 0 || state.routes.length === 1) return state;
      return NavigationStateUtils.pop(state);
    }
    case types.REPLACE_ROUTE: {
      const newState = {
        ...state,
        replacing: true,
      };
      return NavigationStateUtils.reset(newState, action.route);
    }
    case types.REPLACE_ROUTE_DONE:
      return {
        ...state,
        replacing: false,
      };
    case types.CLOSE_AND_LEAVE_FIRST:
      return {
        ...state,
        index: 0,
        routes: state.routes.slice(0, 1),
      };
    case types.SET_CURRENT_TAB:
      return {
        ...state,
        currentTab: action.tab,
      };
    default:
      return state;
  }
};
