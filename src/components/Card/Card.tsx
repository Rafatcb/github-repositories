import React, { useMemo } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

import { useTheme } from '../../contexts/themeManager';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const Card: React.FC<CardProps> = ({ children, style }) => {
  const { theme } = useTheme();
  const cardColor = useMemo(
    () => ({ backgroundColor: theme.card, shadowColor: theme.shadow }),
    [theme.card, theme.shadow],
  );

  return <View style={[styles.card, cardColor, style]}>{children}</View>;
};

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
