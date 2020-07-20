import { createStyles, maxWidth, } from 'react-native-media-queries';
import { GILROY_MEDIUM, GILROY_REGULAR, PROBA_LIGHT, PROBA_MEDIUM } from '@fonts'

import { deviceWidth, deviceHeight } from '@dimensions'

const base = {
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  paymentWrapperContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 10,
  },
  paymentWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#0000008C',
    zIndex: 10,
  },
  paymentModal: {
    flexDirection: 'row',
    width: 760,
    height: 660,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    zIndex: 20,
  },
  paymentSubmitButton: {
    position: 'absolute',
    left: '7.5%',
    bottom: 40,
    width: '85%',
    height: 80,
  },
  paymentSubmitButtonGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    paddingBottom: 5,
    borderRadius: 5,
  },
  paymentSubmitButtonText: {
    color: '#FFFFFF',
    fontSize: 26,
    fontFamily: GILROY_MEDIUM,
  },
  paymentHeadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: '8%',
  },
  paymentHeadingText: {
    color: '#222222',
    fontSize: 50,
    fontFamily: PROBA_LIGHT,
  },
  paymentCloseButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
  },
  paymentTypesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    paddingTop: '6%',
    paddingHorizontal: '7%',
  },
  paymentType: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    borderRadius: 5,
  },
  paymentTypeName: {
    marginHorizontal: 15,
    color: '#343434',
    fontSize: 32,
    fontFamily: PROBA_LIGHT,
  },
};

const styles = createStyles(
  base,

 maxWidth(500, {

  })
);

export default styles