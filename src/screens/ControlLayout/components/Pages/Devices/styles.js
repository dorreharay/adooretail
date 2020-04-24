import { createStyles, maxWidth, } from 'react-native-media-queries'
import { COMFORTAA_LIGHT, GILROY_REGULAR, GILROY_MEDIUM, PROBA_REGULAR, PROBA_MEDIUM, } from '@fonts'

const base = {
  container: {
    flex: 1,
    paddingTop: '3%',
    paddingHorizontal: '5%',
  },
  screenHeading: {
    marginBottom: 30,
    color: '#343434',
    fontSize: 32,
    fontFamily: GILROY_REGULAR,
  },
};

const styles = createStyles(
  base,

 maxWidth(500, {

  })
);

export default styles