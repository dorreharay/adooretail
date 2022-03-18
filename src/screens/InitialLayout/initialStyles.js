import { createStyles, maxHeight, } from 'react-native-media-queries';
import { GILROY_REGULAR, GILROY_MEDIUM, GILROY_SEMIBOLD } from '@fonts'

import { deviceWidth } from '@dimensions';

const base = {
  container: {
    flex: 1,
    padding: deviceWidth * 0.05,
    backgroundColor: '#FFFFFF',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  heading: {
    width: '40%',
    color: '#000000',
    fontSize: 25,
    fontFamily: GILROY_SEMIBOLD,
  },
  caption: {
    width: '42%',
    height: 24,
    marginTop: '2%',
    color: '#000000',
    fontSize: 16,
    fontFamily: GILROY_REGULAR,
    lineHeight: 20,
  },
  helpButton: {
    marginTop: -20,
    marginRight: -20,
    padding: 20,
  },
  helpText: {
    color: '#343434',
    fontSize: 16,
    fontFamily: GILROY_REGULAR,
  },
  list: {
    width: '32%',
    height: '60%',
    marginTop: '2%',
  },
  listItem: {
    flexDirection: 'row',
    width: '100%',
    marginVertical: 10,
  },
  listItemText: {
    marginLeft: 15,
    color: '#000000',
    fontSize: 16,
    fontFamily: GILROY_REGULAR,
    lineHeight: 24,
  },
  proceedButton: {
    width: 120,
    height: 50,
  },
  proceedButtonGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
  proceedButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontFamily: MAZZARD_MEDIUM,
  },
  tabletImage: {
    position: 'absolute',
    bottom: -deviceWidth * 0.03,
    right: -deviceWidth * 0.07,
    width: deviceWidth * 0.65,
    height: deviceWidth * 0.55,
  },
  phoneImage: {
    position: 'absolute',
    bottom: -deviceWidth * 0.02,
    right: deviceWidth * 0.15,
    width: deviceWidth * 0.35,
    height: deviceWidth * 0.6,
  },
};

const styles = createStyles(
  base,

  maxHeight(500, {
    heading: {
      fontSize: 10,
    },
    caption: {
      fontSize: 10,
      lineHeight: 14,
    },
    listItemText: {
      fontSize: 5,
    },
    tabletImage: {
      width: deviceWidth * 0.67,
      height: deviceWidth * 0.57,
    },
    phoneImage: {
      right: deviceWidth * 0.16,
      width: deviceWidth * 0.32,
      height: deviceWidth * 0.60,
    }
  })
);

export default styles