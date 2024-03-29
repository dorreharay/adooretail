import { createStyles, maxHeight, } from 'react-native-media-queries';
import { EUCLID_REGULAR, GILROY_REGULAR, GILROY_MEDIUM, GILROY_SEMIBOLD, GILROY_LIGHT, } from '@fonts'

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
    fontSize: 16,
    fontFamily: EUCLID_REGULAR,
  },
  receiptButtonText: {
    color: '#343434',
    fontSize: 22,
    fontFamily: GILROY_REGULAR,
  },
  receipts: {
    flex: 1,
  },
  zProceed: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingRight: 0,
    // width: '50%',
    flex: 1,
    height: 70,
    paddingLeft: 0,
    marginBottom: 40,
  },
  zProceedEx: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '24%',
    height: 70,
    padding: 0,
    marginLeft: '2%',
    marginBottom: 40,
    borderRadius: 3,
    borderWidth: 1.8,
    borderColor: '#E46162',
  },
  lspreText: {
    color: '#E46162',
    fontSize: 18,
    fontFamily: GILROY_SEMIBOLD,
    textAlign: 'center',
  },
  proceedContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    // width: '100%',
    height: '15%',
    paddingHorizontal: '7%',
    marginBottom: '2%',
  },
  lsproceedButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 70,
    borderRadius: 4,
  },
  lsproceedButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: GILROY_MEDIUM,
    letterSpacing: 0.7,
  },
  lsprecheckButtonText: {
    color: '#000000',
    fontSize: 20,
    fontFamily: GILROY_MEDIUM,
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
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 5,
    // backgroundColor: '#FCBC7933'
  },
  receiptTitle: {
    width: '100%',
  },
  receiptTitleText: {
    color: '#343434',
    fontSize: 17,
    fontFamily: GILROY_MEDIUM,
    lineHeight: 30,
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
    fontSize: 16,
    fontFamily: GILROY_REGULAR,
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
  qtyButton: {
    width: 28,
    height: 28,
  },
  qtyButtonIcon: {
    width: 15,
    height: 15,
  },
  receiptQtyText: {
    color: '#343434',
    fontSize: 16,
    fontFamily: GILROY_REGULAR,
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
  receiptTotal: {
    height: '100%',

    color: '#343434',
    fontSize: 16,
    fontFamily: GILROY_REGULAR,
    textAlign: 'center',
  },
  selectedText: {
    fontFamily: GILROY_REGULAR,
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
    fontFamily: GILROY_REGULAR,
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
    fontFamily: GILROY_REGULAR,
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
    fontFamily: GILROY_REGULAR,
  },
  loginCaption: {
    marginTop: 10,
    color: '#343434',
    fontSize: 55,
    fontFamily: GILROY_LIGHT,
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
    fontFamily: GILROY_REGULAR,
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
    fontFamily: GILROY_REGULAR,
  },
  editedPayment: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    height: '100%',
    paddingVertical: 15,
  }
};

const styles = createStyles(
  base,

  maxHeight(500, {
    timeText: {
      fontSize: 10,
      marginLeft: 10,
    },
    zProceed: {
      alignItems: 'center',
      justifyContent: 'flex-end',
      paddingRight: 5,
      width: '76%',
      height: 50,
      paddingLeft: 0,
      marginLeft: '0%',
      marginBottom: 40,
    },
    zProceedEx: {
      alignItems: 'center',
      justifyContent: 'center',
      width: '23%',
      height: 50,
      padding: 0,
      marginBottom: 40,
      borderRadius: 3,
      borderWidth: 2,
    },
    proceedContainer: {
      marginBottom: '4%',
    },
    lsproceedButton: {
      height: 50,
    },
    lsproceedButtonText: {
      fontSize: 17,
    },
    receiptItem: {
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      paddingLeft: 35,
      paddingRight: 10,
      paddingTop: 15,
      paddingBottom: 10,
    },
    receiptTitle: {
      width: '100%',
    },
    receiptTitleText: {
      fontSize: 15,
      lineHeight: 20,
    },
    receiptOnePrice: {
      fontSize: 12,
    },
    receiptQtyText: {
      color: '#343434',
      fontSize: 13,
      fontFamily: GILROY_REGULAR,
    },
    receiptTotal: {
      height: '100%',

      color: '#343434',
      fontSize: 13,
      fontFamily: GILROY_REGULAR,
      textAlign: 'center',
    },
    selectedText: {
      fontFamily: GILROY_REGULAR,
    },
    qtyButton: {
      width: 20,
      height: 20,
    },
    qtyButtonIcon: {
      width: 10,
      height: 10,
    },
    lsInstanceContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 0,
      borderColor: '#FE8B70',
    },
    receiptButtonText: {
      fontSize: 15,
    },
    receiptItem: {
      paddingLeft: 20,
      paddingRight: 5,
      paddingTop: 15,
      paddingBottom: 10,
    },
  })
);

export default styles