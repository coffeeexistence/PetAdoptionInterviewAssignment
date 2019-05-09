// @flow

import * as React from 'react';
// $FlowFixMe ignoring this package since it has flow issues
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { Animated, Easing, Dimensions, StyleSheet, Text } from 'react-native';
import {
  PanGestureHandler,
  ScrollView,
  State as GestureState,
  type PanGestureHandlerStateChangeEvent
  // $FlowFixMe ignoring this package since it has flow issues
} from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  overlays: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0, 0.05)',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const MINIMUM_ABSOLUTE_SWIPE_VELOCITY = 500;

type Props = {
  children: React.Node,
  style: number | Object,
  onSwipeComplete?: (swipeDirection: 'left' | 'right') => void
};

class DraggableSwiperBox extends React.Component<Props> {
  translateX: any; // Animated.Value
  translateY: any; // Animated.Value
  yesOverlayOpacity: any;
  dismissOverlayOpacity: any;
  onGestureEvent: any; // Animated.event
  animatedContainerStyle: {
    transform: [
      { translateX: any }, // Animated.Value
      { translateY: any } // Animated.Value
    ]
  };

  constructor(props: Props) {
    super(props);
    this.translateX = new Animated.Value(0);
    this.translateY = new Animated.Value(0);
    this.yesOverlayOpacity = this.translateX.interpolate({
      inputRange: [0, 75, 76],
      outputRange: [0, 1, 1],
      extrapolate: 'clamp'
    });
    this.dismissOverlayOpacity = this.translateX.interpolate({
      inputRange: [-76, -75, 0],
      outputRange: [1, 1, 0],
      extrapolate: 'clamp'
    });
    this.onGestureEvent = Animated.event(
      [
        {
          nativeEvent: {
            translationX: this.translateX,
            translationY: this.translateY
          }
        }
      ],
      { useNativeDriver: true }
    );

    this.animatedContainerStyle = {
      transform: [
        { translateX: this.translateX },
        { translateY: this.translateY }
      ]
    };
  }
  onHandlerStateChange = (event: PanGestureHandlerStateChangeEvent) => {
    const {
      velocityX,
      velocityY,
      oldState,
      translationX,
      translationY
    } = event.nativeEvent;

    const hasEnded = oldState === GestureState.ACTIVE; // Previously active, but no longer
    if (!hasEnded) return;

    const didUserSwipeHorizontally =
      Math.abs(velocityX) > MINIMUM_ABSOLUTE_SWIPE_VELOCITY;
    const swipeDirection = velocityX > 0 ? 'right' : 'left';

    if (didUserSwipeHorizontally) {
      // Fly away - infer from velocity data where card should fly
      const animationDuration = 500;
      const velocityToAnimationDurationRatio = animationDuration / 1000;

      Animated.timing(this.translateY, {
        toValue: translationY + velocityY * velocityToAnimationDurationRatio,
        useNativeDriver: true,
        duration: animationDuration,
        easing: Easing.linear
      }).start();

      const screenWidth = Dimensions.get('window').width;
      Animated.spring(this.translateX, {
        toValue: swipeDirection === 'left' ? -screenWidth : screenWidth,
        duration: animationDuration,
        useNativeDriver: true,
        velocity: velocityX,
        overshootClamping: true
      }).start(() => {
        if (this.props.onSwipeComplete)
          this.props.onSwipeComplete(swipeDirection);
      });
    } else {
      // Return to original position
      Animated.spring(this.translateX, {
        toValue: 0,
        useNativeDriver: true
      }).start();
      Animated.spring(this.translateY, {
        toValue: 0,
        useNativeDriver: true
      }).start();
    }
  };

  renderIndicatorOverlays = () => {
    const yesOverlayStyle = [
      styles.overlays,
      { opacity: this.yesOverlayOpacity }
    ];

    const dismissOverlayStyle = [
      styles.overlays,
      { opacity: this.dismissOverlayOpacity }
    ];

    return (
      <>
        <Animated.View style={yesOverlayStyle}>
          <Text style={{ fontSize: 30 }}>🎉</Text>
        </Animated.View>

        <Animated.View style={dismissOverlayStyle}>
          <Text style={{ fontSize: 30 }}>❌</Text>
        </Animated.View>
      </>
    );
  };

  render() {
    return (
      <PanGestureHandler
        onGestureEvent={this.onGestureEvent}
        onHandlerStateChange={this.onHandlerStateChange}
      >
        <Animated.View style={[this.animatedContainerStyle, this.props.style]}>
          {this.props.children}
          {this.renderIndicatorOverlays()}
        </Animated.View>
      </PanGestureHandler>
    );
  }
}
export default DraggableSwiperBox;
