import { createStyles, maxHeight, minWidth, maxWidth, } from 'react-native-media-queries';
import { COMFORTAA_LIGHT, FUTURA_LIGHT, PROBA_LIGHT, PROBA_REGULAR, PROBA_MEDIUM, } from '@fonts'
import { deviceWidth } from '@dimensions';

const base = {
  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginHeading: {
    color: '#FFFFFF',
    fontSize: 20,
    fontFamily: COMFORTAA_LIGHT,
    letterSpacing: 1,
  },
  loginHeadingSuper: {
    color: '#FFFFFF',
    fontSize: 20,
    fontFamily: COMFORTAA_LIGHT,
    letterSpacing: 2,
  },
  loginHeadingCaption: {
    marginTop: 14,
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: COMFORTAA_LIGHT,
    letterSpacing: 1,
  },
  loginCaption: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
  },
  loginCaptionText: {
    width: 180,
    color: '#DADADA',
    fontSize: 22,
    fontFamily: FUTURA_LIGHT,
    lineHeight: 27,
    textAlign: 'center',
    textDecorationLine: 'underline'
  },
  accountsContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: deviceWidth * 0.6,
    height: '30%',
    // marginLeft: '1.5%',
    marginVertical: 70,
  },
  account: {
    alignItems: 'center',
    justifyContent: 'center',
    width: deviceWidth * 0.2,
    height: deviceWidth * 0.2,
  },
  accountItem: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    zIndex: 100,
  },
  imageContainer: {
    position: 'absolute',
    top: '6%',
    left: '6%',
    width: '88%',
    height: '88%',
    borderRadius: 10,
  },
  imageCover: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    borderRadius: 10,
    backgroundColor: '#12294666',
    zIndex: 1,
  },
  accountItemContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  accountItemBusinessName: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 27,
    fontFamily: PROBA_MEDIUM,
  },
  emptyAccountText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 70,
    fontFamily: PROBA_LIGHT,
  },
  cameraContainer: {
    width: 400,
    height: 300,
    marginVertical: 55,
    backgroundColor: '#000000'
  },
  inputContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 400,
    height: 300,
    marginTop: 30,
    marginVertical: 55,
  },
  input: {
    textAlign: 'center',
    width: '100%',
    height: 60,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: '#FFFFFF1A',

    color: '#FFFFFF',
    fontSize: 25,
    fontFamily: PROBA_REGULAR
  },
  success: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
    height: 300,
  }
};
 
const styles = createStyles(
  base,
 
  maxWidth(500, {
    loginHeading: {
      fontSize: 15,
    },
    loginHeadingSuper: {
      fontSize: 15,
    },
    loginCaption: {
      fontSize: 9,
    },
    dot: {
      width: '35',
      height: '35',
      cx: '20',
      cy: '20',
      r: '14',
    },
    idDots: {
      width: 320,
    },
    lsNumpad: {
      width: 380,
    },
    lsNum: {
      width: 80,
      height: 80,
    },
    lsNumText: {
      fontSize: 35,
    },
  })
);

export default styles