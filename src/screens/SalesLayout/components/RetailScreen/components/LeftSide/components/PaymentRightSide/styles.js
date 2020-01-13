import { createStyles, maxHeight, minWidth, maxWidth, } from 'react-native-media-queries';
import { COMFORTAA_LIGHT, FUTURA_LIGHT, FUTURA_REGULAR, PROBA_LIGHT, GILROY_REGULAR, GILROY_MEDIUM, } from '@fonts'

const leftPadding = '7.5%'

const base = {
  container: {
    position: 'relative',
    width: '68%',
    height: '100%',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  heading: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
    paddingRight: '3%',
  },
  headingText: {
    paddingLeft: leftPadding,
    paddingTop: '7%',
    paddingBottom: '5%',
    color: '#343434',
    fontSize: 25,
    fontFamily: GILROY_MEDIUM,
  },
  toByPaid: {
    borderLeftWidth: 1,
    borderColor: '#D6D6D6',
    paddingLeft: 20,
    paddingVertical: 6,
    marginLeft: leftPadding,
    marginTop: '2%',
  },
  toByPaidText: {
    color: '#343434',
    fontSize: 25,
    fontFamily: GILROY_REGULAR,
  },
  secondContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 25,
    height: 50,
    paddingLeft: leftPadding,
  },
  statusDot: {
    width: 30,
    height: 30,
    marginRight: 15,
    borderRadius: 100,
  },
  paidInput: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 15,
    borderWidth: 1.5,
    borderColor: '#343434',
    borderRadius: 3,

    color: '#343434',
    fontSize: 25,
    fontFamily: GILROY_MEDIUM,
  },
  paidText: {
    color: '#343434',
    fontSize: 25,
    fontFamily: GILROY_REGULAR,
    lineHeight: 30,
  },
  changeText: {
    color: '#9A9A9A',
    fontSize: 20,
    fontFamily: GILROY_REGULAR,
    lineHeight: 27,
  },
  cancelButton: {
    height: 50,
    paddingTop: 3,
    paddingHorizontal: 20,
  },
  cancelButtonText: {
    color: '#343434',
    fontSize: 15,
    fontFamily: GILROY_REGULAR,
  },
  orderContainer: {
    width: '85%',
    height: '7%',
    marginLeft: leftPadding,
    borderWidth: 1.5,
    borderColor: '#E3E3E3',
    borderRadius: 5,
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: 60,
    paddingHorizontal: '5%',
    borderWidth: 1,
    borderColor: '#F3F3F3'
  },
  orderItemText: {
    color: '#343434',
    fontSize: 18,
    fontFamily: GILROY_REGULAR,
  },
  cancelPaymentProcessButton: {
    padding: 10,
  },
  cancelPaymentProcessText: {
    color: '#343434',
    fontSize: 15,
    fontFamily: GILROY_REGULAR,
  },
  discountContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '80%',
  },
  cameraContainer: {
    width: '80%',
    height: '80%',
    backgroundColor: '#181619'
  },
};
 
const styles = createStyles(
  base,
 
  maxWidth(500, {
    
  })
);

export default styles