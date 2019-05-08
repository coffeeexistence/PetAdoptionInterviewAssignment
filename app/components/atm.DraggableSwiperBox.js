// @flow

import * as React from "react";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { Animated, Easing, Dimensions } from "react-native";

import {
  PanGestureHandler,
  ScrollView,
  State as GestureState,
  type PanGestureHandlerStateChangeEvent
} from "react-native-gesture-handler";

type Props = {
  children: React.Node,
  style: number | Object,
  onSwipeComplete?: (swipeDirection: "left" | "right") => void
};

class DraggableSwiperBox extends React.Component<Props> {
  translateX: any; // Animated.Value
  translateY: any; // Animated.Value
  lastOffset: { x: number, y: number };
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
    this.lastOffset = { x: 0, y: 0 };
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
    const MINIMUM_ABSOLUTE_SWIPE_VELOCITY = 75;
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
    const swipeDirection = velocityX > 0 ? "right" : "left";

    if (didUserSwipeHorizontally) {
      // Fly away
      // Infer from velocity data where card should fly
      const animationDuration = 500;
      const velocityToAnimationDurationRatio = animationDuration / 1000;

      Animated.timing(this.translateY, {
        toValue: translationY + velocityY * velocityToAnimationDurationRatio,
        useNativeDriver: true,
        duration: animationDuration,
        easing: Easing.linear
      }).start();

      const screenWidth = Dimensions.get("window").width;
      const startTime = Date.now();
      Animated.spring(this.translateX, {
        toValue: swipeDirection === "left" ? -screenWidth : screenWidth,
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
  render() {
    return (
      <PanGestureHandler
        onGestureEvent={this.onGestureEvent}
        onHandlerStateChange={this.onHandlerStateChange}
      >
        <Animated.View style={[this.animatedContainerStyle, this.props.style]}>
          {this.props.children}
        </Animated.View>
      </PanGestureHandler>
    );
  }
}

export default DraggableSwiperBox;
