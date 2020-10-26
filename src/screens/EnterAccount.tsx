import React, { useEffect, useMemo, useRef, useState } from 'react';
import type { PressableAndroidRippleConfig, ViewStyle } from 'react-native';
import {
  Animated,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';

import type { StackScreenProps } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { getRepositories } from '../services/github';

import { useTheme } from '../contexts/themeManager';

import { Button } from '../components/Button/Button';
import { Card } from '../components/Card/Card';
import { Text } from '../components/Text/Text';
import type { TextInputRef } from '../components/TextInput/TextInput';
import { TextInput } from '../components/TextInput/TextInput';

import type { AppStackParamList } from '../routes/types';

type EnterAccountProps = StackScreenProps<AppStackParamList, 'EnterAccount'>;

export const EnterAccount: React.FC<EnterAccountProps> = ({ navigation }) => {
  const { theme } = useTheme();
  const inputRef = useRef<TextInputRef>(null);
  const [cardAnim] = useState(new Animated.Value(0));
  const [cardContentAnim] = useState(new Animated.Value(0));
  const [cardTitleAnim] = useState(new Animated.Value(0));

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

  useEffect(() => {
    // When component mounts for the first time focus is called, so we don't animate it on the first time
    let shouldHandleFocus = false;

    function fadeContent(toValue: number, delay: number) {
      Animated.spring(cardContentAnim, {
        delay,
        toValue,
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) {
          toValue === 1 ? fadeInTitle() : fadeOutTitle();
        }
      });
    }

    function fadeInTitle() {
      Animated.spring(cardTitleAnim, {
        friction: 4,
        tension: 20,
        toValue: 1,
        useNativeDriver: true,
      }).start();
    }

    function fadeOutTitle() {
      Animated.timing(cardTitleAnim, {
        duration: 0,
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }

    function firstRenderAnimation() {
      shouldHandleFocus = true;
      Animated.spring(cardAnim, {
        toValue: 1,
        friction: 6,
        tension: 20,
        useNativeDriver: true,
      }).start();

      fadeContent(1, 300);
    }

    function handleBlur() {
      fadeContent(0, 0);
    }

    function handleFocus() {
      if (shouldHandleFocus) {
        fadeContent(1, 350);
      } else {
        firstRenderAnimation();
      }
    }

    const unsubscribeBlur = navigation.addListener('blur', handleBlur);
    const unsubscribeFocus = navigation.addListener('focus', handleFocus);

    return () => {
      unsubscribeBlur();
      unsubscribeFocus();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handlePress() {
    const value = inputRef.current?.value;
    if (!validateInput(value) || !value) {
      return;
    }

    Keyboard.dismiss();
    const { user, repositories } = await getRepositories(value);
    if (repositories.length === 0) {
      setInputError('No repository found.');
      return;
    }

    navigation.navigate('Repositories', {
      repositories,
      user,
    });
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

  const contentFadeStyle: Animated.WithAnimatedValue<ViewStyle> = {
    opacity: cardContentAnim,
    transform: [
      {
        scale: cardContentAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0.8, 1],
        }),
      },
    ],
  };
  const cardSlideInStyle: Animated.WithAnimatedValue<ViewStyle> = {
    opacity: cardAnim.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 0.2, 1],
    }),
    transform: [
      {
        translateY: cardAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [200, 0],
        }),
      },
    ],
  };
  const titleStyle: Animated.WithAnimatedValue<ViewStyle> = {
    opacity: cardTitleAnim,
    transform: [
      {
        translateY: cardTitleAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [-50, 0],
        }),
      },
    ],
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={keyboardAvoidingViewBehavior}>
        <Card
          animatedStyle={cardSlideInStyle}
          sharedElementId="card-enter"
          style={styles.card}>
          <Animated.View style={contentFadeStyle}>
            <Icon
              color={theme.iconOnCard}
              name="github"
              size={100}
              style={styles.icon}
            />
            <Animated.View style={titleStyle}>
              <Text style={[styles.text, textColor]}>GitHub Repositories</Text>
            </Animated.View>
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
          </Animated.View>
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
