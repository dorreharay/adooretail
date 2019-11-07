import { Dimensions } from 'react-native'
import Orientation from 'react-native-orientation';

let deviceWidth = Dimensions.get('screen').width
let deviceHeight = Dimensions.get('screen').height

// Orientation.getOrientation((err, orientation) => {
//   if(orientation !== 'LANDSCAPE') {
//     Orientation.lockToLandscape();

//     deviceWidth = Dimensions.get('screen').width
//     deviceHeight = Dimensions.get('screen').height
//   }
// });

export {
  deviceWidth,
  deviceHeight,
}