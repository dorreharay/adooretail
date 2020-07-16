import { createStyles, maxWidth, } from 'react-native-media-queries';
import { PROBA_REGULAR, PROBA_MEDIUM } from '@fonts'

import { deviceHeight } from '@dimensions'

const base = {
  container: {
    flex: 1,
    flexDirection: 'row',
  },
};

const styles = createStyles(
  base,

 maxWidth(500, {

  })
);

export default styles