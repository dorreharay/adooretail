import { createStyles, maxHeight, minWidth, maxWidth, } from 'react-native-media-queries';
import { COMFORTAA_LIGHT, PROBA_REGULAR, PROBA_MEDIUM } from '@fonts'

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
    paddingTop: 50,
    paddingBottom: 30,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    zIndex: 11,
  },
  paymentSubmitButton: {
    position: 'absolute',
    left: '7%',
    bottom: 0,
    width: '86%',
    height: 75,
  },
  paymentSubmitButtonGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
  paymentSubmitButtonText: {
    color: '#FFFFFF',
    fontSize: 30,
    fontFamily: PROBA_MEDIUM,
  },
  paymentHeadingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: '8%',
  },
  paymentHeadingText: {
    color: '#222222',
    fontSize: 50,
    fontFamily: PROBA_REGULAR,
  }
};
 
const styles = createStyles(
  base,
 
  maxWidth(500, {
    
  })
);

export default styles