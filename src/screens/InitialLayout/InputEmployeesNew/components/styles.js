import { createStyles, maxHeight, } from 'react-native-media-queries';
import { GILROY_LIGHT, GILROY_REGULAR, GILROY_MEDIUM, GILROY_SEMIBOLD, } from '@fonts'

import { deviceWidth, deviceHeight, } from '@dimensions'

const base = {
  сontainer: {
    width: '70%',
    marginVertical: 20,
  },
  contentContainerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: 200,
    marginVertical: 20,
  },
  card: {
    width: deviceWidth * 0.18,
    height: deviceWidth * 0.18,
    borderRadius: 6,
    backgroundColor: '#FFFFFF15',
  },
  cardImage: {
    width: '100%',
    height: '70%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: '#FFFFFF15',
  },
  cardTitle: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: '10%',
  },
  cardText: {
    color: '#F6F6F6',
    fontSize: 20,
    fontFamily: GILROY_MEDIUM,
  },
};

const styles = createStyles(
  base,

  maxHeight(500, {

  })
);

export default styles