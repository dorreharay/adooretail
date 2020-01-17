import { createStyles, maxHeight, minWidth, maxWidth, } from 'react-native-media-queries';
import { COMFORTAA_LIGHT, FUTURA_LIGHT, PROBA_REGULAR, PROBA_MEDIUM } from '@fonts'

const toolsBarHeight = 45

const base = {
  container: {
    flex: 1,
    flexGrow: 2,
    padding: '2%',
    paddingTop: 15,
    paddingBottom: 0,
    backgroundColor: '#F3F4F6'
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
    fontFamily: PROBA_REGULAR,
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
    fontFamily: PROBA_REGULAR,
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
    borderRadius: 3,
  },
  optionsContainer: {
    marginTop: 55,
    width: 300,
    height: 327,
    padding: 0,
    justifyContent: 'space-between',
    borderRadius: 4,
    elevation: 0,
    backgroundColor: '#FFFFFF00'
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
    backgroundColor: '#00000044'
  },
  modalContainer: {
    position: 'absolute',
    top: 15,
    right: 25,
  },
  modal: {
    width: 350,
    height: 405,
    borderRadius: 10,
  },
  modalItem: {
    justifyContent: 'center',
    width: 350,
    height: 70,
    paddingLeft: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1',
    backgroundColor: '#FFFFFF'
  },
  withTopBorderRadius: {
    paddingTop: 5,
    height: 75,
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
  },
  withBottomBorderRadius: {
    paddingBottom: 0,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  modalItemText: {
    color: '#414141',
    fontSize: 25,
    fontFamily: PROBA_REGULAR,
  },
  redText: {
    color: '#E25B63'
  },
  modalItemRed: {
    justifyContent: 'center',
    width: 350,
    height: 75,
    paddingLeft: 30,
    backgroundColor: '#FFFFFF'
  },
  closeModal: {
    alignSelf: 'flex-end',
    marginBottom: 20,
    width: 45,
    height: 45,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
  },
  layoutNumberText: {
    color: '#414141',
    fontSize: 18,
    fontFamily: PROBA_MEDIUM,
  },
};

const styles = createStyles(
  base,

  maxWidth(500, {

  })
);

export default styles