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
    accent: '#91B8D6',
    error: colors.danger,
    background: 'white',
  },
}
