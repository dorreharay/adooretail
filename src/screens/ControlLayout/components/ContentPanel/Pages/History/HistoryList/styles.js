import { createStyles, maxHeight, minWidth, maxWidth, } from 'react-native-media-queries';
import { COMFORTAA_LIGHT, FUTURA_LIGHT, FUTURA_REGULAR, PROBA_LIGHT, PROBA_REGULAR, PROBA_MEDIUM, } from '@fonts'

import { deviceHeight } from '@dimensions';

const base = {
  container: {
    flex: 1,
  },
  dayHeader: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 25,
    width: '100%',
    height: 60,
    marginTop: 10,
    borderRadius: 5,
    backgroundColor: '#FFFFFF'
  },
  dayHeaderDate: {
    width: '25%',
    marginRight: 30,
    color: '#343434',
    fontSize: 18,
    fontFamily: PROBA_REGULAR,
  },
  dayHeaderTotal: {
    minWidth: '25%',
    marginRight: 30,
    color: '#343434',
    fontSize: 18,
    fontFamily: PROBA_REGULAR,
  },
  dayHeaderEmployees: {
    marginRight: 30,
    color: '#343434',
    fontSize: 18,
    fontFamily: PROBA_REGULAR,
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
    backgroundColor: 'red'
  },
  employeeName: {
    marginLeft: 15,
    color: '#343434',
    fontSize: 20,
    fontFamily: PROBA_REGULAR,
  },
  total: {
    position: 'absolute',
    right: 25,
    color: '#343434',
    fontSize: 20,
    fontFamily: PROBA_MEDIUM,
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
    fontSize: 19,
    fontFamily: PROBA_REGULAR,
    lineHeight: 35,
  },
  receiptDetailHeading: {
    width: '53%',
    color: '#000000',
    fontSize: 20,
    fontFamily: PROBA_REGULAR,
  },
  receiptDetailContent: {
    fontFamily: PROBA_LIGHT,
    // textDecorationLine: 'underline',
  },
  collapsedReceiptContent: {
    flexDirection: 'column',
    width: '35%',
    paddingRight: 20,
  },
  collapsedReceiptContenHeading: {
    marginVertical: 10,
    color: '#000000',
    fontSize: 20,
    fontFamily: PROBA_REGULAR,
  },
  receiptModalHeading: {
    width: '60%',
    marginBottom: 30,
    color: '#000000',
    fontSize: 23,
    fontFamily: PROBA_MEDIUM,
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

    fontSize: 25,
    fontFamily: PROBA_REGULAR
  },
  qrCodeInputPlaceholder: {
    width: '90%',
    paddingHorizontal: '5%',
    paddingVertical: 20,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: '#E8E8E8',

    fontSize: 25,
    fontFamily: PROBA_LIGHT
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
    fontSize: 23,
    fontFamily: PROBA_MEDIUM,
  },
  errorText: {
    width: '100%',
    marginTop: -15,
    paddingLeft: 25,
    color: 'red',
    fontSize: 20,
    fontFamily: PROBA_LIGHT,
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
  }
};

const styles = createStyles(
  base,

  maxWidth(500, {

  })
);

export default styles