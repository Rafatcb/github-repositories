import React, { useMemo, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  PressableAndroidRippleConfig,
  StyleSheet,
} from 'react-native';
import { Card } from '../components/Card/Card';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTheme } from '../contexts/themeManager';

import { Button } from '../components/Button/Button';
import { Text } from '../components/Text/Text';
import { TextInput, TextInputRef } from '../components/TextInput/TextInput';

export const EnterAccount: React.FC = () => {
  const { theme } = useTheme();
  const inputRef = useRef<TextInputRef>(null);

  const [inputError, setInputError] = useState('');

  const buttonColor = useMemo(() => ({ backgroundColor: theme.cardButton }), [
    theme.cardButton,
  ]);
  const textColor = useMemo(() => ({ color: theme.cardTitle }), [
    theme.cardTitle,
  ]);
  const ripple: PressableAndroidRippleConfig = useMemo(
    () => ({ color: theme.rippleOnCard }),
    [theme.rippleOnCard],
  );

  function handlePress() {
    // const user = inputRef.current?.value;
    // if (!validateInput(user)) {
    //   return;
    // }
  }

  function handleChangeText(text: string) {
    validateInput(text);
  }

  function validateInput(text?: string) {
    if (!text) {
      setInputError('Username is empty.');
      return false;
    }

    setInputError('');
    return true;
  }

  const keyboardAvoidingViewBehavior =
    Platform.OS === 'ios' ? 'padding' : undefined;

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={keyboardAvoidingViewBehavior}>
        <Card style={styles.card}>
          <Icon
            color={theme.iconOnCard}
            name="github"
            size={100}
            style={styles.icon}
          />
          <Text style={[styles.text, textColor]}>GitHub Repositories</Text>
          <TextInput
            ref={inputRef}
            error={inputError}
            onChangeText={handleChangeText}
            placeholder="Username"
          />
          <Button
            android_ripple={ripple}
            onPress={handlePress}
            style={[styles.button, buttonColor]}
            text="Look for Repositories"
            textStyle={textColor}
          />
        </Card>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 32,
    marginBottom: 8,
  },
  card: {
    margin: 24,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  icon: {
    alignSelf: 'center',
  },
  text: {
    alignSelf: 'center',
    marginTop: 24,
    marginBottom: 16,
    fontSize: 20,
  },
});
