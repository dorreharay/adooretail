import { createStyles, maxWidth, } from 'react-native-media-queries';
import { MAZZARD_REGULAR, MAZZARD_MEDIUM, MAZZARD_REGULAR, MAZZARD_MEDIUM, } from '@fonts'

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
    fontFamily: MAZZARD_MEDIUM,
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
    fontFamily: MAZZARD_REGULAR,
  },
  paymentDetailsHeadingText: {
    color: '#343434',
    fontSize: 18,
    fontFamily: MAZZARD_REGULAR,
  },
  paymentDetailsText: {
    color: '#343434',
    fontSize: 18,
    fontFamily: MAZZARD_MEDIUM,
  },
  menuMainButton: {
    color: '#343434',
    fontSize: 20,
    fontFamily: MAZZARD_REGULAR,
  },
  menuItemText: {
    color: '#343434',
    fontSize: 18,
    fontFamily: MAZZARD_REGULAR,
  }
};

const styles = createStyles(
  base,

 maxWidth(500, {

  })
);

export default styles