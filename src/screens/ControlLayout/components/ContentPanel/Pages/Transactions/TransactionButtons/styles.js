import { createStyles, maxWidth, } from 'react-native-media-queries';
import { COMFORTAA_LIGHT, FUTURA_LIGHT, GILROY_REGULAR, GILROY_MEDIUM, PROBA_REGULAR, PROBA_MEDIUM, } from '@fonts'

const base = {
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 30,
  },
  button: {
    height: 55,
    marginBottom: 10,
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
    fontFamily: GILROY_REGULAR,
  },
  activeButton: {
    color: '#E46162',
    fontFamily: GILROY_MEDIUM,
    textDecorationLine: 'underline'
  },
};

const styles = createStyles(
  base,

 maxWidth(500, {

  })
);

export default styles