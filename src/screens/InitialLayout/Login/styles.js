import { createStyles, maxWidth, maxHeight, } from 'react-native-media-queries';
import { COMFORTAA_LIGHT, PROBA_LIGHT, FUTURA_LIGHT, } from '@fonts'

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
    letterSpacing: 2,
  },
  dot: {
    width: '45',
    height: '45',
    cx: '25',
    cy: '25',
    r: '16',
  },
  idDots: {
    width: 380,
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 35,
  },
  loginCaption: {
    color: '#F7F7F7',
    fontSize: 13,
    fontFamily: PROBA_LIGHT,
    marginTop: 45,
  },
  lsNumpad: {
    width: 480,
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
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
  erase: {
    width: 32,
    height: 27,
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
      fontSize: 9,
      height: 0,
    },
    dot: {
      width: '30',
      height: '30',
      cx: '15',
      cy: '15',
      r: '11',
    },
    idDots: {
      width: 240,
      marginTop: 25,
    },
    lsNumpad: {
      width: 280,
      marginTop: -30,
    },
    lsNum: {
      width: 50,
      height: 60,
    },
    lsNumText: {
      fontSize: 25,
    },
    erase: {
      width: 20,
      height: 20,
      marginRight: 5,
    }
  })
);

export default styles