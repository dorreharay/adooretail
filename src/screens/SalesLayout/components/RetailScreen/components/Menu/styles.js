import { createStyles, maxWidth, } from 'react-native-media-queries';
import { GILROY_REGULAR, GILROY_MEDIUM, PROBA_LIGHT, PROBA_REGULAR, PROBA_MEDIUM, } from '@fonts'

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
  modalComponent: {
    width: 320,
    height: 200,
    position: 'absolute',
    top: 242,
    right: 12,
    borderRadius: 2,
    margin: 20,
    borderRadius: 5,
    backgroundColor: "transparent",
  },
  overlayStyles: {
    backgroundColor: "rgba(0, 0, 0, 0.55)",
    flex: 1
  },
  modal: {
    position: 'relative',
    width: 300,
    height: 350,
    borderRadius: 5,
  },
  modalItem: {
    justifyContent: 'center',
    width: 320,
    height: 60,
    paddingLeft: 25,
    backgroundColor: '#FFFFFF'
  },
  withTopBorderRadius: {
    height: 78,
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
    fontSize: 24,
    fontFamily: PROBA_REGULAR,
  },
  redText: {
    color: '#E25B63'
  },
  modalItemRed: {
    justifyContent: 'center',
    width: 320,
    height: 80,
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