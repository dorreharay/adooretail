import { createStyles, maxWidth, } from 'react-native-media-queries';
import { GILROY_REGULAR, GILROY_MEDIUM, } from '@fonts'

import { deviceHeight } from '@dimensions'

const base = {
  modal: {
    alignItems: 'center',
    height: '100%',
    paddingTop: 10,
    paddingBottom: 5,
  },
  pinHeading: {
    width: '100%',
    marginBottom: 10,
    color: '#000000',
    fontSize: 25,
    fontFamily: GILROY_MEDIUM,
    textAlign: 'center'
  },
  pinValues: {
    flexDirection: 'row',
  },
  pinItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 55,
    height: 55,
    marginHorizontal: 6,
    borderWidth: 2,
    borderColor: '#F1F1F1',
    borderRadius: 5,
  },
  pinValue: {
    color: '#000000',
    fontSize: 25,
    fontFamily: GILROY_MEDIUM,
  },
  pinKeys: {
    flex: 1,
    marginTop: 30,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pinKeysRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  pinKey: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 110,
    height: 65,
    marginHorizontal: 6,
    borderWidth: 2,
    borderColor: '#F2F2F2',
    borderRadius: 5,
  },
  pinKeyText: {
    color: '#000000',
    fontSize: 25,
    fontFamily: GILROY_REGULAR,
  },
};

const styles = createStyles(
  base,

  maxWidth(500, {

  })
);

export default styles