import { createStyles, maxHeight, minWidth, maxWidth, } from 'react-native-media-queries';
import { COMFORTAA_LIGHT, FUTURA_LIGHT, PROBA_REGULAR, PROBA_MEDIUM, } from '@fonts'

const base = {
  container: {
    flex: 1,
    marginTop: 20,
  },
  products: {

  },
  row: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    width: '100%',
  },
  product: {
    width: '23.5%',
    height: 180,
    marginLeft: '2%',
    marginBottom: 20,
    borderRadius: 5,
    // backgroundColor: 'yellow',
  },
  categoryTitle: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    paddingHorizontal: 25,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
  },
  categoryTitleText: {
    marginBottom: 2.5,
    color: '#3E3E3E',
    fontSize: 20,
    fontFamily: PROBA_REGULAR,
    lineHeight: 30,
  }
};
 
const styles = createStyles(
  base,
 
  maxWidth(500, {
    
  })
);

export default styles