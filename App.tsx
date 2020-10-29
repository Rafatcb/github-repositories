import 'react-native-gesture-handler';
import React from 'react';

import DatabaseProvider from '@nozbe/watermelondb/DatabaseProvider';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ThemeManager } from './src/contexts/themeManager';

import { database } from './src/database/database';
import { Routes } from './src/routes';

const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      <ThemeManager>
        <DatabaseProvider database={database}>
          <Routes />
        </DatabaseProvider>
      </ThemeManager>
    </SafeAreaProvider>
  );
};

export default App;
