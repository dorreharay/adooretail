import { createStyles, maxHeight, } from 'react-native-media-queries';
import { COMFORTAA_LIGHT, GILROY_LIGHT, GILROY_REGULAR, } from '@fonts'

const base = {
  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '2%',
  },
  loginHeading: {
    color: '#FFFFFF',
    fontSize: 17,
    fontFamily: COMFORTAA_LIGHT,
    letterSpacing: 1,
  },
  loginHeadingSuper: {
    color: '#FFFFFF',
    fontSize: 17,
    fontFamily: COMFORTAA_LIGHT,
    letterSpacing: 1,
  },
  idDots: {
    width: 380,
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 50,
  },
  dot: {
    width: 27,
    height: 27.5,
  },
  loginCaption: {
    color: '#F7F7F7',
    fontSize: 45,
    fontFamily: GILROY_LIGHT,
    marginTop: 50,
  },
  lsNumpad: {
    width: 480,
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 30,
  },
  lsNum: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
    marginLeft: '5%',
    marginRight: '5%',
    borderRadius: 100,
  },
  lsNumText: {
    color: '#F6F6F6',
    fontSize: 40,
    fontFamily: GILROY_LIGHT,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    right: 50,
  },
  backButtonText: {
    color: '#F6F6F6',
    fontSize: 18,
    fontFamily: GILROY_REGULAR,
  },
  buttonImageKey: {
    width: 30,
    height: 30,
    marginRight: 5,
  },
  buttonImageArrow: {
    width: 34,
    height: 28,
    marginRight: 5,
  }
};

const styles = createStyles(
  base,

  maxHeight(1200, {
    loginHeading: {
      fontSize: 12,
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
      justifyContent: 'space-between',
      flexDirection: 'row',
      marginTop: 35,
    },
    loginCaption: {
      color: '#F7F7F7',
      fontSize: 45,
      fontFamily: GILROY_LIGHT,
      marginTop: 35,
    },
    lsNumpad: {
      width: 400,
      justifyContent: 'space-between',
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: 20,
    },
    lsNum: {
      alignItems: 'center',
      justifyContent: 'center',
      width: 90,
      height: 90,
      marginLeft: '5%',
      marginRight: '5%',
      borderRadius: 100,
    },
    lsNumText: {
      color: '#F6F6F6',
      fontSize: 36,
      fontFamily: GILROY_LIGHT,
      textAlign: 'center',
      textAlignVertical: 'center',
    },
    erase: {
      width: 32,
      height: 27,
      marginRight: 5,
    }
  }),

  maxHeight(500, {
    container: {
      paddingTop: 0,
    },
    loginHeading: {
      fontSize: 10,
    },
    loginHeadingSuper: {
      fontSize: 10,
    },
    loginCaption: {
      color: '#F7F7F7',
      fontSize: 25,
      fontFamily: COMFORTAA_LIGHT,
      marginTop: 20,
    },
    dot: {
      width: '20',
      height: '20',
      cx: '10',
      cy: '10',
      r: '9',
    },
    idDots: {
      width: 240,
    },
    lsNumpad: {
      width: 280,
      marginTop: 10,
    },
    lsNum: {
      width: 50,
      height: 60,
    },
    lsNumText: {
      fontSize: 25,
    },
    buttonImageKey: {
      width: 18,
      height: 18,
    },
    buttonImageArrow: {
      width: 20,
      height: 20,
    },
    backButton: {
      top: 25,
    },
    backButtonText: {
      fontSize: 14,
    },
  })
);

export default styles