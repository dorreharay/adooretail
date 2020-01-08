import { createStyles, maxHeight, minWidth, maxWidth, } from 'react-native-media-queries';
import { COMFORTAA_LIGHT, FUTURA_LIGHT, FUTURA_REGULAR, PROBA_REGULAR, PROBA_MEDIUM, PROBA_BOLD, } from '@fonts'

const base = {
  container: {
    justifyContent: 'space-between',
    height: '100%',
    borderColor: '#F8F8F8',
    borderRightWidth: 1,
    backgroundColor: '#181619',
  },
  businessContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: '7%',
    paddingLeft: '10%',
    paddingRight: '10%',
    backgroundColor: '#1C1A1D',
  },
  businessIcon: {
    width: 16,
    height: 16,
    marginRight: 10,
  },
  bussinessNameText: {
    color: '#909090',
    fontSize: 18,
    fontFamily: PROBA_REGULAR,
  },
  tabsContainer: {

  },
  sectionTitle: {
    paddingHorizontal: '10%',
    paddingBottom: 10,
    color: '#3B3B3D',
    fontSize: 20,
    fontFamily: PROBA_MEDIUM
  },
  tab: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '95%',
    marginLeft: '5%',
    paddingLeft: '5%',
    paddingRight: '10%',
    paddingTop: 10,
    paddingBottom: 10,
    borderTopLeftRadius: 3,
    borderBottomLeftRadius: 3,
  },
  tabIcon: {
    width: 25,
    height: 25,
    marginRight: 15,
  },
  tabText: {
    color: '#68686A',
    fontSize: 18,
    fontFamily: PROBA_REGULAR
  },
  settingsContainer: {
    justifyContent: 'flex-end',
    width: '100%',
  }
};

const styles = createStyles(
  base,

  maxWidth(500, {

  })
);

export default styles