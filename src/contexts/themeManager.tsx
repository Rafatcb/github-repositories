import React, { useContext } from 'react';

import type { Theme } from '../config/theme';
import { getTheme } from '../config/theme';

interface ThemeData {
  theme: Theme;
}

const mainTheme = 'light';

const ManageThemeContext = React.createContext<ThemeData>({} as ThemeData);

export const ThemeManager: React.FC = ({ children }) => {
  const theme = getTheme(mainTheme);

  return (
    <ManageThemeContext.Provider value={{ theme }}>
      {children}
    </ManageThemeContext.Provider>
  );
};

export const useTheme = (): ThemeData => {
  const context = useContext(ManageThemeContext);

  if (!context || Object.keys(context).length === 0) {
    throw new Error('useTheme must be used within a ThemeManager.');
  }

  return context;
};
