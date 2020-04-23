import { createStyles, maxHeight, } from 'react-native-media-queries';
import { GILROY_REGULAR, GILROY_MEDIUM, PROBA_LIGHT, PROBA_REGULAR, PROBA_MEDIUM, } from '@fonts'

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
    width: deviceWidth * 0.7,
    height: deviceHeight * 0.75,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    zIndex: 12,
  },
  headingText: {
    color: '#343434',
    fontSize: 25,
    fontFamily: GILROY_MEDIUM,
  },
  leftSide: {
    width: '70%',
    height: '100%',
    padding: '5%',
    paddingTop: '3%',
    backgroundColor: '#FFFFFF00',
  },
  rightSide: {
    width: '30%',
    height: '100%',
    paddingTop: '5%',
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
    backgroundColor: '#2E2C2E',
  },
  typeItemText: {
    color: '#575757',
    fontSize: 22,
    fontFamily: GILROY_MEDIUM,
  },
  typeItemTextActive: {
    color: '#FFFFFF',
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '7%',
  },
  amountInput: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    width: 100,
    height: 65,
    marginRight: 15,
    borderWidth: 1.5,
    borderColor: '#343434',
    borderRadius: 3,

    color: '#343434',
    fontSize: 25,
    fontFamily: GILROY_MEDIUM,
  },
  commentInput: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    width: '97%',
    height: '40%',
    marginTop: '10%',
    marginRight: 15,
    paddingTop: '5%',
    paddingBottom: '5%',
    padding: '5%',
    borderWidth: 1.5,
    borderColor: '#343434',
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
    height: 70,
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
    fontSize: 20,
    fontFamily: GILROY_REGULAR,
  }
};

const styles = createStyles(
  base,

  maxHeight(670, {
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