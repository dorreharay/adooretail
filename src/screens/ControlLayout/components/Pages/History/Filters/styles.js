import { createStyles, maxWidth, } from 'react-native-media-queries';
import { GILROY_REGULAR, GILROY_MEDIUM, } from '@fonts'

const base = {
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 0,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingVertical: 10,
  },
  buttonText: {
    color: '#000000',
    fontSize: 18,
    fontFamily: GILROY_MEDIUM,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  }
};

const styles = createStyles(
  base,

 maxWidth(500, {

  })
);

export default styles