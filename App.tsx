import 'react-native-gesture-handler';
import React from 'react';

import CodePush from 'react-native-code-push';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ThemeManager } from './src/contexts/themeManager';

import { Routes } from './src/routes';

const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      <ThemeManager>
        <Routes />
      </ThemeManager>
    </SafeAreaProvider>
  );
};

export default CodePush(App);
