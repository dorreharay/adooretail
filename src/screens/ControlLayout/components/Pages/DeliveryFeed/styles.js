import { createStyles, maxWidth, } from 'react-native-media-queries'
import { GILROY_MEDIUM, } from '@fonts'

const base = {
  container: {
    flex: 1,
  },
  emptySpace: {
    width: '100%',
    height: '12%',
  },
  content: {
    width: '100%',
    height: '88%',
    borderTopWidth: 1,
    borderTopColor: '#E9E9E9',
  },
  deliveryItem: {
    width: 400,
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRightWidth: 0.5,
    borderRightColor: '#E9E9E9',
  },
  deliveryItemHeading: {
    paddingVertical: '3%',
    justifyContent: 'center',
    width: '100%',
    height: 90,
    paddingHorizontal: '5%',
    borderBottomWidth: 1,
    borderBottomColor: '#E9E9E9',
  },
  orderId: {
    width: '50%',
    color: '#343434',
    fontSize: 17,
    fontFamily: GILROY_MEDIUM,
  },
  orderTime: {
    width: '40%',
    color: '#C4C4C4',
    fontSize: 17,
    fontFamily: GILROY_MEDIUM,
    textAlign: 'right',
  }
};

const styles = createStyles(
  base,

 maxWidth(500, {

  })
);

export default styles