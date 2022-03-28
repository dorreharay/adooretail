import { createStyles, maxHeight, } from 'react-native-media-queries';
import { GILROY_MEDIUM, GILROY_REGULAR, MUSEO_MEDIUM, } from '@fonts'

const leftPadding = '12%'

import { deviceWidth, deviceHeight } from '@dimensions'

const base = {
  serviceIcon: {
    width: 60,
    height: 60,
    backgroundColor: '#DDDDDD',
    borderRadius: 100,
  },
  contentContainerStyle: {
    paddingLeft: '6%',
    paddingRight: '10%',
    height: 80,
  },
  deliveryListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 80,
    paddingHorizontal: 15,
    borderRadius: 100,
  },
  frame: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 74,
    height: 74,
    borderWidth: 2.5,
    borderColor: '#FFFFFF00',
    borderRadius: 300,
  }
};

const styles = createStyles(
  base,

  maxHeight(500, {
    
  })
);

export default styles