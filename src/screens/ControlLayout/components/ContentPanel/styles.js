import { createStyles, maxHeight, minWidth, maxWidth, } from 'react-native-media-queries';
import { COMFORTAA_LIGHT, FUTURA_LIGHT, FUTURA_REGULAR, PROBA_REGULAR, PROBA_MEDIUM, } from '@fonts'

const base = {
  container: {
    height: '100%',
    backgroundColor: '#F7F7F7'
  },
  heading: {
    alignItems: 'center',
    flexDirection: 'row',
    margin: 40,
    marginLeft: 40,
    marginBottom: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: '7%',
    paddingHorizontal: 35,
    paddingRight: 0,
    backgroundColor: '#FFFFFF'
  },
  menuButton: {
    width: 40,
    height: '100%',
  },
  menuButtonText: {
    color: '#AEAFB1',
    fontSize: 16,
    fontFamily: PROBA_REGULAR,
  },
  leftButtonsContainer: {
    width: '30%',
  },
  rightButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '30%',
    height: '100%',
    marginRight: 20,
  },
  backButton: {
    paddingHorizontal: 15,
    height: '100%',
  },
  primaryColor: {
    color: '#565A5D',
    fontFamily: PROBA_MEDIUM,
  },
  headingText: {
    marginLeft: 15,
    color: '#343434',
    fontSize: 26,
    fontFamily: PROBA_REGULAR,
  }
};

const styles = createStyles(
  base,

  maxWidth(500, {

  })
);

export default styles