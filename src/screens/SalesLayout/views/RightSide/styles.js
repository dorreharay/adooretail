import { createStyles, maxWidth } from 'react-native-media-queries';
import { GILROY_REGULAR, GILROY_MEDIUM } from '@fonts';

const toolsBarHeight = 45;

const base = {
  container: {
    flex: 1,
    flexGrow: 2,
    padding: '2%',
    paddingTop: 15,
    paddingBottom: 0,
    backgroundColor: '#F3F4F6',
  },
  toolsBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: 45,
  },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexGrow: 1,
    paddingLeft: 15,
    height: toolsBarHeight,
    marginRight: 10,
    borderRadius: 3,
    backgroundColor: '#FFFFFF',
  },
  inputText: {
    marginTop: 0.5,
    flex: 1,
    fontSize: 17,
    fontFamily: GILROY_MEDIUM,
  },
  printer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: toolsBarHeight,
    paddingHorizontal: 20,
    marginRight: 10,
    backgroundColor: '#FFFFFF',
  },
  printersAmount: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    width: 20,
    height: 20,
    borderRadius: 3,
  },
  printersAmountText: {
    color: '#414141',
    fontSize: 18,
    fontFamily: GILROY_MEDIUM,
  },
  connection: {
    flexDirection: 'row',
    alignItems: 'center',
    height: toolsBarHeight,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 2 : 0,
    marginRight: 10,
    borderRadius: 3,
    backgroundColor: '#FFFFFF',
  },
  connectionText: {
    marginTop: Platform.OS === 'ios' ? 1 : 0,
    paddingBottom: Platform.OS === 'android' ? 2.5 : 0,
    fontSize: 16,
    fontFamily: GILROY_REGULAR,
  },
  update: {
    width: toolsBarHeight,
    height: toolsBarHeight,
    marginRight: 10,
    borderRadius: 2,
  },
  menu: {
    width: toolsBarHeight,
    height: toolsBarHeight,
  },
  iconContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    backgroundColor: '#FFFFFF',
  },
  optionsContainer: {
    marginTop: 55,
    width: 300,
    height: 327,
    padding: 0,
    justifyContent: 'space-between',
    borderRadius: 4,
    elevation: 0,
    backgroundColor: '#FFFFFF00',
  },
  optionWrapper: {
    padding: 0,
    // backgroundColor: '#FFFFFF'
  },
  triggerWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  modalWrapper: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#00000044',
  },
  layoutNumberText: {
    color: '#414141',
    fontSize: 18,
    fontFamily: GILROY_MEDIUM,
  },
  menuButtonBase: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
};

const styles = createStyles(
  base,

  maxWidth(500, {}),
);

export default styles;
