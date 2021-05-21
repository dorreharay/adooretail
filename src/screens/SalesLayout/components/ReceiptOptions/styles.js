import { createStyles, maxWidth, } from 'react-native-media-queries';
import { GILROY_REGULAR } from '@fonts'

import { deviceWidth, deviceHeight } from '@dimensions'

const toolsBarHeight = 45
const modalWidth = 320

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
    width: modalWidth,
    position: 'absolute',
    top: -(deviceHeight * 0.5) + 50,
    right: -(deviceWidth * 0.5),
    borderRadius: 2,
    margin: 20,
    borderRadius: 5,
    backgroundColor: "transparent",
  },
  promptStyle: {
    
  },
  modal: {
    position: 'absolute',
    top: deviceHeight * 0.09,
    left: deviceHeight * 0.025,
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor: '#FFFFFF'
  },
  modalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: modalWidth,
    height: 70,
    paddingLeft: 25,
  },
  withTopBorderRadius: {
    height: 75,
    paddingTop: 10,
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
    width: modalWidth,
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
  promptText: {
    color: '#000000',
    fontSize: 18,
    fontFamily: GILROY_REGULAR,
  },
};

const styles = createStyles(
  base,

 maxWidth(500, {

  })
);

export default styles