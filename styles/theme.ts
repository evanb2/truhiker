import { DefaultTheme, Theme } from 'react-native-paper'
import { colors } from './colors'

/**
 * Paper UI Theme
 */
export const theme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(104, 88, 77)',
    accent: 'rgb(64, 155, 99)',
    error: colors.danger,
    background: 'white',
  },
}
