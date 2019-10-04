import { createStyles, maxHeight, minWidth, maxWidth, } from 'react-native-media-queries';
import { COMFORTAA_LIGHT, FUTURA_LIGHT, } from '../../../../../../../config/fonts'

const base = {
  container: {
    flex: 1,
    flexGrow: 2,
    backgroundColor: '#F4F4F4'
  },
};
 
const styles = createStyles(
  base,
 
  maxWidth(500, {
    
  })
);

export default styles