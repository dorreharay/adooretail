import { createStyles, maxHeight, } from 'react-native-media-queries';
import { GILROY_REGULAR, GILROY_MEDIUM, PROBA_MEDIUM, PROBA_REGULAR, } from '@fonts'

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
    width: '32%',
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
    paddingVertical: 15,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
    backgroundColor: '#FFFFFF',
  },
  categoryTitle4: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    paddingHorizontal: 15,
    paddingVertical: 10,
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
    paddingVertical: 8,
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
    fontSize: 15,
    fontFamily: GILROY_MEDIUM,
    lineHeight: 20,
  },
  categoryTitleText5: {
    marginBottom: 0,
    color: '#4E4E4E',
    fontSize: 13,
    fontFamily: GILROY_MEDIUM,
    lineHeight: 15,
  },
  variant: {
    width: '100%',
    height: '100%',
    borderRadius: 4,
  },
  variantText3: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    padding: 25,
    paddingRight: 30,
    color: '#FFFFFF',
    fontSize: 25,
    fontFamily: GILROY_MEDIUM,
    lineHeight: 38,
  },
  variantText4: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    padding: 15,
    paddingRight: 5,
    color: '#FFFFFF',
    fontSize: 20,
    fontFamily: GILROY_MEDIUM,
    lineHeight: 28,
  },
  variantText5: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    padding: 15,
    paddingRight: 10,
    color: '#FFFFFF',
    fontSize: 15,
    fontFamily: GILROY_MEDIUM,
    lineHeight: 20,
  },
  variantPrice3: {
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
  variantPriceText3: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: PROBA_REGULAR,
    lineHeight: 20,
  },
  variantPrice4: {
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 12,
    right: 10,
    width: 40,
    height: 40,
    borderRadius: 100,
    backgroundColor: '#FFFFFF33',
  },
  variantPriceText4: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: PROBA_REGULAR,
    lineHeight: 20,
  },
  variantPrice5: {
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 7,
    right: 10,
    width: 35,
    height: 35,
    borderRadius: 100,
    backgroundColor: '#FFFFFF33',
  },
  variantPriceText5: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: PROBA_REGULAR,
    lineHeight: 15,
  },
  variantSize3: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 10,
    right: 10,
    width: 40,
    height: 40,
    // borderWidth: 1,
    borderRadius: 100,
  },
  variantSize4: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 7,
    right: 7,
    width: 30,
    height: 30,
    // borderWidth: 1,
    borderRadius: 100,
  },
  variantSize5: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 7,
    right: 5,
    width: 25,
    height: 25,
    // borderWidth: 1,
    borderRadius: 100,
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
  backCategoryIcon: {
    width: 15,
    height: 30,
  }
};
 
const styles = createStyles(
  base,
 
 maxHeight(500, {
  categoryTitle3: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  categoryTitle4: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  categoryTitle5: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  categoryTitleText3: {
    fontSize: 15,
    lineHeight: 20,
  },
  categoryTitleText4: {
    fontSize: 13,
    lineHeight: 20,
  },
  categoryTitleText5: {
    fontSize: 12,
    lineHeight: 15,
  },
  variant: {
    padding: 10,
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
    lineHeight: 38,
  },
  variantText4: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    padding: 15,
    paddingRight: 0,
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: GILROY_MEDIUM,
    lineHeight: 28,
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
    top: 12,
    right: 10,
    width: 35,
    height: 35,
  },
  variantPriceText: {
    fontSize: 12,
  },
  backCategoryIcon: {
    width: 10,
    height: 20,
  }
  })
);

export default styles