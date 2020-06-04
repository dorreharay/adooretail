import { createStyles, maxWidth, } from 'react-native-media-queries';
import { GILROY_REGULAR, } from '@fonts'

const base = {
  toastText: {
    marginBottom: 2,
    color: '#FFFFFF',
    fontSize: 17,
    fontFamily: GILROY_REGULAR,
  },
};

const styles = createStyles(
  base,

 maxWidth(500, {

  })
);

export default styles