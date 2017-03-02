import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { replace } from './actions';

class Splash extends React.Component {

  componentDidMount() {
    this.determineRoute(this.props);
  }

  componentWillReceiveProps(newProps) {
    this.determineRoute(newProps);
  }

  determineRoute(props) {
    const { isLoadingState } = props;
    if (isLoadingState) return;
    this.props.replaceRoute([{
      component: 'Main',
    }]);
  }

  render() {
    return (
      <View style={styles.splash} />
    );
  }
}

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    backgroundColor: 'white',
  },
});

const mapStateToProps = (state) => ({
  isLoadingState: state.navigation.isLoadingState,
});

const mapDispatchToProps = (dispatch) => ({
  replaceRoute: (route, index) => {
    dispatch(replace(route, index));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Splash);
