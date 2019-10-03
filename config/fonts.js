import { Platform } from 'react-native'

const COMFORTAA_LIGHT = Platform.OS === 'android' ? 'comfortaa_light' : 'Comfortaa-Light'
const COMFORTAA_REGULAR = Platform.OS === 'android' ? 'comfortaa_regular' : 'Comfortaa-Regular'

const FUTURA_LIGHT = Platform.OS === 'android' ? 'futura_light' : 'FuturaLightC'

export {
  COMFORTAA_LIGHT,
  COMFORTAA_REGULAR,
  FUTURA_LIGHT,
}