import { createStyles, maxWidth, maxHeight, } from 'react-native-media-queries';
import { GILROY_LIGHT, GILROY_REGULAR, GILROY_MEDIUM, GILROY_SEMIBOLD, PROBA_LIGHT, PROBA_REGULAR, PROBA_MEDIUM, } from '@fonts'
import { deviceWidth, deviceHeight, } from '@dimensions';

const base = {
  container: {
    backgroundColor: '#FFFFFF',
  },
  contentContainerStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  awareContentContainerStyles: {
    alignItems: 'center',
    paddingTop: deviceHeight * 0.15,
  },
  logoContainer: {
    position: 'absolute',
    top: deviceWidth * 0.03,
    left: deviceWidth * 0.03,
  },
  helpContainer: {
    position: 'absolute',
    top: deviceWidth * 0.03,
    right: deviceWidth * 0.03,
    padding: 10,
  },
  helpText: {
    color: '#343434',
    fontSize: 14,
    fontFamily: GILROY_REGULAR,
  },
  heading: {
    color: '#000000',
    fontSize: 26,
    fontFamily: GILROY_SEMIBOLD,
  },
  caption: {
    width: '40%',
    marginTop: 15,
    color: '#000000',
    fontSize: 16,
    fontFamily: GILROY_REGULAR,
    textAlign: 'center',
  },
  changeText: {
    color: '#000000',
    fontSize: 16,
    fontFamily: GILROY_REGULAR,
    textDecorationLine: 'underline',
  },
  midContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: deviceWidth * 0.65,
    height: deviceHeight * 0.5,
  },
  input: {
    textAlign: 'center',
    width: deviceWidth * 0.45,
    height: deviceWidth * 0.07,
    paddingHorizontal: 20,
    marginBottom: deviceWidth * 0.04,
    borderRadius: 5,
    backgroundColor: '#F2F2F2',

    color: '#000000',
    fontSize: 25,
    fontFamily: PROBA_REGULAR
  },
  clearButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: deviceWidth * 0.07,
    height: deviceWidth * 0.07,
  },
  submitButton: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    borderRadius: 100,
    backgroundColor: '#F2F2F2',
  },
  retryButton: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    marginTop: 40,
    borderRadius: 100,
    backgroundColor: '#F2F2F2',
  },
  errorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  llamaError: {
    width: deviceWidth * 0.2,
    height: deviceWidth * 0.2,
  },
};

const styles = createStyles(
  base,

  maxHeight(500, {
    loginHeading: {
      fontSize: 10,
    },
    loginHeadingSuper: {
      fontSize: 10,
    },
    loginCaption: {
      height: 50,
    },
    loginCaptionText: {
      fontSize: 15,
    },
    cameraContainer: {
      width: 300,
      height: 200,
      marginVertical: 25,
    },
    success: {
      width: 150,
      height: 150,
    },
    successImage: {
      width: 80,
      height: 80,
    }
  })
);

export default styles