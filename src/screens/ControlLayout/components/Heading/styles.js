import { createStyles, maxWidth, } from 'react-native-media-queries';
import { MAZZARD_REGULAR, MAZZARD_MEDIUM, } from '@fonts'

const base = {
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '25%',
    height: '100%',
    backgroundColor: '#262626'
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
    fontFamily: MAZZARD_REGULAR,
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
    backgroundColor: '#2E2E2E',
  },
  accountName: {
    color: '#FFFFFF',
    fontSize: 15,
    fontFamily: MAZZARD_REGULAR,
  },
  accountIcon: {
    width: 18,
    height: 18,
    marginRight: 15,
  },
  menuItemText: {
    color: '#6D6D6D',
    fontSize: 16,
    fontFamily: MAZZARD_MEDIUM,
  },
  menuItemActiveText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: MAZZARD_MEDIUM,
  },
  menuItemActiveIcon: {
    width: 13,
    height: 13,
    marginLeft: 10,
  },
  promptText: {
    color: '#000000',
    fontSize: 18,
    fontFamily: MAZZARD_MEDIUM,
  },
};

const styles = createStyles(
  base,

 maxWidth(500, {

  })
);

export default styles