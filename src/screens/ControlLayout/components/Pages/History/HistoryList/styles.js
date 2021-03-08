import { createStyles, maxWidth, } from 'react-native-media-queries';
import { MAZZARD_LIGHT, MAZZARD_REGULAR, MAZZARD_MEDIUM, MAZZARD_SEMIBOLD, } from '@fonts'

import { deviceHeight } from '@dimensions';

const base = {
  container: {
    flex: 1,
  },
  dayHeader: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 25,
    width: '100%',
    height: 60,
    marginTop: 10,
    borderRadius: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: '#DAD8D8',
    backgroundColor: '#FFFFFF'
  },
  dayHeaderDate: {
    width: '30%',
    marginRight: 30,
    color: '#343434',
    fontSize: 18,
    fontFamily: MAZZARD_MEDIUM,
  },
  dayHeaderTotal: {
    // minWidth: '20%',
    marginRight: 30,
    color: '#343434',
    fontSize: 18,
    fontFamily: MAZZARD_MEDIUM,
  },
  dayHeaderEmployees: {
    marginRight: 30,
    color: '#343434',
    fontSize: 16,
    fontFamily: MAZZARD_MEDIUM,
  },
  dayHeaderIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    right: 0,
    width: 60,
    height: 60,
  },
  employeesContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 70,
    marginTop: 20,
    paddingHorizontal: 25,
  },
  employeeBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 50,
  },
  employee: {
    position: 'relative',
    width: 50,
    height: 50,
    borderRadius: 1000,
    borderWidth: 1.5,
    borderColor: '#E54F46',
  },
  employeeImage: {
    position: 'absolute',
    top: 3,
    left: 3,
    width: 40,
    height: 40,
    borderRadius: 1000,
    backgroundColor: '#F2F2F2'
  },
  employeeName: {
    marginLeft: 15,
    color: '#343434',
    fontSize: 20,
    fontFamily: MAZZARD_REGULAR,
  },
  total: {
    position: 'absolute',
    right: 25,
    color: '#343434',
    fontSize: 20,
    fontFamily: MAZZARD_MEDIUM,
  },
  historyInstanceContainer: {
    width: '100%',
    height: '100%',
    borderColor: '#F3F3F3'
  },
  historyInstance: {
    flexDirection: 'row',
    width: '100%',
    padding: 25,
    paddingLeft: 0,
    borderBottomWidth: 1,
    borderColor: '#F3F3F3'
  },
  receiptItem: {
    color: '#535353',
    fontSize: 17,
    fontFamily: MAZZARD_REGULAR,
    lineHeight: 35,
  },
  receiptDetailHeading: {
    width: '53%',
    color: '#000000',
    fontSize: 18,
    fontFamily: MAZZARD_REGULAR,
  },
  receiptDetailHeadingComment: {
    width: '100%',
    color: '#000000',
    fontSize: 18,
    fontFamily: MAZZARD_REGULAR,
    lineHeight: 25,
  },
  receiptDetailContent: {
    fontFamily: MAZZARD_LIGHT,
    // textDecorationLine: 'underline',
  },
  collapsedReceiptContent: {
    flexDirection: 'column',
    width: '33%',
    paddingRight: 20,
  },
  collapsedReceiptContenHeading: {
    marginVertical: 10,
    color: '#000000',
    fontSize: 18,
    fontFamily: MAZZARD_REGULAR,
  },
  receiptModalHeading: {
    width: '60%',
    marginBottom: 30,
    color: '#000000',
    fontSize: 20,
    fontFamily: MAZZARD_MEDIUM,
    textAlign: 'center',
    lineHeight: 30,
  },
  receiptModalContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: deviceHeight * 0.5,
    height: deviceHeight * 0.52,
    paddingBottom: 10,
    backgroundColor: '#FFFFFF',
  },
  qrCodeInput: {
    width: '90%',
    paddingHorizontal: '5%',
    paddingVertical: 20,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: '#E8E8E8',

    fontSize: 22,
    fontFamily: MAZZARD_REGULAR
  },
  qrCodeInputPlaceholder: {
    width: '90%',
    paddingHorizontal: '5%',
    paddingVertical: 20,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: '#E8E8E8',

    fontSize: 22,
    fontFamily: MAZZARD_LIGHT
  },
  qrCodeButton: {
    width: '100%',
    paddingHorizontal: '5%',
    height: 70,
    marginTop: 40,

    fontSize: 25,
  },
  qrCodeButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontFamily: MAZZARD_MEDIUM,
  },
  errorText: {
    width: '100%',
    marginTop: 15,
    paddingLeft: 25,
    color: 'red',
    fontSize: 18,
    fontFamily: MAZZARD_LIGHT,
  },
  scrollTopButton: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: 300,
    width: 70,
    height: 70,
  },
  scrollTopButtonInner: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    borderWidth: 2.5,
    borderColor: '#DCDCDC',
    borderRadius: 100,
  },
  success: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
    height: 300,
  },
  loadMoreButton: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: 520,
    width: 300,
    height: 70,
  },
  loadMoreButtonText: {
    color: '#BBBBBB',
    fontSize: 20,
    fontFamily: MAZZARD_REGULAR,
  },
  receiptLeftButtons: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '50%',
    height: 70,
    marginTop: 15,
  },
  receiptLeftButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    marginRight: 10,
    borderWidth: 0.6,
    borderColor: '#DAD8D8',
    borderRadius: 100,
  },
  receiptRightContainer: {
    flexDirection: 'row',
    flexGrow: 1,
    paddingVertical: 15,
  },
  receiptSummaryText: {
    marginBottom: 15,
    fontSize: 18,
    fontFamily: MAZZARD_MEDIUM,
  },
  receiptSummaryReceiptText: {
    marginBottom: 15,
    fontSize: 15,
    fontFamily: MAZZARD_REGULAR,
  },
  emptyHeadingText: {
    fontSize: 20,
    fontFamily: MAZZARD_REGULAR,
  },
  emptyText: {
    width: '70%',
    marginTop: 10,
    fontSize: 17,
    fontFamily: MAZZARD_REGULAR,
    textAlign: 'center',
  },
};

const styles = createStyles(
  base,

  maxWidth(500, {

  })
);

export default styles