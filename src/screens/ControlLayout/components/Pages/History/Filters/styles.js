import { createStyles, maxWidth, } from 'react-native-media-queries';
import { GILROY_REGULAR, GILROY_MEDIUM, } from '@fonts'

const base = {
  container: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 0,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingVertical: 10,
  },
  buttonText: {
    color: '#000000',
    fontSize: 18,
    fontFamily: GILROY_MEDIUM,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
  },
  paymentDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
};

const styles = createStyles(
  base,

 maxWidth(500, {

  })
);

export default styles