import { createStyles, maxHeight, } from 'react-native-media-queries';
import { GILROY_REGULAR, GILROY_MEDIUM, GILROY_BOLD, PROBA_MEDIUM, } from '@fonts'

import { deviceWidth, deviceHeight } from '@dimensions'

const base = {
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 3000,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 10,
  },
  touchWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#00000088',
    zIndex: 11,
  },
  container: {
    flexDirection: 'row',
    width: deviceHeight * 1.1,
    height: deviceHeight * 0.9,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    zIndex: 12,
  },
  headingText: {
    color: '#343434',
    fontSize: 28,
    fontFamily: GILROY_BOLD,
  },
  leftSide: {
    justifyContent: 'center',
    width: '70%',
    height: '100%',
    padding: '5%',
    paddingTop: 25,
    backgroundColor: '#FFFFFF00',
  },
  rightSide: {
    width: '30%',
    height: '100%',
    paddingTop: 25,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    backgroundColor: '#181619',
  },
  typeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 25,
    paddingLeft: '14%',
    backgroundColor: '#00000000',
  },
  typeItemActive: {
    backgroundColor: '#2E2C2E66',
  },
  typeItemText: {
    color: '#575757',
    fontSize: 18,
    fontFamily: GILROY_MEDIUM,
  },
  typeItemTextActive: {
    color: '#FFFFFF',
  },
  smallHeader: {
    marginTop: '6%',
    color: '#343434',
    fontSize: 16,
    fontFamily: GILROY_MEDIUM,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '3%',
  },
  amountInput: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    width: '40%',
    height: 65,
    paddingHorizontal: 25,
    marginRight: 15,
    borderWidth: 3,
    borderColor: '#F3F4F6',
    borderRadius: 5,

    color: '#343434',
    fontSize: 25,
    fontFamily: GILROY_MEDIUM,
  },
  amountCurrency: {
    color: '#343434',
    fontSize: 25,
    fontFamily: GILROY_MEDIUM,
  },
  commentInput: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    width: '97%',
    height: '31%',
    marginTop: '3%',
    marginRight: 15,
    paddingTop: '5%',
    paddingBottom: '5%',
    padding: '5%',
    borderWidth: 3,
    borderColor: '#F3F4F6',
    borderRadius: 3,

    color: '#343434',
    fontSize: 25,
    fontFamily: GILROY_REGULAR,
    textAlignVertical: 'top'
  },
  submitButton: {
    position: 'absolute',
    bottom: -1,
    width: '100%',
    backgroundColor: '#2E2C2E',
  },
  submitButtonGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  submitButtonText: {
    color: '#6C6C6C',
    fontSize: 20,
    fontFamily: GILROY_MEDIUM,
  },
  closeButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  closeText: {
    color: '#343434',
    fontSize: 18,
    fontFamily: GILROY_REGULAR,
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
    fontSize: 26,
    fontFamily: GILROY_MEDIUM,
  },
};

const styles = createStyles(
  base,

  maxHeight(500, {
    container: {
      flexDirection: 'row',
      width: deviceWidth * 0.7,
      height: deviceHeight * 0.80,
    },
    amountInput: {
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'flex-start',
      width: 80,
      height: 55,
    },
    commentInput: {
      marginTop: '6%',
    },
  }),

  maxHeight(500, {

  })
);

export default styles