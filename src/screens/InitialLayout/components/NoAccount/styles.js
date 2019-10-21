import { createStyles, maxHeight, minWidth, maxWidth, } from 'react-native-media-queries';
import { COMFORTAA_LIGHT, FUTURA_LIGHT, PROBA_REGULAR, } from '@fonts'

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
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '60%',
    height: '30%',
    marginVertical: 70,
  },
  account: {
    width: '31%',
    height: '100%',
  },
  accountItem: {
    width: '100%',
    height: '100%',
    borderRadius: 6,
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