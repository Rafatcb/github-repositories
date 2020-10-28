export const ThemeColors = {
  border: {
    light: '#bb9eff',
  },
  buttonOnPrimary: {
    light: '#845ecb',
  },
  cardOnPrimary: {
    light: '#cdb8fc',
  },
  iconOnPrimary: {
    light: '#ffffff',
  },
  placeholder: {
    light: '#bb9eff',
  },
  primary: {
    light: '#6f42c1',
  },
  rippleOnCard: {
    light: '#f0e9f7',
  },
  rippleOnPrimary: {
    light: '#bb9eff',
  },
  selection: {
    light: '#bb9eff',
  },
  shadow: {
    light: '#000000',
  },
  textErrorOnPrimary: {
    light: '#cf6679',
  },
  textOnPrimary: {
    light: '#e1e1e1',
  },
  textPrimaryOnPrimary: {
    light: '#ffffff',
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
