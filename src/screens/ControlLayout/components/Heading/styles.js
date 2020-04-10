import { createStyles, maxWidth, } from 'react-native-media-queries';
import { GILROY_REGULAR, GILROY_MEDIUM, FUTURA_REGULAR, PROBA_REGULAR, PROBA_MEDIUM, PROBA_BOLD, } from '@fonts'

const base = {
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: '9%',
    backgroundColor: '#343434'
  },
  backButton: {
    flexDirection: 'row',
    width: 200,
  },
  backButtonInner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
  },
  backIcon: {
    width: 18,
    height: 18,
    marginRight: 10,
  },
  backIconText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontFamily: GILROY_REGULAR,
  },
  menuButton: {
    flexDirection: 'row',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  menuButtonInner: {
    flex: 1,
    // width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  activeMenuButton: {
    backgroundColor: '#3E3E3E',
  },
  accountButton: {
    flexDirection: 'row',
    width: 200,
  },
  accountButtonInner: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingRight: 40,
  },
  accountName: {
    color: '#FFFFFF',
    fontSize: 15,
    fontFamily: GILROY_REGULAR,
  },
  accountIcon: {
    width: 15,
    height: 15,
    marginRight: 10,
  },
  menuItemActiveText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontFamily: GILROY_MEDIUM,
  },
  menuItemActiveIcon: {
    width: 13,
    height: 13,
    marginLeft: 10,
  }
};

const styles = createStyles(
  base,

 maxWidth(500, {

  })
);

export default styles