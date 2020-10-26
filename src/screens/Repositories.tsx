import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import type { StackScreenProps } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { SharedElementSceneComponent } from 'react-navigation-shared-element';
import { SharedElement } from 'react-navigation-shared-element';

import { useTheme } from '../contexts/themeManager';

import type { AppStackParamList } from '../routes/types';

type RepositoriesProps = StackScreenProps<AppStackParamList, 'Repositories'>;

// TODO `patch-package` to fix the following type
//  see https://github.com/IjzerenHein/react-navigation-shared-element/pull/112
const Repositories: SharedElementSceneComponent<RepositoriesProps> = () => {
  const { theme } = useTheme();

  const screenColor = useMemo(() => ({ backgroundColor: theme.card }), [
    theme.card,
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <SharedElement id="card-enter" style={styles.container}>
        <View style={[styles.sharedElement, screenColor]} />
      </SharedElement>
    </SafeAreaView>
  );
};

Repositories.sharedElements = () => {
  return ['card-enter'];
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  sharedElement: {
    width: '100%',
    flexGrow: 1,
  },
});

export { Repositories };
