import { createStyles, maxWidth, maxHeight, } from 'react-native-media-queries';
import { GILROY_LIGHT, GILROY_REGULAR, GILROY_MEDIUM, GILROY_SEMIBOLD,  } from '@fonts'

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
    fontSize: 30,
    fontFamily: GILROY_SEMIBOLD,
  },
  caption: {
    width: '42%',
    marginTop: '2%',
    color: '#000000',
    fontSize: 18,
    fontFamily: GILROY_REGULAR,
    lineHeight: 25,
  },
  helpButton: {
    marginTop: -20,
    marginRight: -20,
    padding: 20,
  },
  helpText: {
    color: '#343434',
    fontSize: 15,
    fontFamily: GILROY_REGULAR,
  },
  list: {
    width: '32%',
    height: '60%',
    marginTop: '4%',
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
    fontFamily: GILROY_MEDIUM,
  },
  tabletImage: {
    position: 'absolute',
    bottom: -deviceWidth * 0.03,
    right: -deviceWidth * 0.07,
    width: deviceWidth * 0.7,
    height: deviceWidth * 0.6,
  },
};

const styles = createStyles(
  base,

  maxHeight(800, {
    tabletImage: {
      width: deviceWidth * 0.67,
      height: deviceWidth * 0.57,
    },
  })
);

export default styles