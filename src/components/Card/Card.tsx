import React, { useMemo } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { Animated, StyleSheet, View } from 'react-native';

import { SharedElement } from 'react-navigation-shared-element';

import { useTheme } from '../../contexts/themeManager';

export interface CardProps {
  animatedStyle?: Animated.WithAnimatedValue<ViewStyle>;
  children: React.ReactNode;
  sharedElementId?: string;
  style?: StyleProp<ViewStyle>;
}

export const Card: React.FC<CardProps> = ({
  animatedStyle,
  children,
  sharedElementId,
  style,
}) => {
  const { theme } = useTheme();
  const cardColor = useMemo(
    () => ({ backgroundColor: theme.primary, shadowColor: theme.shadow }),
    [theme.primary, theme.shadow],
  );

  const cardStyles: (
    | StyleProp<ViewStyle>
    | Animated.WithAnimatedValue<ViewStyle>
  )[] = [styles.card, cardColor, style];
  let Content: typeof View | typeof Animated.View;

  if (animatedStyle) {
    cardStyles.push(animatedStyle);
    Content = Animated.View;
  } else {
    Content = View;
  }

  if (sharedElementId) {
    return (
      <SharedElement id={sharedElementId}>
        <Content style={cardStyles as ViewStyle}>{children}</Content>
      </SharedElement>
    );
  }

  return <Content style={cardStyles as ViewStyle}>{children}</Content>;
};

/* eslint-disable sort-keys */
const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 8,
    elevation: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
});
/* eslint-enable sort-keys */
