import { Platform } from 'react-native'

const MAZZARD_LIGHT = Platform.OS === 'android' ? 'mazzard_light' : 'MazzardM-Light'
const MAZZARD_REGULAR = Platform.OS === 'android' ? 'mazzard_regular' : 'MazzardM-Regular'
const MAZZARD_MEDIUM = Platform.OS === 'android' ? 'mazzard_medium' : 'MazzardM-Medium'
const MAZZARD_SEMIBOLD = Platform.OS === 'android' ? 'mazzard_semibold' : 'MazzardM-SemiBold'

export {
  MAZZARD_LIGHT,
  MAZZARD_REGULAR,
  MAZZARD_MEDIUM,
  MAZZARD_SEMIBOLD,
}