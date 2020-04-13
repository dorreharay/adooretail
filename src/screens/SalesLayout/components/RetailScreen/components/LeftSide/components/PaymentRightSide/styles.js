import { createStyles, maxHeight, } from 'react-native-media-queries';
import { PROBA_REGULAR, GILROY_REGULAR, GILROY_MEDIUM, MUSEO_REGULAR, MUSEO_MEDIUM, } from '@fonts'

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
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    marginTop: 7,
    marginRight: '3.5%',
    paddingHorizontal: 20,
  },
  cancelButtonText: {
    color: '#343434',
    fontSize: 15,
    fontFamily: GILROY_REGULAR,
  },
  discountContainer: {
    width: '85%',
    marginLeft: leftPadding,
  },
  activeDiscountItem: {
    borderColor: '#E35E62',
  },
  activeDiscountItemText: {
    color: '#E35E62',
  },
  commentContainer: {
    width: '85%',
    height: 70,
    marginLeft: leftPadding,
    paddingTop: 20,
    padding: 20,
    borderWidth: 1.5,
    borderColor: '#E3E3E3',
    borderRadius: 5,

    color: '#343434',
    fontSize: 20,
    fontFamily: PROBA_REGULAR,
  },
  discountItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 65,
    height: 65,
    marginRight: 15,
    borderWidth: 2,
    borderColor: '#E3E3E3',
    borderRadius: 100,
  },
  discountItemText: {
    color: '#CFCFCF',
    fontSize: 20,
    fontFamily: GILROY_MEDIUM,
  },
  orderContainer: {
    width: '85%',
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
    maxHeight: 100,
    paddingHorizontal: '5%',
    borderWidth: 1,
    borderColor: '#F3F3F3'
  },
  orderItemText: {
    color: '#343434',
    fontSize: 18,
    fontFamily: PROBA_REGULAR,
  },
  cancelPaymentProcessButton: {
    padding: 10,
  },
  cancelPaymentProcessText: {
    color: '#343434',
    fontSize: 15,
    fontFamily: PROBA_REGULAR,
  },
  cameraContainer: {
    width: '70%',
    height: '70%',
    backgroundColor: '#181619',
  },
};

const styles = createStyles(
  base,

  maxHeight(500, {
    headingText: {
      paddingTop: '2%',
      paddingBottom: 0,
      fontSize: 15,
    },
    toByPaidText: {
      fontSize: 15,
    },
    paidText: {
      fontSize: 20,
      lineHeight: 20,
    },
    changeText: {
      fontSize: 15,
      lineHeight: 27,
    },
    paidInput: {
      color: '#343434',
      fontSize: 20,
      fontFamily: GILROY_MEDIUM,
    },
  })
);

export default styles