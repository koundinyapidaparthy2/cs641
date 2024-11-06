import { Theme as NavigationTheme, DefaultTheme } from '@react-navigation/native';
import { opacity } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';

const colors = {
  primary: '#007bff',
  secondary: '#6c757d',
  background: '#f5f5f5',
  opacityBacground: 'rgba(0,0,0,0.3)',
  textPrimary: '#333',
  textSecondary: '#6c757d',
  link: '#007bff',
  white: '#fff',
  card: '#fff',
  border: '#ddd',
  notification: '#ff5252',
};

const fontSizes = {
  title: 24,
  body: 16,
  small: 14,
};

const spacing = {
  small: 8,
  medium: 16,
  large: 24,
};

const navigationTheme: NavigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    background: colors.background,
    card: colors.card,
    text: colors.textPrimary,
    border: colors.border,
    notification: colors.notification,
  },
};

const StyleTheme = {
  colors,
  fontSizes,
  spacing,
  navigationTheme,
  glowingText: {
    fontSize: fontSizes.title,
    color: colors.primary,

    textShadowRadius: 10,
  },
};

export default StyleTheme;
