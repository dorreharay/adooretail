import { createStyles, maxHeight, minWidth, maxWidth, } from 'react-native-media-queries';
import { COMFORTAA_LIGHT, FUTURA_LIGHT, PROBA_LIGHT, PROBA_REGULAR, PROBA_MEDIUM, } from '@fonts'

const base = {
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 30,
  },
  button: {
    height: 55,
    marginRight: 10,
  },
  buttonInnerStyles: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    borderRadius: 3,
    paddingHorizontal: 30,
  },
  buttonText: {
    color: '#343434',
    fontSize: 22,
    fontFamily: PROBA_REGULAR,
  },
  activeButton: {
    color: '#FFFFFF',
    fontFamily: PROBA_MEDIUM,
  },
};

const styles = createStyles(
  base,

  maxWidth(500, {

  })
);

export default styles