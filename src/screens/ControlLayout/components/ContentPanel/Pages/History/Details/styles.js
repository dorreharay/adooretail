import { createStyles, maxWidth, } from 'react-native-media-queries';
import { COMFORTAA_LIGHT, FUTURA_LIGHT, FUTURA_REGULAR, PROBA_LIGHT, PROBA_REGULAR, PROBA_MEDIUM, } from '@fonts'

const base = {
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingTop: 20,
    paddingHorizontal: 45,
  },
  paymentHeadingText: {
    color: '#343434',
    fontSize: 20,
    fontFamily: PROBA_MEDIUM,
  },
  paymentDetails: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  paymentDetailsButton: {
    height: 40,
  },
  paymentDetailsButtonText: {
    color: '#343434',
    fontSize: 19,
    fontFamily: PROBA_LIGHT,
  },
  paymentDetailsHeadingText: {
    color: '#343434',
    fontSize: 22,
    fontFamily: PROBA_MEDIUM,
  },
  paymentDetailsText: {
    color: '#343434',
    fontSize: 22,
    fontFamily: PROBA_REGULAR,
  },
  menuMainButton: {
    color: '#343434',
    fontSize: 20,
    fontFamily: PROBA_REGULAR,
  },
  menuItemText: {
    color: '#343434',
    fontSize: 18,
    fontFamily: PROBA_REGULAR,
  }
};

const styles = createStyles(
  base,

 maxWidth(500, {

  })
);

export default styles