import { Platform } from 'react-native'

const COMFORTAA_LIGHT = Platform.OS === 'android' ? 'comfortaa_light' : 'Comfortaa-Light'
const COMFORTAA_REGULAR = Platform.OS === 'android' ? 'comfortaa_regular' : 'Comfortaa-Regular'

const FUTURA_LIGHT = Platform.OS === 'android' ? 'futura_light' : 'FuturaLightC'
const FUTURA_REGULAR = Platform.OS === 'android' ? 'futura_regular' : 'Futura'

const PROBA_EXTRA_LIGHT = Platform.OS === 'android' ? 'probapro_extralight' : 'ProbaPro-ExtraLight'
const PROBA_LIGHT = Platform.OS === 'android' ? 'probapro_light' : 'ProbaPro-Light'
const PROBA_REGULAR = Platform.OS === 'android' ? 'probapro_regular' : 'ProbaPro-Regular'
const PROBA_MEDIUM = Platform.OS === 'android' ? 'probapro_medium' : 'ProbaPro-Medium'
const PROBA_BOLD = Platform.OS === 'android' ? 'probapro_bold' : 'ProbaPro-Bold'

export {
  COMFORTAA_LIGHT,
  COMFORTAA_REGULAR,

  FUTURA_LIGHT,
  FUTURA_REGULAR,

  PROBA_EXTRA_LIGHT,
  PROBA_LIGHT,
  PROBA_REGULAR,
  PROBA_MEDIUM,
  PROBA_BOLD,
}