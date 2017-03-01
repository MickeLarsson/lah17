import React from 'react';
import { AppState } from 'react-native';
import { connect } from 'react-redux';
import { setCurrentState } from './actions';

class Appstate extends React.Component {
  componentDidMount() {
    this.props.setState(AppState.currentState);
    AppState.addEventListener('change', this.handleAppStateChange.bind(this));
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange.bind(this));
  }

  handleAppStateChange(nextAppState) {
    this.props.setState(nextAppState);
  }

  render() {
    return null;
  }
}

const mapDispatchToProps = (dispatch) => ({
  setState: (state) =>
    dispatch(setCurrentState(state)),
});

export default connect(null, mapDispatchToProps)(Appstate);
