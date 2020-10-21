import React from 'react';
import { Text } from 'react-native';

import { ThemeManager } from './src/contexts/themeManager';

const App = () => {
  return (
    <ThemeManager>
      <Text>Empty content</Text>
    </ThemeManager>
  );
};

export default App;
