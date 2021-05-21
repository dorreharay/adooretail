import { Platform } from 'react-native'

const COMFORTAA_LIGHT = Platform.OS === 'android' ? 'comfortaa_light' : 'Comfortaa-Light'
const COMFORTAA_REGULAR = Platform.OS === 'android' ? 'comfortaa_regular' : 'Comfortaa-Regular'

const PROBA_EXTRA_LIGHT = Platform.OS === 'android' ? 'probapro_extralight' : 'ProbaPro-ExtraLight'
const PROBA_LIGHT = Platform.OS === 'android' ? 'probapro_light' : 'ProbaPro-Light'
const PROBA_REGULAR = Platform.OS === 'android' ? 'probapro_regular' : 'ProbaPro-Regular'
const PROBA_MEDIUM = Platform.OS === 'android' ? 'probapro_medium' : 'ProbaPro-Medium'
const PROBA_BOLD = Platform.OS === 'android' ? 'probapro_bold' : 'ProbaPro-Bold'

const GILROY_LIGHT = Platform.OS === 'android' ? 'gilroy_light' : 'Gilroy-Light'
const GILROY_REGULAR = Platform.OS === 'android' ? 'gilroy_regular' : 'Gilroy-Regular'
const GILROY_MEDIUM = Platform.OS === 'android' ? 'gilroy_medium' : 'Gilroy-Medium'
const GILROY_SEMIBOLD = Platform.OS === 'android' ? 'gilroy_semibold' : 'Gilroy-SemiBold'
const GILROY_BOLD = Platform.OS === 'android' ? 'gilroy_bold' : 'Gilroy-Bold'

const EUCLID_LIGHT = Platform.OS === 'android' ? 'euclid_circular_light' : 'EuclidCircularA-Light'
const EUCLID_REGULAR = Platform.OS === 'android' ? 'euclid_circular_regular' : 'EuclidCircularA-Regular'
const EUCLID_MEDIUM = Platform.OS === 'android' ? 'euclid_circular_medium' : 'EuclidCircularA-Medium'
const EUCLID_SEMIBOLD = Platform.OS === 'android' ? 'euclid_circular_semibold' : 'EuclidCircularA-SemiBold'
const EUCLID_BOLD = Platform.OS === 'android' ? 'euclid_circular_bold' : 'EuclidCircularA-Bold'

export {
  COMFORTAA_LIGHT,
  COMFORTAA_REGULAR,

  GILROY_LIGHT,
  GILROY_REGULAR,
  GILROY_MEDIUM,
  GILROY_SEMIBOLD,
  GILROY_BOLD,

  EUCLID_LIGHT,
  EUCLID_REGULAR,
  EUCLID_MEDIUM,
  EUCLID_SEMIBOLD,
  EUCLID_BOLD
}