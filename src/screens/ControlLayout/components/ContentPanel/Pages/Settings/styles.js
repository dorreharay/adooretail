import { createStyles, maxHeight, minWidth, maxWidth, } from 'react-native-media-queries';
import { COMFORTAA_LIGHT, FUTURA_LIGHT, FUTURA_REGULAR, PROBA_LIGHT, PROBA_REGULAR, PROBA_MEDIUM, } from '@fonts'

const base = {
  container: {
    flex: 1,
    height: '100%',
    paddingVertical: 60,
    paddingHorizontal: 60,
  },
  switchText: {
    fontSize: 20,
    fontFamily: PROBA_REGULAR,
  },
  settingsTitle: {
    marginBottom: 40,
    fontSize: 30,
    fontFamily: PROBA_MEDIUM,
  }
};

const styles = createStyles(
  base,

  maxWidth(500, {

  })
);

export default styles