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
    color: '#343434',
    fontSize: 17,
    fontFamily: PROBA_REGULAR,
  },
  receiptButtonText: {
    color: '#343434',
    fontSize: 22,
    fontFamily: PROBA_REGULAR,
  },
  receipts: {
    flex: 1,
  },
  proceedContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '95%',
    height: '15%',
    marginLeft: '2.5%',
    paddingHorizontal: 15,
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
    fontSize: 24,
    fontFamily: PROBA_MEDIUM,
    letterSpacing: 0.7,
  },
  lsInstanceContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0,
    borderColor: '#FE8B70',
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
    borderRadius: 1,
  },
  receiptOnePriceContainer: {
    width: '20%',
  },
  receiptOnePrice: {
    color: '#343434',
    fontSize: 18,
    fontFamily: FUTURA_LIGHT,
  },
  receiptQtyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: '25%',
    // backgroundColor: 'gray'
  },
  receiptQty: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: '65%',
    height: 30,
  },
  receiptQtyInner: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    borderRadius: 1,
    borderColor: '#CECECE',
    borderWidth: 0.5,
  },
  receiptQtyText: {
    color: '#343434',
    fontSize: 18,
    fontFamily: PROBA_LIGHT,
  },
  receiptPrice: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    width: '20%',
  },
  receiptDeleteIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: '16%',
    height: 50,
  },
  selectedText: {
    fontFamily: PROBA_MEDIUM,
  },
  paymentModal: {
    position: 'absolute',
    top: 200,
    alignItems: 'center',
    flexDirection: 'row',
    width: 470,
    height: 580,
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
    width: 470,
    height: 50,
    paddingHorizontal: 20,
  },
  paymentModalTypes: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: 470,
    height: 170,
    marginTop: 30,
    paddingHorizontal: 20,
  },
  paymentModalType: {
    justifyContent: 'space-between',
    width: 140,
    height: 80,
  },
  paymentTypeText: {
    color: '#FFFFFF',
    fontSize: 13,
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
    width: 550,
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
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
  modalDetails: {
    marginTop: 80,
  },
  detailsRow: {
    width: 430,
    height: 60,
    paddingHorizontal: 4,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  detailsRowText: {
    color: '#343434',
    fontSize: 25,
    fontFamily: PROBA_REGULAR,
  },
};

const styles = createStyles(
  base,

  maxWidth(500, {

  })
);

export default styles