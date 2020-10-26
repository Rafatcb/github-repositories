import React, { useEffect, useMemo } from 'react';
import type { PressableAndroidRippleConfig } from 'react-native';
import { Pressable, StyleSheet, View } from 'react-native';

import type { StackScreenProps } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import type { SharedElementSceneComponent } from 'react-navigation-shared-element';
import { SharedElement } from 'react-navigation-shared-element';

import { useTheme } from '../contexts/themeManager';

import type { AppStackParamList } from '../routes/types';

type RepositoriesProps = StackScreenProps<AppStackParamList, 'Repositories'>;

const Repositories: SharedElementSceneComponent<RepositoriesProps> = ({
  navigation,
  route,
}) => {
  const { theme } = useTheme();

  const ripple: PressableAndroidRippleConfig = useMemo(
    () => ({ radius: 500, color: theme.rippleOnCard }),
    [theme.rippleOnCard],
  );

  const screenColor = useMemo(() => ({ backgroundColor: theme.card }), [
    theme.card,
  ]);

  useEffect(() => {
    if (!route.params) {
      navigation.goBack();
    }
  }, [navigation, route.params]);

  function handleBackPress() {
    navigation.goBack();
  }

  return (
    <SafeAreaView style={styles.container}>
      <SharedElement id="card-enter" style={styles.container}>
        <View style={[styles.sharedElement, screenColor]} />
      </SharedElement>
      <View style={styles.backContainer}>
        <Pressable
          android_ripple={ripple}
          onPress={handleBackPress}
          style={styles.back}>
          <Icon color={theme.textOnCard} name="arrow-left" size={32} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

Repositories.sharedElements = () => {
  return ['card-enter'];
};

const styles = StyleSheet.create({
  back: {
    padding: 4,
  },
  backContainer: {
    position: 'absolute',
    top: 16,
    left: 16,
    overflow: 'hidden',
    borderRadius: 32,
  },
  container: {
    flexGrow: 1,
  },
  sharedElement: {
    width: '100%',
    flexGrow: 1,
  },
});

export { Repositories };
