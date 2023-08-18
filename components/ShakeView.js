import React from 'react';
import { Animated } from 'react-native';

export const ShakeView = ({ children, isInvalid }) => {
  const animatedTranslateX = React.useRef(new Animated.Value(0)).current;

  const shakeCallback = React.useCallback(() => {
    Animated.sequence([
      Animated.timing(animatedTranslateX, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(animatedTranslateX, {
        toValue: -10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(animatedTranslateX, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(animatedTranslateX, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  React.useEffect(() => {
    shakeCallback();
  }, [isInvalid]);

  return (
    <Animated.View
      style={{
        transform: [{ translateX: isInvalid ? animatedTranslateX : 0 }],
      }}
    >
      {children}
    </Animated.View>
  );
};
