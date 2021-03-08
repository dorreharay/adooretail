import { createStyles, maxHeight, } from 'react-native-media-queries';
import { MAZZARD_LIGHT, MAZZARD_REGULAR, } from '@fonts'

const base = {
  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginHeading: {
    color: '#ffffff',
    fontSize: 17,
    fontFamily: MAZZARD_LIGHT,
    letterSpacing: 1,
  },
  proceedButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    marginTop: 45,
    borderRadius: 25,
    backgroundColor: '#D2D2D226',
  },
  proceedButtonTick: {
    width: 20,
    height: 15,
  },
  proceedButtonPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#D2D2D226',
    marginTop: 45,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    right: 50,
  },
  backButtonText: {
    color: '#F6F6F6',
    fontSize: 18,
    fontFamily: MAZZARD_REGULAR,
  }
};

const styles = createStyles(
  base,

  maxHeight(500, {
    loginHeading: {
      color: '#ffffff',
      fontSize: 10,
      fontFamily: MAZZARD_LIGHT,
      letterSpacing: 1,
    },
    proceedButton: {
      alignItems: 'center',
      justifyContent: 'center',
      width: 40,
      height: 40,
      borderRadius: 25,
      backgroundColor: '#D2D2D226',
      marginTop: 30,
    },
    proceedButtonTick: {
      width: 15,
      height: 12,
    },
    proceedButtonPlaceholder: {
      width: 40,
      height: 40,
      borderRadius: 100,
      borderWidth: 2,
      borderColor: '#D2D2D226',
      marginTop: 30,
    },
    backButton: {
      top: 25,
    },
    backButtonText: {
      fontSize: 14,
    },
  })
);

export default styles