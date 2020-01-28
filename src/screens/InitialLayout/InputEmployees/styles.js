import { createStyles, maxHeight, minWidth, maxWidth, } from 'react-native-media-queries';
import { COMFORTAA_LIGHT, GILROY_REGULAR, FUTURA_LIGHT, } from '@fonts'

const base = {
  container: { 
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginHeading: {
    color: '#ffffff',
    fontSize: 17,
    fontFamily: GILROY_REGULAR,
    letterSpacing: 1,
  },
  proceedButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    marginTop: 45,
    borderRadius: 25,
    backgroundColor: '#D2D2D226',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    right: 50,
  },
  backButtonText: {
    color: '#F6F6F6',
    fontSize: 18,
    fontFamily: GILROY_REGULAR,
  }
};
 
const styles = createStyles(
  base,
 
  maxWidth(500, {
    
  })
);

export default styles