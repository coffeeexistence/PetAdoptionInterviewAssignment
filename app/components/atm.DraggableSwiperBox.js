// @flow

import * as React from 'react';
import { Animated, Easing, Dimensions, StyleSheet, Text } from 'react-native';
import {
  PanGestureHandler,
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

const acceptEmoji = String.fromCodePoint(127881); // tada emoji
const denyEmoji = String.fromCodePoint(10060); // X emoji

const MINIMUM_ABSOLUTE_SWIPE_VELOCITY = 400;

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

  static defaultProps = {
    onSwipeComplete: undefined
  };

  constructor(props: Props) {
    super(props);
    this.translateX = new Animated.Value(0);
    this.translateY = new Animated.Value(0);
    this.yesOverlayOpacity = this.translateX.interpolate({
      inputRange: [10, 70],
      outputRange: [0, 1],
      extrapolate: 'clamp'
    });
    this.dismissOverlayOpacity = this.translateX.interpolate({
      inputRange: [-70, -10],
      outputRange: [1, 0],
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
    const { onSwipeComplete } = this.props;
    const { velocityX, velocityY, oldState, translationY } = event.nativeEvent;
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
        if (onSwipeComplete) onSwipeComplete(swipeDirection);
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
    return [
      <Animated.View key="accept" style={yesOverlayStyle}>
        <Text style={{ fontSize: 30 }}>{acceptEmoji}</Text>
      </Animated.View>,
      <Animated.View key="deny" style={dismissOverlayStyle}>
        <Text style={{ fontSize: 30 }}>{denyEmoji}</Text>
      </Animated.View>
    ];
  };

  render() {
    const { style, children } = this.props;
    return (
      <PanGestureHandler
        onGestureEvent={this.onGestureEvent}
        onHandlerStateChange={this.onHandlerStateChange}
      >
        <Animated.View style={[this.animatedContainerStyle, style]}>
          {children}
          {this.renderIndicatorOverlays()}
        </Animated.View>
      </PanGestureHandler>
    );
  }
}
export default DraggableSwiperBox;
