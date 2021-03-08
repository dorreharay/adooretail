import { createStyles, maxWidth, } from 'react-native-media-queries';
import { MAZZARD_REGULAR, MAZZARD_MEDIUM, MAZZARD_SEMIBOLD } from '@fonts'

import { deviceWidth, deviceHeight, } from '@dimensions';

const base = {
  container: {
    flex: 1,
  },
  receiptContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
  },
  receiptScroll: {
    width: deviceWidth * 0.35,
    height: deviceWidth * 0.698,
  },
  receiptBlock: {
    alignItems: 'center',
    width: deviceWidth * 0.38,
    paddingTop: '10%',
    paddingBottom: '5%',
    backgroundColor: '#FFFFFF',
  },
  sideMenu: {
    width: deviceWidth * 0.25,
    height: '100%',
    padding: '3%',
    backgroundColor: '#FFFFFF',
  },
  sideMenuHeading: {
    marginBottom: 15,
    color: '#000000',
    fontSize: 26,
    fontFamily: MAZZARD_SEMIBOLD,
  },
  sideMenuButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: 50,
  },
  sideMenuRegular: {
    color: '#000000',
    fontSize: 18,
    fontFamily: MAZZARD_REGULAR,
  },
  heading: {
    color: '#000000',
    fontSize: 26,
    fontFamily: MAZZARD_SEMIBOLD,
  },
  subheading: {
    color: '#000000',
    fontSize: 18,
    fontFamily: MAZZARD_REGULAR,
  },
  regular: {
    color: '#000000',
    fontSize: 18,
    fontFamily: MAZZARD_REGULAR,
    lineHeight: 30,
  },
  devider: {
    width: '85%',
    height: 1,
    marginVertical: 5,
    borderWidth: 1,
    borderRadius: 10,
    borderStyle: 'dashed',
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    width: '85%',
  },
  subbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '50%',
  },
  bold: {
    color: '#000000',
    fontSize: 18,
    fontFamily: MAZZARD_SEMIBOLD,
    lineHeight: 30,
  },
  sideMenuTestButton: {
    position: 'absolute',
    bottom: 50,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 60,
    borderWidth: 1,
    borderRadius: 3,
  }
};

const styles = createStyles(
  base,

 maxWidth(500, {

  })
);

export default styles