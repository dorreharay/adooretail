import { createStyles, maxWidth, maxHeight, } from 'react-native-media-queries';
import { EUCLID_LIGHT, EUCLID_REGULAR, EUCLID_MEDIUM } from '@fonts'
import { deviceWidth, deviceHeight, } from '@dimensions';

const base = {
  container: {

  },
  contentContainerStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  awareContentContainerStyles: {
    alignItems: 'center',
    paddingTop: deviceHeight * 0.25,
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
    fontFamily: EUCLID_REGULAR,
  },
  headingLogo: {
    width: 70,
    height: 70,
    marginBottom: 25,
  },
  heading: {
    width: '40%',
    marginBottom: 25,
    color: '#000000',
    fontSize: 20,
    fontFamily: EUCLID_MEDIUM,
    textAlign: 'center',
  },
  caption: {
    width: '60%',
    marginTop: 15,
    color: '#000000',
    fontSize: 16,
    fontFamily: EUCLID_REGULAR,
    textAlign: 'center',
  },
  changeText: {
    color: '#000000',
    fontSize: 16,
    fontFamily: EUCLID_REGULAR,
    textDecorationLine: 'underline',
  },
  midContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: deviceWidth * 0.65,
    height: deviceHeight * 0.5,
  },
  input: {
    width: deviceWidth * 0.38,
    height: deviceWidth * 0.06,
    paddingHorizontal: 30,
    marginBottom: deviceWidth * 0.02,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#C6C6C688',
    backgroundColor: '#FFFFFF',

    color: '#000000',
    fontSize: 16,
    fontFamily: EUCLID_REGULAR
  },
  inputLabelText: {
    marginBottom: 10,
    color: '#000000',
    fontSize: 12,
    fontFamily: EUCLID_LIGHT,
  },
  clearButton: {
    position: 'absolute',
    right: 0,
    top: 30,
    alignItems: 'center',
    justifyContent: 'center',
    width: deviceWidth * 0.06,
    height: deviceWidth * 0.05,
  },
  submitButton: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: deviceWidth * 0.38,
    height: 60,
    marginTop: 20,
    backgroundColor: '#18232B',
  },
  submitText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontFamily: EUCLID_REGULAR,
  },
  disabled: {
    backgroundColor: '#CCC'
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