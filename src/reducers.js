import app from './app.reducers';
import appState from './modules/appstate/reducers';
import navigation from './modules/navigation/reducers';
import artists from './modules/artists/reducers';

const reducers = {
  app,
  appState,
  navigation,
  artists,
};

export default reducers;
