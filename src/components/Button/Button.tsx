import React, { useState } from 'react';
import type {
  GestureResponderEvent,
  PressableProps,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
import {
  Animated,
  Easing,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';

import { Text } from '../Text/Text';

interface ButtonProps extends PressableProps {
  text: string;
  textStyle: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  onPressIn,
  onPressOut,
  style,
  text,
  textStyle,
  ...props
}) => {
  const [anim] = useState(new Animated.Value(1));

  function setOpacity(toValue: number, duration: number) {
    Animated.timing(anim, {
      duration,
      easing: Easing.inOut(Easing.quad),
      toValue,
      useNativeDriver: true,
    }).start();
  }

  function handlePressIn(event: GestureResponderEvent) {
    setOpacity(0.7, 150);
    onPressIn?.(event);
  }

  function handlePressOut(event: GestureResponderEvent) {
    setOpacity(1, 150);
    onPressOut?.(event);
  }

  const buttonStyles: (
    | StyleProp<ViewStyle>
    | Animated.WithAnimatedValue<ViewStyle>
  )[] = [styles.button];

  const pressableFuncStyle = typeof style === 'function' ? style : null;
  let Container: typeof View | typeof Animated.View = View;

  if (typeof style !== 'function') {
    buttonStyles.push(style);
  }

  if (Platform.OS === 'ios') {
    // TODO try to animate backgroundColor instead of opacity
    Container = Animated.View;
    buttonStyles.push({ opacity: anim });
  }

  return (
    <Container style={buttonStyles as StyleProp<ViewStyle>[]}>
      <Pressable
        {...props}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={pressableFuncStyle}
      >
        <Text style={[styles.text, textStyle]}>{text}</Text>
      </Pressable>
    </Container>
  );
};

/* eslint-disable sort-keys */
const styles = StyleSheet.create({
  button: {
    overflow: 'hidden',
    borderRadius: 100,
  },
  text: {
    padding: 16,
    textAlign: 'center',
  },
});
/* eslint-enable sort-keys */
