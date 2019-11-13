import { createStyles, maxHeight, minWidth, maxWidth, } from 'react-native-media-queries';
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
    width:  380,
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
  startPagePrompt: {
    alignItems: 'center',
    position: 'absolute',
    top: 200,
    width: 280,
    height: 300,
    backgroundColor: '#D2D2D233',
    borderRadius: 3,
    zIndex: 100,
  },
  promptButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '86%',
    height: '40%',
    borderRadius: 3,
    backgroundColor: '#D2D2D233',
  },
  promptButtonText: {
    color: '#ffffff',
    fontSize: 20,
    fontFamily: FUTURA_LIGHT,
  },
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