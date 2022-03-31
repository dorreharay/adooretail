import { createStyles, maxHeight, } from 'react-native-media-queries';
import { GILROY_MEDIUM, GILROY_REGULAR, MUSEO_MEDIUM, } from '@fonts'

const leftPadding = '12%'

import { deviceWidth, deviceHeight } from '@dimensions'

const base = {
  serviceIcon: {
    width: 50,
    height: 50,
    backgroundColor: '#DDDDDD',
    borderRadius: 100,
  },
  contentContainerStyle: {
    paddingLeft: '6%',
    paddingRight: '5%',
    height: 70,
  },
  deliveryListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 70,
    paddingHorizontal: 15,
    borderRadius: 100,
  },
  frame: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 64,
    height: 64,
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