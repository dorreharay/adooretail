import { createStyles, maxHeight, minWidth, maxWidth, } from 'react-native-media-queries';
import { COMFORTAA_LIGHT, FUTURA_LIGHT, FUTURA_REGULAR, PROBA_REGULAR, } from '@fonts'

const base = {
  container: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: '#FFFFFF'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingLeft: 7,
    paddingRight: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F4F4F4',
  },
  connectionText: {
    fontSize: 16,
    fontFamily: PROBA_REGULAR,
  }
};
 
const styles = createStyles(
  base,
 
  maxWidth(500, {
    
  })
);

export default styles