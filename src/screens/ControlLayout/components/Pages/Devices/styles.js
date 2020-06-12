import { createStyles, maxWidth, } from 'react-native-media-queries'
import { GILROY_REGULAR, GILROY_MEDIUM, PROBA_REGULAR, PROBA_MEDIUM, } from '@fonts'

const base = {
  container: {
    flex: 1,
    alignItems: 'center', 
    paddingTop: '3%',
    paddingHorizontal: '5%',
  },
  screenHeading: {
    marginBottom: 30,
    color: '#343434',
    fontSize: 32,
    fontFamily: GILROY_REGULAR,
  },
  buttonsContainer: {
    flexDirection: 'row',
    width: 280,
    height: 50,
    borderRadius: 100,
    backgroundColor: '#FFFFFF',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
  },
  buttonText: {
    fontSize: 16,
    fontFamily: GILROY_MEDIUM,
  },
  activeButton: {
    flex: 1,
    width: '100%',
    borderRadius: 100,
    backgroundColor: '#000000',
  },
  activeButtonText: {
    color: '#FFFFFF',
  },
  refreshButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    marginHorizontal: 20,
    borderRadius: 100,
    backgroundColor: '#FFF',
  }
};

const styles = createStyles(
  base,

  maxWidth(500, {

  })
);

export default styles