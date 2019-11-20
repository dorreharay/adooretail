import { createStyles, maxHeight, minWidth, maxWidth, } from 'react-native-media-queries';
import { COMFORTAA_LIGHT, FUTURA_LIGHT, } from '@fonts'

const base = {
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  paymentWrapperContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 10,
  },
  paymentWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#00000066',
    zIndex: 10,
  },
  paymentModal: {
    width: 500,
    height: 550,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    zIndex: 11,
  }
};
 
const styles = createStyles(
  base,
 
  maxWidth(500, {
    
  })
);

export default styles