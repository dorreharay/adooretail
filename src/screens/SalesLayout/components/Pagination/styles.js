import { createStyles, maxWidth, } from 'react-native-media-queries';
import { GILROY_MEDIUM, GILROY_REGULAR, PROBA_LIGHT, PROBA_REGULAR, PROBA_MEDIUM } from '@fonts'

const base = {
  paginationContainer: {
    position: 'absolute',
    bottom: 50,
    width: 110,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  arrow: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#FFFFFF26',
  },
  bordered: {
    borderWidth: 2,
    borderColor: '#FFFFFF26',
    backgroundColor: '#FFFFFF00',
  }
};

const styles = createStyles(
  base,

 maxWidth(500, {

  })
);

export default styles