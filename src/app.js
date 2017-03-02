import React from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import createStore from './store';
import Appstate from './modules/appstate/Appstate';
import NavigationContainer from './modules/navigation/NavigationContainer';

const store = createStore();

const App = () =>
  <Provider store={store}>
    <View style={{ flex: 1 }}>
      <NavigationContainer />
      <Appstate />
    </View>
  </Provider>;

export default App;
