import { createStyles, maxWidth, } from 'react-native-media-queries';
import { GILROY_REGULAR, GILROY_MEDIUM, PROBA_LIGHT, PROBA_REGULAR, PROBA_MEDIUM, } from '@fonts'
import { Platform } from 'react-native';

const toolsBarHeight = 45

const base = {
  menu: {
    width: toolsBarHeight,
    height: toolsBarHeight,
  },
  menuPlaceholder: {
    position: 'absolute',
    top: 15,
    right: 23,
    width: toolsBarHeight,
    height: toolsBarHeight,
    backgroundColor: '#FFFFFF',
    zIndex: 1000,
  },
  menuPlaceholderIcon: {
    width: toolsBarHeight - 24,
    height: toolsBarHeight - 30,
  },
  overlayStyles: {
    backgroundColor: "rgba(0, 0, 0, 0.55)",
    flex: 1
  },
  modalComponent: {
    width: 320,
    position: 'absolute',
    top: Platform.OS === 'android' ? 202 : 220,
    right: 12,
    borderRadius: 2,
    margin: 20,
    borderRadius: 5,
    backgroundColor: "transparent",
  },
  modal: {
    position: 'relative',
    borderRadius: 5,
  },
  modalItem: {
    justifyContent: 'center',
    width: 320,
    height: 70,
    paddingLeft: 25,
    backgroundColor: '#FFFFFF'
  },
  withTopBorderRadius: {
    height: 75,
    paddingTop: 15,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  withBottomBorderRadius: {
    paddingLeft: 25,
    paddingBottom: 0,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  modalItemText: {
    color: '#414141',
    fontSize: 22,
  fontFamily: GILROY_REGULAR,
  },
  redText: {
    color: '#E25B63',
    paddingBottom: 15,
  },
  modalItemRed: {
    justifyContent: 'center',
    width: 320,
    height: 70,
    paddingLeft: 20,    
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
};

const styles = createStyles(
  base,

 maxWidth(500, {

  })
);

export default styles