import { createStyles, maxWidth, } from 'react-native-media-queries';
import { GILROY_REGULAR, GILROY_MEDIUM, FUTURA_REGULAR, PROBA_REGULAR, PROBA_MEDIUM, PROBA_BOLD, } from '@fonts'

const base = {
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '25%',
    height: '100%',
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
    paddingHorizontal: '10%',
    height: 70,
  },
  menuButtonInner: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  activeMenuButton: {
    backgroundColor: '#3E3E3E',
  },
  accountName: {
    color: '#FFFFFF',
    fontSize: 15,
    fontFamily: GILROY_REGULAR,
  },
  accountIcon: {
    width: 18,
    height: 18,
    marginRight: 15,
  },
  menuItemText: {
    color: '#6D6D6D',
    fontSize: 18,
    fontFamily: GILROY_MEDIUM,
  },
  menuItemActiveText: {
    color: '#FFFFFF',
    fontSize: 18,
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