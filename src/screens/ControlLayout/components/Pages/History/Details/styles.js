import { createStyles, maxWidth, } from 'react-native-media-queries';
import { GILROY_REGULAR, GILROY_MEDIUM, FUTURA_REGULAR, PROBA_LIGHT, PROBA_REGULAR, PROBA_MEDIUM, } from '@fonts'

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
    fontFamily: GILROY_MEDIUM,
  },
  paymentDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '40%',
    flexDirection: 'row',
    marginBottom: 20,
    paddingBottom: 7,
    borderBottomWidth: 0.5,
    borderBottomColor: '#CCC',
    borderBottomStyle: "dashed",
    borderBottomRadius: 1,
  },
  paymentDetailsButton: {
    height: 40,
  },
  paymentDetailsButtonText: {
    color: '#343434',
    fontSize: 19,
    fontFamily: GILROY_REGULAR,
  },
  paymentDetailsHeadingText: {
    color: '#343434',
    fontSize: 18,
    fontFamily: GILROY_REGULAR,
  },
  paymentDetailsText: {
    color: '#343434',
    fontSize: 18,
    fontFamily: GILROY_MEDIUM,
  },
  menuMainButton: {
    color: '#343434',
    fontSize: 20,
    fontFamily: GILROY_REGULAR,
  },
  menuItemText: {
    color: '#343434',
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