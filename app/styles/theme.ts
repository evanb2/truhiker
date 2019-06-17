import { DefaultTheme, Theme } from 'react-native-paper'
import { colors } from './colors'

/**
 * Paper UI Theme
 */
export const theme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.gunmetalGrey,
    accent: 'darkseagreen',
    error: colors.danger,
    background: 'floralwhite',
  },
}
