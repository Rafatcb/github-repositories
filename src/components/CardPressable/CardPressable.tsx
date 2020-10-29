import React, { useMemo, useState } from 'react';
import type {
  PressableAndroidRippleConfig,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { Animated, Pressable, StyleSheet } from 'react-native';

import type { CardProps } from '../Card/Card';
import { Card } from '../Card/Card';

interface CardPressableProps extends CardProps {
  color: string;
  onPress: () => void;
  rippleColor: string;
  unstablePressDelay: number;
  wrapperStyle: StyleProp<ViewStyle>;
}

export const CardPressable: React.FC<CardPressableProps> = ({
  color,
  onPress,
  rippleColor,
  style,
  unstablePressDelay,
  wrapperStyle,
  ...props
}) => {
  const [pressAnim] = useState(new Animated.Value(0));

  const pressableColor = useMemo(() => ({ backgroundColor: color }), [color]);

  const ripple: PressableAndroidRippleConfig = useMemo(
    () => ({ color: rippleColor }),
    [rippleColor],
  );

  function handlePressIn() {
    Animated.spring(pressAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  }

  function handlePressOut() {
    Animated.spring(pressAnim, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  }

  const animStyle: Animated.WithAnimatedValue<ViewStyle> = {
    elevation: pressAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 8],
    }),
    transform: [
      {
        scale: pressAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 1.03],
        }),
      },
    ],
  };

  return (
    <Animated.View style={[styles.wrapper, wrapperStyle, animStyle]}>
      <Pressable
        android_ripple={ripple}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[styles.wrapper, pressableColor]}
        unstable_pressDelay={unstablePressDelay}
      >
        <Card {...props} style={[styles.card, style]} />
      </Pressable>
    </Animated.View>
  );
};

/* eslint-disable sort-keys */
const styles = StyleSheet.create({
  // eslint-disable-next-line react-native/no-color-literals
  card: {
    backgroundColor: 'transparent',
  },
  wrapper: {
    overflow: 'hidden',
    borderRadius: 16,
  },
});
/* eslint-enable sort-keys */
