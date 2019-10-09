import { createStyles, maxHeight, minWidth, maxWidth, } from 'react-native-media-queries';
import { COMFORTAA_LIGHT, FUTURA_LIGHT, FUTURA_REGULAR, PROBA_REGULAR, } from '@fonts'

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
  connectionText: {
    fontSize: 16,
    fontFamily: PROBA_REGULAR,
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
    marginBottom: 5,
  },
  receiptTitleText: {
    color: '#343434',
    fontSize: 22,
    fontFamily: FUTURA_REGULAR,
  },
  receiptDetails: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingBottom: 10,
    borderStyle: 'dashed',
    borderRadius : 1,
  },
  receiptQty: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: 30,
    height: 30,
    paddingTop: 3,
    borderWidth: 0.3,
    borderRadius: 5,
  },
  receiptQtyText: {
    color: '#343434',
    fontSize: 22,
    fontFamily: FUTURA_LIGHT,
  },
  receiptPrice: {
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    width: '20%',
  },
};
 
const styles = createStyles(
  base,
 
  maxWidth(500, {
    
  })
);

export default styles