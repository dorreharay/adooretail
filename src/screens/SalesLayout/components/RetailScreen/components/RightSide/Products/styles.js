import { createStyles, maxWidth, } from 'react-native-media-queries';
import { GILROY_MEDIUM, PROBA_MEDIUM, } from '@fonts'

const base = {
  container: {
    flex: 1,
    marginTop: 20,
  },
  row: {
    flexDirection: 'row',
    width: '100%',
  },
  colsProduct3: {
    width: '32.5%',
    marginLeft: '2%',
    marginBottom: 20,
    borderRadius: 5,
  },
  colsProduct4: {
    width: '23.5%',
    marginLeft: '2%',
    marginBottom: 20,
    borderRadius: 5,
  },
  colsProduct5: {
    width: '18.5%',
    marginLeft: '1.9%',
    marginBottom: 20,
    borderRadius: 5,
  },
  categoryTitle3: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    paddingHorizontal: 30,
    paddingVertical: 25,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
    backgroundColor: '#FFFFFF',
  },
  categoryTitle4: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    paddingHorizontal: 25,
    paddingVertical: 20,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
    backgroundColor: '#FFFFFF',
  },
  categoryTitle5: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
    backgroundColor: '#FFFFFF',
  },
  categoryTitleText3: {
    marginBottom: 2.5,
    color: '#4E4E4E',
    fontSize: 20,
    fontFamily: GILROY_MEDIUM,
    lineHeight: 30,
  },
  categoryTitleText4: {
    marginBottom: 2.5,
    color: '#4E4E4E',
    fontSize: 20,
    fontFamily: GILROY_MEDIUM,
    lineHeight: 30,
  },
  categoryTitleText5: {
    marginBottom: 0,
    color: '#4E4E4E',
    fontSize: 16,
    fontFamily: GILROY_MEDIUM,
    lineHeight: 20,
  },
  variant: {
    width: '100%',
    height: '100%',
    padding: 20,
    borderRadius: 4,
  },
  variantText3: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    padding: 35,
    paddingRight: 5,
    color: '#FFFFFF',
    fontSize: 30,
    fontFamily: GILROY_MEDIUM,
  },
  variantText4: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    padding: 25,
    paddingRight: 5,
    color: '#FFFFFF',
    fontSize: 20,
    fontFamily: GILROY_MEDIUM,
    lineHeight: 30,
  },
  variantText5: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    padding: 20,
    paddingRight: 5,
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: GILROY_MEDIUM,
    lineHeight: 20,
  },
  variantPrice: {
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 12,
    right: 10,
    width: 45,
    height: 45,
    borderRadius: 100,
    backgroundColor: '#FFFFFF33',
  },
  variantPriceText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: GILROY_MEDIUM,
  },
  searchResultContainer: {
    position: 'absolute',
    width: '100%',
    backgroundColor: '#F4F4F4',
    zIndex: 3,
  },
  matches: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 10,
    right: 10,
    width: 40,
    height: 40,
    borderRadius: 100,
    backgroundColor: '#C92626',
  },
  matchesText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: PROBA_MEDIUM,
  },
};
 
const styles = createStyles(
  base,
 
 maxWidth(500, {
    
  })
);

export default styles