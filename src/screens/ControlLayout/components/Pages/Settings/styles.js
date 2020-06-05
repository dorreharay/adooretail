import { createStyles, maxWidth, } from 'react-native-media-queries';
import { CIRCE_BOLD, FUTURA_LIGHT, FUTURA_REGULAR, PROBA_LIGHT, GILROY_REGULAR, GILROY_MEDIUM } from '@fonts'

const base = {
  container: {
    flex: 1,
    // flexDirection: 'row',
    height: '90%',
    paddingVertical: 40,
    paddingHorizontal: 60,
  },
  settingCard: {
    alignSelf: 'flex-start',
    paddingLeft: 25,
    paddingRight: 35,
    paddingVertical: 25,
    paddingBottom: 20,
    marginRight: 20,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
  },
  settingsTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  settingsTitleIcon: {
    width: 20,
    height: 20,
    marginRight: 15,
  },
  settingsTitle: {
    fontSize: 25,
    fontFamily: GILROY_MEDIUM,
  },
  device: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 330,
    height: 40,
    paddingLeft: 36,
    // paddingHorizontal: 15,
    marginBottom: 10,
    // borderWidth: 1,
    // borderColor: '#CCCCCC',
    borderRadius: 5,
  },
  deviceNameText: {
    fontSize: 18,
    fontFamily: GILROY_MEDIUM,
  },
  deviceButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderRadius: 5,
  },
  deviceButtonText: {
    fontSize: 15,
    fontFamily: GILROY_MEDIUM,
  },
  bottomLine: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 3,
    borderRadius: 10,
  },
  exitButton: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderWidth: 1.8,
    borderColor: '#DB3E5A',
    borderRadius: 5,
  },
  buttonTitle: {
    color: '#DB3E5A',
    fontSize: 20,
    fontFamily: GILROY_MEDIUM,
  },
  buttonsContainer: {
    flexDirection: 'row'
  },
  button: {
    paddingHorizontal: 30,
    paddingVertical: 18,
    borderWidth: 1,
    borderColor: '#000000',
  },
  buttonText: {
    color: '#000000',
    fontSize: 18,
    fontFamily: GILROY_REGULAR,
  },
  active: {
    backgroundColor: '#000000',
    borderColor: '#000000',
  },
  activeText: {
    color: '#FFFFFF',
    fontFamily: GILROY_MEDIUM,
  },
  promptText: {
    color: '#000000',
    fontSize: 18,
    fontFamily: GILROY_MEDIUM,
  },
};

const styles = createStyles(
  base,

  maxWidth(500, {

  })
);

export default styles