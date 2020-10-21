import React from 'react';
import { StyleSheet, Text as RNText, TextProps } from 'react-native';

export const Text: React.FC<TextProps> = ({ style, ...props }) => {
  return <RNText {...props} style={[styles.text, style]} />;
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
  },
});
