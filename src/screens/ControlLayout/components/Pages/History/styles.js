import { createStyles, maxWidth, } from 'react-native-media-queries';
import { GILROY_REGULAR, GILROY_MEDIUM, FUTURA_REGULAR, PROBA_LIGHT, PROBA_REGULAR, PROBA_MEDIUM, } from '@fonts'

import { deviceWidth } from '@dimensions';

const base = {
  container: {
    flex: 1,
    height: '100%',
  },
  sideMenuContainer: {
    position: 'absolute',
    top: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: deviceWidth,
    height: '100%',
    zIndex: 11,
  },
  sideMenuWrapper: {
    width: deviceWidth * 0.67,
    height: '100%',
  },
  sideMenu: {
    width: deviceWidth * 0.32,
    height: '100%',
    padding: 20,
    paddingHorizontal: '3.5%',
    borderLeftWidth: 0.5,
    borderTopWidth: 0.5,
    borderLeftColor: '#EAECF0',
    borderTopColor: '#EAECF0',
    backgroundColor: '#FFFFFF',
    zIndex: 10,
  },
  sidebarHeading: {
    color: '#343434',
    fontSize: 22,
    fontFamily: GILROY_MEDIUM,
  },
  button: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 6,
    marginBottom: 8,
    borderWidth: 1.2,
    borderColor: '#000000',
    borderRadius: 5,
  },
  buttonText: {
    color: '#343434',
    fontSize: 18,
    fontFamily: GILROY_MEDIUM,
  },
  activeButton: {
    backgroundColor: '#000000',
  },
  activeButtonText: {
    color: '#FFFFFF',
  },
};

const styles = createStyles(
  base,

 maxWidth(500, {

  })
);

export default styles