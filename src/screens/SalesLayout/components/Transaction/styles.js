import { createStyles, maxHeight } from 'react-native-media-queries';
import { GILROY_REGULAR, GILROY_MEDIUM, GILROY_BOLD } from '@fonts';

import { deviceWidth, deviceHeight } from '@dimensions';

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
    width: deviceHeight,
    height: deviceHeight * 0.8,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    zIndex: 12,
  },
  headingText: {
    color: '#343434',
    fontSize: 24,
    fontFamily: GILROY_BOLD,
  },
  leftSide: {
    width: '70%',
    height: '100%',
    padding: '5%',
    paddingTop: 30,
    backgroundColor: '#FFFFFF00',
  },
  rightSide: {
    width: '30%',
    height: '100%',
    paddingTop: 5,
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
    fontSize: 14,
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
    width: '35%',
    height: 55,
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
    fontSize: 18,
    fontFamily: GILROY_MEDIUM,
  },
  commentInput: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    width: '100%',
    height: 100,
    marginTop: '3%',
    marginRight: 15,
    paddingTop: '5%',
    paddingBottom: '5%',
    padding: '5%',
    borderWidth: 3,
    borderColor: '#F3F4F6',
    borderRadius: 3,

    color: '#343434',
    fontSize: 20,
    fontFamily: GILROY_REGULAR,
    textAlignVertical: 'top',
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
  transactionSubmitButton: {
    width: '100%',
    height: 70,
    marginTop: 40,
  },
  transactionSubmitButtonGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
  transactionSubmitButtonText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontFamily: GILROY_MEDIUM,
  },
};

const styles = createStyles(
  base,

  maxHeight(500, {
  }),

  maxHeight(500, {}),
);

export default styles;
