import {
  createStore as createstore,
  combineReducers,
  applyMiddleware,
  compose,
} from 'redux';
import thunk from 'redux-thunk';
import * as storage from 'redux-storage';
import createEngine from 'redux-storage-engine-reactnativeasyncstorage';
import filter from 'redux-storage-decorator-filter';
import reducers from './reducers';
// import _ from 'lodash';

const createStore = () => {
  const appReducer = combineReducers(reducers);

  const rootReducer = (state, action) => {
    switch (action.type) {
      case 'AUTH_LOGOUT':
        return appReducer(undefined, action);
      default:
        return appReducer(state, action);
    }
  };

  const reducer = storage.reducer(rootReducer);

  // filter = engine => whitelist => blacklist => engine
  // To white-/blacklist nested keys add arrays describing the path like ['messaging', 'conversations']
  const whitelisted = [
    'auth',
    'user',
    'teams',
    'appstate',
    ['posts', 'lastFetched'],
  ];
  const engine = filter(createEngine('lah17/v1'), whitelisted, []);
  const storageMiddleware = storage.createMiddleware(engine);
  const createStoreWithMiddleware = compose(applyMiddleware(
    thunk,
    storageMiddleware
  ))(createstore);
  const store = createStoreWithMiddleware(reducer);
  const load = storage.createLoader(engine);

  load(store).then((newState) => {
    store.dispatch({ type: 'INIT_STATE_LOADED', newState });
  })
  .catch((err) => {
    console.log('Failed to load state from storage:', err);
    store.dispatch({ type: 'INIT_STATE_LOAD_FAILED' });
  });

  return store;
};

export default createStore;
