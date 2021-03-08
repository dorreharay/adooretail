import { createStyles, maxWidth, } from 'react-native-media-queries';
import { MAZZARD_LIGHT, MAZZARD_REGULAR, MAZZARD_MEDIUM } from '@fonts'

const base = {
  container: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 20,
  },
  switchText: {
    // minWidth: '15%',
    marginRight: 20,
    color: '#000000',
    fontSize: 20,
    fontFamily: MAZZARD_MEDIUM
  },
  toggle: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: 30,
    height: 30,
    borderWidth: 1.5,
    borderColor: '#000000',
    borderRadius: 100,
  }
};

const styles = createStyles(
  base,

  maxWidth(500, {

  })
);

export default styles