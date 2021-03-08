import { createStyles, maxWidth, } from 'react-native-media-queries';
import { MAZZARD_LIGHT, MAZZARD_REGULAR, MAZZARD_MEDIUM, MAZZARD_SEMIBOLD, } from '@fonts'

import { deviceHeight } from '@dimensions'

const base = {
  closeIconButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
  },
  closeIcon: {
    width: 22,
    height: 18,
  },
  modal: {
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%',
    paddingTop: 10,
    paddingBottom: 5,
  },
  modalHeadingext: {
    marginBottom: 10,
    color: '#000000',
    fontSize: 28,
    fontFamily: MAZZARD_SEMIBOLD,
  },
  modalRegularText: {
    marginBottom: 20,
    color: '#000000',
    fontSize: 25,
    fontFamily: MAZZARD_REGULAR,
  },
  modalShiftText: {
    position: 'absolute',
    bottom: 120,
    left: 40,
    color: '#363636',
    fontSize: 25,
    fontFamily: MAZZARD_MEDIUM,
    textDecorationLine: 'underline',
  },
  changeAccountButton: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 85,
    paddingHorizontal: 50,
    paddingVertical: 10,
  },
  changeAccountButtonText: {
    color: '#7D7D7D',
    fontSize: 17,
    fontFamily: MAZZARD_LIGHT,
  },
  linearButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 400,
    height: 75,
  },
  linearButtonGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    height: '100%',
    paddingBottom: 1,
    borderRadius: 5,
  },
  linearButtonText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontFamily: MAZZARD_MEDIUM,
  },
  additonalButton: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 80,
    width: '100%',
    padding: 20,
    // marginLeft: 10,
  },
  additonalButtonText: {
    color: '#343434',
    fontSize: 16,
    fontFamily: MAZZARD_REGULAR,
  }
};

const styles = createStyles(
  base,

 maxWidth(500, {

  })
);

export default styles