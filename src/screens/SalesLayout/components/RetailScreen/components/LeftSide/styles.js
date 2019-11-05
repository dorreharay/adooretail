import { createStyles, maxHeight, minWidth, maxWidth, } from 'react-native-media-queries';
import { COMFORTAA_LIGHT, FUTURA_LIGHT, FUTURA_REGULAR, PROBA_LIGHT, PROBA_REGULAR, PROBA_MEDIUM, } from '@fonts'

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
    fontSize: 15,
    fontFamily: PROBA_LIGHT,
  },
  receiptButtonText: {
    color: '#343434',
    fontSize: 22,
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
  lsproceedButtonText: {
    color: 'white',
    fontSize: 22,
    fontFamily: FUTURA_REGULAR,
    letterSpacing: 0.7,
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
    fontFamily: FUTURA_LIGHT,
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
  },
  paymentModal: {
    alignItems: 'center',
    width: 470,
    height: 520,
    paddingTop: 20,
    backgroundColor: '#ffffff',
  },
  modalHeadingText: {
    color: '#343434',
    fontSize: 35,
    fontFamily: PROBA_REGULAR,
  },
  paymentModalInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 430,
    height: 50,
  },
  paymentModalTypes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 430,
    height: '29%',
    marginTop: 30,
  },
  paymentModalType: {
    justifyContent: 'space-between',
    width: '48.3%',
    height: '100%', 
  },
  paymentTypeText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: PROBA_REGULAR,
  },
  paymentModalNotice: {
    justifyContent: 'flex-start',
    width: 430,
    height: '40%',
    marginTop: 40,
    padding: 20,
    paddingTop: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#EFECEC',
    backgroundColor: '#F2F2F2'
  },
  paymentModalNoticeInput: {
    color: '#707070',
    fontSize: 20,
    fontFamily: PROBA_REGULAR,
  },
  loginCaption: {
    marginTop: 10,
    color: '#343434',
    fontSize: 55,
    fontFamily: PROBA_LIGHT,
  },
  lsNumpad: {
    width: 450,
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  lsNum: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 130,
    height: 85,
    borderRadius: 100,
  },
  lsNumText: {
    color: '#343434',
    fontSize: 42,
    fontFamily: PROBA_REGULAR,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
};
 
const styles = createStyles(
  base,
 
  maxWidth(500, {
    
  })
);

export default styles