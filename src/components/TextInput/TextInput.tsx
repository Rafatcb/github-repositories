import React, { useMemo, useState } from 'react';
import type {
  NativeSyntheticEvent,
  TextInputFocusEventData,
  TextInputProps as RNInputProps,
} from 'react-native';
import { StyleSheet, TextInput as RNInput } from 'react-native';

import { useTheme } from '../../contexts/themeManager';

import { Text } from '../Text/Text';

export interface TextInputRef extends RNInput {
  value?: string;
}

interface TextInputProps extends RNInputProps {
  error?: string;
}

const TextInput = React.forwardRef<TextInputRef, TextInputProps>(
  ({ error, onBlur, onChangeText, onFocus, placeholder, ...props }, ref) => {
    const { theme } = useTheme();
    const [focused, setFocused] = useState(false);

    const borderWidth = useMemo(
      () => ({
        borderBottomWidth: focused ? 2 : 1,
        borderTopWidth: focused ? 0 : 1,
        borderTopColor: '#ffffff00', // To avoid flickering elements when (un)focusing
      }),
      [focused],
    );
    const inputColors = useMemo(
      () => ({ borderBottomColor: theme.border, color: theme.textOnCard }),
      [theme.border, theme.textOnCard],
    );
    const errorLabel = useMemo(() => ({ color: theme.textErrorOnCard }), [
      theme.textErrorOnCard,
    ]);

    function handleBlur(e: NativeSyntheticEvent<TextInputFocusEventData>) {
      setFocused(false);
      onBlur?.(e);
    }

    function handleChangeText(text: string) {
      if (ref) {
        (ref as React.MutableRefObject<TextInputRef>).current.value = text;
      }
      onChangeText?.(text);
    }

    function handleFocus(e: NativeSyntheticEvent<TextInputFocusEventData>) {
      setFocused(true);
      onFocus?.(e);
    }

    return (
      <>
        <RNInput
          {...props}
          ref={ref}
          onBlur={handleBlur}
          onChangeText={handleChangeText}
          onFocus={handleFocus}
          placeholder={placeholder}
          placeholderTextColor={theme.placeholder}
          selectionColor={theme.selection}
          style={[styles.input, inputColors, borderWidth]}
        />
        {error ? <Text style={errorLabel}>{error}</Text> : null}
      </>
    );
  },
);

TextInput.displayName = 'TextInput';

const styles = StyleSheet.create({
  input: {
    paddingBottom: 4,
    borderBottomWidth: 1,
    marginBottom: 4,
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
  },
});

export { TextInput };
