import { createStyles, maxHeight, minWidth, maxWidth, } from 'react-native-media-queries';
import { COMFORTAA_LIGHT, FUTURA_LIGHT, PROBA_REGULAR, PROBA_MEDIUM, } from '@fonts'
import { deviceWidth } from '@dimensions';

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
  colsProduct3: {
    width: '32.5%',
    height: deviceWidth * 0.2,
    marginLeft: '2%',
    marginBottom: 20,
    borderRadius: 10,
  },
  colsProduct4: {
    width: '23.5%',
    height: deviceWidth * 0.15,
    marginLeft: '2%',
    marginBottom: 20,
    borderRadius: 10,
  },
  colsProduct5: {
    width: '18.5%',
    height: deviceWidth * 0.12,
    marginLeft: '2%',
    marginBottom: 20,
    borderRadius: 10,
  },
  categoryTitle3: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    paddingHorizontal: 25,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
  },
  categoryTitle4: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    paddingHorizontal: 25,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
  },
  categoryTitle5: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
  },
  categoryTitleText3: {
    marginBottom: 2.5,
    color: '#3E3E3E',
    fontSize: 20,
    fontFamily: PROBA_REGULAR,
    lineHeight: 30,
  },
  categoryTitleText4: {
    marginBottom: 2.5,
    color: '#3E3E3E',
    fontSize: 20,
    fontFamily: PROBA_REGULAR,
    lineHeight: 30,
  },
  categoryTitleText5: {
    marginBottom: 0,
    color: '#3E3E3E',
    fontSize: 12,
    fontFamily: PROBA_REGULAR,
    lineHeight: 20,
  }
};
 
const styles = createStyles(
  base,
 
  maxWidth(500, {
    
  })
);

export default styles