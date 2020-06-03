import { createStyles, maxHeight, } from 'react-native-media-queries';
import { PROBA_REGULAR, GILROY_REGULAR, GILROY_MEDIUM, GILROY_SEMIBOLD, } from '@fonts'

const leftPadding = '7.5%'

const base = {
  container: {
    position: 'relative',
    width: '68%',
    height: '100%',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  contentContainerStyle: {
    paddingLeft: leftPadding,
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
  headingCommentText: {
    paddingLeft: leftPadding,
    paddingTop: 0,
    paddingBottom: '1%',
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
    marginBottom: 20,
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
    width: 80,
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
  waitingText: {
    color: '#343434',
    fontSize: 25,
    fontFamily: GILROY_REGULAR,
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
    marginTop: 12,
    marginRight: '3.5%',
    paddingHorizontal: 20,
  },
  cancelButtonText: {
    color: '#343434',
    fontSize: 17,
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
    alignItems: 'center',
    width: '85%',
    height: 70,
    marginLeft: leftPadding,
    paddingHorizontal: 20,
    borderWidth: 1.5,
    borderColor: '#E3E3E3',
    borderRadius: 5,

    color: '#343434',
    fontSize: 20,
    fontFamily: PROBA_REGULAR,
    textAlignVertical: 'center'
  },
  optionHeadingContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: leftPadding,
    // marginTop: 25,
    marginBottom: 15,
  },
  optionHeadingText: {
    color: '#343434',
    fontSize: 25,
    fontFamily: GILROY_MEDIUM,
  },
  collapsibleContainer: {
    paddingBottom: 20,
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
  arrowStyles: {
    width: 13,
    height: 13,
    marginLeft: 10,
  },
  arrowCommentStyles: {
    width: 13,
    height: 13,
    marginLeft: '2%',
    marginTop: 0,
  },
  optionTypes: {
    flexDirection: 'row',
    paddingLeft: leftPadding,
  },
  optionType: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '20%',
    paddingVertical: 12,
    marginRight: 3,
    borderWidth: 1,
    borderRadius: 3,
  },
  optionTypeText: {
    color: '#000',
    fontSize: 15,
    fontFamily: GILROY_MEDIUM,
  },
};

const styles = createStyles(
  base,

  maxHeight(670, {
    // headingText: {
    //   paddingBottom: 0,
    //   fontSize: 20,
    // },
    arrowStyles: {
      width: 13,
      height: 13, 
      marginLeft: '2%',
      marginTop: '7.5%',
    },
    arrowCommentStyles: {
      width: 13,
      height: 13,
      marginLeft: '2%',
      marginTop: '4.1%',
    },
    discountWrapper: {
      paddingTop: '3%',
      paddingBottom: 0,
    }
  }),

  maxHeight(600, {
    optionHeadingContainer: {
      marginBottom: 10,
    },
    optionHeadingText: {
      fontSize: 22,
    },
    collapsibleContainer: {
      paddingBottom: 15,
    },
    arrowStyles: {
      width: 10,
      height: 10,
      marginLeft: 10,
    },
    toByPaidText: {
      fontSize: 20,
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
    discountItem: {
      width: 55,
      height: 55,
      marginRight: 10,
    },
    discountItemText: {
      fontSize: 17,
    },
    commentContainer: {
      height: 50,

      color: '#343434',
      fontSize: 15,
    },
    optionType: {
      width: '20%',
      paddingVertical: 8,
    },
    optionTypeText: {
      color: '#000',
      fontSize: 12,
      fontFamily: GILROY_MEDIUM,
    },
  })
);

export default styles