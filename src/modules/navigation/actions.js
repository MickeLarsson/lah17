import _ from 'lodash';

export const types = {
  POP_ROUTE: 'POP_ROUTE',
  PUSH_ROUTE: 'PUSH_ROUTE',
  REPLACE_ROUTE: 'REPLACE_ROUTE',
  REPLACE_ROUTE_DONE: 'REPLACE_ROUTE_DONE',
  SET_CURRENT_TAB: 'SET_CURRENT_TAB',
  INSERT_ROUTE_AT_INDEX: 'INSERT_ROUTE_AT_INDEX',
  RESET_ROUTES: 'RESET_ROUTES',
  CLOSE_AND_LEAVE_FIRST: 'CLOSE_AND_LEAVE_FIRST',
};

const keyifyRoute = (route) => {
  route.key = route.component;
  return route;
};

const keyify = (route) => {
  if (Array.isArray(route)) {
    return _.map(route, r => keyifyRoute(r));
  }
  return keyifyRoute(route);
};

const push = (route) => ({
  type: types.PUSH_ROUTE,
  route: keyify(route),
});

const pop = () => ({
  type: types.POP_ROUTE,
});

export const replace = (route, index) => ({
  type: types.REPLACE_ROUTE,
  route: keyify(route),
  index,
});

export const doneReplacing = () => ({
  type: types.REPLACE_ROUTE_DONE,
});

export const closeAndLeaveFirst = () => ({
  type: types.CLOSE_AND_LEAVE_FIRST,
});

export const currentTab = (tab) => ({
  type: types.SET_CURRENT_TAB,
  tab,
});

export const open = (component, props = {}) =>
  push({ key: component, component, props });

export const close = pop;
