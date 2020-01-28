import { createStyles, maxHeight, minWidth, maxWidth, } from 'react-native-media-queries';
import { COMFORTAA_LIGHT, GILROY_LIGHT, GILROY_REGULAR, PROBA_MEDIUM, } from '@fonts'

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
    fontFamily: GILROY_REGULAR,
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
    fontSize: 50,
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
    fontFamily: COMFORTAA_LIGHT,
    textAlign: 'center',
    textAlignVertical :'center',
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
  }
};
 
const styles = createStyles(
  base,
 
  maxWidth(500, {
    
  })
);

export default styles