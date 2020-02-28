import { createStyles, maxHeight, } from 'react-native-media-queries';
import { COMFORTAA_LIGHT, GILROY_REGULAR, } from '@fonts'

const base = {
  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '2%',
  },
  loginHeading: {
    color: '#F7F7F7',
    fontSize: 17,
    fontFamily: COMFORTAA_LIGHT,
    letterSpacing: 1,
  },
  loginHeadingSuper: {
    color: '#F7F7F7',
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
    fontFamily: COMFORTAA_LIGHT,
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
    fontFamily: COMFORTAA_LIGHT,
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