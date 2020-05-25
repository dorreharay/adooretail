import { createStyles, maxWidth, } from 'react-native-media-queries';
import { CIRCE_BOLD, FUTURA_LIGHT, FUTURA_REGULAR, PROBA_LIGHT, GILROY_REGULAR, GILROY_MEDIUM } from '@fonts'

const base = {
  container: {
    flex: 1,
    height: '90%',
    paddingVertical: 40,
    paddingHorizontal: 60,
  },
  switchText: {
    minWidth: '15%',
    fontSize: 18,
    fontFamily: GILROY_REGULAR,
  },
  settingsTitle: {
    marginBottom: 30,
    fontSize: 25,
    fontFamily: GILROY_MEDIUM,
  },
  buttonTitle: {
    color: 'red',
    fontSize: 25,
    fontFamily: GILROY_MEDIUM,
  },
  buttonsContainer: {
    flexDirection: 'row'
  },
  button: {
    paddingHorizontal: 30,
    paddingVertical: 18,
    borderWidth: 1,
    borderColor: '#000000',
  },
  buttonText: {
    color: '#000000',
    fontSize: 18,
    fontFamily: GILROY_REGULAR,
  },
  active: {
    backgroundColor: '#000000',
    borderColor: '#000000',
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