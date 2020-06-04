import { createStyles, maxWidth, } from 'react-native-media-queries';
import { PROBA_REGULAR, PROBA_MEDIUM } from '@fonts'

import { deviceHeight } from '@dimensions'

const base = {
  container: {
    flex: 1,
  },
  slider: {
    height: deviceHeight,
    borderRadius: 50,
    zIndex: 1000,
  },
  goBack: {
    position: 'absolute',
    right: 40,
    top: 40,
    width: 50,
    height: 50,
  },
  accountHeading: {
    color: '#FFFFFF',
    fontSize: 30,
    fontFamily: PROBA_MEDIUM,
  },
  toastText: {
    marginBottom: 2,
    color: '#FFFFFF',
    fontSize: 17,
    fontFamily: PROBA_REGULAR,
  },
  addAccountSlide: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  }
};

const styles = createStyles(
  base,

 maxWidth(500, {

  })
);

export default styles