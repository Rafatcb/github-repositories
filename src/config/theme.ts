export const ThemeColors = {
  border: {
    light: '#bb9eff',
  },
  primary: {
    light: '#6f42c1',
  },
  selection: {
    light: '#bb9eff',
  },
  textOnPrimary: {
    light: '#e1e1e1',
  },
};

type ThemeColorsKeys = keyof typeof ThemeColors;

export type Theme = {
  [K in ThemeColorsKeys]: string;
};

export const getTheme = (mode: 'light'): Theme => {
  const theme: Theme = {} as Theme;
  Object.keys(ThemeColors).forEach(key => {
    theme[key as ThemeColorsKeys] = ThemeColors[key as ThemeColorsKeys][mode];
  });
  return theme;
};
