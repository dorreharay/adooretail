import { createStyles, maxWidth, maxHeight, } from 'react-native-media-queries';
import { MAZZARD_LIGHT, MAZZARD_REGULAR, MAZZARD_MEDIUM, MAZZARD_SEMIBOLD,  } from '@fonts'

import { deviceWidth, deviceHeight, } from '@dimensions';

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
    fontSize: 22,
    fontFamily: MAZZARD_SEMIBOLD,
  },
  caption: {
    width: '42%',
    marginTop: '2%',
    color: '#000000',
    fontSize: 14,
    fontFamily: MAZZARD_REGULAR,
    lineHeight: 20,
  },
  helpButton: {
    marginTop: -20,
    marginRight: -20,
    padding: 20,
  },
  helpText: {
    color: '#343434',
    fontSize: 15,
    fontFamily: MAZZARD_REGULAR,
  },
  list: {
    width: '32%',
    height: '60%',
    marginTop: '2%',
  },
  listItem: {
    flexDirection: 'row',
    width: '100%',
    marginVertical: 6,
  },
  listItemText: {
    marginLeft: 15,
    color: '#000000',
    fontSize: 12,
    fontFamily: MAZZARD_REGULAR,
    lineHeight: 18,
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
    tabletImage: {
      width: deviceWidth * 0.67,
      height: deviceWidth * 0.57,
    },
    listItemText: {
      fontSize: 5,
    },
  })
);

export default styles