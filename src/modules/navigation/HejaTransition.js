import React from 'react';
import { StyleSheet, NavigationExperimental, View, Platform } from 'react-native';
import NavigationCard from 'NavigationCard';
import NavigationCardStackPanResponder from 'NavigationCardStackPanResponder';

class HejaTransition extends React.Component {
  constructor(props) {
    super(props);
    this.renderTransition = this.renderTransition.bind(this);
  }

  configureTransition() {
    return {
      duration: 220,
      useNativeDriver: Platform.OS === 'android',
    };
  }

  renderTransition(props) {
    const scenes = props.scenes.map(scene => this.renderScene({ ...props, scene }));
    return (
      <View style={styles.scenes}>
        {scenes}
      </View>
    );
  }

  renderHorizontal(props) {
    const { layout, position, scene } = props;
    const inputRange = [scene.index - 1, scene.index, scene.index + 0.99, scene.index + 1];
    const opacity = position.interpolate({ inputRange, outputRange: [1, 1, 0.95, 1] });
    // const scale = position.interpolate({ inputRange, outputRange: [1, 1, 0.99, 1] });
    const translateX = position.interpolate({ inputRange, outputRange: [layout.initWidth, 0, -110, -20] });
    // const translateY = 0;
    return {
      opacity,
      transform: [
        // { scale },
        { translateX },
        // { translateY },
      ],
    };
  }

  renderVertical(props) {
    const { layout, position, scene } = props;
    const inputRange = [scene.index - 1, scene.index, scene.index + 0.99, scene.index + 1];
    const opacity = position.interpolate({ inputRange, outputRange: ([1, 1, 0, 0]) });
    const scale = position.interpolate({ inputRange, outputRange: ([1, 1, 0.95, 0.95]) });
    const translateX = 0;
    const translateY = position.interpolate({ inputRange, outputRange: ([layout.initHeight, 0, 5, 5]) });
    return {
      opacity,
      transform: [
        { scale },
        { translateX },
        { translateY },
      ],
    };
  }

  renderScene(props) {
    const { direction, onNavigateBack, gestureResponseDistance } = this.props;
    const panHandlersProps = { ...props, onNavigateBack, gestureResponseDistance };
    let style = direction === 'horizontal' ? this.renderHorizontal(props) : this.renderVertical(props);
    let panHandlers = direction === 'horizontal'
                        ? NavigationCardStackPanResponder.forHorizontal(panHandlersProps)
                        : NavigationCardStackPanResponder.forVertical(panHandlersProps);

    if (this.props.noAnimation) {
      style = null;
      panHandlers = null;
    }

    return (
      <NavigationCard
        {...props}
        key={`card_${props.scene.key}`}
        panHandlers={panHandlers}
        renderScene={this.props.renderScene}
        style={[style, styles.cardStyle, this.props.cardStyle]}
      />
    );
  }

  render() {
    return (
      <NavigationExperimental.Transitioner
        configureTransition={this.configureTransition}
        render={this.renderTransition}
        navigationState={this.props.navigationState}
        style={this.props.style}
        onTransitionEnd={this.props.onTransitionEnd}
        onTransitionStart={this.props.onTransitionStart}
      />
    );
  }
}

const styles = StyleSheet.create({
  scenes: {
    flex: 1,
  },
  cardStyle: {
    backgroundColor: 'transparent',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0,
    shadowRadius: 0,
  },
});

export default HejaTransition;
