import { createStyles, maxWidth, } from 'react-native-media-queries';
import { CIRCE_BOLD, FUTURA_LIGHT, FUTURA_REGULAR, PROBA_LIGHT, GILROY_REGULAR, GILROY_MEDIUM } from '@fonts'

const base = {
  container: {
    flex: 1,
    height: '100%',
    paddingVertical: 40,
    paddingHorizontal: 60,
  },
  switchText: {
    minWidth: '15%',
    fontSize: 20,
    fontFamily: GILROY_REGULAR,
  },
  settingsTitle: {
    marginBottom: 30,
    fontSize: 25,
    fontFamily: GILROY_MEDIUM,
  },
  buttonsContainer: {
    flexDirection: 'row'
  },
  button: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: '#BFBFBF',
  },
  buttonText: {
    color: '#BFBFBF',
    fontSize: 18,
    fontFamily: GILROY_REGULAR,
  },
  active: {
    backgroundColor: '#E66960',
    borderColor: '#E66960',
  },
  activeText: {
    color: '#FFFFFF',
    fontFamily: GILROY_MEDIUM,
  },
};

const styles = createStyles(
  base,

 maxWidth(500, {

  })
);

export default styles