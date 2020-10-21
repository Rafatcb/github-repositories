import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { EnterAccount } from './src/pages/EnterAccount';
import { ThemeManager } from './src/contexts/themeManager';

const App = () => {
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
