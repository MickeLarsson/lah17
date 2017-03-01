import React from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import createStore from './store';
import Appstate from './modules/appstate/Appstate';
import Main from './modules/Main';

const store = createStore();

const App = () =>
  <Provider store={store}>
    <View style={{ backgroundColor: 'crimson', flex: 1 }}>
      <Main />
      <Appstate />
    </View>
  </Provider>;

export default App;
