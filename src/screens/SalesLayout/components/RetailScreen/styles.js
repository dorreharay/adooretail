import { createStyles, maxHeight, minWidth, maxWidth, } from 'react-native-media-queries';
import { COMFORTAA_LIGHT, FUTURA_LIGHT, } from '@fonts'

const base = {
  container: {
    flex: 1,
    flexDirection: 'row',
  },
};
 
const styles = createStyles(
  base,
 
  maxWidth(500, {
    
  })
);

export default styles