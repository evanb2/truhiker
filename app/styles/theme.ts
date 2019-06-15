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
    accent: 'rgb(64, 155, 99)',
    error: colors.danger,
    background: 'white',
  },
}
