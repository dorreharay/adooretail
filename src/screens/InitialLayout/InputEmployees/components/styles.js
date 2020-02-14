import { createStyles, maxWidth, } from 'react-native-media-queries';
import { COMFORTAA_LIGHT, } from '@fonts'

const base = {
  сontainer: {
    marginTop: 45,
    width: 350,
    height: 360,
    zIndex: 100,
  },
  scrollview: {
    width: 350,
    height: 360,
    zIndex: 100,
    borderRadius: 22,
  },
  employee: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    height: 70,
    paddingLeft: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#4D4D4D44',
    backgroundColor: '#D2D2D21A',
  },
  iconPlaceholder: {
    width: 41,
    height: 41,
    marginRight: 20,
    borderRadius: 22,
    backgroundColor: '#9F9F9F33',
  },
  employeeName: {
    color: '#ffffff',
    fontSize: 17,
    fontFamily: COMFORTAA_LIGHT,
  },
};

const styles = createStyles(
  base,

 maxWidth(500, {

  })
);

export default styles