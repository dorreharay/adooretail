import { createStyles, maxWidth, } from 'react-native-media-queries';
import { CIRCE_REGULAR, FUTURA_LIGHT, FUTURA_REGULAR, PROBA_REGULAR, PROBA_MEDIUM, PROBA_BOLD, } from '@fonts'

const base = {
  container: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: '8%',
    paddingHorizontal: 30,
    backgroundColor: '#343434'
  },
  backButton: {
    flexDirection: 'row',
  },
  backButtonInner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backIcon: {
    width: 18,
    height: 18,
    marginRight: 10,
  },
  backIconText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontFamily: CIRCE_REGULAR,
  },
  accountName: {
    color: '#FFFFFF',
    fontSize: 15,
    fontFamily: CIRCE_REGULAR,
  },
  accountIcon: {
    width: 15,
    height: 15,
    marginRight: 10,
  },
};

const styles = createStyles(
  base,

 maxWidth(500, {

  })
);

export default styles