import { createStyles, maxWidth, maxHeight, } from 'react-native-media-queries';
import { EUCLID_LIGHT, EUCLID_MEDIUM, EUCLID_REGULAR, } from '@fonts'

const base = {
  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 100,
  },
  loginHeading: {
    color: '#000000',
    fontSize: 26,
    fontFamily: EUCLID_MEDIUM,
    letterSpacing: 1,
  },
  idDots: {
    width: 80 * 6.5,
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 35,
  },
  dot: {
    width: 80,
    height: 80,
    borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: '#C6C6C688',
    backgroundColor: '#FFFFFF',
    color: '#000000',
    fontSize: 26,
    fontFamily: EUCLID_REGULAR,
  },
  disabled: {
    opacity: 0.5,
  },
  loginCaption: {
    color: '#929292',
    fontSize: 14,
    fontFamily: EUCLID_LIGHT,
    marginTop: 45,
  },
  logoContainer: {
    position: 'absolute',
    top: 30,
    left: 30,
    width: 70,
    height: 70,
    zIndex: 50,
  },
  logo: {
    width: 65,
    height: 65,
  },
};

const styles = createStyles(
  base,

  maxHeight(670, {
    
  }),

  maxHeight(500, {
    
  })
);

export default styles