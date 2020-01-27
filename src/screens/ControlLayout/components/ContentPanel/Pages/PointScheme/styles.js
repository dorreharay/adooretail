import { createStyles, maxHeight, minWidth, maxWidth, } from 'react-native-media-queries';
import { COMFORTAA_LIGHT, FUTURA_LIGHT, FUTURA_REGULAR, PROBA_REGULAR, GILROY_BOLD, PROBA_MEDIUM } from '@fonts'

const base = {
  container: {
    flex: 1,
    paddingHorizontal: 40,
    paddingBottom: 50,
  },
  dragContainer: {
    flex: 1,
    borderRadius: 5,
    // borderWidth: 1,
    borderColor: '#E7715E'
  },
  activeBlockBorder: {
    borderWidth: 2,
    borderColor: '#E7715E',
    borderRadius: 5,
  },
  block: {
    position: 'relative',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF'
  },
  doneButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 80,
    borderRadius: 3,
  },
  doneButtonText: {
    color: '#E7715E',
    fontSize: 18,
    fontFamily: PROBA_MEDIUM,
  },
  rightTopCorner: {
    position: 'absolute',
    top: -15,
    right: -15,
  },
  innerContainer: {

  },
  blockText: {
    color: '#E7715E',
    fontSize: 24,
    fontFamily: PROBA_MEDIUM,
  },
};

const styles = createStyles(
  base,

  maxWidth(500, {

  })
);

export default styles