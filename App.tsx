import 'react-native-gesture-handler';
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ThemeManager } from './src/contexts/themeManager';

import { EnterAccount } from './src/pages/EnterAccount';

const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      <ThemeManager>
        <NavigationContainer>
          <EnterAccount />
        </NavigationContainer>
      </ThemeManager>
    </SafeAreaProvider>
  );
};

export default App;
