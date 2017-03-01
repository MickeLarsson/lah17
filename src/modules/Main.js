import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

const Main = ({ appState }) =>
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>{`The state is: ${appState}`}</Text>
  </View>;

const mapStateToProps = (state) => ({
  appState: state.appState.currentState,
});

export default connect(mapStateToProps)(Main);
