import { createStyles, maxHeight, minWidth, maxWidth, } from 'react-native-media-queries';
import { COMFORTAA_LIGHT, FUTURA_LIGHT, FUTURA_REGULAR, PROBA_LIGHT, PROBA_REGULAR, } from '@fonts'

const base = {
  container: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: '#FFFFFF'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingLeft: 7,
    paddingRight: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F4F4F4',
  },
  timeText: {
    fontSize: 16,
    fontFamily: PROBA_LIGHT,
  },
  receipts: {
    flex: 1,
  },
  proceedContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '15%',
    paddingHorizontal: 30,
    marginBottom: '2%',
  },
  lsproceedButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 70,
    paddingLeft: '8%',
    borderRadius: 4,
  },
  receiptItem: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    paddingLeft: 35,
    paddingRight: 10,
    paddingTop: 20,
    paddingBottom: 10,
  },
  receiptTitle: {
    width: '100%',
  },
  receiptTitleText: {
    color: '#343434',
    fontSize: 22,
    fontFamily: PROBA_REGULAR,
  },
  receiptDetails: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderStyle: 'dashed',
    borderRadius : 1,
  },
  receiptOnePriceContainer: {
    width: '29%',
  },
  receiptOnePrice: {
    color: '#343434',
    fontSize: 18,
    fontFamily: 'futura_light',
  },
  receiptQtyContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '25%',
  },
  receiptQty: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: 30,
    height: 30,
    borderColor: '#CECECE',
    borderWidth: 0.5,
  },
  receiptQtyText: {
    color: '#343434',
    fontSize: 18,
    fontFamily: PROBA_LIGHT,
  },
  receiptPrice: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    width: '30%',
  },
  receiptDeleteIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: '16%',
    height: 50,
  }
};
 
const styles = createStyles(
  base,
 
  maxWidth(500, {
    
  })
);

export default styles