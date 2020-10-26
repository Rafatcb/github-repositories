export const ThemeColors = {
  border: {
    light: '#bb9eff',
  },
  card: {
    light: '#6f42c1',
  },
  cardButton: {
    light: '#845ecb',
  },
  cardTitle: {
    light: '#ffffff',
  },
  iconOnCard: {
    light: '#ffffff',
  },
  placeholder: {
    light: '#bb9eff',
  },
  rippleOnCard: {
    light: '#bb9eff',
  },
  selection: {
    light: '#bb9eff',
  },
  shadow: {
    light: '#000000',
  },
  textErrorOnCard: {
    light: '#cf6679',
  },
  textOnCard: {
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
