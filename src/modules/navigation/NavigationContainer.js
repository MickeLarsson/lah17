import React from 'react';
import { StyleSheet, BackAndroid } from 'react-native';
import { connect } from 'react-redux';
import { close, doneReplacing } from './actions';
import routableComps from './routableComps';
import _ from 'lodash';
import HejaTransition from './HejaTransition.js';

class NavigationContainer extends React.Component {
  constructor(props) {
    super(props);

    this.tempDirection = null;
    this.defaultDirection = 'horizontal';

    this.state = {
      lastDirection: null,
      direction: this.defaultDirection,
    };
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => this.handleBackAction());
  }

  componentWillReceiveProps(newProps) {
    if (newProps.navigation.routes.length > this.props.navigation.routes.length) {
      // New route incoming
      const openingRoute = newProps.navigation.routes[newProps.navigation.index];
      const direction = (openingRoute.props && openingRoute.props.direction) || this.defaultDirection;
      this.setState({ direction });
      this.tempDirection = direction;
      return;
    }

    const closingRoute = this.props.navigation.routes[this.props.navigation.index];
    const direction = (closingRoute.props && closingRoute.props.direction) || this.defaultDirection;

    this.setState({ direction });

    const nextRoute = newProps.navigation.routes[newProps.navigation.index];
    this.tempDirection = (nextRoute.props && nextRoute.props.direction) || this.defaultDirection;
  }

  shouldComponentUpdate(nextProps, _nextState) {
    // Lets just re-render if navigation has changed, or what?
    return !_.isEqual(this.props.navigation, nextProps.navigation);
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBackAction);
  }

  handleBackAction() {
    if (this.props.navigation.index > 0) {
      this.onNavigateBack();
      return true;
    }
    return false;
  }

  renderScene(sceneProps) {
    const { route } = sceneProps.scene;
    const Comp = routableComps[route.component];
    if (!Comp) {
      return console.error(`Component (${route.component}) not in modules/navigation/routableComps.js.\nPlease fix spelling mistake OR add to map!`);
    }
    return <Comp {...route.props} />;
  }

  onNavigateBack() {
    this.props.close();
  }

  transitionEnd() {
    if (this.tempDirection !== null) {
      this.setState({
        direction: this.tempDirection,
      });
      this.tempDirection = null;
      this.forceUpdate();
    }

    if (this.props.isReplacing) {
      this.props.hasReplaced();
    }
  }

  render() {
    return (
      <HejaTransition
        style={styles.navView}
        direction={this.state.direction}
        noAnimation={this.props.isReplacing}
        renderScene={this.renderScene}
        navigationState={this.props.navigation}
        onNavigateBack={() => this.onNavigateBack()}
        gestureResponseDistance={120}
        onTransitionEnd={() => this.transitionEnd()}
      />);
  }
}

const styles = StyleSheet.create({
  navView: {
    backgroundColor: 'crimson',
  },
});

const mapStateToProps = (state) => ({
  navigation: state.navigation,
  isReplacing: state.navigation.replacing,
});

const mapDispatchToProps = (dispatch) => ({
  close: () => dispatch(close()),
  hasReplaced: () => dispatch(doneReplacing()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavigationContainer);
