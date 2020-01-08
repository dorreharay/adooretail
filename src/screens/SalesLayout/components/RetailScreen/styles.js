import { createStyles, maxHeight, minWidth, maxWidth, } from 'react-native-media-queries';
import { COMFORTAA_LIGHT, PROBA_LIGHT, PROBA_MEDIUM } from '@fonts'

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
    backgroundColor: '#00000066',
    zIndex: 10,
  },
  paymentModal: {
    width: 500,
    height: 550,
    paddingTop: 50,
    paddingBottom: 30,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    zIndex: 11,
  },
  paymentSubmitButton: {
    position: 'absolute',
    left: '7%',
    bottom: 15,
    width: '86%',
    height: 85,
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
    fontSize: 30,
    fontFamily: PROBA_MEDIUM,
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
  dot: {
    width: '60',
    height: '60',
    cx: '38',
    cy: '38',
    r: '35',
  },
  paymentTotalContainer: {
    width: '100%',
    paddingHorizontal: '4%',
    marginTop: 30
  },
  paymentTotalText: {
    marginBottom: 15,
    marginLeft: 20,
    fontSize: 30,
    fontFamily: PROBA_LIGHT,
  }
};

const styles = createStyles(
  base,

  maxWidth(500, {

  })
);

export default styles